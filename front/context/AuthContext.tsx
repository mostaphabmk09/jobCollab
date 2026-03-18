"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type User = {
  userId: string;
  email: string;
  role: string;
  profileType?: string | null;
};

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setAccessToken(data.accessToken);

          const meRes = await fetch("http://localhost:5000/users/me", {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          });

          if (meRes.ok) {
            const userData = await meRes.json();
            setUser(userData);
          }
        }
      } catch (err) {
        console.log("No active session");
      } finally {
        setLoading(false);
      }
    };

    refreshSession();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    setAccessToken(data.accessToken);

    const meRes = await fetch("http://localhost:5000/users/me", {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });

    if (meRes.ok) {
      const userData = await meRes.json();
      setUser(userData);
    }
  };

  const logout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setAccessToken(null);
    setUser(null);
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
