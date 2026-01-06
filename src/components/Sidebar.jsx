import React from 'react';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon">GD</div>
                <span className="logo-text">GutenDraft</span>
            </div>

            <div style={{ marginTop: 'auto', padding: '1rem', background: 'var(--bg-card-hover)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Pro Plan</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Unlimited Generations</div>
            </div>
        </aside>
    );
};

export default Sidebar;
