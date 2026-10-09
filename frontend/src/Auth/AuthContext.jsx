import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { accountApiUrl, identityUrl } from "../../config";

const ACCOUNT_API_URL = accountApiUrl || "https://account.softnetkenya.com";
const IDENTITY_URL = identityUrl || "https://id.softnetkenya.com";

const AuthContext = createContext();

function hashToColor(seed) {
  const colors = [
    "#0fc66f", "#0ea5e9", "#8b5cf6", "#f59e0b",
    "#ef4444", "#10b981", "#3b82f6", "#f97316",
    "#ec4899", "#14b8a3", "#a855f7", "#facc15",
  ];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return colors[Math.abs(hash) % colors.length];
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch(`${ACCOUNT_API_URL}/api/me`, {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        const profile = data?.profile || {};
        const displayName =
          profile.displayName || data?.account?.username || "Account";

        setUser({
          sub: data?.user?.sub || null,
          accountId: data?.account?.id || null,
          name: displayName,
          email: data?.primaryEmail?.email || null,
          picture: profile.avatarUrl || null,
          avatarColor: hashToColor(displayName),
        });
        return;
      }
    } catch {
      // ignore network errors
    }
    setUser(null);
  }, []);

  useEffect(() => {
    fetchSession().finally(() => setLoading(false));
  }, [fetchSession]);

  const login = () => {
    const redirect = encodeURIComponent(
      window.location.origin + window.location.pathname
    );
    window.location.href = `${IDENTITY_URL}/login?redirect=${redirect}`;
  };

  const signup = () => {
    const redirect = encodeURIComponent(
      window.location.origin + window.location.pathname
    );
    window.location.href = `${IDENTITY_URL}/signup/email?redirect=${redirect}`;
  };

  const openAccount = () => {
    window.location.href = ACCOUNT_API_URL;
  };

  const logout = async () => {
    try {
      await fetch(`${IDENTITY_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ignore
    }
    setUser(null);
    window.location.href = "/";
  };

  const refreshSession = useCallback(async () => {
    setLoading(true);
    await fetchSession();
    setLoading(false);
  }, [fetchSession]);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, openAccount, logout, refreshSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
