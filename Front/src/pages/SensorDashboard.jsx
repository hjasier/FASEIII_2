import React from 'react';
import SensorChart from '../components/SensorChart';

const SensorDashboard = () => {
  return (
    <div className="sensor-dashboard">
      <h1>City Monitoring Dashboard</h1>
      
      <SensorChart sensorType="air" />
      <SensorChart sensorType="ambient" />
      <SensorChart sensorType="traffic" />
      <SensorChart sensorType="water_quality" />
      <SensorChart sensorType="water_usage" />
      
      {/* You can also display charts for specific sensors */}
      {/* <SensorChart sensorId="specific-sensor-id" /> */}
    </div>
  );
};

export default SensorDashboard;