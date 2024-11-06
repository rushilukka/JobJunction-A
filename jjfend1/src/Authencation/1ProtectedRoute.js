// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies  = new Cookies();
const ProtectedRoute = ({ element }) => {
  const token = cookies.get('access_token'); // Get the token from cookies

  if (!token) {
    // If no token, redirect to Entry (or your login page)
    return <Navigate to="/Entry" />;
  }

  // If token exists, render the requested component
  return element;
};

export default ProtectedRoute;