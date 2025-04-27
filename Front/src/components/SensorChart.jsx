import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import PropTypes from 'prop-types';

// Color palette for different metrics (using Home.jsx color scheme)
const colors = [
  '#36C78D', '#2da677', '#0088fe', '#ff7300', '#00c49f', '#ffbb28', 
  '#ff8042', '#a4de6c', '#d0ed57', '#83a6ed'
];

// Spanish translations for metric names
const metricNamesSpanish = {
  // Air metrics
  'co': 'Monóxido de Carbono',
  'o3': 'Ozono',
  'co2': 'Dióxido de Carbono',
  'no2': 'Dióxido de Nitrógeno',
  'so2': 'Dióxido de Azufre',
  'pm10': 'Partículas PM10',
  
  // Ambient metrics
  'humidity': 'Humedad',
  'temperature': 'Temperatura',
  'solar_radiation': 'Radiación Solar',
  
  // Traffic metrics
  'avg_speed': 'Velocidad Promedio',
  'flow_rate': 'Flujo de Tráfico',
  'occupancy': 'Ocupación',
  'vehicle_density': 'Densidad de Vehículos',
  'congestion_index': 'Índice de Congestión',
  
  // Water quality metrics
  'ph_level': 'Nivel de pH',
  'turbidity': 'Turbidez',
  'conductivity': 'Conductividad',
  'dissolved_oxygen': 'Oxígeno Disuelto',
  'water_temperature': 'Temperatura del Agua',
  
  // Water usage metrics
  'usage_liters': 'Consumo en Litros',
  'total_daily_usage': 'Consumo Diario Total'
};

// Function to get Spanish metric name or fallback to formatted original
const getMetricDisplayName = (metric) => {
  return metricNamesSpanish[metric] || metric.replace(/_/g, ' ');
};

// Define thresholds for each metric to determine color scale
const thresholds = {
  // Air quality metrics (lower is better)
  air: {
    pm10: { good: 50, moderate: 100, poor: 200, units: 'µg/m³' },
    co: { good: 4, moderate: 9, poor: 15, units: 'ppm' },
    co2: { good: 400, moderate: 1000, poor: 2000, units: 'ppm' },
    no2: { good: 40, moderate: 70, poor: 150, units: 'ppb' },
    o3: { good: 50, moderate: 100, poor: 200, units: 'ppb' },
    so2: { good: 20, moderate: 80, poor: 250, units: 'ppb' }
  },
  // Ambient conditions (ranges are better)
  ambient: {
    humidity: { good: [40, 60], moderate: [30, 70], poor: [0, 100], units: '%', type: 'range' },
    temperature: { good: [18, 25], moderate: [10, 30], poor: [-10, 40], units: '°C', type: 'range' },
    solar_radiation: { good: [100, 500], moderate: [50, 800], poor: [0, 1200], units: 'W/m²', type: 'range' }
  },
  // Traffic metrics (lower is better for most)
  traffic: {
    avg_speed: { good: 50, moderate: 30, poor: 10, units: 'km/h', type: 'higher' },
    flow_rate: { good: 1000, moderate: 1500, poor: 2500, units: 'veh/h' },
    occupancy: { good: 20, moderate: 50, poor: 80, units: '%' },
    vehicle_density: { good: 20, moderate: 50, poor: 100, units: 'veh/km' },
    congestion_index: { good: 0.2, moderate: 0.5, poor: 0.8, units: 'index' }
  },
  // Water quality (ranges for most)
  water_quality: {
    ph_level: { good: [6.5, 8.5], moderate: [6, 9], poor: [0, 14], units: 'pH', type: 'range' },
    turbidity: { good: 1, moderate: 5, poor: 10, units: 'NTU' },
    conductivity: { good: [200, 800], moderate: [100, 1500], poor: [0, 3000], units: 'µS/cm', type: 'range' },
    dissolved_oxygen: { good: 8, moderate: 5, poor: 2, units: 'mg/L', type: 'higher' },
    water_temperature: { good: [10, 20], moderate: [5, 25], poor: [0, 30], units: '°C', type: 'range' }
  },
  // Water usage (lower is better)
  water_usage: {
    usage_liters: { good: 100, moderate: 300, poor: 600, units: 'L' }
  }
};

