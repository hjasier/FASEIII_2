import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LLMChat() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // Mock conversation history
  useEffect(() => {
    // This would be an API call in production
    const mockConversations = [
      { id: 1, title: 'Análisis de calidad del aire', date: '2025-04-24', preview: '¿Cuáles son las zonas con mejor calidad del aire?' },
      { id: 2, title: 'Estudio de transporte público', date: '2025-04-22', preview: '¿Qué rutas de transporte tienen mayor demanda?' },
      { id: 3, title: 'Consulta sobre datos educativos', date: '2025-04-20', preview: 'Muéstrame las escuelas con mejor rendimiento' }
    ];
    setConversations(mockConversations);
  }, []);

  // Set initial conversation
  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      handleSelectConversation(conversations[0]);
    }
  }, [conversations, activeConversation]);

  // Handle conversation selection
  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    
    // In production, fetch messages for this conversation
    const mockMessages = [
      { id: 1, role: 'user', content: conversation.preview },
      { id: 2, role: 'assistant', content: 'Analizando los datos de GreenLake, puedo indicar que las zonas con mejor calidad del aire son los distritos Norte y Este, especialmente cerca de los parques urbanos principales. Los sensores registran niveles de PM2.5 por debajo de 10μg/m³ en estas áreas, lo que es considerado excelente según estándares internacionales.' }
    ];
    
    if (conversation.id === 2) {
      mockMessages[0].content = conversation.preview;
      mockMessages[1].content = 'Según los datos de tránsito de GreenLake, las rutas con mayor demanda son la Línea Verde (conectando el centro con el distrito universitario) y la Línea Azul (que une las zonas residenciales del norte con el distrito comercial). Estas rutas muestran un promedio de ocupación del 85% en horarios pico.';
    } else if (conversation.id === 3) {
      mockMessages[0].content = conversation.preview;
      mockMessages[1].content = 'Los datos educativos de GreenLake muestran que la Escuela Marina González, el Instituto Tecnológico Norte y el Colegio Bilingüe del Este tienen los mejores indicadores de rendimiento académico, con tasas de graduación superiores al 95% y calificaciones promedio por encima de 8.5/10.';
    }
    
    setMessages(mockMessages);
  };

  // Handle new conversation
  const handleNewConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: 'Nueva conversación',
      date: new Date().toISOString().split('T')[0],
      preview: ''
    };
    
    setConversations([newConversation, ...conversations]);
    setActiveConversation(newConversation);
    setMessages([]);
  };

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputText
    };

    // Update messages with user input
    setMessages([...messages, newUserMessage]);
    setInputText('');
    
    // Update current conversation preview
    if (activeConversation) {
      const updatedConversation = {
        ...activeConversation,
        preview: inputText,
        date: new Date().toISOString().split('T')[0]
      };
      setActiveConversation(updatedConversation);
      setConversations(conversations.map(c => 
        c.id === activeConversation.id ? updatedConversation : c
      ));
    }

    // Simulate API response
    setIsLoading(true);
    
    // Wait for 1-2 seconds to simulate API call
    setTimeout(() => {
      const newAssistantMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: getAssistantResponse(inputText)
      };
      
      setMessages(prev => [...prev, newAssistantMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  // Simple response generation based on keywords
  const getAssistantResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('calidad del aire') || lowerQuery.includes('contaminación')) {
      return 'Los datos de calidad del aire de GreenLake muestran variaciones significativas entre distritos. Las zonas residenciales del norte tienen los mejores índices con un AQI promedio de 35, mientras que el distrito industrial sur registra valores de hasta 95 en horarios de alta actividad. Los proyectos de reforestación urbana han mejorado la calidad en un 15% en los últimos dos años.';
    } 
    else if (lowerQuery.includes('transporte') || lowerQuery.includes('tráfico')) {
      return 'El sistema de transporte de GreenLake incluye 8 líneas principales de autobús eléctrico con un total de 143 unidades que sirven al 85% de la población urbana. Los datos de tráfico indican que las horas pico (7:30-9:00 am y 17:30-19:00 pm) presentan la mayor congestión, especialmente en los accesos al distrito financiero. La iniciativa de carriles exclusivos ha reducido los tiempos de viaje en un 23% en rutas críticas.';
    }
    else if (lowerQuery.includes('energía') || lowerQuery.includes('consumo')) {
      return 'GreenLake ha implementado un sistema de monitoreo energético que cubre el 92% de edificios públicos. Los datos indican un consumo promedio de 145 kWh/m² anual, con una reducción del 17% respecto al año anterior gracias a la implementación de tecnologías eficientes. El 65% de la energía proviene de fuentes renovables, principalmente solar (38%) y eólica (27%).';
    }
    else if (lowerQuery.includes('agua') || lowerQuery.includes('consumo de agua')) {
      return 'El consumo de agua en GreenLake tiene un promedio de 120 litros diarios per cápita, por debajo de la media nacional. Los sistemas de captación de agua pluvial instalados en edificios públicos han recuperado más de 12 millones de litros en el último año. La calidad del agua potable cumple con el 99.7% de los estándares internacionales según análisis recientes.';
    }
    else {
      return 'Basado en los datos disponibles de GreenLake, puedo proporcionarle información detallada sobre calidad del aire, consumo energético, gestión del agua, transporte público, y otros aspectos ambientales o urbanos. ¿Hay algún área específica sobre la que le gustaría conocer más detalles o tendencias?';
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={handleBack}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="w-10 h-10 bg-[#36C78D] rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-[#36C78D]">GreenLake</span> Asistente IA
            </h1>
          </div>
        </div>
      </header>

      {/* Main chat interface */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversation history sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <button 
              onClick={handleNewConversation}
              className="w-full flex items-center justify-center bg-[#36C78D] hover:bg-[#2da677] text-white px-4 py-2 rounded-md transition-colors shadow-sm hover:shadow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Nueva conversación
            </button>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {conversations.map(conversation => (
              <div 
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation)}
                className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-green-50 transition-colors ${
                  activeConversation?.id === conversation.id ? 'bg-green-50 border-l-4 border-l-[#36C78D]' : ''
                }`}
              >
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{conversation.title}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate">{conversation.preview}</p>
                  </div>
                </div>
                <div className="mt-1 text-xs text-right text-gray-400">{conversation.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Current conversation area */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="flex-1 mx-20 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#36C78D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h2 className="text-xl font-medium text-gray-900 mb-2">¿Cómo puedo ayudarte hoy?</h2>
                <p className="text-gray-600 max-w-md mb-6">
                  Puedes preguntarme sobre los datos de GreenLake: calidad del aire, consumo energético, transporte, y más.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
                  {[
                    "¿Cuáles son las zonas con mejor calidad del aire?",
                    "Muéstrame tendencias de consumo energético",
                    "¿Qué rutas de transporte tienen mayor demanda?",
                    "Analiza la eficiencia del uso de agua en la ciudad"
                  ].map((suggestion, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setInputText(suggestion)}
                      className="p-3 border border-gray-200 rounded-lg text-left text-sm hover:bg-gray-50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-2xl rounded-lg py-2 px-4 ${
                        message.role === 'user' 
                          ? 'bg-[#36C78D] text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg py-2 px-4 rounded-bl-none">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Message input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36C78D] focus:border-transparent resize-none"
                  rows={1}
                  style={{ 
                    minHeight: '44px', 
                    maxHeight: '200px',
                    height: 'auto'
                  }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                  }}
                />
              </div>
              <button 
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className={`p-3 rounded-lg ${
                  !inputText.trim() || isLoading
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#36C78D] text-white hover:bg-[#2da677]'
                } transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              El asistente IA de GreenLake te proporciona información basada en los datos de la ciudad sostenible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LLMChat;