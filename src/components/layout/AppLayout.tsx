import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { clearToast } from "../../features/ui/uiSlice";
import { useEffect } from "react";
import "./AppLayout.css";

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.ui.toast);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => dispatch(clearToast()), 2800);
    return () => window.clearTimeout(timer);
  }, [toast, dispatch]);
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <main className="page-wrap">
          <Outlet />
        </main>
      </div>
      {toast ? (
        <div className={`toast toast--${toast.type || "success"}`}>
          {toast.message}
        </div>
      ) : null}
    </div>
  );
}
