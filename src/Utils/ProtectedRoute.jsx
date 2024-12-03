import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check if 'authToken' exists in localStorage
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  // If authenticated, render the children (protected component)
  // If not authenticated, redirect to the login page ("/")
  return isAuthenticated ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;
