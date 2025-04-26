// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Tables from './pages/Tables';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}

        <Route path="/" element={
          <Home />
        } />

        <Route path="/tables" 
          element={
            <Tables/>
          } 
        />

        <Route path="/projects"
          element={
            <Projects/>
          }
        />
        

        {/* Ruta 404 */}
        <Route path='*' element={<h1 className='text-5xl text-white text-center mt-56'>404 Not Found :(</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
