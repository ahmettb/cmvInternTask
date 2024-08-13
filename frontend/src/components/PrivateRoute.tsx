// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
    element: React.ReactElement;
    adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, adminOnly }) => {
    const token = localStorage.getItem('token');
    const roles = localStorage.getItem('roles'); 

   
    const rolesArray = roles ? JSON.parse(roles) : [];

    const isAdmin = rolesArray.includes('ADMIN');
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/unauthorized" />;
    }

    return element;
};

export default PrivateRoute;
