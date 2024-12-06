import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  // Check if 'authToken' exists in localStorage
  const isAuthenticated = localStorage.getItem("authToken") !== null;

  // Get user details and role from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;
  console.log(userRole);
  // Check if user role is in the list of allowed roles
  const hasAccess = allowedRoles.includes(userRole);

  // Redirect to signin if not authenticated, or unauthorized if role is invalid
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  if (!hasAccess) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoute;
