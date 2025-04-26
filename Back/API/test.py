# app.py
from flask import Flask, request, jsonify, render_template
from socketio_instance import socketio
from blueprints.kafka import kafka_bp, init_kafka_consumer
from flask_cors import CORS

app = Flask(__name__)  # crea la aplicación
CORS(app)  # habilita CORS para la aplicación

@app.route('/')
def index():
    return render_template('index.html')  # devuelve una plantilla

@app.route('/api/greenlake-eval/test', methods=['GET'])
def saludo():
    nombre = request.args.get('nombre', 'mundo')
    return jsonify({ 'mensaje': f'¡Hola, {nombre}!' })

app.register_blueprint(kafka_bp)
socketio.init_app(app)

init_kafka_consumer()  # Start the Kafka consumer in a separate thread
    
if __name__ == '__main__':
    socketio.run(app,debug=True, host='0.0.0.0', port=5656)
