import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiUser, FiCpu, FiCheckCircle, FiCalendar, FiTool, FiArrowRight } from 'react-icons/fi';
import Card from '../../components/common/Card/Card';
import styles from './AIBooking.module.css';

const AIBooking = () => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: "Hello! I'm your FixitMeet AI Assistant. Tell me what service you're looking for or describe your problem (e.g., 'My AC isn't cooling' or 'I need a dental checkup')." }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: input };
        const query = input.toLowerCase();
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/services`);
            if (!res.ok) throw new Error('Network response was not ok');
            const services = await res.json();
            
            let matchedServices = services.filter(s => 
                (s.name && s.name.toLowerCase().includes(query)) || 
                (s.description && s.description.toLowerCase().includes(query)) ||
                (s.category && s.category.toLowerCase().includes(query))
            );

            if (matchedServices.length === 0) {
                // fallback generic search by splitting terms
                const terms = query.split(' ').filter(t => t.length > 2);
                matchedServices = services.filter(s => 
                    terms.some(t => 
                        (s.name && s.name.toLowerCase().includes(t)) || 
                        (s.description && s.description.toLowerCase().includes(t)) ||
                        (s.category && s.category.toLowerCase().includes(t))
                    )
                );
            }

            // Simulate AI thinking time
            setTimeout(() => {
                let botResponse = "";
                let suggestions = null;

                if (matchedServices.length > 0) {
                    botResponse = `I found **${matchedServices.length}** service(s) matching your request. Based on our AI matching engine, I recommend **${matchedServices[0].name}** in the **${matchedServices[0].category}** category. Would you like to view more details?`;
                    // Deduplicate suggestions up to 3
                    const uniqueNames = [...new Set(matchedServices.map(s => s.name))];
                    suggestions = uniqueNames.slice(0, 3);
                } else {
                    botResponse = "I couldn't find an exact match for your problem right now. Could you try describing it differently, or specify if it's related to Healthcare, Home Services, or Pest Control?";
                    suggestions = ["Healthcare", "Home Services", "Pest Control"];
                }

                setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse, suggestions }]);
                setIsTyping(false);
            }, 1000);
        } catch (err) {
            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: `Sorry, there was an error connecting to our matching servers: ${err.message}` }]);
            setIsTyping(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatWrapper}>
                <header className={styles.chatHeader}>
                    <div className={styles.aiInfo}>
                        <div className={styles.aiIcon}><FiCpu /></div>
                        <div>
                            <h3>FixitMeet AI Assistant</h3>
                            <p>Powered by Advanced Matching Engine</p>
                        </div>
                    </div>
                    <div className={styles.status}>Online</div>
                </header>

                <div className={styles.chatBody}>
                    {messages.map(msg => (
                        <div key={msg.id} className={`${styles.message} ${styles[msg.type]}`}>
                            <div className={styles.msgContent}>
                                <div className={styles.msgText}>{msg.text}</div>
                                {msg.suggestions && (
                                    <div className={styles.suggestions}>
                                        {msg.suggestions.map(s => (
                                            <button key={s} className={styles.sugBtn}>{s}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className={`${styles.message} ${styles.bot}`}>
                            <div className={styles.typing}><span></span><span></span><span></span></div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div className={styles.chatFooter}>
                    <div className={styles.inputArea}>
                        <input
                            type="text"
                            placeholder="Describe your problem..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button className={styles.sendBtn} onClick={handleSend}><FiSend /></button>
                    </div>
                </div>
            </div>

            <div className={styles.sideCol}>
                <Card className={styles.smartCard}>
                    <h3>Smart Match Insights</h3>
                    <div className={styles.insightItem}>
                        <FiCheckCircle className={styles.iIcon} />
                        <div>
                            <strong>98% Success Rate</strong>
                            <p>AI matching accuracy for Home Services.</p>
                        </div>
                    </div>
                    <div className={styles.insightItem}>
                        <FiCalendar className={styles.iIcon} />
                        <div>
                            <strong>Instant Scheduling</strong>
                            <p>Direct sync with professional calendars.</p>
                        </div>
                    </div>
                    <div className={styles.insightItem}>
                        <FiTool className={styles.iIcon} />
                        <div>
                            <strong>Price Transparency</strong>
                            <p>AI-calculated upfront estimates.</p>
                        </div>
                    </div>
                </Card>

                <Card className={styles.recentDiscoveryCard}>
                    <h3>Popular Services</h3>
                    <div className={styles.tagList}>
                        <span className={styles.tag}>Pest Inspection</span>
                        <span className={styles.tag}>Full Body Checkup</span>
                        <span className={styles.tag}>EV Charger Install</span>
                        <span className={styles.tag}>AC Deep Clean</span>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AIBooking;
