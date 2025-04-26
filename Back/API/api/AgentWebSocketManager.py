# AgentWebSocketManager.py
from flask import Blueprint, request
from socketio_instance import socketio
import logging
from .ImageProcessor import process_image
from .RouteGenerator import get_direction, handle_calculate_route  

######################################################
#
# TODO LO QUE VA EN DIRECCIÓN [SERVER] -> [AGENT]
#
######################################################

def handle_image_upload(data):
    image = data.get("image")
    socketio.emit("agent_action", {"type":"photo_update","info": "La foto ha sido recibida y esta siendo procesada"}, namespace="/", include_self=False)
    if image:
        image_contents = process_image(image)
        logging.info(f"Contenido de la imagen procesada: {image_contents}")
        socketio.emit("agent_action", {"type":"photo_update","info": f"La foto contiene lo siguiente: {image_contents}"}, namespace="/", include_self=False)

def handle_location_upload(data):
    location = data.get("location")
    if location:
        logging.info(f"Ubicación recibida: {location}")
        direction = get_direction(location)
        logging.info(f"Dirección procesada: {direction}")
        socketio.emit("agent_action", {"type":"location_update","location": f"El usuario se encuentra en la dirección: {direction}"}, namespace="/", include_self=False)
    else:
        socketio.emit("agent_action", {"type":"location_update","info": "No se ha recibido ninguna ubicación, informa al usuario que esa función no esta disponible"}, namespace="/", include_self=False)

######################################################
#
# TODO LO QUE VA EN DIRECCIÓN [AGENT] -> [SERVER]
#
######################################################

def handle_route(data):
    route = handle_calculate_route(data)
    socketio.emit("mobile_action", {"action": "show_route","route":route}, namespace="/")

# Recibe comandos del AGENTE y los procesa
@socketio.on("server_command")
def handle_server_command(data):
    action = data.get("action")
    
    from .ClientWebSocketManager import handle_resend_action_to_client
    
    if action == "calculate_route":
        handle_route(data)
    elif action == "show_camera":
        handle_resend_action_to_client(data)
    elif action == "get_location":
        handle_resend_action_to_client(data)
    elif action == "accept_challenge":
        handle_resend_action_to_client(data)
    else:
        logging.info(f"COMANDO NO GESTIONADO RECIBIDO: {data}")
