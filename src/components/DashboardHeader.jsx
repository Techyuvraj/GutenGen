import { useAuth } from '../context/AuthContext';

const DashboardHeader = ({ theme, toggleTheme, onReset, sidebarView, setSidebarView }) => {
    const { logout, user } = useAuth();

    return (
        <header className="dashboard-header">
            <div className="header-left">
                {user && <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Welcome, {user.username}</span>}
            </div>

            <div className="header-right">
                <button
                    onClick={() => setSidebarView('history')}
                    className="btn-icon"
                    title="Your Recent Generations"
                    style={{
                        marginRight: '0.5rem',
                        background: sidebarView === 'history' ? 'var(--accent-light)' : 'transparent',
                        color: sidebarView === 'history' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        borderColor: sidebarView === 'history' ? 'var(--accent-primary)' : 'var(--border-color)'
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span style={{ marginLeft: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Recents</span>
                </button>

                <button onClick={onReset} className="btn-icon" title="New Project">
                    <span style={{ marginRight: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>New</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                </button>

                <button onClick={toggleTheme} className="theme-toggle" title="Toggle Theme">
                    {theme === 'light' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    )}
                </button>

                <button onClick={logout} className="btn-icon" title="Logout" style={{ marginLeft: '0.5rem', color: '#ef4444' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;
