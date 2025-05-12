from flask import Flask, jsonify, request 
from flask_cors import CORS
from calculos import sumar, restar, multiplicar, dividir, leer_historial
from utils import ErrorCalculo
from usuarios import registrar_usuario, actualizar_saldo, aplicar_descuento_general

app = Flask(__name__)  

# Ruta de prueba para verificar que el servidor funciona  
@app.route('/health', methods=['GET'])  
def health_check():  
    return jsonify({"status": "ok", "message": "Servidor activo"}), 200

# Rutas para operaciones matemáticas
@app.route("/calcular", methods=["POST"])
def calcular():
    data = request.get_json()
    try:
        a = float(data.get("a"))
        b = float(data.get("b"))
        operacion = data.get("operacion")
        if operacion == "sumar":
            resultado = sumar(a, b)
        elif operacion == "restar":
            resultado = restar(a, b)
        elif operacion == "multiplicar":
            resultado = multiplicar(a, b)
        elif operacion == "dividir":
            resultado = dividir(a, b)
        else:
            return jsonify({"error": "Operación no válida"}), 400
        return jsonify({"resultado": resultado})
    except ErrorCalculo as e:
        return jsonify({"error": e.mensaje}), 400
    except Exception:
        return jsonify({"error": "Datos inválidos"}), 400

# Rutas para usuarios
@app.route("/usuarios/registro", methods=["POST"])
def registro_usuario():
    try:
        data = request.get_json()
        nombre = data.get("nombre")
        email = data.get("email")
        saldo = float(data.get("saldo"))

        nuevo = registrar_usuario(nombre, email, saldo)
        return jsonify({"id": nuevo["id"], "mensaje": "Usuario registrado"}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 422
    except Exception:
        return jsonify({"error": "Error al registrar usuario"}), 400

@app.route("/usuarios/saldo", methods=["PATCH"])
def saldo_usuario():
    try:
        data = request.get_json()
        actualizar_saldo(data["id"], float(data["saldo"]))
        return jsonify({"mensaje": "Saldo actualizado"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Ruta para aplicar descuento a todos los usuarios
@app.route("/usuarios/descuento", methods=["POST"])
def descuento():
    try:
        data = request.get_json()
        porcentaje = float(data.get("porcentaje", 0))
        aplicar_descuento_general(porcentaje)
        return jsonify({"mensaje": f"Descuento del {porcentaje}% aplicado a todos los usuarios"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
# Ruta para obtener el historial de operaciones
@app.route("/historial", methods=["GET"])
def obtener_historial():
    try:
        operacion = request.args.get("operacion")
        historial = leer_historial()

        if operacion:
            historial = [h for h in historial if h["operacion"] == operacion]
            
        historial_ordenado = sorted(historial, key=lambda x: x["timestamp"], reverse=True)
        return jsonify(historial_ordenado[:100])  # puedes devolver más si deseas
    except Exception:
        return jsonify({"error": "No se pudo obtener historial"}), 500

    
# Configuración de CORS
CORS(app)