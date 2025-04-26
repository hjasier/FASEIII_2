import React, { useContext } from 'react';
import { ChatContext } from '../../../Front-1/src/context/ChatContext';
import './chat.css';

function ConversationHistory() {
  const { conversationHistory } = useContext(ChatContext);

  return (
    <div className="conversation-history">
      <h2>Conversation History</h2>
      <ul>
        {conversationHistory.map((conversation, index) => (
          <li key={index} className="conversation-item">
            {conversation}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConversationHistory;