"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { refreshAccessTokenAction, logoutAdminAction } from "@/actions/auth";
import { tokenStorage } from "@/lib/tokenStorage";
import { AdminLoader } from "./AdminLoader";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refresh: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  accessToken: null,
  refresh: async () => false,
  logout: async () => {},
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(tokenStorage.getAccessToken());

  const handleRefresh = useCallback(async (): Promise<boolean> => {
    try {
      const res = await refreshAccessTokenAction();
      if (res.success && res.accessToken) {
        tokenStorage.setAccessToken(res.accessToken);
        setAccessToken(res.accessToken);
        setIsAuthenticated(true);
        return true;
      } else {
        tokenStorage.clearAccessToken();
        setAccessToken(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch {
      tokenStorage.clearAccessToken();
      setAccessToken(null);
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  const handleLogout = useCallback(async () => {
    tokenStorage.clearAccessToken();
    setAccessToken(null);
    setIsAuthenticated(false);
    await logoutAdminAction();
    router.push("/admin/login");
    router.refresh();
  }, [router]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const initAuth = async () => {
      setIsLoading(true);
      // If we don't have token in memory, run silent refresh from HttpOnly cookie
      const success = await handleRefresh();
      setIsLoading(false);

      if (!success && !pathname.includes("/admin/login")) {
        router.push("/admin/login");
      }
    };

    initAuth();

    // Schedule silent refresh every 13 minutes (access token lifetime is 15 minutes)
    timer = setInterval(() => {
      handleRefresh();
    }, 13 * 60 * 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [handleRefresh, pathname, router]);

  if (isLoading) {
    return <AdminLoader />;
  }

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        accessToken,
        refresh: handleRefresh,
        logout: handleLogout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
