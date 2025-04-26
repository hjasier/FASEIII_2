
import React, { useState } from 'react';
import { Bell, Calendar, ChevronDown, LayoutDashboard, Map, Award, Building, Users, LogOut, Menu } from 'lucide-react';


const Header = ({ title }) => {
    return (
      <header className="bg-white border-b border-gray-200 h-16 pt-10 pb-10 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <button className="md:hidden">
            <Menu size={24} />
          </button>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <span className="font-medium text-sm">AY</span>
            </div>
            <span className="hidden md:inline font-medium">Admin</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </header>
    );
  };


export default Header;