import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  addEdge,
  useNodesState, 
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom nodes
const TableNode = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`bg-white rounded-md shadow-md border border-gray-200 ${expanded ? 'w-80' : 'w-60'}`}>
      <div className="flex items-center justify-between bg-[#36C78D] text-white p-2 rounded-t-md">
        <div className="font-semibold truncate">{data.label}</div>
        <div className="flex space-x-1">
          <button 
            onClick={() => data.onDownload(data.id)}
            className="text-white hover:text-green-100 p-1 rounded"
            title="Descargar datos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-white hover:text-green-100 p-1 rounded"
            title={expanded ? "Contraer" : "Expandir"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {expanded 
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              }
            </svg>
          </button>
          <button 
            onClick={() => data.onDelete(data.id)}
            className="text-white hover:text-red-200 p-1 rounded"
            title="Eliminar tabla"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-2 max-h-60 overflow-y-auto">
        {expanded ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-50">
                <th className="p-1 text-left">Columna</th>
                <th className="p-1 text-left">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {data.columns.map((col, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="p-1">{col.name}</td>
                  <td className="p-1 text-gray-600">{col.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-sm text-gray-600">
            {data.columns.slice(0, 5).map((col, idx) => (
              <div key={idx} className="truncate">{col.name}</div>
            ))}
            {data.columns.length > 5 && (
              <div className="text-gray-400 text-xs">
                +{data.columns.length - 5} más columnas
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="p-2 border-t border-gray-200">
        <button 
          onClick={() => data.onCreateChart(data.id)}
          className="w-full bg-[#36C78D] hover:bg-[#2da677] text-white py-1 px-3 rounded text-sm transition-colors"
        >
          Crear gráfico
        </button>
      </div>
    </div>
  );
};

// Node types
const nodeTypes = {
  tableNode: TableNode,
};

function Project() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState(null);
  const [showChartModal, setShowChartModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [chartType, setChartType] = useState('bar');
  const [chartTitle, setChartTitle] = useState('');
  const [xAxisColumn, setXAxisColumn] = useState('');
  const [yAxisColumn, setYAxisColumn] = useState('');
  const [showResultPreview, setShowResultPreview] = useState(false);
  
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Load project data
  useEffect(() => {
    // In a real app, fetch this from an API
    const mockProject = {
      id: '1',
      name: 'Análisis de Salud Pública',
      description: 'Estudio sobre los hospitales y emergencias médicas en GreenLake',
      tables: [
        {
          id: 'table-1',
          name: 'Hospitales',
          columns: [
            { name: 'id', type: 'integer' },
            { name: 'nombre', type: 'varchar' },
            { name: 'direccion', type: 'varchar' },
            { name: 'capacidad', type: 'integer' },
            { name: 'especialidad', type: 'varchar' },
            { name: 'zona', type: 'varchar' },
            { name: 'num_doctores', type: 'integer' },
          ]
        },
        {
          id: 'table-2',
          name: 'Emergencias',
          columns: [
            { name: 'id', type: 'integer' },
            { name: 'hospital_id', type: 'integer' },
            { name: 'fecha', type: 'date' },
            { name: 'tipo', type: 'varchar' },
            { name: 'gravedad', type: 'integer' },
            { name: 'tiempo_respuesta', type: 'integer' },
          ]
        },
      ]
    };
    
    setProject(mockProject);
    
    // Initialize nodes for tables
    const initialNodes = mockProject.tables.map((table, index) => ({
      id: table.id,
      type: 'tableNode',
      position: { x: 100 + index * 250, y: 100 },
      data: {
        id: table.id,
        label: table.name,
        columns: table.columns,
        onDelete: handleDeleteNode,
        onDownload: handleDownloadTable,
        onCreateChart: handleCreateChart,
      }
    }));
    
    setNodes(initialNodes);
  }, []);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onInit = (instance) => {
    setReactFlowInstance(instance);
  };

  const handleBack = () => {
    navigate('/projects');
  };

  const handleExecuteQuery = () => {
    if (!sqlQuery.trim()) return;
    
    setIsExecuting(true);
    setError(null);
    
    // In a real app, this would be an API call to execute the SQL
    setTimeout(() => {
      try {
        // Mock SQL execution - this is just a simulation
        const query = sqlQuery.toLowerCase();
        
        if (query.includes('select') && query.includes('from')) {
          // Mock result for select query
          const mockResult = {
            id: `result-${Date.now()}`,
            name: 'Query Result',
            columns: [
              { name: 'hospital_nombre', type: 'varchar' },
              { name: 'num_emergencias', type: 'integer' },
              { name: 'gravedad_promedio', type: 'float' },
            ],
            rows: [
              { hospital_nombre: 'Hospital Central', num_emergencias: 245, gravedad_promedio: 3.7 },
              { hospital_nombre: 'Clínica Norte', num_emergencias: 187, gravedad_promedio: 2.9 },
              { hospital_nombre: 'Hospital Universitario', num_emergencias: 312, gravedad_promedio: 4.2 },
            ]
          };
          
          setQueryResult(mockResult);
          setShowResultPreview(true);
          
        } else if (query.includes('join')) {
          // Mock result for join query
          const mockResult = {
            id: `result-${Date.now()}`,
            name: 'Join Result',
            columns: [
              { name: 'nombre', type: 'varchar' },
              { name: 'tipo', type: 'varchar' },
              { name: 'fecha', type: 'date' },
              { name: 'gravedad', type: 'integer' },
            ],
            rows: [
              { nombre: 'Hospital Central', tipo: 'Trauma', fecha: '2025-04-10', gravedad: 4 },
              { nombre: 'Hospital Central', tipo: 'Respiratorio', fecha: '2025-04-12', gravedad: 3 },
              { nombre: 'Clínica Norte', tipo: 'Cardiaco', fecha: '2025-04-15', gravedad: 5 },
            ]
          };
          
          setQueryResult(mockResult);
          setShowResultPreview(true);
          
        } else {
          throw new Error('Consulta no soportada. Por favor use consultas SELECT o JOIN.');
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setIsExecuting(false);
      }
    }, 800);
  };

  const handleAddQueryResult = () => {
    if (!queryResult) return;
    
    const newNodeId = queryResult.id;
    const position = { x: 100, y: 300 };
    
    // If we have a flow instance, calculate better position
    if (reactFlowInstance) {
      const { x, y } = reactFlowInstance.project({ x: 100, y: 300 });
      position.x = x;
      position.y = y;
    }
    
    const newNode = {
      id: newNodeId,
      type: 'tableNode',
      position,
      data: {
        id: newNodeId,
        label: `Resultado: ${queryResult.name}`,
        columns: queryResult.columns,
        onDelete: handleDeleteNode,
        onDownload: handleDownloadTable,
        onCreateChart: handleCreateChart,
      }
    };
    
    setNodes((nds) => [...nds, newNode]);
    setShowResultPreview(false);
  };

  const handleDeleteNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter(
      (edge) => edge.source !== id && edge.target !== id
    ));
  };

  const handleDownloadTable = (id) => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log(`Downloading table ${id}`);
    alert(`Descargando datos de la tabla ${id}...`);
  };

  const handleCreateChart = (tableId) => {
    const table = nodes.find(node => node.id === tableId);
    if (table) {
      setSelectedTable(table);
      setChartTitle(`Gráfico de ${table.data.label}`);
      setChartType('bar');
      setXAxisColumn('');
      setYAxisColumn('');
      setShowChartModal(true);
    }
  };

  const handleCreateChartConfirm = () => {
    if (!chartTitle || !xAxisColumn || !yAxisColumn) {
      alert('Por favor complete todos los campos necesarios para el gráfico.');
      return;
    }
    
    // In a real app, this would create a chart and add it to the project
    console.log('Creating chart:', {
      title: chartTitle,
      type: chartType,
      table: selectedTable.id,
      xAxis: xAxisColumn,
      yAxis: yAxisColumn
    });
    
    // Mock implementation - just show an alert
    alert(`Gráfico "${chartTitle}" creado exitosamente.`);
    setShowChartModal(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <button 
            onClick={handleBack}
            className="flex items-center text-[#36C78D] hover:text-[#2da677] mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver a proyectos
          </button>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#36C78D] rounded-full flex items-center justify-center mr-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800">
              {project ? project.name : 'Cargando proyecto...'}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-green-50 rounded-full px-3 py-1">
            <span className="text-[#36C78D] text-sm font-medium">Proyecto #{projectId}</span>
          </div>
        </div>
      </div>
      
      {/* Project description */}
      {project && (
        <div className="bg-white px-4 py-2 border-b border-gray-200">
          <p className="text-sm text-gray-600">{project.description}</p>
        </div>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        {/* Canvas area */}
        <div className="flex-1 flex flex-col">
          <div ref={reactFlowWrapper} className="flex-1 h-0">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              nodeTypes={nodeTypes}
              fitView
              className="bg-gradient-to-br from-green-50 to-blue-50"
            >
              <Background color="#36C78D" variant="dots" size={1} gap={16} />
              <MiniMap 
                style={{ 
                  backgroundColor: 'rgba(54, 199, 141, 0.1)',
                  maskColor: 'rgba(54, 199, 141, 0.3)'
                }} 
                nodeColor="#36C78D"
              />
              <Controls />
            </ReactFlow>
          </div>
          
          {/* SQL query area */}
          <div className="bg-white border-t border-gray-200 p-4 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#36C78D]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h3 className="font-medium text-gray-800">Consulta SQL</h3>
              </div>
              <button 
                onClick={handleExecuteQuery}
                disabled={isExecuting || !sqlQuery.trim()}
                className={`px-4 py-1 rounded-full text-white text-sm transition-all flex items-center ${
                  isExecuting || !sqlQuery.trim() 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-[#36C78D] hover:bg-[#2da677] shadow-sm hover:shadow'
                }`}
              >
                {isExecuting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Ejecutando...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ejecutar consulta
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-50 rounded-md border border-gray-200">
              <textarea
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="w-full p-3 rounded-md bg-transparent font-mono text-sm h-24 focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent transition-all"
                placeholder="Escriba su consulta SQL aquí... (ej: SELECT * FROM Hospitales)"
              />
            </div>
            {error && (
              <div className="mt-2 text-red-600 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Query Result Preview Modal */}
      {showResultPreview && queryResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#36C78D] rounded-full flex items-center justify-center mr-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Resultado de la consulta</h2>
              </div>
              <button 
                onClick={() => setShowResultPreview(false)}
                className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="overflow-x-auto flex-1 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-50">
                  <tr>
                    {queryResult.columns.map((col, idx) => (
                      <th 
                        key={idx} 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {queryResult.rows.map((row, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {queryResult.columns.map((col, colIdx) => (
                        <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {row[col.name]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end mt-4 pt-3 border-t border-gray-200 space-x-3">
              <button
                onClick={() => setShowResultPreview(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddQueryResult}
                className="px-4 py-2 bg-[#36C78D] hover:bg-[#2da677] text-white rounded-md transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Añadir al Canvas
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Create Chart Modal */}
      {showChartModal && selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-6 pb-3 border-b border-gray-200">
              <div className="w-8 h-8 bg-[#36C78D] rounded-full flex items-center justify-center mr-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Crear Gráfico</h2>
            </div>
            
            <div className="mb-4">
              <label htmlFor="chartTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Título del Gráfico
              </label>
              <input
                type="text"
                id="chartTitle"
                value={chartTitle}
                onChange={(e) => setChartTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="chartType" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Gráfico
              </label>
              <select
                id="chartType"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent"
              >
                <option value="bar">Gráfico de Barras</option>
                <option value="line">Gráfico de Líneas</option>
                <option value="pie">Gráfico Circular</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="xAxis" className="block text-sm font-medium text-gray-700 mb-1">
                Columna para Eje X
              </label>
              <select
                id="xAxis"
                value={xAxisColumn}
                onChange={(e) => setXAxisColumn(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent"
              >
                <option value="">Seleccionar columna</option>
                {selectedTable.data.columns.map((col, idx) => (
                  <option key={idx} value={col.name}>
                    {col.name} ({col.type})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="yAxis" className="block text-sm font-medium text-gray-700 mb-1">
                Columna para Eje Y
              </label>
              <select
                id="yAxis"
                value={yAxisColumn}
                onChange={(e) => setYAxisColumn(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent"
              >
                <option value="">Seleccionar columna</option>
                {selectedTable.data.columns
                  .filter(col => ['integer', 'float', 'number'].includes(col.type))
                  .map((col, idx) => (
                    <option key={idx} value={col.name}>
                      {col.name} ({col.type})
                    </option>
                  ))
                }
              </select>
            </div>
            
            <div className="flex justify-end space-x-3 pt-3 border-t border-gray-200">
              <button
                onClick={() => setShowChartModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateChartConfirm}
                className="px-4 py-2 bg-[#36C78D] hover:bg-[#2da677] text-white rounded-md transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Crear Gráfico
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;