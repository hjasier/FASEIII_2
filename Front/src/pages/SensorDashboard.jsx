import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SensorChart from '../components/SensorChart';
import { Link } from 'react-router-dom';

const SensorDashboard = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('air');
  const [viewMode, setViewMode] = useState('history'); // 'history' or 'current'

  // Define available sensor types and their display names
  const sensorTypes = [
    { id: 'air', name: 'Calidad del Aire' },
    { id: 'ambient', name: 'Condiciones Ambientales' },
    { id: 'water_quality', name: 'Calidad del Agua' },
    { id: 'water_usage', name: 'Consumo de Agua' },
    { id: 'traffic', name: 'Monitoreo de Tráfico' }
  ];

  // Add this function to fetch cities in your Dashboard component where cities are loaded
  const fetchCities = async () => {
    try {
      const response = await axios.get('http://10.10.76.241:5454/api/greenlake-eval/sensors/cities');
      console.log('Cities data:', response);
      
      // Extract the actual data from Axios response
      const responseData = response.data;
      
      let citiesList = [];
      
      if (Array.isArray(responseData)) {
        // Data is an array - this appears to be your case
        citiesList = responseData;
      } else if (responseData && Array.isArray(responseData.cities)) {
        citiesList = responseData.cities;
      } else if (responseData && Array.isArray(responseData.results)) {
        citiesList = responseData.results;
      } else {
        console.error('Unexpected cities data format:', responseData);
        citiesList = [];
      }
      
      // Parse city names - handle the array of arrays structure
      const cityNames = citiesList.map(city => {
        // Handle if city is a string
        if (typeof city === 'string') {
          return city;
        }
        // Handle if city is an array like ["Barcelona"] - this is your case
        else if (Array.isArray(city) && city.length > 0) {
          return city[0];
        }
        // Handle if city is an object with a name property
        else if (city && typeof city === 'object') {
          return city.name || city.city_name || city.city || Object.values(city)[0];
        }
        return 'Unknown';
      });
      
      setCities(cityNames);
      return cityNames; // Return the cityNames so we can use them immediately
    } catch (error) {
      console.error('Failed to fetch cities:', error);
      setCities([]);
      return [];
    }
  };

  // Fetch the list of cities
  useEffect(() => {
    const fetchInitialCities = async () => {
      try {
        setLoading(true);
        const cityNames = await fetchCities();
        
        // Use the cityNames directly, not the state variable
        if (cityNames.length > 0) {
          setSelectedCity(cityNames[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch cities:', err);
        // Fallback to default cities
        const defaults = ['Barcelona', 'Madrid', 'Valencia'];
        setCities(defaults);
        setSelectedCity(defaults[0]);
        setLoading(false);
      }
    };
    
    fetchInitialCities();
  }, []); // Empty dependency array means this runs once on mount

  // Handle city selection change
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // Toggle between history and current view
  const toggleViewMode = () => {
    setViewMode(viewMode === 'history' ? 'current' : 'history');
  };

  if (loading && cities.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-white to-green-50">
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-[#36C78D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-700 text-xl">Cargando datos de la ciudad...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Header with logo and navigation - similar to Home page */}
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
          
          {/* Back to Home Button */}
          <Link to="/" className="inline-flex items-center text-[#36C78D] hover:text-[#2da677] font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Datos en tiempo real de sensores</h1>
        
        {/* Global city selection for all charts */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-gray-800">Selecciona una ciudad:</h2>
              <select 
                value={selectedCity} 
                onChange={handleCityChange}
                className="px-4 py-2 border border-gray-300 bg-white rounded-md text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            {/* View mode toggle buttons */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleViewMode}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'history' 
                    ? 'bg-[#36C78D] text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Histórico
              </button>
              <button 
                onClick={toggleViewMode}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'current' 
                    ? 'bg-[#36C78D] text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Valores Actuales
              </button>
            </div>
          </div>
        </div>

        {/* Tabs for different sensor types */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap">
              {sensorTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`py-4 px-6 text-center font-medium text-sm sm:text-base border-b-2 transition-colors focus:outline-none ${
                    activeTab === type.id
                      ? 'border-[#36C78D] text-[#36C78D]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content for the active tab */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <SensorChart 
            sensorType={activeTab} 
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
            cities={cities}
            viewMode={viewMode}
            onViewModeChange={toggleViewMode}
          />
        </div>
      </div>
    </div>
  );
};

export default SensorDashboard;