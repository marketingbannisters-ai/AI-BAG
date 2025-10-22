import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext"; 

export default function ProtectedRoute() {
  console.log("ProtectedRoute entered...");
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-8 text-center">Loading…</div>;
  }

  if (!user) {
    // remember where they wanted to go
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
