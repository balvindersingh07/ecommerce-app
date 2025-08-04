import React from 'react';
import { Navigate } from 'react-router-dom';

// Simulated auth check (replace with actual auth logic later)
const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

export default function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}
