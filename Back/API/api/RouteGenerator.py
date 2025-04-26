# RouteGenerator.py
from flask import Blueprint, jsonify
from geopy.geocoders import Nominatim
import logging

route_generator_bp = Blueprint('route_generator', __name__)


geolocator = Nominatim(user_agent="cds_app_city_quest (admin@cityquest.com)")



route_example = [
    [-2.979,43.295,],  # Punto de inicio
    [-2.975,43.297, ],
    [-2.972,43.299,],
    [-2.968,43.300, ],  # Punto cerca de Abando
]


points_of_interest = [
    {"name": "Punto de interés 1", "coordinates": [-2.977,43.296]},
    {"name": "Punto de interés 2", "coordinates": [-2.973,43.298]},
]


def calculate_route(destination):
# Estructura de GeoJSON para la ruta
    geojson_route = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": route_example
                },
                "properties": {
                    "name": "Ruta Ría de Bilbao - Abando"
                }
            }
        ]
    }

    # Estructura de GeoJSON para los puntos de interés
    geojson_poi = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": poi["coordinates"]
                },
                "properties": {
                    "name": poi["name"]
                }
            }
            for poi in points_of_interest
        ]
    }

    # Devolver la ruta y los puntos de interés como un JSON
    return {
        "route": geojson_route,
        "points_of_interest": geojson_poi
    }


# Ruta de ejemplo que se va a devolver en formato GeoJSON
@route_generator_bp.route('/generate_route', methods=['GET'])
def generate_route():
    return jsonify(calculate_route("destino")), 200




def get_direction(location):
    coordinates = (location["lat"], location["lon"])
    return geolocator.reverse(coordinates, exactly_one=True,language='es',addressdetails=True,zoom=18)


def handle_calculate_route(data):
    """Maneja la acción de calcular una ruta."""
    logging.info("EMITIENDO RUTA")
    route = calculate_route("destination")
    return route
