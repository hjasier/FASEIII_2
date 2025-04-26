import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell } from 'recharts';

const HotelOccupancyChart = () => {
  const [metric, setMetric] = useState('tasa_ocupacion');

  // Sample data directly in the component
  const sampleData = [
    {
      id: 1,
      hotel_nombre: "Alletra Diamond Grand Hotel",
      fecha: "2019-01-01",
      tasa_ocupacion: 78,
      reservas_confirmadas: 122,
      cancelaciones: 10,
      precio_promedio_noche: 150.11,
      RatioDeIngreso: 2491.83
    },
    {
      id: 2,
      hotel_nombre: "ProLiant Towers",
      fecha: "2019-01-01",
      tasa_ocupacion: 85,
      reservas_confirmadas: 233,
      cancelaciones: 28,
      precio_promedio_noche: 129.84,
      RatioDeIngreso: 1730.86
    },
    {
      id: 3,
      hotel_nombre: "Aruba Luxury Lodge",
      fecha: "2019-01-01",
      tasa_ocupacion: 64,
      reservas_confirmadas: 98,
      cancelaciones: 9,
      precio_promedio_noche: 217.91,
      RatioDeIngreso: 1860.36
    },
    {
      id: 4,
      hotel_nombre: "InfoSight Boutique Hotel",
      fecha: "2019-01-01",
      tasa_ocupacion: 72,
      reservas_confirmadas: 187,
      cancelaciones: 11,
      precio_promedio_noche: 102.07,
      RatioDeIngreso: 2106.35
    },
    {
      id: 5,
      hotel_nombre: "Primera Grand",
      fecha: "2019-01-01",
      tasa_ocupacion: 59,
      reservas_confirmadas: 171,
      cancelaciones: 26,
      precio_promedio_noche: 97.4,
      RatioDeIngreso: 1797.93
    },
    {
      id: 6,
      hotel_nombre: "dHCI Executive Boutique Hotel",
      fecha: "2019-01-01",
      tasa_ocupacion: 63,
      reservas_confirmadas: 128,
      cancelaciones: 15,
      precio_promedio_noche: 198.35,
      RatioDeIngreso: 2121.19
    },
    {
      id: 7,
      hotel_nombre: "ProLiant Haven",
      fecha: "2019-01-01",
      tasa_ocupacion: 76,
      reservas_confirmadas: 182,
      cancelaciones: 13,
      precio_promedio_noche: 171.42,
      RatioDeIngreso: 3236.30
    },
    {
      id: 8,
      hotel_nombre: "Apollo Executive Beach Resort",
      fecha: "2019-01-01",
      tasa_ocupacion: 82,
      reservas_confirmadas: 207,
      cancelaciones: 19,
      precio_promedio_noche: 161.87,
      RatioDeIngreso: 3354.60
    },
    {
      id: 9,
      hotel_nombre: "Aruba Lodge",
      fecha: "2019-01-01",
      tasa_ocupacion: 65,
      reservas_confirmadas: 90,
      cancelaciones: 9,
      precio_promedio_noche: 162.81,
      RatioDeIngreso: 2442.15
    },
    {
      id: 10,
      hotel_nombre: "Alletra Haven",
      fecha: "2019-01-01",
      tasa_ocupacion: 87,
      reservas_confirmadas: 266,
      cancelaciones: 16,
      precio_promedio_noche: 268.36,
      RatioDeIngreso: 4182.18
    },
    {
      id: 11,
      hotel_nombre: "GreenLake Executive Suites",
      fecha: "2019-01-01",
      tasa_ocupacion: 70,
      reservas_confirmadas: 155,
      cancelaciones: 12,
      precio_promedio_noche: 185.50,
      RatioDeIngreso: 2984.25
    },
    {
      id: 12,
      hotel_nombre: "Nimble Grand Resort",
      fecha: "2019-01-01",
      tasa_ocupacion: 68,
      reservas_confirmadas: 178,
      cancelaciones: 18,
      precio_promedio_noche: 134.75,
      RatioDeIngreso: 2456.80
    },
    {
      id: 13,
      hotel_nombre: "Synergy Beachfront Hotel",
      fecha: "2019-01-01",
      tasa_ocupacion: 75,
      reservas_confirmadas: 189,
      cancelaciones: 14,
      precio_promedio_noche: 145.90,
      RatioDeIngreso: 2788.15
    },
    {
      id: 14,
      hotel_nombre: "eAPP Luxury Towers",
      fecha: "2019-01-01",
      tasa_ocupacion: 58,
      reservas_confirmadas: 133,
      cancelaciones: 21,
      precio_promedio_noche: 112.20,
      RatioDeIngreso: 1875.40
    },
    {
      id: 15,
      hotel_nombre: "ClearPass Resort & Spa",
      fecha: "2019-01-01",
      tasa_ocupacion: 79,
      reservas_confirmadas: 201,
      cancelaciones: 9,
      precio_promedio_noche: 192.65,
      RatioDeIngreso: 3698.50
    }
  ];

  // Sort data by the selected metric and get top 15
  const sortedData = [...sampleData].sort((a, b) => b[metric] - a[metric]);
  const top10Data = sortedData.slice(0, 15);

  // Get label for selected metric
  const getMetricLabel = () => {
    switch(metric) {
      case 'tasa_ocupacion': return 'Ocupación (%)';
      case 'precio_promedio_noche': return 'Precio Promedio (€)';
      case 'reservas_confirmadas': return 'Reservas Confirmadas';
      case 'cancelaciones': return 'Cancelaciones';
      case 'RatioDeIngreso': return 'Ratio de Ingreso';
      default: return '';
    }
  };

  // Get color based on metric value
  const getBarColor = (value, index) => {
    // Different color schemes based on metric
    if (metric === 'tasa_ocupacion') {
      return `rgb(0, ${Math.min(255, Math.round(value * 4))}, 0)`;
    } else if (metric === 'precio_promedio_noche') {
      return `rgb(0, 0, ${Math.min(255, Math.round(value))})`;
    } else if (metric === 'cancelaciones') {
      return `rgb(${Math.min(255, Math.round(value * 8))}, 0, 0)`;
    } else {
      // Default color scheme for other metrics
      const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', 
                      '#00C49F', '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57'];
      return colors[index % colors.length];
    }
  };

  return (
    <div className="w-full h-full">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Métrica</label>
          <select 
            value={metric} 
            onChange={(e) => setMetric(e.target.value)}
            className="text-sm border rounded px-2 py-1 bg-white"
          >
            <option value="tasa_ocupacion">Tasa de Ocupación</option>
            <option value="precio_promedio_noche">Precio Promedio</option>
            <option value="reservas_confirmadas">Reservas</option>
            <option value="cancelaciones">Cancelaciones</option>
            <option value="RatioDeIngreso">Ratio de Ingreso</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="92%"> 
        <BarChart 
          data={top10Data} 
          layout="vertical"
          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis 
            dataKey="hotel_nombre" 
            type="category" 
            tick={{ fontSize: 12 }}
            width={120}
          />
          <Tooltip 
            formatter={(value) => [`${value}`, getMetricLabel()]}
          />
          <Bar dataKey={metric} name={getMetricLabel()}>
            {top10Data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry[metric], index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HotelOccupancyChart;