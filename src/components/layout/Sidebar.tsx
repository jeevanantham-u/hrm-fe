import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  LayoutDashboard,
  Users,
  UserCog,
  CalendarDays,
  ClipboardList,
  WalletCards,
  ShieldCheck,
  Settings,
  X,
  UserRound,
  Clock3,
} from "lucide-react";
import { setSidebarOpen } from "../../features/ui/uiSlice";
import {
  getPermissions,
  getRoleName,
  hasAnyPermission,
  hasPermission,
} from "../../utils/permissions";
import "./Sidebar.css";

const items = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  {
    label: "Employees",
    to: "/employees",
    icon: Users,
    permissions: [
      "employees.view_all",
      "employees.view_department",
      "employees.view_own",
    ],
  },
  {
    label: "Users",
    to: "/users",
    icon: UserCog,
    permissions: ["users.manage"],
  },
  {
    label: "Attendance",
    to: "/attendance",
    icon: Clock3,
    permissions: [
      "attendance.view_all",
      "attendance.view_department",
      "attendance.view_own",
    ],
  },
  {
    label: "Leave",
    to: "/leaves",
    icon: ClipboardList,
    permissions: ["leave.view_all", "leave.view_department", "leave.view_own"],
  },
  {
    label: "Payroll",
    to: "/payroll",
    icon: WalletCards,
    permissions: [
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
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  const user = useAppSelector((state) => state.auth.user);
  const role = getRoleName(user);
  const allowed = (item) =>
    !item.permissions || hasAnyPermission(user, item.permissions);

  return (
    <>
      <aside className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <div className="sidebar__brand-mark">H</div>
          <div>
            <strong>HRM</strong>
            <span>People Operations</span>
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
          {items.filter(allowed).map(({ label, to, icon: Icon }) => {
            const active =
              location.pathname === to ||
              (to !== "/dashboard" && location.pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                className={`sidebar__link ${active ? "is-active" : ""}`}
                onClick={() => dispatch(setSidebarOpen(false))}
              >
                <Icon size={18} />
                <span>{label}</span>
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
