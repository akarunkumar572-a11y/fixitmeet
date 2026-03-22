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
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMsg = { role: 'user', content: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage('');
    setLoading(true);

    try {
      const response = await api.post('/ai/chat', { message });
      const aiReply = { role: 'assistant', content: response.data.reply };
      setChat((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error('AI Error:', err);
      setChat((prev) => [
        ...prev,
        { role: 'assistant', content: 'Oops! I encountered an error. Please make sure you are logged in to use the AI assistant.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button className="ai-trigger" onClick={() => setIsOpen(true)}>
        <FaRobot size={24} />
        <span>AI Assistant</span>
      </button>
    );
  }

  return (
    <div className={`ai-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="ai-header">
        <div className="ai-title">
          <FaRobot className="ai-icon" />
          <span>FixitMeet AI</span>
        </div>
        <div className="ai-actions">
          <button onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <FaChevronDown /> : <FaMinus />}
          </button>
          <button onClick={() => setIsOpen(false)}><FaTimes /></button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="ai-messages">
            {chat.map((msg, idx) => (
              <div key={idx} className={`ai-message ${msg.role}`}>
                <div className="ai-message-bubble">{msg.content}</div>
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
              placeholder="Ask for healthcare, home services..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading}><FaPaperPlane /></button>
          </form>
        </>
      )}
    </div>
  );
};

export default AiAssistant;
