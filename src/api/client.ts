import axios from "axios";
import { clearSession, loadSession } from "../utils/storage";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost/resources_1/v1",
  headers: { "Content-Type": "application/json" },
  timeout: 12000,
});

api.interceptors.request.use((config) => {
  const { token } = loadSession();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) clearSession();
    const payload = error.response?.data;
    const message = payload?.message || error.message || "Request failed";
    return Promise.reject(new Error(message));
  },
);

export default api;
