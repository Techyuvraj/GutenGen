import React, { useState, useRef, useEffect } from 'react';

const ChatInterface = ({ messages, onSendMessage, isLoading }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        onSendMessage(input);
        setInput('');
    };

    return (
        <div className="chat-panel">
            <div className="chat-messages">
                {messages.length === 0 && (
                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>
                        <p>👋 Ask the AI to refine your design.</p>
                        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Example: "Make the background blue" or "Add another column"</p>
                    </div>
                )}

                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        {msg.content}
                    </div>
                ))}

                {isLoading && (
                    <div className="message ai">
                        <span className="loading-dots">Thinking...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSubmit} style={{ padding: '1rem' }}>
                <div className="chat-input-wrapper">
                    <input
                        type="text"
                        className="chat-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type instruction..."
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="chat-send-btn"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInterface;
