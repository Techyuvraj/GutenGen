import React from 'react';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-icon">GD</div>
                <span className="logo-text">GutenDraft</span>
            </div>

            <div className="nav-section">
                <div className="nav-item active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    <span>Dashboard</span>
                </div>
            </div>

            <div style={{ marginTop: 'auto', padding: '1rem', background: 'var(--bg-card-hover)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Pro Plan</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Unlimited Generations</div>
            </div>
        </aside>
    );
};

export default Sidebar;
