import React, { useState, useEffect, useRef } from 'react';
import '../style.css'




function Sarah() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [currentUser, setCurrentUser] = useState('Sarah');


  useEffect(() => {
    try {
      const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
      if (storedMessages.length > 0) {
        setMessages(storedMessages);
      }
    } catch (error) {
      console.error('There is an error:', error);
    }
  }, []);


  useEffect(() => {
    try {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    } catch (error) {
      console.error('There is an error:', error);
    }
  }, [messages]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === '')
    {
        return;
    } else {
        
    const newMessage = {
        id: Date.now().toString(),
        sender: currentUser,
        text: inputText,
        messageTime: new Date().toLocaleString('en-US', { hour: "numeric", minute: "numeric", hour12: true })
      };
  
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const toggleUser = () => {
    setCurrentUser(currentUser === 'David' ? 'Sarah' : 'David');
  };


  return (
    <div className="chat-app">
      <button onClick={toggleUser} className="toggle-btn">
        Current user: {currentUser}
      </button>

      <div className="chat-container">
        <div className="text-space">
          <h1 className="chatheader">{currentUser === 'David' ? 'Sarah' : 'David'}</h1>

          <div className="text-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message-example ${message.sender === currentUser ? 'chat-box-color1' : 'chat-box-color2'}`}
              >
                <span className="message-sender">{message.sender}</span>
                
                {editingId === message.id ? (
                  <div className="edit-container">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                    />
                    <div className="edit-actions">
                      <button 
                        onClick={() => {
                          setMessages(messages.map(msg => 
                            msg.id === message.id ? { ...msg, text: editText } : msg
                          ));
                          setEditingId(null);
                        }} 
                        className="edit-btn"
                      >
                        Save
                      </button>
                      <button onClick={() => setEditingId(null)} className="edit-btn">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="text">{message.text}</span>
                )}
                
                <div className="message-footer">
                  <span className="time-of-message">{message.messageTime}</span>
                  
                  {message.sender === currentUser && !editingId && (
                    <div className="message-actions">
                      <button 
                        onClick={() => {
                          setEditingId(message.id);
                          setEditText(message.text);
                        }} 
                        className="action-btn"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => setMessages(messages.filter(msg => msg.id !== message.id))} 
                        className="action-btn"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div/>
          </div>

          <form className="text-form" onSubmit={handleSubmit}>
            <input
              className="text-box"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type here"
              required
            />
            <button type="submit" className="text-sender">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sarah;
