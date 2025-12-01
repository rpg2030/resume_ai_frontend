import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function login(login, password) {
  const res = await axios.post(`${API_BASE}/auth/login`, { login, password });
  return res.data;
}

export async function register(username, email, password, role = "CANDIDATE") {
  const res = await axios.post(`${API_BASE}/auth/register`, { username, email, password, role });
  return res.data;
}

export async function me(token) {
  const res = await axios.get(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
}