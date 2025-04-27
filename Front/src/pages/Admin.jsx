import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login'; // Import the Login component
import { apiService } from '../services/api';

function Admin() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for authentication on component mount
    useEffect(() => {
        const authStatus = localStorage.getItem('adminAuthenticated');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    // Load query history from localStorage on component mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('sqlQueryHistory');
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error('Failed to parse query history:', e);
            }
        }
    }, []);

    // Save query history to localStorage
    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem('sqlQueryHistory', JSON.stringify(history));
        }
    }, [history]);

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    const handleQuerySubmit = async (e) => {
        e.preventDefault();

        if (!query.trim()) {
            setError('La consulta SQL no puede estar vacía');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await executeQuery(query);
        } catch (err) {
            setError(err.message || 'Error al ejecutar la consulta');
        } finally {
            setIsLoading(false);
        }
    };

    // Simulated query execution
    const executeQuery = async (sql) => {
        // Add query to history
        const newHistory = [{ sql, timestamp: new Date().toISOString() }, ...history.slice(0, 9)];
        setHistory(newHistory);

        return new Promise(async (resolve) => {
            try {
                const { data, status } = await apiService.post('/admin_query', { query: sql });

                if (status !== 200) {
                    console.error('Error executing query:', data);
                    setError(data.message || 'Unknown error');
                } else {
                    console.log('Query executed successfully:', data);
                    const columns = Object.keys(data.results?.[0] || {});
                    const rows = (data.results || []).map(item => {
                        const row = {};
                        columns.forEach(col => row[col] = item[col]);
                        return row;
                    });
                    setResults({ columns, rows });
                }
            } catch (error) {
                console.error('Error executing query:', error);
                setError(error?.response?.data?.message || error.message || 'Network error');
            } finally {
                resolve();
            }
        });
    };

    const handleSelectHistory = (sql) => {
        setQuery(sql);
    };

    const handleBack = () => {
        navigate('/');
    };

    const handleLogout = () => {
        // Clear admin authentication
        localStorage.removeItem('adminAuthenticated');
        setIsAuthenticated(false);
        // Redirect to login with returnUrl to come back to admin
        navigate('/login?returnUrl=/admin');
    };

    // Function to download the query results as CSV
    const downloadResultsAsCSV = () => {
        if (!results || !results.columns || !results.rows) {
            setError('No hay resultados para descargar');
            return;
        }

        try {
            // Create CSV header row
            let csvContent = results.columns.join(',') + '\n';

            // Create CSV data rows
            csvContent += results.rows.map(row => {
                return results.columns.map(col => {
                    // Handle null/undefined values
                    const value = row[col] !== undefined ? String(row[col]) : '';

                    // Handle values that need escaping (commas, quotes, newlines)
                    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                        // Escape quotes by doubling them and wrap in quotes
                        return `"${value.replace(/"/g, '""')}"`;
                    }
                    return value;
                }).join(',');
            }).join('\n');

            // Create a Blob with the CSV content
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

            // Create a download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
            link.href = url;
            link.setAttribute('download', `query-results-${timestamp}.csv`);
            document.body.appendChild(link);

            // Trigger download and clean up
            link.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (err) {
            setError('Error al descargar el archivo CSV: ' + err.message);
        }
    };

    // Render table from results
    const renderResultTable = () => {
        if (!results) return null;

        // For non-tabular results (like DDL/DML operations)
        if (results.message) {
            return (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
                    <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <p className="font-medium">{results.message}</p>
                            <p className="text-sm">Filas afectadas: {results.affectedRows}</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {results.columns.map((col, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {results.rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                {results.columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {row[col] !== undefined ? String(row[col]) : 'NULL'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    // If not authenticated, use the Login component
    if (!isAuthenticated) {
        return <Login />;
    }

    // Main admin interface if authenticated
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#36C78D] rounded-full flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Administración SQL
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin/csv-upload')}
                            className="flex items-center text-green-600 hover:text-gray-900 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-md transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            Cargar CSV
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                            </svg>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-7xl">
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

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Query Editor Section */}
                    <div className="md:w-2/3">
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Editor SQL</h2>

                            <form onSubmit={handleQuerySubmit}>
                                <div className="mb-4">
                                    <textarea
                                        value={query}
                                        onChange={handleQueryChange}
                                        placeholder="Escriba su consulta SQL aquí..."
                                        className="w-full h-48 p-4 bg-gray-50 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent resize-none"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-[#36C78D] hover:bg-[#2da677] text-white px-4 py-2 rounded-md transition-colors flex items-center"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Ejecutando...
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                </svg>
                                                Ejecutar Consulta
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Error message */}
                            {error && (
                                <div className="mt-4 bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
                                    <div className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <p>{error}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Results Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-medium text-gray-900">Resultados</h2>
                                <div className="flex items-center gap-2">
                                    {results && results.rows && results.rows.length > 0 && (
                                        <>
                                            <button
                                                onClick={downloadResultsAsCSV}
                                                className="flex items-center text-xs px-3 py-1.5 bg-[#36C78D] hover:bg-[#2da677] text-white rounded transition-colors"
                                                title="Descargar resultados como CSV"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                                Descargar CSV
                                            </button>
                                            <span className="text-xs text-gray-500">
                                                {`${results.rows.length} fila(s) encontrada(s)`}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {isLoading ? (
                                <div className="py-12 flex flex-col items-center justify-center">
                                    <div className="animate-spin h-8 w-8 border-4 border-[#36C78D] border-t-transparent rounded-full"></div>
                                    <p className="mt-4 text-gray-500">Ejecutando consulta...</p>
                                </div>
                            ) : results ? (
                                renderResultTable()
                            ) : (
                                <div className="py-12 text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                    </svg>
                                    <p className="mt-2 text-gray-500">Los resultados de su consulta se mostrarán aquí</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar with examples and history */}
                    <div className="md:w-1/3">
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Consultas de Ejemplo</h2>

                            <div className="space-y-3">
                                <button
                                    onClick={() => setQuery("SELECT * FROM cities LIMIT 10;")}
                                    className="w-full py-2 px-3 text-left bg-gray-50 hover:bg-gray-100 rounded-md text-sm text-gray-700 transition-colors"
                                >
                                    SELECT * FROM cities LIMIT 10;
                                </button>

                                <button
                                    onClick={() => setQuery("SELECT i.id, i.location, i.type, a.bay_count FROM public.cities c JOIN public.infrastructure i ON c.id = i.city_id JOIN public.infrastructure_auto_service a ON i.id = a.infra_id WHERE c.name = 'Vyrandel' AND a.electric_vehicle_charging is true;")}
                                    className="w-full py-2 px-3 text-left bg-gray-50 hover:bg-gray-100 rounded-md text-sm text-gray-700 transition-colors"
                                >
                                    SELECT i.id, i.location, i.type, a.bay_count FROM public.cities c JOIN public.infrastructure i ON c.id = i.city_id JOIN public.infrastructure_auto_service a ON i.id = a.infra_id WHERE c.name = 'Vyrandel' AND a.electric_vehicle_charging is true;
                                </button>

                                <button
                                    onClick={() => setQuery("CREATE TABLE IF NOT EXISTS new_sensor (event_time TIMESTAMPTZ NOT NULL, sensor_id UUID NOT NULL REFERENCES sensors(id), measurement_data DOUBLE PRECISION, PRIMARY KEY (event_time, sensor_id));")}
                                    className="w-full py-2 px-3 text-left bg-gray-50 hover:bg-gray-100 rounded-md text-sm text-gray-700 transition-colors"
                                >
                                    CREATE TABLE IF NOT EXISTS new_sensor (event_time TIMESTAMPTZ NOT NULL, sensor_id UUID NOT NULL REFERENCES sensors(id), measurement_data DOUBLE PRECISION, PRIMARY KEY (event_time, sensor_id));

                                </button>
                            </div>

                            <div className="mt-3 text-xs text-gray-500">
                                <p>Haga clic en una consulta para cargarla en el editor</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Historial de Consultas</h2>

                            {history.length === 0 ? (
                                <div className="text-center py-4">
                                    <p className="text-gray-500 text-sm">No hay historial de consultas</p>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-80 overflow-y-auto">
                                    {history.map((item, index) => (
                                        <div key={index} className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                                            <div className="flex justify-between items-start mb-1">
                                                <button
                                                    onClick={() => handleSelectHistory(item.sql)}
                                                    className="text-left text-[#36C78D] hover:text-[#2da677] text-xs font-medium"
                                                >
                                                    Usar consulta
                                                </button>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(item.timestamp).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-700 font-mono truncate">
                                                {item.sql}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* SQL Quick Reference */}
                <div className="bg-white rounded-lg shadow-sm p-6 mt-6 border border-gray-100">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Referencia Rápida SQL</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <h3 className="text-md font-semibold mb-2 text-[#36C78D]">Consultas SELECT</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li><code className="bg-gray-100 px-1 py-0.5 rounded">SELECT * FROM tabla</code> - Seleccionar todas las columnas</li>
                                <li><code className="bg-gray-100 px-1 py-0.5 rounded">SELECT col1, col2 FROM tabla</code> - Seleccionar columnas específicas</li>
                                <li><code className="bg-gray-100 px-1 py-0.5 rounded">SELECT * FROM tabla WHERE condición</code> - Filtrar resultados</li>
                                <li><code className="bg-gray-100 px-1 py-0.5 rounded">SELECT * FROM tabla ORDER BY col</code> - Ordenar resultados</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-md font-semibold mb-2 text-[#36C78D]">Modificación de Datos</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li><code className="bg-gray-100 px-1 py-0.5 rounded">INSERT INTO tabla VALUES (val1, val2)</code> - Insertar datos</li>
                                <li><code className="bg-gray-100 px-1 py-0.5 rounded">UPDATE tabla SET col = val WHERE condición</code> - Actualizar datos</li>
                                <li><code className="bg-gray-100 px-1 py-0.5 rounded">DELETE FROM tabla WHERE condición</code> - Eliminar datos</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-md font-semibold mb-2 text-[#36C78D]">Operadores y Funciones</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li><code className="bg-gray-100 px-1 py-0.5 rounded">AND, OR, NOT</code> - Operadores lógicos</li>
                                <li><code className="bg-gray-100 px-1 py-0.5 rounded">COUNT(), AVG(), SUM()</code> - Funciones de agregación</li>
                                <li><code className="bg-gray-100 px-1 py-0.5 rounded">GROUP BY</code> - Agrupar resultados</li>
                                <li><code className="bg-gray-100 px-1 py-0.5 rounded">HAVING</code> - Filtrar grupos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-8 py-4">
                <div className="container mx-auto px-4 text-center text-sm text-gray-600">
                    <p>
                        GreenLake Data Explorer - Herramienta de Administración SQL
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Admin;