// src/App.jsx

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import LoginUser from './pages/LoginUser';
import Home from './pages/Home';
import Tables from './pages/Tables';
import Projects from './pages/Projects';
import Project from './pages/Project';
import SensorDashboard from './pages/SensorDashboard';
import LLMChat from './pages/LLMChat';
import Admin from './pages/Admin';
import CSVUpload from './pages/CSVUpload';
import { useEffect, useState } from 'react';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';

  if (!isAuthenticated) {
    // Redirect to login with return URL
    return <Navigate to="/login?returnUrl=/admin" replace />;
  }

  return children;
};

// Check if user is already logged in
const AuthRedirect = () => {
  // Check if user is authenticated (could be admin or regular user)
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true' || 
                         localStorage.getItem('userAuthenticated') === 'true';
  
  // If already authenticated, go to home, otherwise to login
  return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login-user" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root based on authentication status */}
        <Route path="/" element={<AuthRedirect />} />
        
        {/* Admin login */}
        <Route path="/login" element={<Login />} />
        
        {/* User login/register */}
        <Route path="/login-user" element={<LoginUser />} />

        {/* Home now accessible after login */}
        <Route path="/home" element={<Home />} />

        <Route path="/tables"
          element={
            <Tables />
          }
        />

        <Route path="/projects"
          element={
            <Projects />
          }
        />

        {/* Ruta para un proyecto específico con su ID */}
        <Route path="/project/:projectId"
          element={
            <Project />
          }
        />

        <Route path="/sensor-chart"
          element={
            <SensorDashboard />
          }
        />


        {/* Admin route with protection */}
        <Route path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* CSV Upload route with protection */}
        <Route path="/admin/csv-upload"
          element={
            <ProtectedRoute>
              <CSVUpload />
            </ProtectedRoute>
          }
        />

        {/* Chat */}
        {<Route path="/chat"
          element={
            <LLMChat />
          }
        />}

        {/* Ruta 404 */}
        <Route path='*' element={<h1 className='text-5xl text-white text-center mt-56'>404 Not Found :(</h1>} />
      </Routes>
    </Router>
  );
}

export default App;