import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PopularChallengesChart = () => {
  const data = [
    { name: 'Pintxo Tortillita', value: 4000 },
    { name: 'LevantaPiedras', value: 3000 },
    { name: 'Camino de Santiago', value: 2000 },
    { name: 'Vistazo a hotel', value: 2780 },
    { name: 'Vistazo a biblioteca', value: 1890 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-md border border-gray-200">
          <p className="font-bold">{label}</p>
          <p className="text-blue-600">Participantes: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full pt-10">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ top: 10, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#666', fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#e0e0e0' }}
            angle={0}
            textAnchor="middle"
            height={40}
          />
          <YAxis 
            tick={{ fill: '#666' }}
            tickLine={false}
            axisLine={{ stroke: '#e0e0e0' }}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: 20 }} />
          <Bar 
            dataKey="value" 
            name="Retos cumplidos" 
            fill="#3b82f6" 
            radius={[4, 4, 0, 0]} 
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopularChallengesChart;