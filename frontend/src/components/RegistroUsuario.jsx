import React, { useState } from "react";
import api from "../services/api";

const RegistroUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [saldo, setSaldo] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const validarEmail = (email) => email.includes("@") && email.includes(".");

  const handleRegistrar = async () => {
    try {
      const res = await api.post("/usuarios/registro", {
        nombre,
        email,
        saldo: parseFloat(saldo),
      });
      setMensaje(res.data.mensaje);
      setError(null);
    } catch (err) {
      const msg = err.response?.data?.error || "Error de red";
      setError(msg);
      setMensaje(null);
    }
  };

  const esValido = nombre && validarEmail(email) && parseFloat(saldo) >= 0;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Registro de Usuario</h2>

      <div className="mb-2">
        <label className="block">Nombre</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="block">Email</label>
        <input
          type="email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!validarEmail(email) && email && (
          <p className="text-red-500 text-sm">Email inválido</p>
        )}
        
      </div>

      <div className="mb-4">
        <label className="block">Saldo inicial</label>
        <input
          type="number"
          min="0"
          className="border p-2 w-full"
          value={saldo}
          onChange={(e) => setSaldo(e.target.value)}
        />
        {parseFloat(saldo) < 0 && (
          <p className="text-red-500 text-sm">El saldo no puede ser negativo</p>
        )}
      </div>

      <button
        disabled={!esValido}
        onClick={handleRegistrar}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Registrar
      </button>

      {mensaje && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">{mensaje}</div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>
      )}
    </div>
  );
};

export default RegistroUsuario;