// Function to determine color based on value and thresholds
const getMetricColor = (metric, value, sensorType) => {
  if (!thresholds[sensorType] || !thresholds[sensorType][metric]) {
    return '#36C78D'; // Default green if no thresholds defined
  }
  
  const metricThreshold = thresholds[sensorType][metric];
  
  // Range type metrics (like humidity where a range is optimal)
  if (metricThreshold.type === 'range') {
    if (value >= metricThreshold.good[0] && value <= metricThreshold.good[1]) {
      return '#36C78D'; // Good - green
    } else if (value >= metricThreshold.moderate[0] && value <= metricThreshold.moderate[1]) {
      return '#FFA500'; // Moderate - orange
    } else {
      return '#FF4D4D'; // Poor - red
    }
  }
  // Higher is better metrics
  else if (metricThreshold.type === 'higher') {
    if (value >= metricThreshold.good) {
      return '#36C78D'; // Good - green
    } else if (value >= metricThreshold.moderate) {
      return '#FFA500'; // Moderate - orange
    } else {
      return '#FF4D4D'; // Poor - red
    }
  }
  // Default: lower is better metrics
  else {
    if (value <= metricThreshold.good) {
      return '#36C78D'; // Good - green
    } else if (value <= metricThreshold.moderate) {
      return '#FFA500'; // Moderate - orange
    } else {
      return '#FF4D4D'; // Poor - red
    }
  }
};

