import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("lms_token"));
  const [admin, setAdmin] = useState(() => {
    const raw = localStorage.getItem("lms_admin");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(true);

  const persist = (authToken, adminInfo) => {
    localStorage.setItem("lms_token", authToken);
    localStorage.setItem("lms_admin", JSON.stringify(adminInfo));
    setToken(authToken);
    setAdmin(adminInfo);
  };

  const clear = () => {
    localStorage.removeItem("lms_token");
    localStorage.removeItem("lms_admin");
    setToken(null);
    setAdmin(null);
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    persist(data.token, data.admin);
    return data;
  };

  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    persist(data.token, data.admin);
    return data;
  };

  const logout = () => {
    clear();
  };

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setAdmin(data.admin);
      } catch (_error) {
        clear();
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      admin,
      loading,
      isAuthenticated: Boolean(token && admin),
      register,
      login,
      logout,
    }),
    [token, admin, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
