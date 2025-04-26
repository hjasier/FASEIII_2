// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route path="/" element={
            <ProtectedRoute>
              <></>
            </ProtectedRoute>
        } />

        <Route path="/form" element={
         
          <Home />
         
        } />

        {/* Ruta 404 */}
        <Route path='*' element={<h1 className='text-5xl text-white text-center mt-56'>404 Not Found :(</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
