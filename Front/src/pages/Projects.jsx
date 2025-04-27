import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [showCreateVisualization, setShowCreateVisualization] = useState(false);
  const [visualizationType, setVisualizationType] = useState('bar');
  const [visualizationTitle, setVisualizationTitle] = useState('');
  const [selectedColumns, setSelectedColumns] = useState([]);
  
  const navigate = useNavigate();

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get auth token
        const authToken = localStorage.getItem('authToken');
        
        if (!authToken) {
          // Redirect to login if no auth token
          navigate('/login-user', { state: { returnUrl: '/projects' } });
          return;
        }
        
        const response = await fetch('http://localhost:5454/projects/list', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`
          },
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
          // Format projects with needed properties
          const formattedProjects = data.projects.map(project => ({
            id: project.id,
            name: project.name,
            description: project.description || "Sin descripción",
            createdAt: project.createdAt || "N/A",
            tables: [], // Will be populated when project is clicked
            tableCount: project.table_count,
            visualizations: [] // We'll add mock visualizations for now
          }));
          
          setProjects(formattedProjects);
        } else {
          throw new Error(data.message || 'Failed to fetch projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, [navigate]);

  // Function to fetch tables for a project when it's selected
  const fetchProjectTables = async (projectId) => {
    try {
      const authToken = localStorage.getItem('authToken');
      
      if (!authToken) return;
      
      const response = await fetch(`http://localhost:5454/projects/tables/${projectId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch project tables');
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Update the specific project with its tables
        setProjects(prevProjects => 
          prevProjects.map(project => 
            project.id === projectId 
              ? { 
                  ...project, 
                  tables: data.tables.map((tableName, index) => ({
                    id: index + 1,
                    name: tableName,
                    category: 'datos' // Default category
                  }))
                }
              : project
          )
        );
        
        // Also update activeProject if it's currently selected
        if (activeProject && activeProject.id === projectId) {
          const updatedProject = projects.find(p => p.id === projectId);
          if (updatedProject) {
            setActiveProject({
              ...updatedProject,
              tables: data.tables.map((tableName, index) => ({
                id: index + 1,
                name: tableName,
                category: 'datos' // Default category
              }))
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching project tables:', error);
    }
  };

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
    // Navigate to the detailed Project canvas view instead of showing within this page
    navigate(`/project/${project.id}`);
  };

  const handleViewProjectDetails = (project) => {
    // Use this for viewing project details without the canvas
    setActiveProject(project);
    // Fetch tables for the project if not already loaded
    if (project.tables.length === 0) {
      fetchProjectTables(project.id);
    }
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
      visualizations: [...(activeProject.visualizations || []), newVisualization]
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
      (mockColumns[table.name] || ['id', 'nombre']).map(col => ({
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
          <div className="bg-green-50 p-4 rounded-md flex flex-col items-center justify-center h-40">
            <div className="text-sm font-medium mb-2">{title}</div>
            <div className="flex items-end justify-around w-full h-24 px-4">
              {[40, 70, 30, 85, 50].map((height, i) => (
                <div key={i} className="w-6 bg-[#36C78D]" style={{ height: `${height}%` }}></div>
              ))}
            </div>
          </div>
        );
      case 'line':
        return (
          <div className="bg-green-50 p-4 rounded-md flex flex-col items-center justify-center h-40">
            <div className="text-sm font-medium mb-2">{title}</div>
            <div className="relative w-full h-24">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                <polyline
                  points="0,40 20,35 40,20 60,30 80,10 100,25"
                  fill="none"
                  stroke="#36C78D"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        );
      case 'pie':
        return (
          <div className="bg-green-50 p-4 rounded-md flex flex-col items-center justify-center h-40">
            <div className="text-sm font-medium mb-2">{title}</div>
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <circle cx="16" cy="16" r="16" fill="#ecfdf5" />
                <path
                  d="M16 0A16 16 0 0 1 32 16 16 16 0 0 1 16 32 16 16 0 0 1 0 16"
                  fill="transparent"
                  stroke="#36C78D"
                  strokeWidth="16"
                  strokeDasharray="25 75"
                />
                <path
                  d="M16 0A16 16 0 0 1 32 16 16 16 0 0 1 16 32 16 16 0 0 1 0 16"
                  fill="transparent"
                  stroke="#2da677"
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
          <div className="bg-green-50 p-4 rounded-md flex items-center justify-center h-40">
            <span className="text-gray-500">{title}</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#36C78D] rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              {activeProject ? `Proyecto: ${activeProject.name}` : 'Mis Proyectos'}
            </h1>
          </div>
          
          {!activeProject ? (
            <button 
              onClick={handleCreateProject}
              className="flex items-center bg-[#36C78D] hover:bg-[#2da677] text-white px-4 py-2 rounded-md transition-colors shadow-sm hover:shadow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Crear Proyecto
            </button>
          ) : (
            <div className="flex space-x-3">
              <button 
                onClick={() => handleOpenProject(activeProject)}
                className="flex items-center bg-[#36C78D] hover:bg-[#2da677] text-white px-4 py-2 rounded-md transition-colors shadow-sm hover:shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
                Editar en Canvas
              </button>
              <button 
                onClick={() => setShowCreateVisualization(true)}
                className="flex items-center bg-white border border-[#36C78D] text-[#36C78D] px-4 py-2 rounded-md hover:bg-[#f0fbf7] transition-colors shadow-sm hover:shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Crear Visualización
              </button>
            </div>
          )}
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
            {activeProject ? 'Volver a Proyectos' : 'Volver al Inicio'}
          </button>
        </div>

        {/* Main Content */}
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-[#36C78D] border-t-transparent rounded-full mb-2"></div>
            <p className="text-gray-600">Cargando proyectos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-800 mb-2">Error al cargar proyectos: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-[#36C78D] text-white rounded-md hover:bg-[#2da677]"
            >
              Reintentar
            </button>
          </div>
        ) : activeProject ? (
          <div>
            {/* Project Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-gray-900">Detalles del Proyecto</h2>
                <p className="text-sm text-gray-600 mt-1">{activeProject.description}</p>
                <p className="text-xs text-gray-500 mt-1">Creado el {activeProject.createdAt}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-900">Tablas en este proyecto</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {activeProject.tables && activeProject.tables.length > 0 ? (
                    activeProject.tables.map(table => (
                      <span key={table.id} className="px-3 py-1 bg-green-50 text-[#36C78D] text-xs rounded-full">
                        {table.name} {table.category && <span className="text-green-600">({table.category})</span>}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Cargando tablas...</span>
                  )}
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
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Visualizaciones</h2>
              
              {!activeProject.visualizations || activeProject.visualizations.length === 0 ? (
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
                    <div key={vis.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      {renderVisualizationPlaceholder(vis.type, vis.title)}
                      <div className="p-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-xs text-gray-500">{vis.createdAt}</span>
                            <span className="ml-2 px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
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
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#36C78D] opacity-70 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" />
            </svg>
            <p className="text-gray-600 mb-2 text-lg">No tiene proyectos creados.</p>
            <p className="text-gray-500 mb-6">Cree un nuevo proyecto para empezar a analizar datos.</p>
            <button 
              onClick={handleCreateProject}
              className="bg-[#36C78D] hover:bg-[#2da677] text-white px-6 py-2 rounded-md transition-colors inline-flex items-center shadow hover:shadow-md"
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
              <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all">
                <div className="bg-[#36C78D] h-2" />
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Creado: {project.createdAt}</span>
                    <span>{project.tableCount || 0} tablas</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tables && project.tables.slice(0, 3).map(table => (
                      <span key={table.id} className="px-2 py-1 bg-green-50 text-green-800 text-xs rounded">
                        {table.name}
                      </span>
                    ))}
                    {project.tables && project.tables.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                        +{project.tables.length - 3} más
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#36C78D] mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                      </svg>
                      <span className="text-sm text-gray-600">{project.visualizations?.length || 0} visualizaciones</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewProjectDetails(project)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm transition-colors"
                      >
                        Detalles
                      </button>
                      <button 
                        onClick={() => handleOpenProject(project)}
                        className="bg-[#36C78D] hover:bg-[#2da677] text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Create Visualization Modal */}
      {showCreateVisualization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-6 pb-3 border-b border-gray-200">
              <div className="w-8 h-8 bg-[#36C78D] rounded-full flex items-center justify-center mr-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Crear Nueva Visualización</h2>
            </div>
            
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
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent"
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
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent"
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
                      className="h-4 w-4 text-[#36C78D] border-gray-300 rounded mr-2 focus:ring-[#36C78D]"
                    />
                    <label htmlFor={`col-${col.id}`} className="text-sm text-gray-700">
                      <span className="font-medium">{col.table}</span>.{col.column}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-3 border-t border-gray-200">
              <button
                onClick={() => setShowCreateVisualization(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateVisualization}
                className="px-4 py-2 bg-[#36C78D] hover:bg-[#2da677] text-white rounded-md transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Crear Visualización
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

export default Projects;