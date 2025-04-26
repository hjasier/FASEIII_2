# ClientWebSocketManager.py
from flask import Blueprint, request
from socketio_instance import socketio
import logging

######################################################
#
# TODO LO QUE VA EN DIRECCIÓN [SERVER] -> [CLIENT]
#
######################################################

# Reenvia el comando al móvil cambiando el ejecutor por "mobile_action"
def handle_resend_action_to_client(data):
    # Reenviar el comando al móvil
    logging.info(f"RE-Enviando comando al móvil: {data}")
    socketio.emit("mobile_action", data, namespace="/", include_self=False)

######################################################
#
# TODO LO QUE VA EN DIRECCIÓN [CLIENT] -> [SERVER]
#
######################################################

# Recibe respuestas del móvil (ej: fotos, ubicación) y las reenvía al agente
@socketio.on("mobile_response")
def handle_mobile_response(data):
    logging.info(f"Respuesta del móvil recibida: {data}")
    type = data.get("type")
    
    from .AgentWebSocketManager import handle_image_upload, handle_location_upload
    
    if type == "photo":
        handle_image_upload(data)
    elif type == "location":
        handle_location_upload(data)
    else:
        logging.info(f"COMANDO NO GESTIONADO RECIBIDO: {data}")
