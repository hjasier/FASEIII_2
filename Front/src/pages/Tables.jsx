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
  const [projectDescription, setProjectDescription] = useState('');
  const [showCreateProject, setShowCreateProject] = useState(false);
  
  const navigate = useNavigate();

  // Mock categories for filtering
  const categories = ['all', 'salud', 'educación', 'transporte', 'seguridad', 'economía'];

  // Mock tables data - replace with actual API call
  // useEffect(() => {
  //   const fetchTables = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:5454/tables');
  //       const data = await response.json();
  //       if (response.ok) {
  //         const fetchedTables = data.results.map((item, index) => ({
  //           id: index + 1,
  //           name: item.table,
  //           category: 'uncategorized', // Default category
  //           description: item.description ? item.description : `-`, // Use real description if available
  //           columns: [] // Placeholder for columns (can fetch them later if needed)
  //         }));
  //         setTables(fetchedTables);
  //         setFilteredTables(fetchedTables);
  //       } else {
  //         console.error('Error fetching tables:', data.error);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching tables:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  
  //   fetchTables();
  // }, []);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5454/tables');
        print(response)
        const data = await response.json();
        if (response.ok) {
          const fetchedTables = await Promise.all(
            data.results.map(async (item, index) => {
              let columns = [];
              let columnCount = 0;
              try {
                const columnsResponse = await fetch(`http://127.0.0.1:5454/columns/${item.table}`);
                const columnsData = await columnsResponse.json();
                if (columnsResponse.ok) {
                  columns = columnsData.results.map(col => col.column_name);
                  columnCount = columnsData.results.length; // ✅ Correct way to count columns
                } else {
                  console.error(`Error fetching columns for table ${item.table}:`, columnsData.error);
                }
              } catch (err) {
                console.error(`Error fetching columns for table ${item.table}:`, err);
              }
  
              return {
                id: index + 1,
                name: item.table,
                category: 'uncategorized',
                description: item.description ? item.description : '-',
                columns: columns,
                columnCount: columnCount // ✅ Now this will be the real count
              };
            })
          );
          setTables(fetchedTables);
          setFilteredTables(fetchedTables);
        } else {
          console.error('Error fetching tables:', data.error);
        }
      } catch (error) {
        console.error('Error fetching tables:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTables();
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
      description: projectDescription,
      tables: selectedTables.map(id => tables.find(table => table.id === id))
    });
    
    // Navigate to the projects page or the new project's page
    navigate('/projects');
  };

  const handleBack = () => {
    navigate('/');
  };
  
  // Generate category color classes based on category name
  const getCategoryColorClass = (category) => {
    const categoryColors = {
      'salud': 'bg-rose-50 text-rose-700',
      'educación': 'bg-blue-50 text-blue-700',
      'transporte': 'bg-amber-50 text-amber-700',
      'seguridad': 'bg-purple-50 text-purple-700',
      'economía': 'bg-cyan-50 text-cyan-700',
    };
    
    return categoryColors[category] || 'bg-green-50 text-green-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#36C78D] rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Explorador de Tablas</h1>
          </div>
          
          <button 
            onClick={() => setShowCreateProject(true)}
            disabled={selectedTables.length === 0}
            className={`flex items-center ${
              selectedTables.length > 0 
                ? 'bg-[#36C78D] hover:bg-[#2da677]' 
                : 'bg-gray-300 cursor-not-allowed'
            } text-white px-4 py-2 rounded-md transition-colors shadow-sm hover:shadow`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Crear Proyecto 
            {selectedTables.length > 0 && (
              <span className="ml-2 bg-white text-[#36C78D] text-sm px-2 py-0.5 rounded-full">
                {selectedTables.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center text-[#36C78D] hover:text-[#2da677]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver al Inicio
          </button>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Buscar tablas
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre o descripción"
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="md:w-64">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <div className="relative">
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent pr-8"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Todas las categorías' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Selected tables chips */}
          {selectedTables.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Tablas seleccionadas: {selectedTables.length}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedTables.map(id => {
                  const table = tables.find(t => t.id === id);
                  return table ? (
                    <div key={id} className="bg-green-50 text-[#36C78D] px-3 py-1 rounded-full text-sm flex items-center">
                      {table.name}
                      <button 
                        onClick={() => handleTableSelection(id)}
                        className="ml-1 hover:text-red-500 focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Tables List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          {isLoading ? (
            <div className="p-16 text-center">
              <div className="animate-spin inline-block w-12 h-12 border-4 border-[#36C78D] border-t-transparent rounded-full mb-4"></div>
              <p className="text-gray-600">Cargando tablas de datos...</p>
            </div>
          ) : filteredTables.length === 0 ? (
            <div className="p-16 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600 mb-1 text-lg">No se encontraron resultados</p>
              <p className="text-gray-500 text-sm">Intente modificar su búsqueda o seleccionar otra categoría.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 text-[#36C78D] border-gray-300 rounded focus:ring-[#36C78D]"
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
                      Columnas
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTables.map((table) => (
                    <tr 
                      key={table.id} 
                      className={selectedTables.includes(table.id) ? "bg-green-50" : "hover:bg-gray-50 transition-colors"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-[#36C78D] border-gray-300 rounded focus:ring-[#36C78D]"
                          onChange={() => handleTableSelection(table.id)}
                          checked={selectedTables.includes(table.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{table.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColorClass(table.category)}`}>
                          {table.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{table.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {table.columns.length} columnas
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => {
                            // Preview table data - should open a modal or navigate to table preview
                            console.log('Preview table:', table);
                          }}
                          className="text-[#36C78D] hover:text-[#2da677] mr-3 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
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
      </div>
      
      {/* Create Project Modal */}
      {showCreateProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-6 pb-3 border-b border-gray-200">
              <div className="w-8 h-8 bg-[#36C78D] rounded-full flex items-center justify-center mr-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Crear Nuevo Proyecto</h2>
            </div>
            
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
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción (opcional)
              </label>
              <textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Breve descripción del proyecto"
                className="w-full p-2 border border-gray-300 rounded-md h-20 focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent"
              />
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tablas Seleccionadas</h3>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2">
                {selectedTables.length === 0 ? (
                  <p className="text-sm text-gray-500 p-2">No hay tablas seleccionadas.</p>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {selectedTables.map(id => {
                      const table = tables.find(t => t.id === id);
                      return table ? (
                        <li key={id} className="py-2 flex justify-between items-center">
                          <div>
                            <span className="font-medium text-gray-800">{table.name}</span> 
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getCategoryColorClass(table.category)}`}>
                              {table.category}
                            </span>
                          </div>
                          <button 
                            onClick={() => handleTableSelection(id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Eliminar"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </li>
                      ) : null;
                    })}
                  </ul>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Total: {selectedTables.length} tablas</p>
            </div>
            
            <div className="flex justify-end space-x-3 pt-3 border-t border-gray-200">
              <button
                onClick={() => setShowCreateProject(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-[#36C78D] hover:bg-[#2da677] text-white rounded-md transition-colors flex items-center shadow-sm hover:shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Crear Proyecto
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            GreenLake Data Explorer - Analiza y visualiza los datos de la ciudad sostenible
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Tables;