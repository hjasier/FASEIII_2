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

  const handleRealTimeData = () => {
    navigate('/realtime');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Header with logo and navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#36C78D] rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">GreenLake <span className="text-[#36C78D]">Data</span></h1>
          </div>
          
          {/* User Type Selector */}
          <div className="flex items-center space-x-4 bg-white rounded-lg p-2 border border-gray-100">
            <span className="text-sm font-medium text-gray-700">Tipo de Usuario:</span>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 rounded-md text-sm transition-all ${
                  userType === 'normal' 
                    ? 'bg-[#36C78D] text-white shadow-md' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => handleUserTypeChange('normal')}
              >
                Normal
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm transition-all ${
                  userType === 'expert' 
                    ? 'bg-[#36C78D] text-white shadow-md' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => handleUserTypeChange('expert')}
              >
                Experto
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
            Explorando los datos de <span className="text-[#36C78D]">GreenLake</span>, la ciudad sostenible
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            GreenLake Data Explorer te permite acceder, analizar y visualizar los datos de nuestra ciudad sostenible. Descubre información valiosa sobre servicios públicos, medio ambiente y más para tomar decisiones informadas.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleRealTimeData}
              className="flex items-center gap-2 bg-[#36C78D] hover:bg-[#2da677] transition-all text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
              Datos en tiempo real
            </button>
            {userType === 'expert' && (
              <button 
                onClick={handleProjects}
                className="flex items-center gap-2 bg-white border border-[#36C78D] text-[#36C78D] hover:bg-[#f0fbf7] transition-all font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                Mis Proyectos
              </button>
            )}
          </div>
        </div>
        
        <div className="md:w-1/2">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-[#36C78D] p-4 text-white">
              <h3 className="text-xl font-bold">
                {userType === 'normal' ? 'Consulta Inteligente' : 'Herramientas de Análisis'}
              </h3>
            </div>
            
            {userType === 'normal' ? (
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Escribe tu pregunta en lenguaje natural y nuestro sistema basado en IA te ayudará a descubrir la información que necesitas.
                </p>
                <form onSubmit={handleSearch} className="flex flex-col">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ejemplo: ¿Cuál es el hospital más usado de la ciudad?"
                      className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="absolute right-2 top-2 bg-[#36C78D] text-white px-4 py-2 rounded-md hover:bg-[#2da677] transition-colors"
                    >
                      {isSearching ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Buscando
                        </div>
                      ) : 'Buscar'}
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <p className="text-sm text-gray-500 w-full mb-2">Sugerencias populares:</p>
                    <button type="button" onClick={() => setSearchQuery("¿Cuántas zonas verdes hay en GreenLake?")} className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-full">
                      ¿Cuántas zonas verdes hay?
                    </button>
                    <button type="button" onClick={() => setSearchQuery("¿Cuál es la calidad del aire hoy?")} className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-full">
                      ¿Calidad del aire hoy?
                    </button>
                    <button type="button" onClick={() => setSearchQuery("¿Cuánta energía renovable se ha generado este mes?")} className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs py-1 px-2 rounded-full">
                      ¿Energía renovable generada?
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Como usuario experto, tienes acceso a herramientas avanzadas para explorar y analizar los datos de GreenLake.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleBrowseTables}
                    className="bg-white border border-gray-200 hover:border-[#36C78D] hover:shadow-md transition-all text-gray-800 p-4 rounded-lg flex flex-col items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 text-[#36C78D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 11h16M11 4v16" />
                    </svg>
                    <span className="font-medium">Explorar Tablas</span>
                    <span className="text-xs text-gray-500 mt-1">Accede a los datos brutos</span>
                  </button>
                  
                  <button
                    onClick={handleProjects}
                    className="bg-white border border-gray-200 hover:border-[#36C78D] hover:shadow-md transition-all text-gray-800 p-4 rounded-lg flex flex-col items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 text-[#36C78D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium">Mis Proyectos</span>
                    <span className="text-xs text-gray-500 mt-1">Gestiona tus análisis</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explora los datos de la ciudad <span className="text-[#36C78D]">sostenible</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#36C78D] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#36C78D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Datos en Tiempo Real</h3>
              <p className="text-gray-600 mb-4">
                Accede a información actualizada sobre consumo energético, calidad del aire, transporte público y mucho más.
              </p>
              <button 
                onClick={handleRealTimeData}
                className="text-[#36C78D] font-medium hover:underline flex items-center"
              >
                Ver ahora
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#36C78D] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#36C78D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Visualizaciones Personalizadas</h3>
              <p className="text-gray-600 mb-4">
                Crea gráficos y dashboards personalizados para analizar los datos que más te interesen de la ciudad.
              </p>
              <button 
                onClick={handleProjects}
                className="text-[#36C78D] font-medium hover:underline flex items-center"
              >
                Crear visualizaciones
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#36C78D] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#36C78D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Consultas en Lenguaje Natural</h3>
              <p className="text-gray-600 mb-4">
                Realiza preguntas en tu propio lenguaje y obtén respuestas precisas basadas en los datos de la ciudad.
              </p>
              <button 
                onClick={() => handleUserTypeChange('normal')}
                className="text-[#36C78D] font-medium hover:underline flex items-center"
              >
                Probar ahora
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Values */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-md">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Valores de <span className="text-[#36C78D]">GreenLake</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex">
                <div className="mr-4">
                  <div className="w-10 h-10 bg-[#36C78D] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Sostenibilidad</h3>
                  <p className="text-gray-600">
                    Comprometidos con un futuro verde donde el desarrollo urbano convive en armonía con el medio ambiente.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="w-10 h-10 bg-[#36C78D] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Transparencia</h3>
                  <p className="text-gray-600">
                    Ofrecemos datos abiertos y accesibles para fomentar la participación ciudadana y la toma de decisiones informadas.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="w-10 h-10 bg-[#36C78D] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Innovación</h3>
                  <p className="text-gray-600">
                    Apostamos por las tecnologías más avanzadas para crear una ciudad inteligente que mejore la calidad de vida.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="w-10 h-10 bg-[#36C78D] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Comunidad</h3>
                  <p className="text-gray-600">
                    Construimos una comunidad donde todos los ciudadanos pueden colaborar y participar en el desarrollo sostenible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#36C78D] rounded-full flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xl font-bold">GreenLake Data</span>
              </div>
              <p className="text-gray-400 mt-2 text-sm">
                Datos abiertos para una ciudad más sostenible
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#36C78D] transition-colors">
                Acerca de
              </a>
              <a href="#" className="text-gray-400 hover:text-[#36C78D] transition-colors">
                Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-[#36C78D] transition-colors">
                Términos
              </a>
              <a href="#" className="text-gray-400 hover:text-[#36C78D] transition-colors">
                Contacto
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 GreenLake Data Explorer. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;