import os
import uuid
from flask import Blueprint, request
from flask_cors import CORS
from dotenv import load_dotenv
from livekit.api import LiveKitAPI, ListRoomsRequest, AccessToken, VideoGrants

load_dotenv()

auth_bp = Blueprint("auth", __name__)
CORS(auth_bp, resources={r"/*": {"origins": "*"}})

async def generate_room_name():
    name = "room-" + str(uuid.uuid4())[:8]
    rooms = await get_rooms()
    while name in rooms:
        name = "room-" + str(uuid.uuid4())[:8]
    return name

async def get_rooms():
    api = LiveKitAPI()
    rooms = await api.room.list_rooms(ListRoomsRequest())
    await api.aclose()
    return [room.name for room in rooms.rooms]

@auth_bp.route("/getToken")
async def get_token():
    name = request.args.get("name", "my name")
    room = request.args.get("room", None)
    
    if not room:
        room = await generate_room_name()
        
    token = AccessToken(os.getenv("LIVEKIT_API_KEY"), os.getenv("LIVEKIT_API_SECRET")) \
        .with_identity(name)\
        .with_name(name)\
        .with_grants(VideoGrants(
            room_join=True,
            room=room
        ))
    
    return token.to_jwt()

@auth_bp.route("/ping")
async def ping():
    return {"message": "pong"}
