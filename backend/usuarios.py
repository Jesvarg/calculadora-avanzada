import json, uuid, threading

USUARIOS_PATH = "usuarios.json"
_lock = threading.Lock()

def leer_usuarios():
    try:
        with open(USUARIOS_PATH, "r") as archivo:
            return json.load(archivo)
    except (FileNotFoundError, json.decoder.JSONDecodeError):
        return []

def guardar_usuarios(usuarios):
    with _lock:
        with open(USUARIOS_PATH, "w") as f:
            json.dump(usuarios, f, indent=2)

def validar_email(email):
    # Validación sencilla
    return "@" in email and "." in email.split("@")[-1]

def registrar_usuario(nombre, email, saldo):
    if not validar_email(email):
        raise ValueError("Formato de email incorrecto")
    
    usuarios = leer_usuarios()
    if any(u["email"] == email for u in usuarios):
        raise ValueError("El email ya está registrado")

    nuevo_usuario = {
        "id": str(uuid.uuid4()),
        "nombre": nombre,
        "email": email,
        "saldo": saldo
    }
    usuarios.append(nuevo_usuario)
    guardar_usuarios(usuarios)
    return nuevo_usuario

def actualizar_saldo(usuario_id, nuevo_saldo):
    usuarios = leer_usuarios()
    actualizados = []
    encontrado = False
    for u in usuarios:
        if u["id"] == usuario_id:
            u["saldo"] = nuevo_saldo
            encontrado = True
        actualizados.append(u)
    if not encontrado:
        raise ValueError("Usuario no encontrado")
    guardar_usuarios(actualizados)

def aplicar_descuento_general(porcentaje):
    usuarios = leer_usuarios()
    for u in usuarios:
        u["saldo"] = round(u["saldo"] * (1 - porcentaje / 100), 2)
    guardar_usuarios(usuarios)
