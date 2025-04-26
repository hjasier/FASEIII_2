from flask import Flask, request, jsonify, render_template

app = Flask(__name__)  # crea la aplicación

@app.route('/')
def index():
    return render_template('index.html')  # devuelve una plantilla

@app.route('/api/saludo', methods=['GET'])
def saludo():
    nombre = request.args.get('nombre', 'mundo')
    return jsonify({ 'mensaje': f'¡Hola, {nombre}!' })
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)