import { hasAnalyticsConsent } from "./consent";
import {
  ANALYTICS_DEBUG,
  ANALYTICS_ENABLED,
} from "./config";
import { ensureGoogleTagManagerLoaded } from "./googleTagManager";
import { canEmitAnalytics, isAdminRoute } from "./policy";
import type {
  AnalyticsEvent,
  DataLayerEntry,
  EcommerceEvent,
} from "./types";

const MAX_RECENT_EVENTS = 50;
const recentEvents: AnalyticsEvent[] = [];

function isEcommerceEvent(event: AnalyticsEvent): event is EcommerceEvent {
  return "ecommerce" in event;
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
    const pathname = getCurrentPathname();
    if (isAdminRoute(pathname)) {
      return false;
    }

    debugEvent(event);
    exposeDebugHelper();

    if (
      !canEmitAnalytics({
        analyticsEnabled: ANALYTICS_ENABLED,
        consentGranted: hasAnalyticsConsent(),
        pathname,
      })
    ) {
      return false;
    }

    ensureGoogleTagManagerLoaded();
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
