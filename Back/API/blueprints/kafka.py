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
kafka_bp = Blueprint('kafka', __name__, url_prefix='/kafka')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Thread-safe message store
class MessageStore:
    def __init__(self, max_size=10000):
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

# Kafka Configuration
kafka_config = {
    'bootstrap.servers': '10.10.76.231:7676',
    'group.id': 'sensor_metrics_consumer',
    'auto.offset.reset': 'earliest',
    'enable.auto.commit': True,
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
        logger.info(f"Attempting to connect to database at {db_config['host']}:{db_config['port']}")
        conn = psycopg2.connect(**db_config)
        logger.info("Database connection successful")
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
    consumer = Consumer(kafka_config)
    consumer.subscribe(['sensor_metrics_air'])
    
    try:
        while True:
            msg = consumer.poll(1.0)
            if msg is None:
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
                logger.info(f"Processed message: sensor_id={sensor_id}, city_id={city_id}")
                
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
    global consumer_thread
    consumer_thread = threading.Thread(target=consume_kafka_messages)
    consumer_thread.daemon = True
    consumer_thread.start()
    logger.info("Kafka consumer thread started")

# Route to get all sensor data with city information
@kafka_bp.route('/data', methods=['GET'])
@cross_origin()
def get_data():
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

