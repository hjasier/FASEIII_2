from flask import Blueprint, request, jsonify, render_template
from confluent_kafka import Consumer, KafkaException
import threading
import json
import time
from datetime import datetime
from flask_cors import cross_origin
import socket
import uuid
import psycopg2
from collections import deque
import logging
from threading import Lock

# Create a Blueprint instead of a Flask app
kafka_bp = Blueprint('kafka', __name__, url_prefix='/api/greenlake-eval/sensors')

# Configure logging
logging.basicConfig(level=logging.CRITICAL)
logger = logging.getLogger(__name__)

# Thread-safe message store
class MessageStore:
    def __init__(self, max_size=100000):
        self.messages = deque(maxlen=max_size)
        self.lock = Lock()
        self.sensor_city_map = {}  # Cache for sensor_id to city_id mapping
    
    def add_message(self, message):
        with self.lock:
            self.messages.append(message)
    
    def get_all(self):
        with self.lock:
            return list(self.messages)
    
    def get_by_city(self, city_id):
        with self.lock:
            return [msg for msg in self.messages if msg.get('city_id') == city_id]
    
    def get_by_sensor(self, sensor_id):
        with self.lock:
            return [msg for msg in self.messages if msg.get('sensor_id') == sensor_id]
    
    def cache_city(self, sensor_id, city_id):
        with self.lock:
            self.sensor_city_map[sensor_id] = city_id
    
    def get_cached_city(self, sensor_id):
        with self.lock:
            return self.sensor_city_map.get(sensor_id)

# Create message store
message_store = MessageStore()

# Kafka Configuration with unique consumer group ID
def get_kafka_config():
    # Generate a unique consumer group ID by combining hostname and a random UUID
    hostname = socket.gethostname()
    unique_id = str(uuid.uuid4())[:8]
    timestamp = int(time.time())
    group_id = f'sensor_metrics_consumer_{hostname}_{timestamp}_{unique_id}'
    
    #logger.info(f"Creating Kafka consumer with group_id: {group_id}")
    
    return {
        'bootstrap.servers': '10.10.76.231:7676',
        'group.id': group_id,
        'auto.offset.reset': 'earliest',
        'enable.auto.commit': True,
        'session.timeout.ms': 6000,
        'max.poll.interval.ms': 600000  # 10 minutes
    }

# Database Configuration
db_config = {
    'host': '10.10.76.241',
    'port': '6565',
    'database': 'greenlake_data',  # Update with actual database name
    'user': 'readonly_user',            # Update with actual username
    'password': 'asdf'         # Update with actual password
}

# Function to get database connection
def get_db_connection():
    try:
        #logger.info(f"Attempting to connect to database at {db_config['host']}:{db_config['port']}")
        conn = psycopg2.connect(**db_config)
        #logger.info("Database connection successful")
        return conn
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        logger.error(f"Connection details: host={db_config['host']}, port={db_config['port']}, user={db_config['user']}, db={db_config['database']}")
        return None

# Function to get city_id for a sensor_id
def get_city_id(sensor_id):
    # Check cache first
    city_id = message_store.get_cached_city(sensor_id)
    if city_id is not None:
        return city_id
    
    # Query database
    conn = get_db_connection()
    if not conn:
        return None
    
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT city_id FROM sensors WHERE id = %s", (sensor_id,))
        result = cursor.fetchone()
        
        if result:
            city_id = result[0]
            # Cache the result
            message_store.cache_city(sensor_id, city_id)
            return city_id
        return None
    except Exception as e:
        logger.error(f"Database query error: {e}")
        return None
    finally:
        cursor.close()
        conn.close()

# Function to consume Kafka messages
def consume_kafka_messages():
    consumer = Consumer(get_kafka_config())
    consumer.subscribe(['sensor_metrics_air'])
    
    try:
        while True:
            msg = consumer.poll(1.0)
            if msg is None:
                logger.debug("No message received")
                continue
            if msg.error():
                logger.error(f"Kafka error: {msg.error()}")
                continue
            
            try:
                # Parse message
                message_value = msg.value().decode('utf-8')
                data = json.loads(message_value)
                
                # Get city_id for this sensor
                sensor_id = data.get('sensor_id')
                city_id = get_city_id(sensor_id)
                
                # Add city_id to the data
                data['city_id'] = city_id
                
                # Store message
                message_store.add_message(data)
                #logger.info(f"Processed message: sensor_id={sensor_id}, city_id={city_id}")
                
            except Exception as e:
                logger.error(f"Error processing message: {e}")
    
    except Exception as e:
        logger.error(f"Consumer error: {e}")
    finally:
        consumer.close()

# Start the Kafka consumer thread when the blueprint is registered
consumer_thread = None

@kafka_bp.record
def on_register(state):
    logger.info("Registering Kafka consumer thread")
    global consumer_thread
    consumer_thread = threading.Thread(target=consume_kafka_messages)
    consumer_thread.daemon = True
    consumer_thread.start()
    #logger.info("Kafka consumer thread started")

