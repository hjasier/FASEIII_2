import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CSVUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [firstRowHeaders, setFirstRowHeaders] = useState(true);
    const navigate = useNavigate();

    // Fetch available tables on component mount
    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get('/tables');
                if (response.data) {
                    const response_tables = response.data.results.map((row) => row.table);
                    console.log('Tables:', response_tables);
                    setTables(response_tables);
                    if (response_tables.length > 0) {
                        setSelectedTable(response_tables[0]);
                    }
                }
            } catch (err) {
                console.error('Error fetching tables:', err);
                setError('Error al obtener las tablas disponibles');
            }
        };

        fetchTables();
    }, []);

    // Handle file selection
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
                setError('Por favor, selecciona un archivo CSV válido');
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file);
            setError(null);
            setSuccess(null);
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setError('Por favor, selecciona un archivo CSV para subir');
            return;
        }

        if (!selectedTable) {
            setError('Por favor, selecciona una tabla');
            return;
        }

        // Create form data for upload
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('table', selectedTable);
        formData.append('headers', firstRowHeaders);

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('http://10.10.76.241:5454/upload_csv', formData);

            console.log('Upload response:', response.data);
            setSuccess(`Archivo CSV cargado exitosamente a la tabla ${selectedTable}. Registros procesados: ${response.data.rows_inserted || 'N/A'}`);
            setSelectedFile(null); // Reset file input

            // Reset the file input value
            document.getElementById('csvFileInput').value = '';
        } catch (err) {
            console.error('Error uploading CSV:', err);
            setError(err.response?.data?.message || 'Error al cargar el archivo CSV');
        } finally {
            setIsLoading(false);
        }
    };

    // Navigate back to previous page
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                        <div className="w-10 h-10 bg-[#36C78D] rounded-full flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </div>
                        Cargar datos CSV
                    </h1>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Back button */}
                <div className="mb-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-[#36C78D] hover:text-[#2da677]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Volver
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 max-w-2xl mx-auto">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">Cargar archivo CSV a una tabla existente</h2>

                    {/* Upload form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Table selection */}
                        <div>
                            <label htmlFor="tableSelect" className="block text-sm font-medium text-gray-700 mb-1">
                                Seleccionar tabla
                            </label>
                            <select
                                id="tableSelect"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#36C78D] focus:border-[#36C78D]"
                                value={selectedTable}
                                onChange={(e) => setSelectedTable(e.target.value)}
                                required
                            >
                                {tables.length > 0 ? (
                                    tables.map((table) => (
                                        <option key={table} value={table}>
                                            {table}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>Cargando tablas...</option>
                                )}
                            </select>
                        </div>

                        {/* File input */}
                        <div>
                            <label htmlFor="csvFileInput" className="block text-sm font-medium text-gray-700 mb-1">
                                Archivo CSV
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="csvFileInput"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#36C78D] hover:text-[#2da677] focus-within:outline-none"
                                        >
                                            <span>Cargar un archivo</span>
                                            <input
                                                id="csvFileInput"
                                                name="csvFileInput"
                                                type="file"
                                                accept=".csv,text/csv"
                                                onChange={handleFileChange}
                                                className="sr-only"
                                            />
                                        </label>
                                        <p className="pl-1">o arrastrar y soltar</p>
                                    </div>
                                    <p className="text-xs text-gray-500">CSV hasta 10MB</p>
                                </div>
                            </div>
                            {selectedFile && (
                                <p className="mt-2 text-sm text-gray-600">
                                    Archivo seleccionado: {selectedFile.name}
                                </p>
                            )}
                        </div>

                        {/* Options */}
                        <div className="flex items-center">
                            <input
                                id="firstRowHeaders"
                                type="checkbox"
                                className="h-4 w-4 text-[#36C78D] focus:ring-[#36C78D] border-gray-300 rounded"
                                checked={firstRowHeaders}
                                onChange={(e) => setFirstRowHeaders(e.target.checked)}
                            />
                            <label htmlFor="firstRowHeaders" className="ml-2 block text-sm text-gray-700">
                                La primera fila contiene encabezados de columnas
                            </label>
                        </div>

                        {/* Messages */}
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-600">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-green-600">
                                            {success}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading || !selectedFile}
                                className="bg-[#36C78D] hover:bg-[#2da677] text-white px-4 py-2 rounded-md transition-colors flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Cargando...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Subir CSV
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* CSV Upload Instructions */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 max-w-2xl mx-auto mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Instrucciones para cargar CSV</h3>

                    <div className="prose prose-sm text-gray-700">
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Seleccione la tabla a la que desea cargar los datos.</li>
                            <li>Asegúrese de que su archivo CSV tenga el formato correcto:
                                <ul className="list-disc pl-5 mt-1">
                                    <li>Las columnas deben coincidir con las columnas de la tabla seleccionada.</li>
                                    <li>Si marca "La primera fila contiene encabezados", estos se utilizarán para hacer coincidir las columnas.</li>
                                    <li>Los encabezados de columna deben coincidir exactamente con los nombres de las columnas de la tabla.</li>
                                </ul>
                            </li>
                            <li>El archivo debe tener un tamaño máximo de 10MB.</li>
                            <li>Solo se admiten archivos CSV (valores separados por comas).</li>
                        </ol>

                        <p className="mt-4">Si experimenta problemas durante la carga, revise el formato de su archivo y asegúrese de que los datos sean compatibles con los tipos de datos de las columnas en la tabla.</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-8 py-4">
                <div className="container mx-auto px-4 text-center text-sm text-gray-600">
                    <p>
                        GreenLake Data Explorer - Herramienta de Carga CSV
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default CSVUpload;