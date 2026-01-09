import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                background: 'var(--bg-body)'
            }}>
                Loading...
            </div>
        );
    }

    if (!user) {
        return <Login />;
    }

    return children;
};

export default ProtectedRoute;
