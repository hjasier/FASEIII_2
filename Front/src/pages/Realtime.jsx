import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

function Realtime() {
  const [sensorData, setSensorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('temperature');
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [lastUpdated, setLastUpdated] = useState(null);
  
  const navigate = useNavigate();
  const wsRef = useRef(null);
  
  // Metrics that could come from the sensor data
  const availableMetrics = [
    { id: 'temperature', name: 'Temperatura', unit: '°C', color: '#FF5733' },
    { id: 'humidity', name: 'Humedad', unit: '%', color: '#3498DB' },
    { id: 'co2', name: 'CO2', unit: 'ppm', color: '#2ECC71' },
    { id: 'pm25', name: 'PM2.5', unit: 'μg/m³', color: '#9B59B6' }
  ];
  
  // Connect to WebSocket or poll data depending on implementation
  useEffect(() => {
    let intervalId = null;
    
    const connectWebSocket = () => {
      try {
        // Try WebSocket first if supported by backend
        const ws = new WebSocket('ws://localhost:5000/api/sensor-stream');
        wsRef.current = ws;
        
        ws.onopen = () => {
          console.log('WebSocket connected');
          setConnectionStatus('connected');
        };
        
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setSensorData(prevData => {
              // Add new data at the beginning and keep only the last 100 entries
              const newData = [data, ...prevData.slice(0, 99)];
              return newData;
            });
            setLastUpdated(new Date());
            setIsLoading(false);
          } catch (err) {
            console.error('Error parsing WebSocket data:', err);
          }
        };
        
        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setConnectionStatus('error');
          // Fall back to polling if WebSocket fails
          startPolling();
        };
        
        ws.onclose = () => {
          console.log('WebSocket disconnected');
          setConnectionStatus('disconnected');
          // Try to reconnect after a delay
          setTimeout(connectWebSocket, 5000);
        };
        
        return () => {
          if (ws) {
            ws.close();
          }
        };
      } catch (err) {
        console.error('Failed to create WebSocket:', err);
        startPolling();
      }
    };
    
    const startPolling = () => {
      if (intervalId) return; // Don't start polling if already polling
      
      console.log('Falling back to HTTP polling');
      setConnectionStatus('polling');
      
      // Initial fetch
      fetchData();
      
      // Then poll every 2 seconds
      intervalId = setInterval(fetchData, 2000);
    };
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/kafka/sensor-data');
        setSensorData(response.data || []);
        setLastUpdated(new Date());
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching sensor data:', err);
        setError('Error al cargar los datos. Intente nuevamente.');
        setConnectionStatus('error');
      }
    };
    
    // Try WebSocket first, then fall back to polling if needed
    connectWebSocket();
    
    // Clean up
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);
  
  const handleBack = () => {
    navigate('/');
  };
  
  // Process data for selected metric
  const getChartData = () => {
    if (!sensorData || sensorData.length === 0) return [];
    
    // Return last 50 points for the chart in correct time order (oldest to newest)
    return sensorData
      .slice(0, 50)
      .map(item => ({
        ...item,
        timestamp: new Date(item.timestamp || Date.now()).toLocaleTimeString()
      }))
      .reverse();
  };
  
  // Get current value for the selected metric
  const getCurrentValue = () => {
    if (!sensorData || sensorData.length === 0) {
      return { value: '—', unit: '' };
    }
    
    const metric = availableMetrics.find(m => m.id === selectedMetric);
    const value = sensorData[0][selectedMetric];
    
    return {
      value: value !== undefined ? Number(value).toFixed(1) : '—',
      unit: metric ? metric.unit : ''
    };
  };
  
  const connectionStatusClasses = {
    connecting: 'bg-yellow-100 text-yellow-800',
    connected: 'bg-green-100 text-green-800',
    polling: 'bg-blue-100 text-blue-800',
    error: 'bg-red-100 text-red-800',
    disconnected: 'bg-gray-100 text-gray-800'
  };
  
  const connectionStatusText = {
    connecting: 'Conectando...',
    connected: 'Conectado (WebSocket)',
    polling: 'Conectado (HTTP Polling)',
    error: 'Error de conexión',
    disconnected: 'Desconectado'
  };
  
  // Get the current metric info
  const selectedMetricInfo = availableMetrics.find(m => m.id === selectedMetric) || availableMetrics[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={handleBack}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="w-10 h-10 bg-[#36C78D] rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Datos en <span className="text-[#36C78D]">Tiempo Real</span></h1>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${connectionStatusClasses[connectionStatus]}`}>
            {connectionStatusText[connectionStatus]}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin h-12 w-12 border-4 border-[#36C78D] border-t-transparent rounded-full mb-4"></div>
            <p className="text-gray-600">Conectando con sensores en tiempo real...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
              {error}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#36C78D] hover:bg-[#2da677] text-white px-4 py-2 rounded"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Metrics selection sidebar */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">Métricas Disponibles</h2>
              
              <div className="space-y-3">
                {availableMetrics.map((metric) => (
                  <div 
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedMetric === metric.id 
                        ? 'bg-[#36C78D] bg-opacity-10 border border-[#36C78D]' 
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: metric.color }}
                        ></div>
                        <span className="font-medium">{metric.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{metric.unit}</span>
                    </div>
                    
                    {selectedMetric === metric.id && sensorData.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <div className="text-2xl font-bold">
                          {sensorData[0][metric.id] !== undefined 
                            ? Number(sensorData[0][metric.id]).toFixed(1) 
                            : '—'} 
                          <span className="text-sm font-normal">{metric.unit}</span>
                        </div>
                        {sensorData.length > 1 && (
                          <div className="text-xs">
                            {Number(sensorData[0][metric.id]) > Number(sensorData[1][metric.id]) ? (
                              <span className="text-green-600">↑ Subiendo</span>
                            ) : Number(sensorData[0][metric.id]) < Number(sensorData[1][metric.id]) ? (
                              <span className="text-red-600">↓ Bajando</span>
                            ) : (
                              <span className="text-gray-600">→ Estable</span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Información</h3>
                <div className="text-xs text-gray-600 space-y-2">
                  <p>
                    Estos datos son recogidos en tiempo real por sensores distribuidos por la ciudad de GreenLake.
                  </p>
                  <p>
                    La última actualización fue a las{' '}
                    <span className="font-medium">
                      {lastUpdated ? lastUpdated.toLocaleTimeString() : 'cargando...'}
                    </span>
                  </p>
                  <p>
                    Consulta más información sobre la calidad del aire en la sección de Análisis Ambiental.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Main chart area */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">
                    {selectedMetricInfo.name} <span className="text-gray-500 font-normal">({selectedMetricInfo.unit})</span>
                  </h2>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-3xl font-bold" style={{ color: selectedMetricInfo.color }}>
                      {getCurrentValue().value}
                    </div>
                    <div className="text-sm text-gray-500">{getCurrentValue().unit}</div>
                  </div>
                </div>
                
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getChartData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis 
                        dataKey="timestamp" 
                        tick={{fontSize: 10}}
                        interval="preserveStartEnd"
                        minTickGap={15}
                      />
                      <YAxis 
                        domain={['auto', 'auto']} 
                        tick={{fontSize: 10}}
                        width={40}
                        tickFormatter={(value) => value.toFixed(0)}
                      />
                      <Tooltip 
                        contentStyle={{borderRadius: '5px', fontSize: '12px'}}
                        formatter={(value) => [Number(value).toFixed(1) + ` ${selectedMetricInfo.unit}`, selectedMetricInfo.name]}
                        labelFormatter={(label) => `Tiempo: ${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey={selectedMetric} 
                        stroke={selectedMetricInfo.color}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                        animationDuration={300}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Stats and additional info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold mb-4">Estadísticas</h3>
                  
                  <div className="space-y-3">
                    {sensorData.length > 0 ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Máximo (1h)</span>
                          <span className="font-semibold">{
                            Math.max(...getChartData().map(d => Number(d[selectedMetric]) || 0)).toFixed(1)
                          } {selectedMetricInfo.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mínimo (1h)</span>
                          <span className="font-semibold">{
                            Math.min(...getChartData().map(d => Number(d[selectedMetric]) || Infinity)).toFixed(1)
                          } {selectedMetricInfo.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Promedio (1h)</span>
                          <span className="font-semibold">{
                            (getChartData().reduce((acc, curr) => acc + (Number(curr[selectedMetric]) || 0), 0) / 
                            (getChartData().length || 1)).toFixed(1)
                          } {selectedMetricInfo.unit}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-100 pt-2 mt-3">
                          <span className="text-gray-600">Datos recibidos</span>
                          <span className="font-semibold">{sensorData.length}</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-600">No hay suficientes datos para mostrar estadísticas.</p>
                    )}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold mb-4">Interpretación</h3>
                  
                  {selectedMetric === 'temperature' && (
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">La temperatura actual es <span className="font-medium">{getCurrentValue().value}°C</span>.</p>
                      {getCurrentValue().value > 28 ? (
                        <p className="mb-2 text-red-600">Temperatura elevada. Se recomienda hidratarse con frecuencia.</p>
                      ) : getCurrentValue().value < 10 ? (
                        <p className="mb-2 text-blue-600">Temperatura baja. Se recomienda abrigarse adecuadamente.</p>
                      ) : (
                        <p className="mb-2 text-green-600">Temperatura confortable.</p>
                      )}
                    </div>
                  )}
                  
                  {selectedMetric === 'humidity' && (
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">La humedad actual es <span className="font-medium">{getCurrentValue().value}%</span>.</p>
                      {getCurrentValue().value > 70 ? (
                        <p className="mb-2 text-blue-600">Humedad elevada. Puede resultar incómodo en días calurosos.</p>
                      ) : getCurrentValue().value < 30 ? (
                        <p className="mb-2 text-yellow-600">Humedad baja. Puede causar sequedad en piel y mucosas.</p>
                      ) : (
                        <p className="mb-2 text-green-600">Nivel de humedad confortable.</p>
                      )}
                    </div>
                  )}
                  
                  {selectedMetric === 'co2' && (
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">El nivel de CO2 actual es <span className="font-medium">{getCurrentValue().value} ppm</span>.</p>
                      {getCurrentValue().value > 1000 ? (
                        <p className="mb-2 text-red-600">Nivel elevado. Se recomienda ventilar el área.</p>
                      ) : getCurrentValue().value > 800 ? (
                        <p className="mb-2 text-yellow-600">Nivel moderado. Se recomienda monitorear.</p>
                      ) : (
                        <p className="mb-2 text-green-600">Nivel de CO2 adecuado.</p>
                      )}
                    </div>
                  )}
                  
                  {selectedMetric === 'pm25' && (
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">El nivel de PM2.5 actual es <span className="font-medium">{getCurrentValue().value} μg/m³</span>.</p>
                      {getCurrentValue().value > 25 ? (
                        <p className="mb-2 text-red-600">Nivel poco saludable. Se recomienda evitar actividades al aire libre.</p>
                      ) : getCurrentValue().value > 12 ? (
                        <p className="mb-2 text-yellow-600">Nivel moderado. Precaución para grupos sensibles.</p>
                      ) : (
                        <p className="mb-2 text-green-600">Buena calidad del aire.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer with informational text */}
      <footer className="bg-white border-t border-gray-200 mt-8 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            Los datos mostrados son recogidos por la red de sensores IoT de GreenLake.
            La actualización se realiza en tiempo real.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Realtime;