# app.py
from flask import Flask
from flask_cors import CORS
import dotenv
from socketio_instance import socketio  


# Crear la aplicación Flask
app = Flask(__name__)
CORS(app)

# Initialize SocketIO with the Flask app
socketio.init_app(app)

# Importar rutas (blueprints)
from api.Auth import auth_bp
from api.WebSocketManager import websocket_bp
from api.RouteGenerator import route_generator_bp

# Registrar blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(websocket_bp)
app.register_blueprint(route_generator_bp)

# Ejecutar la aplicación con Flask-SocketIO
if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000, use_reloader=False)

