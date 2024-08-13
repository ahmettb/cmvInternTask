import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import NavBar from './AdminNavbar';

const useAuth = () => {
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');
  return roles.includes('[ADMIN]');
};

const AdminRoute: React.FC = () => {
  const navigate = useNavigate();
  const isAdmin = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('roles');
    navigate('/login');
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate('/unauthorized');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null; 
  }

  return (
    <>
      <NavBar onLogout={handleLogout} />
      <Outlet />
    </>
  );
};

export default AdminRoute;
