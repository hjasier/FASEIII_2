
  // First, install Recharts:
  // npm install recharts

  import React, { useState } from 'react';
  import 'reactflow/dist/style.css';






  // Custom nodes
  const TableNode = ({ data }) => {

    console.log("TableNode data:", data);
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


export default TableNode;