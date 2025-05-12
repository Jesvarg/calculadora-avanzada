import React from "react";
import Calculadora from "./components/Calculadora";
import Historial from "./components/Historial";
import RegistroUsuario from "./components/RegistroUsuario";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Calculadora Avanzada</h1>
        <p className="text-gray-600">Con historial y gestión de usuarios</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Componente de cálculo */}
        <div className="col-span-1">
          <Calculadora />
        </div>

        {/* Componente de historial */}
        <div className="col-span-1">
          <Historial />
        </div>

        {/* Componente de registro de usuarios */}
        <div className="col-span-1">
          <RegistroUsuario />
        </div>
      </main>
    </div>
  );
}

export default App;
