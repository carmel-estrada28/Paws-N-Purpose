



import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, profile, loading, user }) {
  if (loading) return <div>Loading...</div>;
  
  // if (!user) return <Navigate to="/login" />;
  // if (!profile) return <Navigate to="/dashboard" />;

  return children;
}