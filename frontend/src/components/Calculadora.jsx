import React, { useState } from "react";
import api from "../services/api";

const Calculadora = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operacion, setOperacion] = useState("sumar");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const handleCalcular = async () => {
    try {
      const res = await api.post("/calcular", {
        a: parseFloat(a),
        b: parseFloat(b),
        operacion,
      });
      setResultado(res.data.resultado);
      document.dispatchEvent(new Event("historialActualizado"));
      setError(null);
    } catch (err) {
      const msg = err.response?.data?.error || "Error de conexión con el servidor.";
      setError(msg);
      setResultado(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Calculadora</h2>

      <div className="mb-2">
        <label className="block">Número a</label>
        <input
          type="number"
          className="border p-2 w-full"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="block">Número b</label>
        <input
          type="number"
          className="border p-2 w-full"
          value={b}
          onChange={(e) => setB(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block">Operación</label>
        <select
          className="border p-2 w-full"
          value={operacion}
          onChange={(e) => setOperacion(e.target.value)}
        >
          <option value="sumar">Sumar</option>
          <option value="restar">Restar</option>
          <option value="multiplicar">Multiplicar</option>
          <option value="dividir">Dividir</option>
        </select>
      </div>

      <button
        onClick={handleCalcular}
        disabled={!a || !b}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Calcular
      </button>

      {resultado !== null && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
          Resultado: {resultado}
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default Calculadora;
