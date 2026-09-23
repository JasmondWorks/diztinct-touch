"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { refreshAccessTokenAction, logoutAdminAction } from "@/actions/auth";
import { tokenStorage } from "@/lib/tokenStorage";

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
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-center p-6 selection:bg-[#C9A84C]/30">
        <div className="w-10 h-10 rounded-full border-2 border-[#C9A84C]/20 border-t-[#C9A84C] animate-spin mb-4" />
        <span className="text-xs font-mono tracking-widest text-[#C9A84C] uppercase">
          Verifying Security Credentials...
        </span>
        <span className="text-[11px] font-mono text-[#555] mt-1">
          DIZTINCT TOUCH HOME DESIGN
        </span>
      </div>
    );
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
