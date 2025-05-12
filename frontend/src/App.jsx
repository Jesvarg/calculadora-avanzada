import React from "react";
import Calculadora from "./components/Calculadora";
import Historial from "./components/Historial";
import RegistroUsuario from "./components/RegistroUsuario";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Calculadora con Historial</h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <Calculadora />
        </div>
        <div className="col-span-1">
          <Historial />
        </div>
        <div className="col-span-1">
          <RegistroUsuario />
        </div>
      </main>
    </div>
  );
}

export default App;
