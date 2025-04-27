    // First, install Recharts:
    // npm install recharts

    import React, { useState, useEffect, useCallback, useRef, useReducer } from 'react';
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
    import TableNode from '../components/TableNode';
    import ChartNode from '../components/ChartNode';
    import ChatBox from '../components/ChatBox';

    // Node types
    const nodeTypes = {
      tableNode: TableNode,
      chartNode: ChartNode,
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
      const [isLoading, setIsLoading] = useState(true);
      const [isCreatingChart, setIsCreatingChart] = useState(false);
      const reactFlowWrapper = useRef(null);
      const [reactFlowInstance, setReactFlowInstance] = useState(null);
      // Add after your existing state declarations
      const [isChatOpen, setIsChatOpen] = useState(false);




      const handleDeleteNode = useCallback((id) => {
        setNodes((nds) => nds.filter((node) => node.id !== id));
        setEdges((eds) => eds.filter(
          (edge) => edge.source !== id && edge.target !== id
        ));
      }, []); // Remove nodes dependency

      const handleDownloadTable = useCallback((id) => {
        // Find the table by id using a functional update pattern
        setNodes(currentNodes => {
          const node = currentNodes.find(node => node.id === id);
          if (!node) return currentNodes;
          
          const tableName = node.data.label;
          
          // Check if this is a query result table
          const isQueryResult = tableName.startsWith('Resultado:');
          
          if (isQueryResult) {
            // Extract the query from the label
            const query = tableName.replace('Resultado: ', '');
            
            fetch('http://127.0.0.1:5454/export_query', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: query,
                type: 'csv'
              })
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.blob();
            })
            .then(blob => {
              // Create a download link and trigger it
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `query_result.csv`;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
            })
            .catch(error => {
              console.error('Error downloading query result:', error);
              alert(`Error al descargar el resultado de la consulta: ${error.message}`);
            });
          } else {
            // Original code for regular tables
            fetch('http://127.0.0.1:5454/export', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                tables: [tableName],
                type: 'csv'
              })
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.blob();
            })
            .then(blob => {
              // Create a download link and trigger it
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${tableName}.csv`;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
            })
            .catch(error => {
              console.error('Error downloading table:', error);
              alert(`Error al descargar la tabla: ${error.message}`);
            });
          }
          
          return currentNodes; // Return unchanged nodes
        });
      }, []);

      const handleCreateChart = useCallback((tableId) => {
        setNodes(currentNodes => {
          const table = currentNodes.find(node => node.id === tableId);
          if (table) {
            setSelectedTable(table);
            setChartTitle(`Gráfico de ${table.data.label}`);
            setChartType('bar');
            setXAxisColumn('');
            setYAxisColumn('');
            setShowChartModal(true);
          }
          return currentNodes; // Return unchanged nodes
        });
      }, []); // Remove nodes dependency



      
      // Load project data
      useEffect(() => {
        const fetchProjectData = async () => {
          try {
            setIsLoading(true);

            // Define the table names we want to fetch
            const tableNames = ['infrastructure', 'sensors'];
            
            // Create the project structure with placeholder for tables
            const projectData = {
              id: '1',
              name: 'Análisis de Infraestructura y Sensores',
              description: 'Estudio sobre la infraestructura y sensores en GreenLake',
              tables: []
            };

            // Fetch column data for each table
            const tablesWithColumns = [];
            
            for (let i = 0; i < tableNames.length; i++) {
              const tableName = tableNames[i];
              try {
                const response = await fetch(`http://127.0.0.1:5454/columns/${tableName}`);
                const data = await response.json();
                
                if (data.metadata.status === 'success') {
                  // Transform the API response to our table format
                  tablesWithColumns.push({
                    id: `table-${i+1}`,
                    name: tableName,
                    columns: data.results.map(col => ({
                      name: col.column_name,
                      type: col.data_type,
                    }))
                  });
                  console.log(`Retrieved columns for ${tableName}:`, data.results);
                } else {
                  console.error(`Error fetching columns for ${tableName}:`, data.metadata.message);
                  // Add table with error message
                  tablesWithColumns.push({
                    id: `table-${i+1}`,
                    name: tableName,
                    columns: [{ name: 'Error loading columns', type: 'error' }]
                  });
                }
              } catch (error) {
                console.error(`Error fetching columns for ${tableName}:`, error);
                // Add table with error message
                tablesWithColumns.push({
                  id: `table-${i+1}`,
                  name: tableName,
                  columns: [{ name: 'Error loading columns', type: 'error' }]
                });
              }
            }

            // Update project with fetched tables
            projectData.tables = tablesWithColumns;
            setProject(projectData);
            
            // Initialize nodes for tables
            // In your useEffect where you set the nodes:

            // Initialize nodes for tables
            const initialNodes = tablesWithColumns.map((table, index) => ({
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
          } catch (error) {
            console.error('Error fetching project data:', error);
            setError('Failed to load project data');
          } finally {
            setIsLoading(false);
          }
        };
        
        fetchProjectData();
      }, [handleDeleteNode, handleDownloadTable, handleCreateChart]); 

      // Function to fetch data for a specific table
      const fetchTableData = async (tableName) => {
        try {
          const response = await fetch('http://127.0.0.1:5454/export', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tables: [tableName],
              type: 'json'
            })
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          return await response.json();
        } catch (error) {
          console.error(`Error fetching data for table ${tableName}:`, error);
          throw error;
        }
      };

      const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds));
      }, []);

      const onInit = (instance) => {
        setReactFlowInstance(instance);
      };

      const handleBack = () => {
        navigate('/projects');
      };

      const handleExecuteQuery = async () => {
        const queryText = sqlQuery.trim();
        if (!queryText) return;
      
        setIsExecuting(true);
        setError(null);
        setShowResultPreview(false);
      
        try {
          const resp = await fetch('http://127.0.0.1:5454/expert_query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: queryText })
          });
      
          const payload = await resp.json();
      
          if (!resp.ok || payload.status === 'error') {
            // backend will include a user‐friendly message
            throw new Error(payload.message || 'Error ejecutando la consulta');
          }
      
          const rows = payload.results;
          if (!Array.isArray(rows) || rows.length === 0) {
            throw new Error('La consulta no devolvió filas.');
          }
      
          // Derivar columnas a partir de la primera fila
          const firstRow = rows[0];
          const columns = Object.keys(firstRow).map((name) => {
            const value = firstRow[name];
            let type = typeof value;
            if (value instanceof Date || /\d{4}-\d{2}-\d{2}/.test(String(value))) {
              type = 'date';
            } else if (type === 'number' && Number.isInteger(value)) {
              type = 'integer';
            } else if (type === 'number') {
              type = 'float';
            } else {
              type = 'varchar';
            }
            return { name, type };
          });
      
          setQueryResult({
            id: `result-${Date.now()}`,
            name: queryText,
            columns,
            rows
          });
          setShowResultPreview(true);
      
        } catch (err) {
          console.error(err);
          setError(err.message);
        } finally {
          setIsExecuting(false);
        }
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


      const handleCreateChartConfirm = async () => {
        if (chartType === 'pie') {
          if (!chartTitle || !xAxisColumn) {
            alert('Por favor complete todos los campos necesarios para el gráfico circular.');
            return;
          }
        } else {
          if (!chartTitle || !xAxisColumn || !yAxisColumn) {
            alert('Por favor complete todos los campos necesarios para el gráfico.');
            return;
          }
        }
      
        try {
          setIsCreatingChart(true);
      
          const tableName = selectedTable.data.label;
      
          // Fetch main table data
          const mainTableData = await fetchTableData(tableName);
      
          // Si el usuario selecciona columnas que son de distintas tablas, deberías detectar y fetchear la segunda tabla
          let secondTableData = null;
          
          if (xAxisColumn.includes('.')) {
            const [secondTableName] = xAxisColumn.split('.');
            if (secondTableName !== tableName) {
              secondTableData = await fetchTableData(secondTableName);
            }
          }
          if (yAxisColumn.includes('.')) {
            const [secondTableName] = yAxisColumn.split('.');
            if (secondTableName !== tableName) {
              secondTableData = await fetchTableData(secondTableName);
            }
          }
      
          // Unificamos data
          let combinedData = mainTableData;
          if (secondTableData) {
            // JOIN lógico (simplemente los mezclamos por índice)
            combinedData = mainTableData.map((row, index) => ({
              ...row,
              ...(secondTableData[index] || {})
            }));
          }
      
          console.log('Original data length:', combinedData.length);
          
          // Estrategia de muestreo de datos
          let processedData = [];
          
          if (chartType === 'pie') {
            // Para gráficos de pastel, agregamos los datos por categoría
            const categoryMap = {};
            combinedData.forEach(row => {
              const category = row[xAxisColumn] || row[xAxisColumn.split('.').pop()];
              if (category) {
                if (categoryMap[category]) {
                  categoryMap[category]++;
                } else {
                  categoryMap[category] = 1;
                }
              }
            });
            processedData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
            
            // Si hay muchas categorías, limitamos a las top 10-15
            if (processedData.length > 15) {
              processedData.sort((a, b) => b.value - a.value);
              const otherCount = processedData.slice(14).reduce((sum, item) => sum + item.value, 0);
              processedData = processedData.slice(0, 14);
              if (otherCount > 0) {
                processedData.push({ name: 'Otros', value: otherCount });
              }
            }
          } else {
            // Filtramos filas con valores nulos o indefinidos
            const filteredData = combinedData.filter(row =>
              (row[xAxisColumn] !== undefined && row[xAxisColumn] !== null) &&
              (row[yAxisColumn] !== undefined && row[yAxisColumn] !== null)
            );
            
            const MAX_DATA_POINTS = 100; // Límite razonable para gráficos de barras/líneas
            
            if (filteredData.length <= MAX_DATA_POINTS) {
              processedData = filteredData;
            } else {
              // Estrategia 1: Muestreo uniforme (tomar puntos distribuidos uniformemente)
              const samplingInterval = Math.ceil(filteredData.length / MAX_DATA_POINTS);
              for (let i = 0; i < filteredData.length; i += samplingInterval) {
                processedData.push(filteredData[i]);
              }
              
              // Alternativa: Estrategia 2 - Agregación de datos por categoría X
              // Esta es una mejor opción si los datos tienen sentido cuando se agrupan
              if (processedData.length === 0) { // Si el muestreo falló por alguna razón
                const aggregatedData = {};
                filteredData.forEach(row => {
                  const xValue = String(row[xAxisColumn] || row[xAxisColumn.split('.').pop()] || 'N/A');
                  if (!aggregatedData[xValue]) {
                    aggregatedData[xValue] = { 
                      count: 0, 
                      sum: 0,
                      min: Number.MAX_VALUE,
                      max: Number.MIN_VALUE
                    };
                  }
                  
                  const yValue = Number(row[yAxisColumn] || row[yAxisColumn.split('.').pop()] || 0);
                  aggregatedData[xValue].count++;
                  aggregatedData[xValue].sum += yValue;
                  aggregatedData[xValue].min = Math.min(aggregatedData[xValue].min, yValue);
                  aggregatedData[xValue].max = Math.max(aggregatedData[xValue].max, yValue);
                });
                
                // Convertimos la agregación a un array y calculamos el promedio
                processedData = Object.entries(aggregatedData).map(([xValue, stats]) => {
                  const aggregatedRow = {};
                  aggregatedRow[xAxisColumn] = xValue;
                  aggregatedRow[yAxisColumn] = stats.sum / stats.count; // promedio
                  return aggregatedRow;
                });
                
                // Limitamos a MAX_DATA_POINTS si sigue siendo grande
                if (processedData.length > MAX_DATA_POINTS) {
                  processedData.sort((a, b) => 
                    Number(b[yAxisColumn]) - Number(a[yAxisColumn])
                  );
                  processedData = processedData.slice(0, MAX_DATA_POINTS);
                }
              }
            }
          }
          
          console.log('Processed data length for chart:', processedData.length);
      
          const position = { x: 100, y: 400 };
          if (reactFlowInstance) {
            const { x, y } = reactFlowInstance.project({ x: 100, y: 400 });
            position.x = x;
            position.y = y;
          }
      
          const chartNodeId = `chart-${Date.now()}`;
          const chartNode = {
            id: chartNodeId,
            type: 'chartNode',
            position,
            data: {
              id: chartNodeId,
              title: chartTitle,
              chartType,
              xAxis: xAxisColumn,
              yAxis: yAxisColumn,
              tableName,
              chartData: processedData,
              onDelete: handleDeleteNode,
            }
          };
      
          setNodes((nds) => [...nds, chartNode]);
          setShowChartModal(false);
      
        } catch (error) {
          console.error('Error creating chart:', error);
          alert(`Error al crear el gráfico: ${error.message}`);
        } finally {
          setIsCreatingChart(false);
        }
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
      {/* ChatBox */}
      {!isLoading && project && (
        <ChatBox 
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen(!isChatOpen)}
          onExecuteQuery={(query) => {
            setSqlQuery(query);
            setIsChatOpen(false);
            handleExecuteQuery();
          }}
          onCreateChart={(chartConfig) => {
            // Find the table node
            const tableNode = nodes.find(node => 
              node.type === 'tableNode' && 
              node.data.label === chartConfig.tableName
            );
            
            if (tableNode) {
              setSelectedTable(tableNode);
              setChartTitle(chartConfig.title);
              setChartType(chartConfig.chartType);
              setXAxisColumn(chartConfig.xAxis);
              setYAxisColumn(chartConfig.yAxis);
              handleCreateChartConfirm();
            }
          }}
          tables={project?.tables || []}
        />
      )}
      
      {/* Chat toggle button - visible when chat is closed */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-r-lg px-2 py-4 z-10 border border-l-0 border-gray-200"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#36C78D]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      
          {/* Canvas area */}
          <div className="flex-1 flex flex-col">
            <div ref={reactFlowWrapper} className="flex-1 h-0">
              {isLoading ? (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
                  <div className="text-center">
                    <div className="animate-spin inline-block w-12 h-12 border-4 border-[#36C78D] border-t-transparent rounded-full mb-4"></div>
                    <p className="text-gray-600">Cargando datos de las tablas...</p>
                  </div>
                </div>
              ) : (
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
              )}
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
                    {chartType === 'pie' ? 'Columna de Categorías' : 'Columna para Eje X'}
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
                
                {chartType !== 'pie' && (
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
                      {selectedTable.data.columns.map((col, idx) => (
                        <option key={idx} value={col.name}>
                          {col.name} ({col.type})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => setShowChartModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleCreateChartConfirm()}
                    disabled={isCreatingChart}
                    className={`px-4 py-2 ${isCreatingChart ? 'bg-gray-400' : 'bg-[#36C78D] hover:bg-[#2da677]'} text-white rounded-md transition-colors flex items-center`}
                  >
                    {isCreatingChart ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creando...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Crear Gráfico
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    export default Project;