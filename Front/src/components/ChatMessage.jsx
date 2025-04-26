import React from 'react';
import PropTypes from 'prop-types';

function ChatMessage({ message, isUser }) {
  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'model-message'}`}>
      <p>{message}</p>
    </div>
  );
}

ChatMessage.propTypes = {
  message: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
};

export default ChatMessage;