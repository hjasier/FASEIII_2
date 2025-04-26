# app.py
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)  # crea la aplicación

@app.route('/')
def index():
    return render_template('index.html')  # devuelve una plantilla

@app.route('/api/greenlake-eval/test', methods=['GET'])
def test1():
    nombre = request.args.get('nombre', 'mundo')
    return jsonify({
            "metadata": {
                "status": "success",
                "timestamp": "YYYY-MM-DDTHH:MM:SSZ"
            },
            "results": {
                "status": "active"
            }
        })
    
@app.route('/api/greenlake-eval/hospitals/nearby', methods=['GET'])
def test2():
    lat = request.args.get('lat', '79.8965515')
    lon = request.args.get('lon', '-48.0003246')
    radius = request.args.get('radius', '1000')
    return jsonify({
        "metadata": {
            "status": "success",
            "timestamp": "YYYY-MM-DDTHH:MM:SSZ"
        },
        "results": [
            {
                "id": "86cbe6d4-f169-4867-8672-8ec4609b6293",
                "city_id": "371197f0-1599-4e3a-a0a7-c90da11bc5b6",
                "name": "Hielo Alto Medical Center",
                "longitude": float(lon),
                "latitude": float(lat),
                "distance_m": 0.0
            }
        ]
    })
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5454)
