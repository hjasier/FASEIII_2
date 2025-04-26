import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Tables() {
  const [tables, setTables] = useState([]);
  const [filteredTables, setFilteredTables] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTables, setSelectedTables] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [showCreateProject, setShowCreateProject] = useState(false);
  
  const navigate = useNavigate();

  // Mock categories for filtering
  const categories = ['all', 'salud', 'educación', 'transporte', 'seguridad', 'economía'];

  // Mock tables data - replace with actual API call
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      const mockTables = [
        { id: 1, name: 'Hospitales', category: 'salud', description: 'Información sobre los hospitales de la ciudad', columns: ['id', 'nombre', 'dirección', 'capacidad', 'especialidad'] },
        { id: 2, name: 'Escuelas', category: 'educación', description: 'Lista de centros educativos públicos y privados', columns: ['id', 'nombre', 'tipo', 'nivel', 'dirección'] },
        { id: 3, name: 'Transporte Público', category: 'transporte', description: 'Rutas y horarios de transporte público', columns: ['id_ruta', 'nombre', 'inicio', 'fin', 'frecuencia'] },
        { id: 4, name: 'Emergencias Médicas', category: 'salud', description: 'Registro de emergencias médicas atendidas', columns: ['id', 'hospital_id', 'fecha', 'tipo', 'gravedad'] },
        { id: 5, name: 'Delitos', category: 'seguridad', description: 'Registro de delitos reportados', columns: ['id', 'tipo', 'fecha', 'ubicación', 'estado'] },
        { id: 6, name: 'Comercios', category: 'economía', description: 'Directorio de comercios y negocios', columns: ['id', 'nombre', 'categoría', 'dirección', 'empleados'] },
      ];
      setTables(mockTables);
      setFilteredTables(mockTables);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter tables based on search query and category
  useEffect(() => {
    let result = [...tables];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(table => 
        table.name.toLowerCase().includes(query) || 
        table.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(table => table.category === selectedCategory);
    }
    
    setFilteredTables(result);
  }, [searchQuery, selectedCategory, tables]);

  const handleTableSelection = (tableId) => {
    setSelectedTables(prev => {
      if (prev.includes(tableId)) {
        return prev.filter(id => id !== tableId);
      } else {
        return [...prev, tableId];
      }
    });
  };

  const handleCreateProject = () => {
    if (projectName.trim() === '' || selectedTables.length === 0) {
      alert('Por favor, ingrese un nombre para el proyecto y seleccione al menos una tabla.');
      return;
    }
    
    // Here you would save the project to your backend
    console.log('Creating project:', {
      name: projectName,
      tables: selectedTables.map(id => tables.find(table => table.id === id))
    });
    
    // Navigate to the projects page or the new project's page
    navigate('/projects');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Volver
        </button>
        
        <h1 className="text-2xl font-bold">Explorador de Tablas</h1>
        
        <button 
          onClick={() => setShowCreateProject(true)}
          disabled={selectedTables.length === 0}
          className={`flex items-center ${
            selectedTables.length > 0 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-gray-400 cursor-not-allowed'
          } text-white px-4 py-2 rounded-md transition-colors`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Crear Proyecto ({selectedTables.length})
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Buscar tablas</label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre o descripción"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="md:w-64">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Tables List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-2"></div>
            <p className="text-gray-600">Cargando tablas...</p>
          </div>
        ) : filteredTables.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">No se encontraron tablas que coincidan con los criterios de búsqueda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTables(filteredTables.map(table => table.id));
                        } else {
                          setSelectedTables([]);
                        }
                      }}
                      checked={filteredTables.length > 0 && selectedTables.length === filteredTables.length}
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTables.map((table) => (
                  <tr key={table.id} className={selectedTables.includes(table.id) ? "bg-blue-50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        onChange={() => handleTableSelection(table.id)}
                        checked={selectedTables.includes(table.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{table.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {table.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{table.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => {
                          // Preview table data - should open a modal or navigate to table preview
                          console.log('Preview table:', table);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Vista previa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Create Project Modal */}
      {showCreateProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Crear Nuevo Proyecto</h2>
            
            <div className="mb-4">
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Proyecto
              </label>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Ingrese un nombre para el proyecto"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-1">Tablas Seleccionadas</h3>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2">
                <ul className="divide-y divide-gray-200">
                  {selectedTables.map(id => {
                    const table = tables.find(t => t.id === id);
                    return (
                      <li key={id} className="py-2 flex justify-between items-center">
                        <span>{table?.name} <span className="text-xs text-gray-500">({table?.category})</span></span>
                        <button 
                          onClick={() => handleTableSelection(id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Eliminar
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateProject(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Crear Proyecto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tables;