import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SensorChart from '../components/SensorChart';

const SensorDashboard = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch the list of cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5454/api/greenlake-eval/sensors/cities');
        // API returns cities as an array of arrays like [["City1"], ["City2"]]
        const cityNames = response.data.map(city => city[0]);
        setCities(cityNames);
        
        // Set the first city as default
        if (cityNames.length > 0) {
          setSelectedCity(cityNames[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch cities:', err);
        setLoading(false);
      }
    };
    
    fetchCities();
  }, []);

  // Handle city selection change
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
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
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Datos en tiempo real de sensores</h1>
        
        {/* Global city selection for all charts */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
          <div className="flex flex-wrap items-center gap-4">
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
        </div>

        {/* Charts for different sensor types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SensorChart 
            sensorType="air" 
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
            cities={cities}
          />
          <SensorChart 
            sensorType="ambient" 
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
            cities={cities}
          />
          <SensorChart 
            sensorType="traffic" 
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
            cities={cities}
          />
          <SensorChart 
            sensorType="water_quality" 
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
            cities={cities}
          />
          <SensorChart 
            sensorType="water_usage" 
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
            cities={cities}
          />
        </div>
      </div>
    </div>
  );
};

export default SensorDashboard;