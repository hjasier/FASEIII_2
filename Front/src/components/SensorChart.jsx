import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import PropTypes from 'prop-types';

// Color palette for different metrics
const colors = [
  '#8884d8', '#82ca9d', '#ff7300', '#0088fe', '#00c49f', '#ffbb28', 
  '#ff8042', '#a4de6c', '#d0ed57', '#83a6ed'
];

const SensorChart = ({ sensorId, sensorType }) => {
  const [sensorData, setSensorData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartTitle, setChartTitle] = useState('Sensor Data');
  // Add a ref to track the existing data points by ID
  const processedDataPoints = useRef(new Set());
  // Max number of points to display
  const MAX_DISPLAY_POINTS = 50;

  // Map sensor types to human-readable titles
  const sensorTitles = {
    'air': 'Air Quality Metrics',
    'ambient': 'Ambient Weather Conditions',
    'traffic': 'Traffic Monitoring Data',
    'water_quality': 'Water Quality Parameters',
    'water_usage': 'Water Consumption Metrics'
  };

  useEffect(() => {
    // Set chart title based on sensor type
    if (sensorType && sensorTitles[sensorType]) {
      setChartTitle(sensorTitles[sensorType]);
    }
    
    // Reset processed data points when sensor ID or type changes
    processedDataPoints.current = new Set();
    setFormattedData([]);
    setSensorData([]);
    
    // Function to fetch sensor data
    const fetchSensorData = async () => {
      try {
        setLoading(true);
        const url = sensorId 
          ? `http://localhost:5454/api/greenlake-eval/sensors/sensor-data?sensor_id=${sensorId}`
          : `http://localhost:5454/api/greenlake-eval/sensors/data`;
        
        const response = await axios.get(url);
        
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
      // If we have an array of messages (from general endpoint)
      if (Array.isArray(data)) {
        // Filter by sensor type if specified
        const filteredData = type 
          ? data.filter(item => item.sensor_type === type)
          : data;
        
        if (filteredData.length === 0) {
          setError(`No data found for sensor type: ${type}`);
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
  }, [sensorId, sensorType]);

  if (loading && formattedData.length === 0) return <div>Loading sensor data...</div>;
  if (error && formattedData.length === 0) return <div className="error-message">{error}</div>;
  if (formattedData.length === 0) return <div>No sensor data available</div>;

  return (
    <div style={{ width: '100%', height: 400, marginBottom: '2rem' }}>
      <h2>{chartTitle} {loading && <small>(Loading new data...)</small>}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          {metrics.map((metric, index) => (
            <Line 
              key={metric}
              type="monotone" 
              dataKey={metric} 
              name={metric.replace(/_/g, ' ')}
              stroke={colors[index % colors.length]} 
              activeDot={{ r: 8 }} 
              isAnimationActive={false} // Disable animation for smoother updates
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

SensorChart.propTypes = {
  sensorId: PropTypes.string,
  sensorType: PropTypes.oneOf(['air', 'ambient', 'traffic', 'water_quality', 'water_usage'])
};

export default SensorChart;