import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, apiMe, apiLogin, apiRegister, apiLogout, setToken, clearToken } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (email: string, name: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiMe().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  async function login(email: string, password: string): Promise<string | null> {
    const res = await apiLogin(email, password);
    if (res.error) return res.error;
    setToken(res.token!);
    setUser(res.user!);
    return null;
  }

  async function register(email: string, name: string, password: string): Promise<string | null> {
    const res = await apiRegister(email, name, password);
    if (res.error) return res.error;
    setToken(res.token!);
    setUser(res.user!);
    return null;
  }

  async function logout() {
    await apiLogout();
    clearToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
