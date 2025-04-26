import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  const [showCreateVisualization, setShowCreateVisualization] = useState(false);
  const [visualizationType, setVisualizationType] = useState('bar');
  const [visualizationTitle, setVisualizationTitle] = useState('');
  const [selectedColumns, setSelectedColumns] = useState([]);
  
  const navigate = useNavigate();

  // Mock projects data - replace with actual API call
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      const mockProjects = [
        { 
          id: 1, 
          name: 'Análisis de Salud', 
          description: 'Estadísticas de salud en GreenLake',
          createdAt: '2025-04-20',
          tables: [
            { id: 1, name: 'Hospitales', category: 'salud' },
            { id: 4, name: 'Emergencias Médicas', category: 'salud' }
          ],
          visualizations: [
            { id: 1, title: 'Hospitales por zona', type: 'pie', createdAt: '2025-04-21' },
            { id: 2, title: 'Emergencias por mes', type: 'line', createdAt: '2025-04-22' }
          ]
        },
        { 
          id: 2, 
          name: 'Educación Pública', 
          description: 'Estadísticas de centros educativos públicos',
          createdAt: '2025-04-15',
          tables: [
            { id: 2, name: 'Escuelas', category: 'educación' }
          ],
          visualizations: [
            { id: 3, title: 'Escuelas por nivel educativo', type: 'bar', createdAt: '2025-04-16' }
          ]
        },
        { 
          id: 3, 
          name: 'Seguridad Urbana', 
          description: 'Análisis de seguridad en diferentes zonas',
          createdAt: '2025-04-10',
          tables: [
            { id: 5, name: 'Delitos', category: 'seguridad' }
          ],
          visualizations: []
        }
      ];
      setProjects(mockProjects);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleBack = () => {
    if (activeProject) {
      setActiveProject(null);
    } else {
      navigate('/');
    }
  };

  const handleCreateProject = () => {
    navigate('/tables');
  };

  const handleOpenProject = (project) => {
    setActiveProject(project);
  };

  const handleCreateVisualization = () => {
    if (!visualizationTitle.trim() || selectedColumns.length === 0) {
      alert('Por favor, ingrese un título y seleccione al menos una columna');
      return;
    }

    // Here you would create the visualization in your backend
    console.log('Creating visualization:', {
      projectId: activeProject.id,
      title: visualizationTitle,
      type: visualizationType,
      columns: selectedColumns
    });

    // Simulate adding visualization to active project
    const newVisualization = {
      id: Math.floor(Math.random() * 1000),
      title: visualizationTitle,
      type: visualizationType,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedProject = {
      ...activeProject,
      visualizations: [...activeProject.visualizations, newVisualization]
    };

    setProjects(projects.map(p => 
      p.id === activeProject.id ? updatedProject : p
    ));
    setActiveProject(updatedProject);
    setShowCreateVisualization(false);
    setVisualizationTitle('');
    setSelectedColumns([]);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('¿Está seguro de que desea eliminar este proyecto?')) {
      // Here you would delete the project from your backend
      setProjects(projects.filter(p => p.id !== projectId));
      
      if (activeProject && activeProject.id === projectId) {
        setActiveProject(null);
      }
    }
  };

  const handleDeleteVisualization = (visId) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta visualización?')) {
      // Here you would delete the visualization from your backend
      const updatedProject = {
        ...activeProject,
        visualizations: activeProject.visualizations.filter(v => v.id !== visId)
      };
      
      setProjects(projects.map(p => 
        p.id === activeProject.id ? updatedProject : p
      ));
      setActiveProject(updatedProject);
    }
  };

  // Get all columns from tables in active project for visualization creation
  const getAvailableColumns = () => {
    if (!activeProject) return [];
    
    // In a real app, you would fetch the actual columns from these tables
    // This is just a mock example
    const mockColumns = {
      'Hospitales': ['id', 'nombre', 'dirección', 'capacidad', 'especialidad'],
      'Emergencias Médicas': ['id', 'hospital_id', 'fecha', 'tipo', 'gravedad'],
      'Escuelas': ['id', 'nombre', 'tipo', 'nivel', 'dirección'],
      'Delitos': ['id', 'tipo', 'fecha', 'ubicación', 'estado']
    };
    
    return activeProject.tables.flatMap(table => 
      (mockColumns[table.name] || []).map(col => ({
        id: `${table.name.toLowerCase().replace(/\s/g, '_')}.${col}`,
        table: table.name,
        column: col
      }))
    );
  };

  // Toggle column selection for visualization
  const toggleColumnSelection = (columnId) => {
    setSelectedColumns(prev => {
      if (prev.includes(columnId)) {
        return prev.filter(id => id !== columnId);
      } else {
        return [...prev, columnId];
      }
    });
  };

  // Render placeholder visualization based on type
  const renderVisualizationPlaceholder = (type, title) => {
    switch (type) {
      case 'bar':
        return (
          <div className="bg-gray-100 p-4 rounded-md flex flex-col items-center justify-center h-40">
            <div className="text-sm font-medium mb-2">{title}</div>
            <div className="flex items-end justify-around w-full h-24 px-4">
              {[40, 70, 30, 85, 50].map((height, i) => (
                <div key={i} className="w-6 bg-blue-500" style={{ height: `${height}%` }}></div>
              ))}
            </div>
          </div>
        );
      case 'line':
        return (
          <div className="bg-gray-100 p-4 rounded-md flex flex-col items-center justify-center h-40">
            <div className="text-sm font-medium mb-2">{title}</div>
            <div className="relative w-full h-24">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                <polyline
                  points="0,40 20,35 40,20 60,30 80,10 100,25"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        );
      case 'pie':
        return (
          <div className="bg-gray-100 p-4 rounded-md flex flex-col items-center justify-center h-40">
            <div className="text-sm font-medium mb-2">{title}</div>
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <circle cx="16" cy="16" r="16" fill="#DBEAFE" />
                <path
                  d="M16 0A16 16 0 0 1 32 16 16 16 0 0 1 16 32 16 16 0 0 1 0 16"
                  fill="transparent"
                  stroke="#3B82F6"
                  strokeWidth="16"
                  strokeDasharray="25 75"
                />
                <path
                  d="M16 0A16 16 0 0 1 32 16 16 16 0 0 1 16 32 16 16 0 0 1 0 16"
                  fill="transparent"
                  stroke="#1E40AF"
                  strokeWidth="16"
                  strokeDasharray="50 75"
                  strokeDashoffset="-25"
                />
              </svg>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-4 rounded-md flex items-center justify-center h-40">
            <span className="text-gray-500">{title}</span>
          </div>
        );
    }
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
          {activeProject ? 'Volver a Proyectos' : 'Volver al Inicio'}
        </button>
        
        <h1 className="text-2xl font-bold">
          {activeProject ? `Proyecto: ${activeProject.name}` : 'Mis Proyectos'}
        </h1>
        
        {!activeProject ? (
          <button 
            onClick={handleCreateProject}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Crear Proyecto
          </button>
        ) : (
          <button 
            onClick={() => setShowCreateVisualization(true)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Crear Visualización
          </button>
        )}
      </div>
      
      {/* Main Content */}
      {isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-2"></div>
          <p className="text-gray-600">Cargando proyectos...</p>
        </div>
      ) : activeProject ? (
        <div>
          {/* Project Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900">Detalles del Proyecto</h2>
              <p className="text-sm text-gray-600 mt-1">{activeProject.description}</p>
              <p className="text-xs text-gray-500 mt-1">Creado el {activeProject.createdAt}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-md font-medium text-gray-900">Tablas en este proyecto</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {activeProject.tables.map(table => (
                  <span key={table.id} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {table.name} <span className="text-blue-600">({table.category})</span>
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => handleDeleteProject(activeProject.id)}
                className="text-red-600 hover:text-red-800 text-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Eliminar Proyecto
              </button>
            </div>
          </div>
          
          {/* Visualizations */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Visualizaciones</h2>
            
            {activeProject.visualizations.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <p className="text-gray-600 mb-1">No hay visualizaciones en este proyecto.</p>
                <p className="text-gray-500 text-sm">Cree una nueva visualización para comenzar.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeProject.visualizations.map(vis => (
                  <div key={vis.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    {renderVisualizationPlaceholder(vis.type, vis.title)}
                    <div className="p-3 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs text-gray-500">{vis.createdAt}</span>
                          <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {vis.type}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteVisualization(vis.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <p className="text-gray-600 mb-2 text-lg">No tiene proyectos creados.</p>
          <p className="text-gray-500 mb-6">Cree un nuevo proyecto para empezar a analizar datos.</p>
          <button 
            onClick={handleCreateProject}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Crear Proyecto
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>Creado: {project.createdAt}</span>
                  <span>{project.tables.length} tablas</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tables.slice(0, 3).map(table => (
                    <span key={table.id} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {table.name}
                    </span>
                  ))}
                  {project.tables.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      +{project.tables.length - 3} más
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                    </svg>
                    <span className="text-sm text-gray-600">{project.visualizations.length} visualizaciones</span>
                  </div>
                  
                  <button 
                    onClick={() => handleOpenProject(project)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Ver Proyecto
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Create Visualization Modal */}
      {showCreateVisualization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Crear Nueva Visualización</h2>
            
            <div className="mb-4">
              <label htmlFor="visTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Título de la Visualización
              </label>
              <input
                type="text"
                id="visTitle"
                value={visualizationTitle}
                onChange={(e) => setVisualizationTitle(e.target.value)}
                placeholder="Ingrese un título descriptivo"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="visType" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Visualización
              </label>
              <select
                id="visType"
                value={visualizationType}
                onChange={(e) => setVisualizationType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="bar">Gráfico de Barras</option>
                <option value="line">Gráfico de Líneas</option>
                <option value="pie">Gráfico Circular</option>
                <option value="table">Tabla</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Columnas a Visualizar
              </label>
              <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2">
                {getAvailableColumns().map(col => (
                  <div key={col.id} className="py-1 flex items-center">
                    <input
                      type="checkbox"
                      id={`col-${col.id}`}
                      checked={selectedColumns.includes(col.id)}
                      onChange={() => toggleColumnSelection(col.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                    />
                    <label htmlFor={`col-${col.id}`} className="text-sm text-gray-700">
                      <span className="font-medium">{col.table}</span>.{col.column}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateVisualization(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateVisualization}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Crear Visualización
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;