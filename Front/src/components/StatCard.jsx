import React, { useState } from 'react';


const StatCard = ({ title, value, change, icon }) => {
    const isPositive = change >= 0;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1">
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {isPositive ? "+" : ""}{change}%
          </span>
          <span className="text-gray-500 text-sm">desde el mes pasado</span>
        </div>
      </div>
    );
  };

  
export default StatCard;