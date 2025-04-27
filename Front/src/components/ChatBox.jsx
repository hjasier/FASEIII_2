import React, { useState, useRef, useEffect } from 'react';

const ChatBox = ({ onExecuteQuery, onCreateChart, tables, isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hola! Soy tu asistente de análisis de datos. Puedo ayudarte a crear consultas SQL o generar gráficos. ¿En qué puedo ayudarte hoy?' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send message to backend LLM API
      const response = await fetch('http://127.0.0.1:5454/expert-generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          tables: tables.map(table => table.name),
          history: messages
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle different types of responses
      if (data.type === 'sql_query') {
        // If the AI generated an SQL query
        setMessages(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: `He generado la siguiente consulta SQL para ti:\n\n\`\`\`sql\n${data.query}\n\`\`\`\n\n`,
            query: data.query
          }
        ]);
      } else if (data.type === 'plot') {
        // If the AI suggested a chart
        setMessages(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: `Puedo generar un ${data.data.chartType === 'bar' ? 'gráfico de barras' : 
                         data.data.chartType === 'line' ? 'gráfico de líneas' : 
                         data.data.chartType === 'scatter' ? 'gráfico de dispersión' :
                         data.data.chartType === 'pie' ? 'gráfico circular' : 'gráfico'}
                          con ${data.data.chartType !== 'pie' ? 
                         `"${data.data.xAxis}" en el eje X y "${data.data.yAxis}" en el eje Y` : 
                         `"${data.data.xAxis}" como categoría`}. 
                         Título: "${data.data.title}"
                         Tabla: "${data.data.tableName}"
                         ¿Quieres generar el gráfico?`,
            chartSuggestion: {
              chartType: data.data.chartType,
              xAxis: data.data.xAxis,
              yAxis: data.data.yAxis,
              title: data.data.title,
              tableName: data.data.tableName,
            }
          }
        ]);
      } else {
        // Regular text response
        setMessages(prev => [
          ...prev, 
          { role: 'assistant', content: data.response || 'Lo siento, no pude procesar tu solicitud.' }
        ]);
      }
    } catch (error) {
      console.error('Error sending message to LLM:', error);
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: 'Lo siento, ocurrió un error al procesar tu mensaje.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecuteQuery = (query) => {
    onExecuteQuery(query);
    setMessages(prev => [
      ...prev, 
      { role: 'assistant', content: 'Ejecutando la consulta...' }
    ]);
  };

  const handleCreateChart = (chartConfig) => {
    console.log('Creating chart with config:', chartConfig);
    onCreateChart(chartConfig);
    setMessages(prev => [
      ...prev, 
      { role: 'assistant', content: 'Creando el gráfico...' }
    ]);
  };

  return (
    <div className={`flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300 ${isOpen ? 'w-96' : 'w-0 overflow-hidden'}`}>
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-7 h-7 bg-[#36C78D] rounded-full flex items-center justify-center mr-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="font-medium text-gray-800">Asistente de Datos</h3>
        </div>
        <button 
          onClick={onToggle}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label="Toggle chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user' 
                  ? 'bg-[#36C78D] text-white rounded-br-none' 
                  : 'bg-white border border-gray-200 shadow-sm rounded-bl-none'
              }`}
            >
              <pre className={`whitespace-pre-wrap break-words text-sm ${message.role === 'user' ? '' : 'text-gray-700'}`}>
                {message.content}
              </pre>
              
              {message.query && (
                <button 
                  onClick={() => handleExecuteQuery(message.query)}
                  className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Ejecutar consulta
                </button>
              )}
              
              {message.chartSuggestion && (
                <button 
                  onClick={() => handleCreateChart(message.chartSuggestion)}
                  className="mt-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                  Crear gráfico
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] bg-white border border-gray-200 rounded-lg px-4 py-3 rounded-bl-none shadow-sm">
              <div className="flex space-x-2">
                <div className="bg-gray-300 w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="bg-gray-300 w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="bg-gray-300 w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex items-center bg-gray-100 rounded-lg px-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 py-2 px-1 bg-transparent outline-none text-sm"
            placeholder="Escribe tu mensaje..."
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className={`ml-2 p-1 rounded-full ${
              isLoading || !inputMessage.trim() ? 'text-gray-400' : 'text-[#36C78D] hover:bg-[#e6f7f1]'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11h2v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;