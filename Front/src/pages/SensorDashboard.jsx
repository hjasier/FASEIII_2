import React from 'react';
import SensorChart from '../components/SensorChart';

function SensorDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Sensores en Tiempo Real</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <SensorChart />
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Información de Sensores</h2>
        <p className="mb-4">
          Este panel muestra datos en tiempo real de los sensores de la ciudad. 
          Los datos se actualizan automáticamente cada 5 segundos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-bold text-blue-700">Temperatura</h3>
            <p className="text-gray-700">Mediciones de temperatura en grados Celsius</p>
          </div>
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="font-bold text-green-700">Humedad</h3>
            <p className="text-gray-700">Porcentaje de humedad en el aire</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-md">
            <h3 className="font-bold text-purple-700">Otros Sensores</h3>
            <p className="text-gray-700">Datos adicionales según disponibilidad</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SensorDashboard;