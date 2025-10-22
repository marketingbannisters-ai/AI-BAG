import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

export default function PublicOnlyRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-8 text-center">Loading…</div>;
  if (user) return <Navigate to={(location.state as any)?.from?.pathname || "/home"} replace />;
  return <Outlet />;
}