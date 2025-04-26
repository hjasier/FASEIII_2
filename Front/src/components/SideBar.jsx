import React, { useState } from 'react';
import { Bell, Calendar, ChevronDown, LayoutDashboard, Map, Award, Building, Users, LogOut, Menu } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';



const Sidebar = ({ activeItem, setActiveItem }) => {
    const menuItems = [
      { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
      { id: 'challenges', icon: <Award size={20} />, label: 'Retos' },
      { id: 'locations', icon: <Building size={20} />, label: 'Locales' },
      { id: 'rewards', icon: <Award size={20} />, label: 'Premios' },
    ];
    const navigate = useNavigate();

    const handleLogOut = () => {
      console.log('Logging out...');
      localStorage.removeItem('isAuthenticated');
      
      window.location.reload();
    };
    
  
    return (
      <div className="w-64 bg-gray-900 text-white h-screen py-6 px-4 flex flex-col">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
            <Map size={24} color="white" />
          </div>
          <div>
            <h1 className="font-bold text-xl">CityQuest</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
        
        <nav className="flex-grow">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg ${
                    activeItem === item.id ? 'bg-blue-600' : 'hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto">
          <button onClick={handleLogOut} className="w-full flex items-center gap-3 py-3 px-4 rounded-lg text-gray-400 hover:bg-gray-800">
            <LogOut size={20} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    );
  };


export default Sidebar;