// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