# Route to get all sensor data with city information
@kafka_bp.route('/data', methods=['GET'])
@cross_origin()
def get_data():
    print(message_store.get_all())
    return jsonify(message_store.get_all())

@kafka_bp.route('/sensor-data', methods=['GET'])
@cross_origin()
def get_sensor_data():
    sensor_id = request.args.get('sensor_id')
    if not sensor_id:
        return jsonify({'error': 'sensor_id is required'}), 400
    
    data = message_store.get_by_sensor(sensor_id)
    if not data:
        return jsonify({'error': 'No data found for this sensor'}), 404
    
    return jsonify(data)

# Route to get data for a specific city
@kafka_bp.route('/city/<city_id>', methods=['GET'])
@cross_origin()
def get_city_data(city_id):
    return jsonify(message_store.get_by_city(city_id))


# Health check endpoint
@kafka_bp.route('/health', methods=['GET'])
@cross_origin()
def health_check():
    return jsonify({
        'status': 'ok',
        'consumer_running': consumer_thread is not None and consumer_thread.is_alive(),
        'message_count': len(message_store.get_all()),
        'cache_size': len(message_store.sensor_city_map)
    })

@kafka_bp.route('/<operation>', methods=['GET'])
@cross_origin()
def aggregate_sensor_data(operation):
    # Add entry point logging
    logger.info(f"=== ENDPOINT CALLED: /{operation} with params: {request.args} ===")
    
    # Validate operation type
    if operation not in ['average', 'min', 'max']:
        logger.warning(f"Invalid operation requested: {operation}")
        return jsonify({'error': f'Invalid operation: {operation}. Allowed values: average, min, max'}), 400
    
    # Get required query parameters
    city_id = request.args.get('city_id')
    sensor_type = request.args.get('sensor_type')
    date_str = request.args.get('date')
    
    # Log all parameters
    logger.info(f"Parameters: city_id={city_id}, sensor_type={sensor_type}, date={date_str}")
    
    # Validate required parameters
    if not city_id:
        logger.warning("Missing required parameter: city_id")
        return jsonify({'error': 'city_id parameter is required'}), 400
    if not sensor_type:
        logger.warning("Missing required parameter: sensor_type")
        return jsonify({'error': 'sensor_type parameter is required'}), 400
    if not date_str:
        logger.warning("Missing required parameter: date")
        return jsonify({'error': 'date parameter is required'}), 400
    
    # Validate sensor_type
    valid_sensor_types = ['air', 'ambient', 'traffic', 'water_quality', 'water_usage']
    if sensor_type not in valid_sensor_types:
        logger.warning(f"Invalid sensor_type: {sensor_type}")
        return jsonify({'error': f'Invalid sensor_type: {sensor_type}. Allowed values: {", ".join(valid_sensor_types)}'}), 400
    
    try:
        # Parse the date string
        target_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        logger.info(f"Parsed date: {target_date}")
    except ValueError:
        logger.warning(f"Invalid date format: {date_str}")
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
    
    # Get all messages for the specified city
    messages = message_store.get_by_city(city_id)
    logger.info(f"Messages for city_id={city_id}: {messages}")
    
    # Filter by sensor type and date
    filtered_messages = []
    for msg in messages:
        # Skip messages without event_time
        if 'event_time' not in msg:
            logger.warning(f"Message without event_time: {msg}")
            continue
        
        # Parse event_time and compare only the date part
        try:
            event_time = datetime.fromisoformat(msg['event_time'].replace('Z', '+00:00'))
            logger.info(f"Event time: {event_time}")
            event_date = event_time.date()
            
            # Check if this message is from the target date
            if event_date == target_date:
                # For air sensor type, include all air-related metrics
                if sensor_type == 'air':
                    filtered_messages.append(msg)
        except (ValueError, TypeError):
            # Skip messages with invalid timestamps
            continue
    
    # If no data was found
    if not filtered_messages:
        return jsonify({'error': f'No data found for city_id={city_id}, sensor_type={sensor_type}, date={date_str}'}), 404
    
    # Calculate metrics for air sensor data
    metrics = {}
    if sensor_type == 'air':
        # List of air metrics to aggregate
        air_metrics = ['co', 'o3', 'co2', 'no2', 'so2', 'pm10']
        
        for metric in air_metrics:
            # Collect all values for this metric
            values = [float(msg.get(metric, 0)) for msg in filtered_messages if msg.get(metric) is not None]
            
            if values:
                if operation == 'average':
                    metrics[metric] = sum(values) / len(values)
                elif operation == 'min':
                    metrics[metric] = min(values)
                elif operation == 'max':
                    metrics[metric] = max(values)
    
    # Prepare the response
    response = {
        'city_id': city_id,
        'sensor_type': sensor_type,
        'date': date_str,
        'operation': operation,
        'metrics': metrics,
        'sample_size': len(filtered_messages)
    }
    
    return jsonify(response)

