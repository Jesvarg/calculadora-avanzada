import json, uuid, os, threading
from datetime import datetime
from utils import ErrorCalculo

_lock = threading.Lock()
HISTORIAL_PATH = "historial.json"

def guardar_en_historial(operacion, a, b, resultado):
    nuevo_registro = {
        "id": str(uuid.uuid4()),
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "operacion": operacion,
        "parametros": {"a": a, "b": b},
        "resultado": resultado
    }
    with _lock:
        try:
            with open(HISTORIAL_PATH, "r") as f:
                historial = json.load(f)
        except (FileNotFoundError, json.decoder.JSONDecodeError):
            historial = []
        historial.append(nuevo_registro)
        with open(HISTORIAL_PATH, "w") as f:
            json.dump(historial, f, indent=2)

def leer_historial():
    """Lee el historial de operaciones desde historial.json"""
    if not os.path.exists(HISTORIAL_PATH):
        return []

    with _lock:
        with open(HISTORIAL_PATH, "r", encoding="utf-8") as f:
            return json.load(f)


def sumar(a, b):
    """Suma de dos números"""
    resultado = a + b
    guardar_en_historial("sumar", a, b, resultado)
    return resultado

def restar(a, b):
    resultado = a - b
    guardar_en_historial("restar", a, b, resultado)
    return resultado

def multiplicar(a, b):
    resultado = a * b
    guardar_en_historial("multiplicar", a, b, resultado)
    return resultado

def dividir(a, b):
    if b == 0:
        raise ErrorCalculo("No se puede dividir entre cero")
    resultado = a / b
    guardar_en_historial("dividir", a, b, resultado)
    return resultado
