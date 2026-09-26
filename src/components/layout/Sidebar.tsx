import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  LayoutDashboard,
  Users,
  UserCog,
  ClipboardList,
  WalletCards,
  ShieldCheck,
  Clock3,
  UserRound,
  Settings,
  X,
} from "lucide-react";

import "./Sidebar.css";
import { setSidebarOpen } from "../../features/ui/uiSlice";

const items = [
  { label: "Dasboard", to: "/dashboard", icon: LayoutDashboard },
  {
    label: "Employee",
    to: "/employees",
    icon: Users,
    permission: [
      "employees.view_all",
      "employees.view_department",
      "employees.view_own",
    ],
  },
  {
    label: "User",
    to: "/users",
    icon: UserCog,
    permission: ["users.manage"],
  },
  {
    label: "Attendance",
    to: "/Attendance",
    icon: Clock3,
    permission: [
      "attendance.view_all",
      "attendance.view_department",
      "attendance.view_own",
    ],
  },
  {
    label: "Leaves",
    to: "/leaves",
    icon: ClipboardList,
    permission: [
      "leaves.view_all",
      "leaves.view_department",
      "leaves.view_own",
    ],
  },
  {
    label: "Payroll",
    to: "/payroll",
    icon: WalletCards,
    permission: [
      "payroll.view_all",
      "payroll.view_department",
      "payroll.view_own",
    ],
  },
  {
    label: "Roles & Permissions",
    to: "/roles-permissions",
    icon: ShieldCheck,
    permissions: ["roles.manage"],
  },
];

export default function Sidebar() {
  const user = useAppSelector((s) => s.auth.user);
  const { sidebarOpen } = useAppSelector((s) => s.ui);
  const dispatch = useAppDispatch();
  const role = "domer";
  return (
    <>
      <aside className={` sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <div className="sidebar__brand-mark">H</div>
          <div>
            <strong>HRM</strong>
            <span>People Opearations</span>
          </div>
          <button
            className="sidebar__close"
            aria-label="Close menu"
            onClick={() => dispatch(setSidebarOpen(false))}
          >
            <X size={19} />
          </button>
        </div>
        <div className="sidebar__section-label">WORKSPACE</div>
        <nav className="sidebar__nav">
          {items.map((item) => {
            const active =
              location.pathname === item.to ||
              (item.to !== "/dashboard" &&
                location.pathname.startsWith(item.to));
            const IconComponent = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`{ sidebar__link ${active ? "is-active" : ""}`}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar__section-label">ACCOUNT</div>
        <nav className="sidebar__nav">
          <Link
            to="/profile"
            className={`sidebar__link ${location.pathname === "/profile" ? "is-active" : ""}`}
          >
            <UserRound size={18} />
            <span>My Profile</span>
          </Link>
          <Link
            to="/settings"
            className={`sidebar__link ${location.pathname === "/settings" ? "is-active" : ""}`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="sidebar__user-card">
          <div className="avatar avatar--small">
            {(user?.username || "U").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <strong>{user?.username || "Guest"}</strong>
            <span>{role}</span>
          </div>
        </div>
      </aside>
      {sidebarOpen ? (
        <button
          className="sidebar-backdrop"
          aria-label="Close sidebar"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      ) : null}
    </>
  );
}
