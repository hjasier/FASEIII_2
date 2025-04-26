import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [userType, setUserType] = useState('normal'); // 'normal' or 'expert'
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    // Here you would integrate with your LLM model
    console.log('Searching for:', searchQuery);
    // Mock search - replace with actual implementation
    setTimeout(() => {
      setIsSearching(false);
      // Navigate to results page or show results
    }, 1500);
  };

  const handleBrowseTables = () => {
    navigate('/tables');
  };

  const handleProjects = () => {
    navigate('/projects');
  };

  const handleRealTime = () => {
    navigate('/sensor-chart');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* User Type Selector */}
      <div className="absolute top-4 left-4">
        <div className="flex items-center space-x-4 bg-white rounded-lg p-2 shadow-md">
          <span className="text-sm font-medium text-gray-700">Tipo de Usuario:</span>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded-md text-sm ${
                userType === 'normal' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => handleUserTypeChange('normal')}
            >
              Normal
            </button>
            <button
              className={`px-3 py-1 rounded-md text-sm ${
                userType === 'expert' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => handleUserTypeChange('expert')}
            >
              Experto
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center mt-24">
        <h1 className="text-4xl font-bold text-center mb-4">
          Bienvenido a GreenLake Data Explorer
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
          {userType === 'normal' 
            ? 'Explora los datos de la ciudad usando lenguaje natural'
            : 'Accede a las tablas de la base de datos y crea proyectos personalizados'}
        </p>

        {userType === 'normal' ? (
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSearch} className="flex flex-col items-center">
              <div className="w-full relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ejemplo: ¿Cuál es el hospital más usado de la ciudad?"
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-2 top-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {isSearching ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Escribe tu pregunta en lenguaje natural y nuestro sistema la analizará
              </p>
            </form>
            
            {/* Real-time button for normal users too */}
            <div className="mt-8 text-center">
              <button
                onClick={handleRealTime}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Datos en Tiempo Real
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-6 w-full max-w-2xl">
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={handleBrowseTables}
                className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex flex-col items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 11h16M11 4v16" />
                </svg>
                <span>Explorar Tablas</span>
              </button>
              
              <button
                onClick={handleProjects}
                className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex flex-col items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Mis Proyectos</span>
              </button>
              
              <button
                onClick={handleRealTime}
                className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors flex flex-col items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Datos en Tiempo Real</span>
              </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Acciones Rápidas para Expertos</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Buscar tablas específicas por nombre o categoría</li>
                <li>Crear un nuevo proyecto de análisis</li>
                <li>Generar gráficos personalizados</li>
                <li>Exportar datos</li>
                <li>Ver datos de sensores en tiempo real</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;