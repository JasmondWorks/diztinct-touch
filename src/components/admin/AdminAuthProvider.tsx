"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { refreshAccessTokenAction, logoutAdminAction } from "@/actions/auth";
import { tokenStorage } from "@/lib/tokenStorage";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="flex h-screen w-full bg-background overflow-hidden animate-fadeIn">
        {/* Sidebar Skeleton */}
        <div className="hidden md:flex w-64 flex-col justify-between border-r border-border/80 bg-card/60 p-5 shrink-0">
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-5 border-b border-border/80">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-9 w-full rounded-xl" />
              <Skeleton className="h-9 w-full rounded-xl" />
              <Skeleton className="h-9 w-full rounded-xl" />
              <Skeleton className="h-9 w-full rounded-xl" />
              <Skeleton className="h-9 w-full rounded-xl" />
            </div>
          </div>
          <div className="pt-6 border-t border-border/80 space-y-2">
            <Skeleton className="h-8 w-full rounded-xl" />
            <Skeleton className="h-8 w-full rounded-xl" />
          </div>
        </div>

        {/* Content Area Skeleton */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-16 border-b border-border/80 px-6 flex items-center justify-between shrink-0">
            <Skeleton className="h-4 w-44" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
            <div className="flex justify-between items-center pb-6 border-b border-border/80">
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-72" />
              </div>
              <Skeleton className="h-9 w-32 rounded-xl" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Skeleton className="h-28 rounded-2xl" />
              <Skeleton className="h-28 rounded-2xl" />
              <Skeleton className="h-28 rounded-2xl" />
              <Skeleton className="h-28 rounded-2xl" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Skeleton className="h-80 rounded-2xl lg:col-span-2" />
              <Skeleton className="h-80 rounded-2xl" />
            </div>
          </div>
        </div>
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
