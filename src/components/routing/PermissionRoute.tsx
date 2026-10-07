import type { ReactNode } from "react";
import { useAppSelector } from "../../hooks/redux";
import ForbiddenPage from "../../pages/ForbiddenPage";
import { hasAnyPermission } from "../../utils/permissions";

type PermissionRouteProps = {
  permissions: string | string[];
  children: ReactNode;
};

export default function PermissionRoute({
  permissions,
  children,
}: PermissionRouteProps) {
  const user = useAppSelector((s) => s.auth.user);
  return hasAnyPermission(user, permissions) ? (
    children
  ) : (
    <ForbiddenPage compact />
  );
}
