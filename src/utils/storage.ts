import type { RoleUser } from "../types";

const TOKEN_KEY = "hrm_token";
const USER_KEY = "hrm_user";

export function saveSession(token: string, user: RoleUser): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function loadSession(): { token: string | null; user: RoleUser | null } {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);
  return {
    token,
    user: user ? (JSON.parse(user) as RoleUser) : null,
  };
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
