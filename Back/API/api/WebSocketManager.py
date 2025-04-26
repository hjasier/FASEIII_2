# WebSocketManager.py
from flask import Blueprint, request
from socketio_instance import socketio  # Importamos socketio desde el archivo separado
from flask_socketio import emit
from .RouteGenerator import handle_calculate_route
import logging
from . import AgentWebSocketManager
from . import ClientWebSocketManager
# Crear Blueprint para WebSocket
websocket_bp = Blueprint("websocket", __name__)

# Diccionario para almacenar clientes conectados (por ID de sesión)
connected_clients = {}


@socketio.on("connect")
def handle_connect():
    client_id = request.sid  # Identificador único del cliente
    connected_clients[client_id] = request.sid
    logging.info(f"Cliente conectado: {client_id}")

@socketio.on("disconnect")
def handle_disconnect():
    client_id = request.sid
    connected_clients.pop(client_id, None)
    logging.info(f"Cliente desconectado: {client_id}")
    
    
@websocket_bp.route("/emit_test_cam")
def emit_test():
    socketio.emit("mobile_action", {"action": "show_camera"}, namespace="/")
    return "Mensaje enviado"

@websocket_bp.route("/emit_test_route")
def emit_route_test():
    handle_calculate_route("data")
    return "Mensaje enviado"    
    
    
@websocket_bp.route("/emit_test_agent")
def emit_agent_test():
    socketio.emit("agent_action", {"type": "test"}, namespace="/")
    return "Mensaje enviado"    


@websocket_bp.route("/emit_test_location")
def emit_test_location():
    socketio.emit("mobile_action", {"action": "get_location"}, namespace="/")
    return "Mensaje enviado"


@websocket_bp.route("/emit_test_accept_challenge")
def emit_test_accept_challenge():
    socketio.emit("mobile_action", {"action": "accept_challenge","challenge":{"id": 6,"type": 2,"completion_type": 2,"location": 8,"name": "Visita el Parque de Doña Casilda Iturrizar","description": "Disfruta de un paseo por el Parque de Doña Casilda Iturrizar, un hermoso parque urbano con estanques y jardines.","reward": 50,"active": True,"repeatable": False,"cooldown_time": None,"cover_url": "https://yvouepcwwstjvdcgvmon.supabase.co/storage/v1/object/public/challenges/challenge-images/rbatqq4v01j.jpg","priority": 6,"created_at": "2025-03-28T21:58:38.948036+00:00","updated_at": "2025-03-30T17:38:08.354442+00:00","expiration_date": "2026-03-28T21:58:38.948036+00:00","ChallengeType": {"id": 2,"type": "visit"},"CompletionType": {"id": 2,"type": "GPS"},"ChallengeTags": [],"RequiredCapability": [],"Location": {"id": 8,"name": "Parque de Doña Casilda Iturrizar","Route": [],"email": None,"point": "0101000020E6100000A51133FB3C8607C0C365153603A24540","status": 2,"address": "Abando, 48009 Bilbao, Bizkaia","image_url": None,"description": "Parque urbano de 1907 con estanques, jardines, una pérgola y un parque infantil.","phone_number": None,"solicited_at": None,"location_type": 1,"opening_hours": None,"sustainability_score": None}}}, namespace="/")
    return "Mensaje enviado"




