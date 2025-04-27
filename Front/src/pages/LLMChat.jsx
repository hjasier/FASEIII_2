import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { marked } from 'marked';
import ReactMarkdown from 'react-markdown'; // Import the library


function LLMChat() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

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

  // Handle initial query from home page
  useEffect(() => {
    const initialQuery = location.state?.query;
    
    if (initialQuery) {
      // Create a new conversation with the initial query
      const newConversation = {
        id: Date.now(),
        title: initialQuery.length > 20 ? initialQuery.substring(0, 20) + '...' : initialQuery,
        date: new Date().toISOString().split('T')[0],
        preview: initialQuery
      };
      
      setConversations(prevConversations => [newConversation, ...prevConversations]);
      setActiveConversation(newConversation);
      
      // Create user message
      const userMessage = {
        id: 1,
        role: 'user',
        content: initialQuery
      };
      
      setMessages([userMessage]);
      
      // Make API call with initial query
      fetchAnswerFromAPI(initialQuery);
    }
  }, [location.state]);

  // Set initial conversation if none active
  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      handleSelectConversation(conversations[0]);
    }
  }, [conversations, activeConversation]);

  const processMarkdown = (markdown) => {
    let sectionData = [];
  
    // Primero eliminamos las líneas horizontales '---'
    let processedContent = markdown.replace(/---/g, '');
  
    // Reemplazamos ### título con <h3>título</h3>
    processedContent = processedContent.replace(/###\s*(.+)/g, '<br><h3>$1</h3>');
  
    // Reemplazamos ## título con <h2>título</h2>
    processedContent = processedContent.replace(/##\s*(.+)/g, '<br><h2>$1</h2>');
  
    // Luego reemplazamos saltos de línea restantes por <br>
    processedContent = processedContent.replace(/\n/g, '<br>');
  
    return marked(processedContent);
  };
  


  // API call to get answer
  const fetchAnswerFromAPI = async (question) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5454/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({question})
      });
      
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
      
      const data = await response.json();
      
      // Create assistant message with API response
      const assistantMessage = {
        id: messages.length + 1,
        role: 'assistant',
        content: data.message || '',
        graph: data.graph_base64 || null,
        db_data: data.db_data || null,
        sql: data.sql_generated || null
      };

      if (data.graph_base64) {
        assistantMessage.message = "Analizando datos..."; 
      }


      setMessages(prev => [...prev, assistantMessage]);

      // Update the streaming part in your fetchAnswerFromAPI function

      if (data.graph_base64) {
        const response = await fetch('http://localhost:5454/explain-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            image_base64: data.graph_base64,
            initial_prompt: question
          })
        });
        

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        // Initialize with empty content
        assistantMessage.content = '';
        setMessages(prev => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = assistantMessage;
          return updatedMessages;
        });

        let buffer = ''; // Buffer to accumulate chunks before processing

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Add new chunk to buffer
          const chunk = decoder.decode(value);
          buffer += chunk;
          
          // Process complete SSE messages from the buffer
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep the incomplete line in the buffer
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const text = line.substring(6); // Remove 'data: ' prefix
              if (text) {
                // Check if we need to add line breaks to maintain markdown format
                if (assistantMessage.content && text.match(/^#+\s|^\d+\.\s|^-\s|^\*\s/)) {
                  // If the new text starts with markdown syntax (heading, list item), add double newline before it
                  assistantMessage.content += '\n\n' + text;
                } else {
                  assistantMessage.content += text;
                }
                
                setMessages(prev => {
                  const updatedMessages = [...prev];
                  updatedMessages[updatedMessages.length - 1] = { ...assistantMessage };
                  return updatedMessages;
                });
              }
            }
          }
        }
      }
      


    } catch (error) {
      console.error('Error fetching from API:', error);
      
      // Show error message
      const errorMessage = {
        id: messages.length + 1,
        role: 'assistant',
        content: 'Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle conversation selection
  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    
    // Reset messages when selecting a conversation
    // In a real app, you would fetch the messages from an API
    setMessages([
      { id: 1, role: 'user', content: conversation.preview }
    ]);
    
    // Fetch the answer for this conversation
    fetchAnswerFromAPI(conversation.preview);
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

    // Make API call with the question
    fetchAnswerFromAPI(inputText);
  };

  const handleBack = () => {
    navigate('/');
  };

  // Helper function to render message content
  const renderMessageContent = (message) => {
    if (message.role === 'user') {
      return <p className="text-sm whitespace-pre-wrap">{message.content}</p>;
    }
    
    return (
      <div className="space-y-3">

                {message.content && (
                  <div className="text-sm prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:my-2 prose-li:my-0 prose-ul:my-2 prose-ol:my-2"
                      dangerouslySetInnerHTML={{ __html: processMarkdown(message.content) }}>
                  </div>
                )}
          
                {message.graph && (
                <div className="mt-3">
                  <img 
                  src={`data:image/png;base64,${message.graph}`} 
                  alt="Graph visualization" 
                  className="max-w-full rounded-lg border border-gray-200"
                  />
                </div>
                )}
                
                {/* Show SQL query if available */}
                {message.sql && (
                <div className="mt-2 flex flex-col items-center">
                  <button 
                  className="flex items-center text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    const sqlElement = document.getElementById(`sql-${message.id}`);
                    if (sqlElement) {
                    sqlElement.style.display = sqlElement.style.display === 'none' ? 'block' : 'none';
                    }
                  }}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 3.293a1 1 0 011.414 1.414l-14 14a1 1 0 01-1.414-1.414l14-14zM4 4h10a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm1 2v10h10V6H5z" />
                  </svg>
                  Ver SQL
                  </button>
                  <div id={`sql-${message.id}`} style={{ display: 'none' }} className="mt-2 p-2 bg-gray-800 text-gray-100 rounded overflow-x-auto text-xs">
                  <pre>{message.sql}</pre>
                  </div>
                </div>
                )}
                
                {/* Show data table if available */}
                {message.db_data && message.db_data.length > 0 && (
                <div className="mt-3 flex flex-col items-center">
                  <button 
                  className="flex items-center text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    const tableElement = document.getElementById(`table-${message.id}`);
                    if (tableElement) {
                    tableElement.style.display = tableElement.style.display === 'none' ? 'block' : 'none';
                    }
                  }}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 3h14a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v10h14V5H3zm2 2h10v2H5V7zm0 4h10v2H5v-2z" />
                  </svg>
                  Ver Tabla
                  </button>
                  <div id={`table-${message.id}`} style={{ display: 'none' }} className="mt-3 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded">
                    <tbody className="bg-white divide-y divide-gray-200">
                    {message.db_data.map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-3 py-2 text-sm text-gray-700">
                        {cell}
                        </td>
                      ))}
                      </tr>
                    ))}
                    </tbody>
                  </table>
                  </div>
                </div>
                )}
        
      </div>
    );
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
                      {renderMessageContent(message)}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#f3f4f66b] rounded-lg py-2 px-4 rounded-bl-none">
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