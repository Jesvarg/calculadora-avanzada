import React, { useEffect, useState } from "react";
import api from "../services/api";

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const [operacionFiltro, setOperacionFiltro] = useState("");
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 10;

  const cargarHistorial = React.useCallback(async () => {
    try {
      const url = operacionFiltro
        ? `/historial?operacion=${operacionFiltro}`
        : "/historial";
      const res = await api.get(url);
      setHistorial(res.data);
      setError(null);
      setPaginaActual(1); // reinicia a la página 1 al filtrar
    } catch {
      setError("Error al cargar historial.");
      setHistorial([]);
    }
  }, [operacionFiltro]);

  useEffect(() => {
    cargarHistorial();
  }, [cargarHistorial]);

  const historialPaginado = historial.slice(
    (paginaActual - 1) * porPagina,
    paginaActual * porPagina
  );

  const totalPaginas = Math.ceil(historial.length / porPagina);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Historial de Operaciones</h2>

      <div className="flex items-center mb-3">
        <label className="mr-2">Filtrar por operación:</label>
        <select
          value={operacionFiltro}
          onChange={(e) => setOperacionFiltro(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Todas</option>
          <option value="sumar">Sumar</option>
          <option value="restar">Restar</option>
          <option value="multiplicar">Multiplicar</option>
          <option value="dividir">Dividir</option>
        </select>

        <button
          onClick={cargarHistorial}
          className="ml-auto bg-blue-600 text-white px-3 py-1 rounded"
        >
          Recargar
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 py-1">Fecha</th>
              <th className="border px-2 py-1">Operación</th>
              <th className="border px-2 py-1">Parámetros</th>
              <th className="border px-2 py-1">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {historialPaginado.map((item) => (
              <tr key={item.id}>
                <td className="border px-2 py-1">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
                <td className="border px-2 py-1">{item.operacion}</td>
                <td className="border px-2 py-1">
                  a: {item.parametros.a}, b: {item.parametros.b}
                </td>
                <td className="border px-2 py-1">{item.resultado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              onClick={() => setPaginaActual(i + 1)}
              className={`px-3 py-1 border rounded ${
                paginaActual === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Historial;
