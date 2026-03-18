import func2url from "../../backend/func2url.json";

const AUTH_URL = func2url.auth;

function getToken(): string {
  return localStorage.getItem("auth_token") || "";
}

function setToken(t: string) {
  localStorage.setItem("auth_token", t);
}

function clearToken() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}

async function authCall(body: object): Promise<{ token?: string; user?: User; error?: string }> {
  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Auth-Token": getToken() },
    body: JSON.stringify(body),
  });
  return res.json();
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "client";
  avatar_url?: string;
}

export async function apiRegister(email: string, name: string, password: string) {
  return authCall({ action: "register", email, name, password });
}

export async function apiLogin(email: string, password: string) {
  return authCall({ action: "login", email, password });
}

export async function apiLogout() {
  await authCall({ action: "logout" });
  clearToken();
}

export async function apiMe(): Promise<User | null> {
  const token = getToken();
  if (!token) return null;
  const res = await authCall({ action: "me" });
  if (res.error) return null;
  return res as unknown as User;
}

export { getToken, setToken, clearToken };