// Component to display single metric chart with synchronized tooltips
const MetricChart = ({ metric, data, color, sensorType, activeTimestamp, onMouseMove, onMouseLeave }) => {
  const metricThreshold = thresholds[sensorType]?.[metric];
  const units = metricThreshold?.units || '';
  const formattedMetricName = getMetricDisplayName(metric);
  
  // Find the active data point (kept for internal usage even though we don't display it)
  const activePoint = activeTimestamp ? 
    data.find(d => d.timestamp === activeTimestamp) : null;
    
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-medium text-gray-700 mb-2 capitalize">{formattedMetricName} <span className="text-gray-500 text-sm">({units})</span></h3>
      <div className="h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            onMouseMove={(e) => {
              if (e && e.activeLabel) {
                // Pass the active timestamp to parent component
                onMouseMove(e.activeLabel);
              }
            }}
            onMouseLeave={() => onMouseLeave()}
            syncId="sensorChartSyncId" // Add syncId to synchronize all charts
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="timestamp" 
              tick={{ fill: '#4B5563', fontSize: 10 }} 
              tickFormatter={(value) => {
                // Show shorter time format (HH:MM)
                const parts = value.split(':');
                return parts.length >= 2 ? `${parts[0]}:${parts[1]}` : value;
              }}
            />
            <YAxis tick={{ fill: '#4B5563', fontSize: 10 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.25rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                border: '1px solid #E5E7EB',
                fontSize: '0.75rem'
              }}
              formatter={(value) => [`${value} ${units}`, formattedMetricName]}
              labelFormatter={(label) => `Tiempo: ${label}`}
              isAnimationActive={false}
            />
            <Line 
              type="monotone" 
              dataKey={metric} 
              stroke={color} 
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 5 }} 
              isAnimationActive={false} 
            />
            {/* Improved vertical line that follows mouse position across all charts */}
            {activeTimestamp && (
              <ReferenceLine 
                x={activeTimestamp} 
                stroke="#6366F1" 
                strokeWidth={2}
                strokeDasharray="3 3" 
                isFront={true}
                label={{
                  position: 'top',
                  value: '',
                  fill: '#6366F1',
                  fontSize: 10
                }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Component to display current values
const CurrentValueView = ({ metrics, sensorType, latestData }) => {
  if (!latestData || Object.keys(latestData).length === 0) {
    return (
      <div className="flex justify-center items-center h-64 border border-gray-200 rounded-lg bg-gray-50">
        <p className="text-gray-500">No hay datos actuales disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
      {metrics.map(metric => {
        const value = latestData[metric];
        if (value === undefined) return null;
        
        const color = getMetricColor(metric, value, sensorType);
        const metricThreshold = thresholds[sensorType]?.[metric];
        const units = metricThreshold?.units || '';
        
        return (
          <div 
            key={metric} 
            className="p-6 rounded-lg shadow-md border flex flex-col items-center justify-center"
            style={{ borderColor: color }}
          >
            <h3 className="text-lg font-medium text-gray-700 mb-2 capitalize">{getMetricDisplayName(metric)}</h3>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold" style={{ color }}>{value.toFixed(1)}</span>
              <span className="ml-2 text-gray-500 text-lg">{units}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SensorChart = ({ sensorId, sensorType, selectedCity, onCityChange, cities, viewMode, onViewModeChange }) => {
  const [sensorData, setSensorData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartTitle, setChartTitle] = useState('Sensor Data');
  // Use view mode from props if provided, otherwise use local state
  const [localViewMode, setLocalViewMode] = useState('history');
  const activeViewMode = viewMode !== undefined ? viewMode : localViewMode;
  // Add a ref to track the existing data points by ID
  const processedDataPoints = useRef(new Set());
  // Max number of points to display
  const MAX_DISPLAY_POINTS = 50;
  // City selection state - use internal state if props are not provided
  const [localCities, setLocalCities] = useState([]);
  const [localSelectedCity, setLocalSelectedCity] = useState('');
  // State for synchronized tooltips
  const [activeTimestamp, setActiveTimestamp] = useState(null);

  // Map sensor types to human-readable titles
  const sensorTitles = {
    'air': 'Calidad del Aire',
    'ambient': 'Condiciones Ambientales',
    'traffic': 'Monitoreo de Tráfico',
    'water_quality': 'Calidad del Agua',
    'water_usage': 'Consumo de Agua'
  };

  // Determine if we're using local state or props for city selection
  const usingLocalCityState = !onCityChange || selectedCity === undefined;
  const activeCities = usingLocalCityState ? localCities : cities;
  const activeSelectedCity = usingLocalCityState ? localSelectedCity : selectedCity;

  // Get the latest data point for each metric
  const getLatestValues = () => {
    if (formattedData.length === 0) return {};
    
    // Get the most recent data point
    const latestDataPoint = [...formattedData].sort((a, b) => 
      new Date(b.event_time) - new Date(a.event_time)
    )[0];
    
    // Extract only the metric values
    const latestValues = {};
    metrics.forEach(metric => {
      if (latestDataPoint[metric] !== undefined) {
        latestValues[metric] = latestDataPoint[metric];
      }
    });
    
    return latestValues;
  };

  // Handle mouse move on any chart
  const handleChartMouseMove = (timestamp) => {
    setActiveTimestamp(timestamp);
  };

  // Handle mouse leave on any chart
  const handleChartMouseLeave = () => {
    setActiveTimestamp(null);
  };

  useEffect(() => {
    // Set chart title based on sensor type
    if (sensorType && sensorTitles[sensorType]) {
      setChartTitle(`${sensorTitles[sensorType]}${activeSelectedCity ? ` - ${activeSelectedCity}` : ''}`);
    } else if (activeSelectedCity) {
      setChartTitle(`Datos de Sensores - ${activeSelectedCity}`);
    }
    
    // Reset processed data points when sensor ID, type, or city changes
    processedDataPoints.current = new Set();
    setFormattedData([]);
    setSensorData([]);
    
    // Function to fetch sensor data
    const fetchSensorData = async () => {
      if (!activeSelectedCity && !sensorId) {
        return; // Don't fetch if we don't have a city or sensor ID
      }
      
      try {
        setLoading(true);
        let url;
        
        if (sensorId) {
          // Fetch data for a specific sensor
          url = `http://localhost:5454/api/greenlake-eval/sensors/sensor-data?sensor_id=${sensorId}`;
        } else if (activeSelectedCity) {
          // Fetch data for a selected city
          url = `http://localhost:5454/api/greenlake-eval/sensors/data/${activeSelectedCity}`;
        } else {
          // Fetch all data (fallback)
          url = `http://localhost:5454/api/greenlake-eval/sensors/data`;
        }

        const response = await axios.get(url)

        // Process data based on sensor type
        processDataForChart(response.data, sensorType);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch sensor data');
        console.error('Error fetching sensor data:', err);
        setLoading(false);
      }
    };

    // Process raw data into chart-friendly format
    const processDataForChart = (data, type) => {
      // If we have an array of messages (from general endpoint or city endpoint)
      if (Array.isArray(data)) {
        // Filter by sensor type if specified
        const filteredData = type 
          ? data.filter(item => item.sensor_type === type)
          : data;
        
        if (filteredData.length === 0) {
          setError(`No hay datos disponibles para ${sensorTitles[type] || type}`);
          return;
        }
        
        // Get available metrics based on first item
        const sampleItem = filteredData[0];
        let metricsToShow = [];
        
        // Determine metrics based on sensor type
        switch(sampleItem.sensor_type || type) {
          case 'air':
            metricsToShow = ['co', 'co2', 'no2', 'o3', 'pm10', 'so2'];
            break;
          case 'ambient':
            metricsToShow = ['humidity', 'temperature', 'solar_radiation'];
            break;
          case 'traffic':
            metricsToShow = ['avg_speed', 'flow_rate', 'occupancy', 'vehicle_density', 'congestion_index'];
            break;
          case 'water_quality':
            metricsToShow = ['ph_level', 'turbidity', 'conductivity', 'dissolved_oxygen', 'water_temperature'];
            break;
          case 'water_usage':
            metricsToShow = ['usage_liters'];
            break;
          default:
            // Get all numerical properties as metrics
            metricsToShow = Object.keys(sampleItem).filter(key => 
              typeof sampleItem[key] === 'number' && 
              key !== 'city_id' && 
              !key.includes('id')
            );
        }
        
        setMetrics(metricsToShow);
        
        // Find new data points
        const newDataPoints = filteredData.filter(item => {
          // Create a unique ID from sensor_id and event_time
          const pointId = `${item.sensor_id}-${item.event_time}`;
          if (!processedDataPoints.current.has(pointId)) {
            // Add to processed set
            processedDataPoints.current.add(pointId);
            return true;
          }
          return false;
        });
        
        if (newDataPoints.length === 0) {
          // No new data, just return
          return;
        }
        
        // Format only the new data points
        const newFormattedData = newDataPoints.map(item => {
          const chartItem = {
            timestamp: new Date(item.event_time).toLocaleTimeString(),
            event_time: item.event_time,
            sensor_id: item.sensor_id
          };
          
          // Add each metric to the chart item
          metricsToShow.forEach(metric => {
            if (item[metric] !== undefined) {
              chartItem[metric] = parseFloat(item[metric]);
            }
          });
          
          return chartItem;
        });
        
        // Update existing sensor data
        setSensorData(prevData => [...prevData, ...newDataPoints]);
        
        // Update formatted data with new points
        setFormattedData(prevData => {
          // Combine old and new data
          const combinedData = [...prevData, ...newFormattedData];
          // Sort by timestamp
          combinedData.sort((a, b) => new Date(a.event_time) - new Date(b.event_time));
          // Keep only the most recent points for display
          return combinedData.slice(-MAX_DISPLAY_POINTS);
        });
      } else {
        // Handle structured response from /sensor-data endpoint
        if (data.raw_data && Array.isArray(data.raw_data)) {
          // Process raw data
          processDataForChart(data.raw_data, data.metadata?.sensor_type || type);
        } else if (data.time_series_data) {
          // Extract metrics from time_series_data
          const metricsToShow = data.time_series_data.map(ts => ts.metric);
          setMetrics(metricsToShow);
          
          // Combine time series data
          const allTimePoints = {};
          
          data.time_series_data.forEach(series => {
            series.timestamps.forEach((timestamp, i) => {
              // Create unique ID for this timestamp
              const pointId = `${data.metadata?.sensor_id || 'unknown'}-${timestamp}`;
              
              // Skip if we already processed this timestamp
              if (processedDataPoints.current.has(pointId)) {
                return;
              }
              
              processedDataPoints.current.add(pointId);
              
              if (!allTimePoints[timestamp]) {
                allTimePoints[timestamp] = {
                  timestamp: new Date(timestamp).toLocaleTimeString(),
                  event_time: timestamp
                };
              }
              
              allTimePoints[timestamp][series.metric] = series.values[i];
            });
          });
          
          // Get only new data points
          const newPoints = Object.values(allTimePoints);
          
          if (newPoints.length === 0) {
            // No new data
            return;
          }
          
          // Update formatted data
          setFormattedData(prevData => {
            // Combine with existing data
            const combinedData = [...prevData, ...newPoints];
            // Sort by timestamp
            combinedData.sort((a, b) => new Date(a.event_time) - new Date(b.event_time));
            // Keep only the most recent points
            return combinedData.slice(-MAX_DISPLAY_POINTS);
          });
        }
      }
    };

    // Fetch initially
    fetchSensorData();
    
    // Set up polling every 10 seconds
    const intervalId = setInterval(fetchSensorData, 10000);
    
    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, [sensorId, sensorType, activeSelectedCity]);

  // Handle city selection change
  const handleCityChange = (e) => {
    const newCity = e.target.value;
    if (usingLocalCityState) {
      setLocalSelectedCity(newCity);
    } else {
      onCityChange(newCity);
    }
    // Reset data when city changes
    processedDataPoints.current = new Set();
    setFormattedData([]);
    setSensorData([]);
  };

  // Toggle between history and current view
  const toggleViewMode = () => {
    if (onViewModeChange) {
      onViewModeChange();
    } else {
      setLocalViewMode(localViewMode === 'history' ? 'current' : 'history');
    }
  };

  if (loading && formattedData.length === 0) 
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-[#36C78D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-600 text-lg">Cargando datos de sensores...</span>
        </div>
      </div>
    );
  
  if (error && formattedData.length === 0) 
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>{error}</p>
        </div>
      </div>
    );

  const latestValues = getLatestValues();

  return (
    <div className="w-full">
      {/* Header with title and loading indicator */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{chartTitle}</h2>
        
        {loading && (
          <div className="flex items-center text-sm text-gray-500">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#36C78D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Actualizando datos...
          </div>
        )}
      </div>
      
      {/* Content based on view mode */}
      {formattedData.length === 0 ? (
        <div className="flex justify-center items-center h-64 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-gray-500">No hay datos disponibles para esta ciudad/tipo de sensor</p>
        </div>
      ) : activeViewMode === 'history' ? (
        // Historical view with individual charts for each metric
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <MetricChart 
              key={metric}
              metric={metric}
              data={formattedData}
              color={colors[index % colors.length]}
              sensorType={sensorType}
              activeTimestamp={activeTimestamp}
              onMouseMove={handleChartMouseMove}
              onMouseLeave={handleChartMouseLeave}
            />
          ))}
        </div>
      ) : (
        // Current values view
        <CurrentValueView 
          metrics={metrics} 
          sensorType={sensorType} 
          latestData={latestValues} 
        />
      )}
    </div>
  );
};

SensorChart.propTypes = {
  sensorId: PropTypes.string,
  sensorType: PropTypes.oneOf(['air', 'ambient', 'traffic', 'water_quality', 'water_usage']),
  selectedCity: PropTypes.string,
  onCityChange: PropTypes.func,
  cities: PropTypes.arrayOf(PropTypes.string),
  viewMode: PropTypes.oneOf(['history', 'current']),
  onViewModeChange: PropTypes.func
};

export default SensorChart;