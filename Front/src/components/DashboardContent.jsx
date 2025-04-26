import React, { useState } from 'react';
import { Bell, Calendar, ChevronDown, LayoutDashboard, Map, Award, Building, Users, LogOut, Menu } from 'lucide-react';
import StatCard from './StatCard';
import PopularChallengesChart from './ChallengeBarChart';
import MapboxHeatmap from './MapBoxHeatMap';
import HotelSlopesChart from './IndiceVerde';
import HotelOccupancyChart from './HotelOccupacyDashboard';

const DashboardContent = () => {removeEventListener
    return (
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Bienvenido al panel de administración</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2">
              <Calendar size={16} />
              <span>Último mes</span>
              <ChevronDown size={16} />
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Exportar Datos
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Retos Activos" 
            value="152" 
            change={8.2} 
            icon={<Award size={24} />} 
          />
          <StatCard 
            title="Locales Participantes" 
            value="47" 
            change={12.5} 
            icon={<Building size={24} />} 
          />
          <StatCard 
            title="Usuarios Activos" 
            value="2,841" 
            change={5.1} 
            icon={<Users size={24} />} 
          />
          <StatCard 
            title="Retos Completados" 
            value="12,582" 
            change={-3.2} 
            icon={<Award size={24} />} 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Retos más populares</h3>
            <div className="h-96 flex items-center justify-center">
              <PopularChallengesChart />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Mapa de calor de actividad</h3>
            <div className="h-96 flex items-center justify-center">
              <MapboxHeatmap />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Variacion de contaminación de los hoteles</h3>
            <div className="h-dvh flex items-center justify-center">
              <HotelSlopesChart/>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Ocupación Hotelera</h3>
            <div className="h-dvh flex items-center justify-center">
              <HotelOccupancyChart />
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default DashboardContent;