import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, tokenData } = useAuth();
  const location = useLocation();

  // Route is blocked if unauthenticated or token is expired
  if (!isAuthenticated || (tokenData && tokenData.isExpired)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
