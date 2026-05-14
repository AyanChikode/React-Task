import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute(props) {

   const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? props.children: 
  
         <Navigate to="/" />;

}

export default ProtectedRoute