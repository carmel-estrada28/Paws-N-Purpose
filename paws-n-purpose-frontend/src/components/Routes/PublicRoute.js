



import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"

export default function PublicRoute({ children }) {
  const { user, hasProfileSet, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  // if (!user) return children;

  // if (user && !hasProfileSet) return <Navigate to="/account-setup" />;

  // if (user && hasProfileSet) return <Navigate to="/dashboard" />;

  return children;
}
