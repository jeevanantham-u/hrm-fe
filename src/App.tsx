import { Navigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/redux";
import { bootstrapSession } from "./features/auth/authSlice";
import LoginPage from "./pages/LoginPage";
import PermissionRoute from "./components/routing/PermissionRoute";
import ForbiddenPage from "./pages/ForbiddenPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeFormPage from "./pages/EmployeeFormPage";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import UsersPage from "./pages/UsersPage";
import AttendancePage from "./pages/AttendancePage";
import LeavesPage from "./pages/LeavesPage";
import ApplyLeavePage from "./pages/ApplyLeavePage";
import PayrollPage from "./pages/PayrollPage";
import RolesPermissionsPage from "./pages/RolesPermissionsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(bootstrapSession());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/employees"
            element={
              <PermissionRoute
                permissions={[
                  "employees.view_all",
                  "employees.view_department",
                  "employees.view_own",
                ]}
              >
                <EmployeesPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/employees/new"
            element={
              <PermissionRoute permissions="employees.manage">
                <EmployeeFormPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/employees/:id"
            element={
              <PermissionRoute
                permissions={[
                  "employees.view_all",
                  "employees.view_department",
                  "employees.view_own",
                ]}
              >
                <EmployeeDetailsPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/employees/:id/edit"
            element={
              <PermissionRoute permissions="employees.manage">
                <EmployeeFormPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PermissionRoute permissions="users.manage">
                <UsersPage />
              </PermissionRoute>
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/attendance"
            element={
              <PermissionRoute
                permissions={[
                  "attendance.view_all",
                  "attendance.view_department",
                  "attendance.view_own",
                ]}
              >
                <AttendancePage />
              </PermissionRoute>
            }
          />
          <Route
            path="/leaves"
            element={
              <PermissionRoute
                permissions={[
                  "leave.view_all",
                  "leave.view_department",
                  "leave.view_own",
                ]}
              >
                <LeavesPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/leaves/apply"
            element={
              <PermissionRoute permissions="leave.apply">
                <ApplyLeavePage />
              </PermissionRoute>
            }
          />
          <Route
            path="/payroll"
            element={
              <PermissionRoute
                permissions={[
                  "payroll.view_all",
                  "payroll.view_department",
                  "payroll.view_own",
                ]}
              >
                <PayrollPage />
              </PermissionRoute>
            }
          />
          <Route
            path="/roles-permissions"
            element={
              <PermissionRoute permissions="roles.manage">
                <RolesPermissionsPage />
              </PermissionRoute>
            }
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/403" element={<ForbiddenPage />} />
        </Route>
      </Route>
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
