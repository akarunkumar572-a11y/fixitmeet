import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaMinus, FaChevronDown } from 'react-icons/fa';
import api from '../services/api';
import './AiAssistant.css';

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'assistant', content: "Hello! I'm FixitMeet AI. How can I help you book a service or find a professional today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, loading]);

  const handleSend = async (e) => {
    if (e) {
      e.preventDefault();
      // Important to stop propagation if it's inside another form or element
      e.stopPropagation();
    }
    
    if (!message.trim() || loading) return;

    // Check login before sending
    if (!isLoggedIn) {
      setChat((prev) => [
        ...prev,
        { role: 'user', content: message },
        { role: 'assistant', content: 'You need to be logged in to chat with the AI and book services. Please log in or register to continue.' }
      ]);
      setMessage('');
      return;
    }

    const currentMsg = message;
    const userMsg = { role: 'user', content: currentMsg };
    setChat((prev) => [...prev, userMsg]);
    setMessage('');
    setLoading(true);

    try {
      // Use the API instance which has the token interceptor
      const response = await api.post('/ai/chat', { message: currentMsg });
      
      if (response.data && response.data.reply) {
        setChat((prev) => [...prev, { role: 'assistant', content: response.data.reply }]);
      } else {
        throw new Error('Empty response from AI');
      }
    } catch (err) {
      console.error('AI Error:', err);
      
      // If error is 401, redirect is already handled by interceptor but we can still show a message here
      const errorMsg = err.response?.status === 401 
        ? 'Session expired. Please log in again.' 
        : 'Oops! I am having trouble connecting to the network right now. Please try again in a few moments.';
        
      setChat((prev) => [
        ...prev,
        { role: 'assistant', content: errorMsg }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (e) => {
    if (e) e.preventDefault();
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  if (!isOpen) {
    return (
      <button className="ai-trigger" onClick={handleToggle} type="button">
        <FaRobot size={24} />
        <span>AI Assistant</span>
      </button>
    );
  }

  return (
    <div className={`ai-container ${isMinimized ? 'minimized' : ''}`} onClick={(e) => e.stopPropagation()}>
      <div className="ai-header" onClick={() => setIsMinimized(!isMinimized)} style={{ cursor: 'pointer' }}>
        <div className="ai-title">
          <FaRobot className="ai-icon" />
          <span>FixitMeet AI</span>
        </div>
        <div className="ai-actions">
          <button type="button" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}>
            {isMinimized ? <FaChevronDown /> : <FaMinus />}
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}><FaTimes /></button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="ai-messages">
            {chat.map((msg, idx) => (
              <div key={idx} className={`ai-message ${msg.role}`}>
                <div className="ai-message-bubble">
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="ai-message assistant">
                <div className="ai-message-bubble loading">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form className="ai-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder={isLoggedIn ? "Ask for healthcare, home services..." : "Please log in first..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              autoComplete="off"
            />
            <button type="submit" disabled={loading || !message.trim()} className="ai-send-btn">
              <FaPaperPlane />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AiAssistant;
