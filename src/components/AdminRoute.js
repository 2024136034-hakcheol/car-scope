import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { currentUser, dbUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (!dbUser || !dbUser.isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;