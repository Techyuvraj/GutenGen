import React, { useState, useEffect } from 'react';

const HistoryGrid = ({ onSelect }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getToken = () => localStorage.getItem('token');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = getToken();
                if (!token) return;

                const response = await fetch('http://localhost:3007/api/history', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error('Failed to load history');

                const data = await response.json();
                setHistory(data);
            } catch (err) {
                console.error("History Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation(); // Prevent card click
        if (!window.confirm('Are you sure you want to delete this generation?')) return;

        try {
            const response = await fetch(`http://localhost:3007/api/history/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });

            if (response.ok) {
                setHistory(prev => prev.filter(item => item.id !== id));
            }
        } catch (err) {
            alert('Failed to delete item');
        }
    };

    const handleClearAll = async () => {
        if (!window.confirm('Are you sure you want to clear ALL history? This cannot be undone.')) return;

        try {
            const response = await fetch('http://localhost:3007/api/history', {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });

            if (response.ok) {
                setHistory([]);
            }
        } catch (err) {
            alert('Failed to clear history');
        }
    };

    if (loading) return <div style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Loading history...</div>;
    if (error) return null;
    if (history.length === 0) return null;

    return (
        <div className="card" style={{ marginTop: '0' }}>
            <div className="card-header" style={{ justifyContent: 'space-between' }}>
                <span>Your Recent Generations</span>
                <button
                    onClick={handleClearAll}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        padding: '4px 8px'
                    }}
                >
                    Clear All
                </button>
            </div>
            <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {history.map(item => (
                    <div key={item.id} style={{ position: 'relative' }}>
                        <button
                            onClick={() => onSelect(item.content, item.prompt)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '0.5rem',
                                padding: '0.5rem',
                                background: 'var(--bg-body)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textAlign: 'left',
                                width: '100%',
                                overflow: 'hidden'
                            }}
                            className="template-btn"
                        >
                            {item.thumbnail ? (
                                <div style={{ width: '100%', height: '120px', borderRadius: '4px', overflow: 'hidden', background: '#f0f0f0' }}>
                                    <img
                                        src={item.thumbnail}
                                        alt="Generation Thumbnail"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            ) : (
                                <div style={{ width: '100%', height: '120px', borderRadius: '4px', background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '2rem', color: 'var(--text-secondary)' }}>📄</span>
                                </div>
                            )}
                            <div style={{ padding: '0.25rem', width: '100%' }}>
                                <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {item.prompt || 'Untitled Generation'}
                                </span>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                                    {new Date(item.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </button>
                        <button
                            onClick={(e) => handleDelete(e, item.id)}
                            style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                background: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10
                            }}
                            title="Delete"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryGrid;
