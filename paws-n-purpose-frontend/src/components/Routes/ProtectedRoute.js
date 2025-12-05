



import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext"

export default function ProtectedRoute({ children, requireProfile }) {
  const { user, hasProfileSet, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  // if (!user) return <Navigate to="/login" />;

  // if (requireProfile && !hasProfileSet) {
  //   return <Navigate to="/account-setup" />;
  // }

  // if (!requireProfile && hasProfileSet) {
  //   return <Navigate to="/dashboard" />;
  // }

  return children;
}