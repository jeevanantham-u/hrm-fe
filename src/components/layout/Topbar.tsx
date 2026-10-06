import { Bell, ChevronDown, LogOut, Search, Menu } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { toggleSidebar } from "../../features/ui/uiSlice";
import "./Topbar.css";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  function handleLogout() {
    dispatch(logout());
    navigate("/login", { replace: true });
  }

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          className="topbar__menu"
          aria-label="Open menu"
          onClick={() => dispatch(toggleSidebar())}
        >
          <Menu size={21} />
        </button>
        <div className="topbar__search">
          <Search size={17} />
          <input
            type="text"
            placeholder="Search employees,users or payroll..."
          />
        </div>
      </div>
      <div className="topbar__right">
        <button className="topbar__notify icon-btn" type="button">
          <Bell size={18} />
        </button>
        <div className="topbar__user">
          <div className="avatar avatar--small">
            {(user?.username || "U").slice(0, 2).toUpperCase()}
          </div>
          <div className="topbar__user-copy">
            <strong>{user?.username || "Guest"}</strong>
            <span>role</span>
          </div>
          <ChevronDown size={15} />
          <button
            className="icon-btn"
            aria-label="Log out"
            onClick={handleLogout}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
