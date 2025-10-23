import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

type PublicUser = { id: string; email: string };
type User = PublicUser | null;

type AuthContextT = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextT | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

   const refreshMe = async () => {
    try {
      const res = await api.get("/auth/me");
      if (res.ok) {
        const me: PublicUser = await res.json(); // { id, email }
        setUser(me);
        console.debug("[Auth] /auth/me OK ->", me);
      } else {
        setUser(null);
        console.debug("[Auth] /auth/me 401 -> user=null");
      }
    } catch (e) {
      setUser(null);
      console.debug("[Auth] /auth/me error -> user=null", e);
    }
  };

  useEffect(() => {
    // on first load, see if the server recognizes us (cookies)
    refreshMe().finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    if (!res.ok) {
      const ct = res.headers.get("content-type") || "";
      const body = ct.includes("application/json") ? await res.json() : await res.text();
      const detail = (body as any)?.detail ?? body ?? "Login failed";
      throw new Error(detail);
    }

    // Login returns { user: { id, email } }
    const data: { user: PublicUser } = await res.json();
    setUser(data.user);                 // set immediately so ProtectedRoute won't bounce
    console.debug("[Auth] login OK -> setUser", data.user);

    // verify in background (no await; don't block navigation)
    refreshMe().catch(() => {});
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
