import { hasAnalyticsConsent } from "./consent";
import type {
  AnalyticsEvent,
  DataLayerEntry,
  EcommerceEvent,
} from "./types";

const ANALYTICS_ENABLED = import.meta.env.VITE_ANALYTICS_ENABLED === "true";
const ANALYTICS_DEBUG =
  import.meta.env.DEV && import.meta.env.VITE_ANALYTICS_DEBUG === "true";
const MAX_RECENT_EVENTS = 50;
const recentEvents: AnalyticsEvent[] = [];

function isEcommerceEvent(event: AnalyticsEvent): event is EcommerceEvent {
  return "ecommerce" in event;
}

export function isAdminRoute(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function getCurrentPathname(): string {
  return typeof window === "undefined" ? "" : window.location.pathname;
}

function rememberDebugEvent(event: AnalyticsEvent): void {
  recentEvents.push(event);
  if (recentEvents.length > MAX_RECENT_EVENTS) {
    recentEvents.shift();
  }
}

function debugEvent(event: AnalyticsEvent): void {
  if (!ANALYTICS_DEBUG || typeof console === "undefined") {
    return;
  }

  rememberDebugEvent(event);
  console.groupCollapsed(`[AVELIS Analytics] ${event.event}`);
  console.log(event);
  console.groupEnd();
}

function initializeDataLayer(): DataLayerEntry[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

function exposeDebugHelper(): void {
  if (!ANALYTICS_DEBUG || typeof window === "undefined") {
    return;
  }

  window.__AVELIS_ANALYTICS__ = {
    getRecentEvents: () => [...recentEvents],
  };
}

export function pushToDataLayer(event: AnalyticsEvent): boolean {
  try {
    if (isAdminRoute(getCurrentPathname())) {
      return false;
    }

    debugEvent(event);
    exposeDebugHelper();

    if (!ANALYTICS_ENABLED || !hasAnalyticsConsent()) {
      return false;
    }

    const dataLayer = initializeDataLayer();
    if (dataLayer === null) {
      return false;
    }

    if (isEcommerceEvent(event)) {
      dataLayer.push({ ecommerce: null });
    }
    dataLayer.push(event);
    return true;
  } catch {
    return false;
  }
}
