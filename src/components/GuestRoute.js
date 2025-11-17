import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
    const { currentUser, loading } = useContext(AuthContext);

    if (loading) {
        return null;
    }

    if (currentUser) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestRoute;