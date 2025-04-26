import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import DashboardContent from '../components/DashboardContent';
import ChallengesView from '../components/ChallengesContent';
import LocationsView from '../components/LocationsContent';
import RewardsView from '../components/RewardsContent';


const AdminDashboard = () => {
    const [activeItem, setActiveItem] = useState('dashboard');
    
    const getTitle = () => {
      switch (activeItem) {
        case 'dashboard': return 'Dashboard';
        case 'challenges': return 'Gestión de Retos';
        case 'locations': return 'Locales Participantes';
        case 'rewards': return 'Gestión de Premios';
        default: return 'Dashboard';
      }
    };
    
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title={getTitle()} />
          <main className="flex-1 overflow-y-auto">
            {activeItem === 'dashboard' && <DashboardContent />}
            {activeItem === 'challenges' && <ChallengesView />}
            {activeItem === 'locations' && <LocationsView />}
            {activeItem === 'rewards' && <RewardsView />}
            {/* Aquí irían los demás componentes según activeItem */}
          </main>
        </div>
      </div>
    );
  };

export default AdminDashboard;