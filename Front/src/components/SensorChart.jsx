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
        const response = await axios.get('http://localhost:5454/api/greenlake-eval/sensors/sensor-data');
        
        // Format data for the chart if needed
        const formattedData = response.data.map(item => ({
          timestamp: new Date(item.event_time).toLocaleTimeString(),
          co: item.co,
          co2: item.co2,
          no2: item.no2,
          o3: item.o3,
          pm10: item.pm10,
          so2: item.so2,
          sensor_id: item.sensor_id
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
      <h2>Air Quality Metrics</h2>
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
            dataKey="co" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
          />
          <Line type="monotone" dataKey="co2" stroke="#82ca9d" />
          <Line type="monotone" dataKey="no2" stroke="#ff7300" />
          <Line type="monotone" dataKey="o3" stroke="#0088fe" />
          <Line type="monotone" dataKey="pm10" stroke="#00c49f" />
          <Line type="monotone" dataKey="so2" stroke="#ffbb28" />
          {/* Add more Line components for other metrics */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;