from flask import Blueprint, request, jsonify, render_template
from confluent_kafka import Consumer, KafkaException
import threading
import json
import time
from datetime import datetime
from flask_cors import cross_origin
import socket
import uuid

# Create a Blueprint instead of a Flask app
kafka_bp = Blueprint('kafka', __name__, url_prefix='/kafka')

# Global variable to store the latest sensor data
sensor_data = []
# Lock for thread-safe access to sensor_data
data_lock = threading.Lock()
# Thread for Kafka consumer
kafka_thread = None

@kafka_bp.route('/control', methods=['POST'])
def trigger_kafka():
    # This endpoint could be used to control the Kafka consumer
    action = request.json.get('action')
    if action == 'start':
        # Logic to start Kafka consumer if needed
        return jsonify({'status': 'Kafka consumer is running'})
    return jsonify({'status': 'No action taken'})

@kafka_bp.route('/sensor-data', methods=['GET'])
@cross_origin()
def get_sensor_data():
    # Return the latest sensor data for frontend visualization
    with data_lock:
        return jsonify(sensor_data)

# Add a test endpoint to manually add sample data
@kafka_bp.route('/test-data', methods=['POST'])
def add_test_data():
    """Add test data to simulate Kafka messages"""
    test_data = {
        "co": 1.23,
        "o3": 0.45,
        "co2": 450.0,
        "no2": 0.12,
        "so2": 0.03,
        "pm10": 15.6,
        "sensor_id": "12345678-1234-1234-1234-123456789012",
        "event_time": "2025-04-26T12:34:56",
        "city_id": "b9b640c2-84c5-4b7d-aa39-54914dff2c69",
        "sensor_type": "air"
    }
    
    with data_lock:
        sensor_data.insert(0, test_data)
        if len(sensor_data) > 100:
            sensor_data.pop()
    
    return jsonify({"status": "Test data added", "data": test_data})

@kafka_bp.route('/sensors/<operation>', methods=['GET'])
@cross_origin()
def aggregate_sensor_data(operation):
    """
    Get aggregated sensor data based on city, sensor type, and date
    
    Path parameters:
    - operation: average, min, or max
    
    Query parameters:
    - city_id: ID of the city
    - sensor_type: Type of sensor (air, ambient, traffic, water_quality, water_usage)
    - date: Date in YYYY-MM-DD format
    """
    # Validate operation parameter
    valid_operations = ['average', 'min', 'max']
    if operation not in valid_operations:
        return jsonify({"error": f"Invalid operation. Must be one of: {', '.join(valid_operations)}"}), 400
    
    # Get and validate query parameters
    city_id = request.args.get('city_id')
    sensor_type = request.args.get('sensor_type')
    date_str = request.args.get('date')
    
    if not all([city_id, sensor_type, date_str]):
        return jsonify({"error": "Missing required parameters. city_id, sensor_type, and date are required"}), 400
    
    # Validate sensor_type
    valid_sensor_types = ['air', 'ambient', 'traffic', 'water_quality', 'water_usage']
    if sensor_type not in valid_sensor_types:
        return jsonify({"error": f"Invalid sensor_type. Must be one of: {', '.join(valid_sensor_types)}"}), 400
    
    # Validate date format
    try:
        target_date = datetime.strptime(date_str, '%Y-%m-%d')
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400
    
    # Filter sensor data based on criteria
    with data_lock:
        # Filter data by city_id, sensor_type, and date
        filtered_data = []
        for entry in sensor_data:
            # Check if the entry has the required fields
            if not all(key in entry for key in ['city_id', 'sensor_type', 'event_time']):
                continue
                
            # Check if the entry matches the filters
            try:
                entry_date = datetime.strptime(entry['event_time'].split('T')[0], '%Y-%m-%d')
                if (entry['city_id'] == city_id and 
                    entry['sensor_type'] == sensor_type and 
                    entry_date.date() == target_date.date()):
                    filtered_data.append(entry)
            except (ValueError, TypeError):
                continue
    
    # Return early if no matching data
    if not filtered_data:
        return jsonify({
            "city_id": city_id,
            "sensor_type": sensor_type,
            "date": date_str,
            "operation": operation,
            "result": None,
            "message": "No data found matching the criteria"
        })
    
    # Aggregate metrics based on operation
    metrics = {}
    if sensor_type == 'air':
        metrics_to_aggregate = ['co', 'o3', 'co2', 'no2', 'so2', 'pm10']
    elif sensor_type == 'ambient':
        metrics_to_aggregate = ['temperature', 'humidity']
    elif sensor_type == 'traffic':
        metrics_to_aggregate = ['vehicle_count', 'average_speed']
    elif sensor_type == 'water_quality':
        metrics_to_aggregate = ['ph', 'turbidity', 'dissolved_oxygen']
    elif sensor_type == 'water_usage':
        metrics_to_aggregate = ['flow_rate', 'total_volume']
    
    # Calculate aggregated values
    result = {}
    for metric in metrics_to_aggregate:
        values = [entry.get(metric) for entry in filtered_data if metric in entry and entry[metric] is not None]
        
        if not values:
            result[metric] = None
            continue
            
        if operation == 'average':
            result[metric] = sum(values) / len(values)
        elif operation == 'min':
            result[metric] = min(values)
        elif operation == 'max':
            result[metric] = max(values)
    
    return jsonify({
        "city_id": city_id,
        "sensor_type": sensor_type,
        "date": date_str,
        "operation": operation,
        "data_points": len(filtered_data),
        "result": result
    })

