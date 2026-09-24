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
