from flask import Blueprint, request, jsonify, render_template
from confluent_kafka import Consumer, KafkaException
import threading
import json
import time

# Create a Blueprint instead of a Flask app
kafka_bp = Blueprint('kafka', __name__, url_prefix='/api/kafka')

# Global variable to store the latest sensor data
sensor_data = []
# Lock for thread-safe access to sensor_data
data_lock = threading.Lock()
# Thread for Kafka consumer
kafka_thread = None

@kafka_bp.route('/')
def index():
    return render_template('index.html')

@kafka_bp.route('/saludo', methods=['GET'])
def saludo():
    nombre = request.args.get('nombre', 'mundo')
    return jsonify({ 'mensaje': f'¡Hola, {nombre}!' })

@kafka_bp.route('/control', methods=['POST'])
def trigger_kafka():
    # This endpoint could be used to control the Kafka consumer
    action = request.json.get('action')
    if action == 'start':
        # Logic to start Kafka consumer if needed
        return jsonify({'status': 'Kafka consumer is running'})
    return jsonify({'status': 'No action taken'})

@kafka_bp.route('/sensor-data', methods=['GET'])
def get_sensor_data():
    # Return the latest sensor data for frontend visualization
    with data_lock:
        return jsonify(sensor_data)

def kafka_consumer():
    """Background thread function to consume Kafka messages"""
    c = Consumer({
        'bootstrap.servers': '10.10.76.231:7676',
        'group.id': 'my-group',
        'auto.offset.reset': 'earliest'
    })
    
    c.subscribe(['sensor_metrics_air'])
    
    try:
        while True:
            msg = c.poll(1.0)
            if msg is None:
                continue
            if msg.error():
                print(f"Consumer error: {msg.error()}")
                continue
                
            try:
                # Parse the message value
                value = json.loads(msg.value().decode('utf-8'))
                # Update the global sensor data
                with data_lock:
                    # Add to beginning of list and keep only last 100 entries
                    sensor_data.insert(0, value)
                    if len(sensor_data) > 100:
                        sensor_data.pop()
                print(f"Received data: {value}")
            except json.JSONDecodeError:
                print(f"Failed to parse message: {msg.value().decode('utf-8')}")
    except Exception as e:
        print(f"Kafka consumer error: {e}")
    finally:
        c.close()

def init_kafka_consumer():
    """Initialize and start the Kafka consumer thread"""
    global kafka_thread
    if kafka_thread is None or not kafka_thread.is_alive():
        kafka_thread = threading.Thread(target=kafka_consumer, daemon=True)
        kafka_thread.start()
        print("Kafka consumer thread started")