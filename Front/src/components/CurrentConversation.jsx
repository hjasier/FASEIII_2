import React from 'react';
import ChatMessage from './ChatMessage';
import './chat.css';

function CurrentConversation({ messages }) {
  return (
    <div className="current-conversation">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
    </div>
  );
}

export default CurrentConversation;