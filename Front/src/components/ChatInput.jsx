import React, { useState } from 'react';

function ChatInput({ onSend }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type your message..."
        className="input-field"
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
}

export default ChatInput;