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
