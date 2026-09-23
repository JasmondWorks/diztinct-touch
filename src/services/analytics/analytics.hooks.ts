"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEventAction } from "./analytics.actions";
import { AnalyticsEventType } from "./analytics.types";

export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && !pathname.startsWith("/admin")) {
      trackEventAction("page_view", pathname);
    }
  }, [pathname]);
}

export function useWhatsAppTracking() {
  return (source: string) => {
    trackEventAction("whatsapp_click", window.location.pathname, { source });
  };
}
