import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        alert("이미 로그인 중 입니다 로그아웃 하여 이용해 주십시오");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestRoute;