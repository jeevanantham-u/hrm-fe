import axios from "axios";
// import { clearSession, loadSession } from "../utils/storage";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost/resources_1/v1",
  headers: { "Content-Type": "application/json" },
  timeout: 12000,
});

export default api;
