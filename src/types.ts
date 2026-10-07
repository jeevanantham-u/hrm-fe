export type RoleId = 1 | 2 | 3 | 4 | 5;
export type Permission = string;

export interface RoleUser {
  id: number;
  employee_id?: number | null;
  role_id: number;
  username: string;
  email: string;
  is_active?: number | boolean;
  role_name?: string;
  permissions?: Array<string | { permission_name: string }>;
  role?: { role_name?: string };
}

export interface Employee {
  id: number;
  employee_code?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  dob?: string;
  gender?: string;
  joining_date?: string;
  department_id?: number | string;
  designation?: string;
  manager_id?: number | string;
  salary?: number | string;
  address?: string;
  status?: string;
  [key: string]: unknown;
}

export interface LeaveRecord {
  id: number;
  employee_id?: number;
  employee?: string;
  type?: string;
  start_date?: string;
  end_date?: string;
  days?: number;
  status?: string;
  reason?: string;
  [key: string]: unknown;
}

export interface AttendanceRecord {
  date: string;
  check_in?: string;
  check_out?: string;
  hours?: string;
  status?: string;
  [key: string]: unknown;
}

export interface PayrollRecord {
  id: number;
  employee_id?: number;
  employee?: string;
  month: string;
  basic_salary?: number | string;
  allowances?: number | string;
  deductions?: number | string;
  net_salary?: number | string;
  status?: string;
  [key: string]: unknown;
}

export interface PermissionRecord {
  id: number;
  permission_name: string;
  group?: string;
  description?: string;
}

export interface RoleRecord {
  id: number;
  role_name: string;
  description?: string;
  users?: number;
  permissions?: string[];
}

export interface ToastState {
  type?: "success" | "error" | "info" | "warning" | string;
  message: string;
}

export interface AuthState {
  token: string | null;
  user: RoleUser | null;
  ready: boolean;
  loading: boolean;
  error: string | null;
}
