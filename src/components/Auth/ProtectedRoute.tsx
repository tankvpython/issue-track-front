import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();
    console.log('ProtectedRoute isAuthenticated:', isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