# Add this function to check if Kafka is working
@kafka_bp.route('/status', methods=['GET'])
@cross_origin()
def kafka_status():
    global kafka_thread
    is_running = kafka_thread is not None and kafka_thread.is_alive()
    return jsonify({
        "consumer_running": is_running,
        "data_count": len(sensor_data),
        "server_time": datetime.now().isoformat()
    })

def kafka_consumer():
    """Background thread function to consume Kafka messages"""
    print("Starting Kafka consumer thread...")
    
    # Generate a unique group ID to avoid conflicts with other consumers
    unique_id = f"air-sensor-group-{socket.gethostname()}-{uuid.uuid4()}"
    print(f"Using unique consumer group ID: {unique_id}")
    
    c = Consumer({
        'bootstrap.servers': '10.10.76.231:7676',
        'group.id': unique_id,
        'auto.offset.reset': 'earliest',
        'session.timeout.ms': 10000,  # 10 seconds
        'heartbeat.interval.ms': 3000,  # 3 seconds
        'max.poll.interval.ms': 300000  # 5 minutes
    })
    
    # Add a list of topics to try
    topics = ['sensor_metrics_air']
    
    c.subscribe(topics)
    print(f"Subscribed to topics: {topics}")
    
    # Add a flag to detect if we're receiving any messages
    last_message_time = time.time()
    
    try:
        while True:
            # Add timeout of 1 second for faster response
            msg = c.poll(1.0)
            
            # Check if we haven't received messages for a while
            if time.time() - last_message_time > 60:  # 1 minute
                print("WARNING: No messages received in the last minute. Check Kafka connection and topics.")
                print(f"Trying to resubscribe to topics: {topics}")
                c.unsubscribe()
                time.sleep(1)
                c.subscribe(topics)
                last_message_time = time.time()  # Reset timer
            
            if msg is None:
                print("No message received")
                continue
                
            if msg.error():
                print(f"Consumer error: {msg.error()}")
                continue
                
            try:
                # Update last message time
                last_message_time = time.time()
                
                # Parse the message value
                raw_value = msg.value().decode('utf-8')
                print(f"Raw message received: {raw_value}")
                
                value = json.loads(raw_value)
                print(f"Parsed message: {value}")
                
                # Update the global sensor data
                with data_lock:
                    # Add to beginning of list and keep only last 100 entries
                    sensor_data.insert(0, value)
                    if len(sensor_data) > 100:
                        sensor_data.pop()
                    
                print(f"Data count after adding: {len(sensor_data)}")
                    
            except json.JSONDecodeError as e:
                print(f"Failed to parse message: {raw_value}")
                print(f"JSON Error: {e}")
            except Exception as e:
                print(f"Unexpected error processing message: {e}")
                
    except Exception as e:
        print(f"Kafka consumer error: {e}")
    finally:
        print("Closing Kafka consumer")
        c.close()

def init_kafka_consumer():
    """Initialize and start the Kafka consumer thread"""
    global kafka_thread
    if kafka_thread is None or not kafka_thread.is_alive():
        print("Starting new Kafka consumer thread")
        kafka_thread = threading.Thread(target=kafka_consumer, daemon=True)
        kafka_thread.start()
        print("Kafka consumer thread started")
    else:
        print("Kafka consumer thread is already running")