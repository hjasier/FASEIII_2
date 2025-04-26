import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const SensorChart = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch sensor data
    const fetchSensorData = async () => {
      try {
        // TODO
        const response = await axios.get('http://localhost:5454/kafka/sensor-data');
        
        // Format data for the chart if needed
        const formattedData = response.data.map(item => ({
          timestamp: new Date(item.timestamp).toLocaleTimeString(),
          temperature: item.temperature,
          humidity: item.humidity,
          // Add other sensor metrics you have
        }));
        
        setSensorData(formattedData);
        console.log('Sensor data:', formattedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch sensor data');
        console.log(err);
        setLoading(false);
        console.error('Error fetching sensor data:', err);
      }
    };

    // Fetch initially
    fetchSensorData();
    
    // Set up polling every 5 seconds
    const intervalId = setInterval(fetchSensorData, 5000);
    
    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div>Loading sensor data...</div>;
  if (error) return <div>{error}</div>;
  if (sensorData.length === 0) return <div>No sensor data available</div>;

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Sensor Metrics</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sensorData}
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
          <Line 
            type="monotone" 
            dataKey="temperature" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
          />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
          {/* Add more Line components for other metrics */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;