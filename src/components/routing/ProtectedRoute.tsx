import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import "./ProtectedRoute.css";

export default function ProtectedRoute() {
  const { user, ready } = useAppSelector((s) => s.auth);
  const location = useLocation();
  if (!ready)
    return (
      <div className="route-loading">
        <div className="loading-dot" />
      </div>
    );
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
}
