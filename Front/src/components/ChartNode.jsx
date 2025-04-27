  // First, install Recharts:
  // npm install recharts

  import React, { useState, useEffect, useCallback, useRef } from 'react';

  import 'reactflow/dist/style.css';

  // Import Recharts components
  import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer
  } from 'recharts';




const ChartNode = ({ data }) => {
    const COLORS = ['#36C78D', '#0088FE', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    const renderChart = () => {
      if (!data.chartData || data.chartData.length === 0) {
        return (
          <div className="flex items-center justify-center h-[180px] bg-gray-50">
            <p className="text-gray-500 text-sm">No hay datos disponibles</p>
          </div>
        );
      }

      switch (data.chartType) {
        case 'bar':
          return (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={data.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={data.xAxis} tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Legend wrapperStyle={{fontSize: 12}} />
                <Bar dataKey={data.yAxis} fill="#36C78D" />
              </BarChart>
            </ResponsiveContainer>
          );
        case 'line':
          return (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={data.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={data.xAxis} tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Legend wrapperStyle={{fontSize: 12}} />
                <Line type="monotone" dataKey={data.yAxis} stroke="#36C78D" />
              </LineChart>
            </ResponsiveContainer>
          );
        case 'pie':
          return (
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={data.chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey={data.yAxis || 'value'} // For pie charts, we might use 'value' as the default
                  nameKey={data.xAxis}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          );
        default:
          return (
            <div className="flex items-center justify-center h-[180px] bg-gray-50">
              <p className="text-gray-500">Tipo de gráfico no soportado</p>
            </div>
          );
      }
    };

    return (
      <div className="bg-white rounded-md shadow-md border border-gray-200 w-[350px]">
        <div className="flex items-center justify-between bg-[#36C78D] text-white p-2 rounded-t-md">
          <div className="font-semibold truncate">{data.title}</div>
          <div className="flex space-x-1">
            <button 
              onClick={() => data.onDelete(data.id)}
              className="text-white hover:text-red-200 p-1 rounded"
              title="Eliminar gráfico"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-2">
          {renderChart()}
        </div>
        <div className="p-2 border-t border-gray-200 text-xs text-gray-500">
          Fuente: {data.tableName} | {data.xAxis} / {data.yAxis}
        </div>
      </div>
    );
  };

export default ChartNode;