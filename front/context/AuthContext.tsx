"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

type User = {
  userId: string;
  email: string;
  role: string;
  profileType?: string | null;
  interests?: string[];
  name?: string | null;
  phone?: string | null;
  company?: string | null;
  position?: string | null;
  website?: string | null;
  city?: string | null;
  bio?: string | null;
};

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const refreshSession = async () => {
      try {
        // do not run the automatic refresh when the user is on the home page
        if (typeof window !== "undefined" && window.location.pathname === "/") {
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:4000/auth/refresh", {
          method: "POST",
          credentials: "include",
        });
        if (res.status === 401) {
          setAccessToken(null);
          setUser(null);
          setLoading(false);
          return; 
        }
        if (res.ok) {
          const data = await res.json();
          setAccessToken(data.accessToken);

          const meRes = await fetch("http://localhost:4000/users/me", {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          });

          if (meRes.ok) {
            const userData = await meRes.json();
            setUser(userData);
          }
        }
      } catch {
        console.log("No active session");
      } finally {
        setLoading(false);
      }
    };

    refreshSession();
  }, []);

  // Intercept global fetch to handle 401 -> try refresh -> retry, else logout
  useEffect(() => {
    if (typeof window === "undefined") return;
    const originalFetch = window.fetch.bind(window);
    let refreshPromise: Promise<string | null> | null = null;

    const doRefresh = async (): Promise<string | null> => {
      try {
        const r = await originalFetch("http://localhost:4000/auth/refresh", {
          method: "POST",
          credentials: "include",
        });
        if (!r.ok) return null;
        const data = await r.json();
        // update accessToken and user
        setAccessToken(data.accessToken);
          try {
            const meRes = await originalFetch("http://localhost:4000/users/me", {
              headers: { Authorization: `Bearer ${data.accessToken}` },
            });
            if (meRes.ok) {
              const userData = await meRes.json();
              setUser(userData);
            }
          } catch {
            // ignore
          }
        return data.accessToken;
      } catch {
        return null;
      }
    };
    const wrappedFetch = async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
      // use original fetch first
  const fetchInput: RequestInfo = input instanceof URL ? input.toString() : (input as RequestInfo);
  const response = await originalFetch(fetchInput, init as RequestInit | undefined);
console.log("Fetch made to:", fetchInput, "Response status:", response.status);
      if (response.status !== 401) return response;

      // Got 401 -> try refresh
      console.log("Attempting to refresh access token");
      if (!refreshPromise) {
        refreshPromise = doRefresh().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccess = await refreshPromise;
      console.log("Refresh attempt completed, new access token:", !!newAccess);
      if (!newAccess) {
        // refresh failed -> ensure server clears cookies and send user to login
        console.debug("Refresh failed: clearing session and redirecting to /login");
        try {
          await originalFetch("http://localhost:4000/auth/logout", {
            method: "POST",
            credentials: "include",
          });
        } catch {
          // ignore network errors
        }

        setAccessToken(null);
        setUser(null);
        console.log("Session cleared, redirecting to /login");
        // redirect to login page (replace so history isn't contaminated)
        try {
          router.replace("/login");
        } catch {
          window.location.href = "/login";
        }

        // return a 401 Response so callers receive the unauthorized status
        try {
          return new Response(null, { status: 401, statusText: "Unauthorized" });
        } catch {
          // If Response isn't available for some reason, throw as a fallback
          throw new Error("Unauthorized");
        }
      }

      // retry original request with new access token (if it can accept headers)
      const newInit: RequestInit = init ? { ...init } : {};
      const headers = new Headers(newInit.headers as HeadersInit | undefined);
      if (!headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${newAccess}`);
      }
      newInit.headers = headers;

      const retryInput: RequestInfo = input instanceof URL ? input.toString() : (input as RequestInfo);
      const retryRes = await originalFetch(retryInput, newInit as RequestInit);
      return retryRes;
    };

    // replace global fetch
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.fetch = wrappedFetch;

    return () => {
      // restore
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.fetch = originalFetch;
      } catch {
        // ignore
      }
    };
  }, [router]);

  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:4000/auth/login", {
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

    const meRes = await fetch("http://localhost:4000/users/me", {
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
    await fetch("http://localhost:4000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
    setAccessToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      // If we already have an access token, try to fetch the user
      if (accessToken) {
        const meRes = await fetch("http://localhost:4000/users/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (meRes.ok) {
          const userData = await meRes.json();
          setUser(userData);
          return;
        }
      }

      // Otherwise attempt server refresh (sends refresh cookie)
      const r = await fetch("http://localhost:4000/auth/refresh", {
        method: "POST",
        credentials: "include",
      });
      if (!r.ok) return;
      const data = await r.json();
      setAccessToken(data.accessToken);

      const meRes2 = await fetch("http://localhost:4000/users/me", {
        headers: { Authorization: `Bearer ${data.accessToken}` },
      });
      if (meRes2.ok) {
        const userData2 = await meRes2.json();
        setUser(userData2);
      }
    } catch (e) {
      // ignore errors here; caller can decide what to do
      console.error("refreshUser error:", e);
    }
  };

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
