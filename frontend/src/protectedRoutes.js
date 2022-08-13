import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const protectedRoutes = ({children, isAdmin}) => {
  const { loading, isAuthenticated, user } = useSelector(state => state.user);
  return (
    <>
        {loading === false && (
            isAuthenticated === false ? <Navigate to="/login" /> : isAdmin ? user.role !== "admin" ? <Navigate to="/login" /> : children : children
        )}
    </>
);
}

export default protectedRoutes