import type { Permission, RoleUser } from "../types";

export const ROLE_PERMISSIONS: Record<number, Permission[]> = {
  1: ["*"],
  2: [
    "employees.view_all",
    "employees.manage",
    "attendance.view_all",
    "attendance.manage",
    "attendance.mark_own",
    "leave.view_all",
    "leave.apply",
    "leave.approve",
    "payroll.view_all",
    "payroll.manage",
    "reports.view_all",
    "users.manage",
  ],
  3: [
    "employees.view_department",
    "attendance.view_department",
    "attendance.mark_own",
    "leave.view_department",
    "leave.apply",
    "leave.approve",
    "payroll.view_department",
    "reports.view_department",
  ],
  4: [
    "employees.view_department",
    "attendance.view_department",
    "attendance.mark_own",
    "attendance.manage",
    "leave.view_department",
    "leave.apply",
    "leave.approve",
  ],
  5: [
    "employees.view_own",
    "attendance.view_own",
    "attendance.mark_own",
    "leave.apply",
    "leave.view_own",
    "payroll.view_own",
  ],
};

export const ROLE_NAMES: Record<number, string> = {
  1: "Super Admin",
  2: "HR",
  3: "HOD",
  4: "Supervisor",
  5: "Employee",
};

export function getRoleName(user: RoleUser | null | undefined): string {
  if (!user) return "Guest";
  return (
    user.role_name || user.role?.role_name || ROLE_NAMES[user.role_id] || "User"
  );
}

export function getPermissions(user: RoleUser | null | undefined): string[] {
  if (!user) return [];
  if (Array.isArray(user.permissions))
    return user.permissions.map((p) =>
      typeof p === "string" ? p : p.permission_name,
    );
  return ROLE_PERMISSIONS[user.role_id] || [];
}

export function hasPermission(
  user: RoleUser | null | undefined,
  permission: string,
): boolean {
  const permissions = getPermissions(user);
  return permissions.includes("*") || permissions.includes(permission);
}

export function hasAnyPermission(
  user: RoleUser | null | undefined,
  permissions: string | string[],
): boolean {
  if (!Array.isArray(permissions)) return hasPermission(user, permissions);
  return permissions.some((permission) => hasPermission(user, permission));
}
