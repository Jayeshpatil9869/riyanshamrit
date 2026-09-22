import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  adminLogin,
  clearAdminSession,
  getAdminToken,
  getStoredAdminUser,
  type AdminSessionUser,
} from "../lib/adminApi";

type AdminAuthContextValue = {
  user: AdminSessionUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(
  undefined,
);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AdminSessionUser | null>(() =>
    getStoredAdminUser(),
  );
  const [token, setToken] = useState<string | null>(() => getAdminToken());

  const login = useCallback(async (username: string, password: string) => {
    const data = await adminLogin(username, password);
    setUser(data.user);
    setToken(data.accessToken);
  }, []);

  const logout = useCallback(() => {
    clearAdminSession();
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      login,
      logout,
    }),
    [user, token, login, logout],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return ctx;
}
