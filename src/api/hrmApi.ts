import api from "./client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
}

export interface AuthApiResponse {
  token?: string;
  user?: User;
  data?: {
    token?: string;
    user?: User;
  };
  message?: string;
}

export async function login(payload) {
  return api.post("/login", payload);
}

export async function getMe() {
  return api.get("/users/me");
}

export async function updateProfile(payload) {
  return api.patch("/users/me", payload);
}

export async function listEmployees() {
  return api.get("/employee");
}

export async function getEmployee(id) {
  return api.get(`/employee/${id}`);
}

export async function createEmployee(payload) {
  return api.post("/employee/create", payload);
}

export async function updateEmployee(id, payload) {
  return api.patch(`/employee/${id}`, payload);
}

export async function listUsers() {
  return api.get("/users");
}

export async function updateUser(id, payload) {
  return api.patch(`/users/${id}`, payload);
}

export async function updateUserRole(id, role_id) {
  return api.patch(`/users/${id}/role`, { role_id });
}

export async function checkIn() {
  return api.post("/attendance/check-in");
}

export async function checkOut() {
  return api.post("attendance/check-out");
}

export async function getAttendance(employeeId) {
  return api.get(`/attendance/employees/${employeeId}`);
}

export async function applyLeave(payload) {
  return api.post("leaves/apply", payload);
}

export async function getPendingLeaves() {
  return api.get("/leaves/pending");
}

export async function approveLeave(id, remarks = "") {
  return api.post(`/leaves/${id}/approve`, { remarks });
}

export async function rejectLeave(id, remarks = "") {
  return api.post(`/leaves/${id}/reject`, { remarks });
}

export async function getEmployeeLeaves(employeeId) {
  return api.get(`/leaves/employees/${employeeId}`);
}

export async function generatePayroll(payload) {
  return api.post("/payroll/generate", payload);
}

export async function getMonthPayroll(month) {
  return api.get(`/payroll/month/${month}`);
}

export async function listRoles() {
  return api.get("/roles");
}

export async function listPermissions() {
  return api.get("/permissions");
}

export async function updateRolePermissions(roleId, permission_ids) {
  return api.patch(`/roles/${roleId}/permissions`, { permission_ids });
}
