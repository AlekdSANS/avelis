import {
  ANALYTICS_ENABLED,
  GTM_CONTAINER_ID,
} from "./config";
import {
  hasGoogleTagManagerConsent,
  subscribeAnalyticsConsent,
} from "./consent";
import { isAdminRoute } from "./policy";
import type { DataLayerEntry } from "./types";

const GTM_SCRIPT_ID = "avelis-google-tag-manager";
let loaderInitialized = false;
let scriptRequested = false;

function getCurrentPathname(): string {
  return typeof window === "undefined" ? "" : window.location.pathname;
}

function getDataLayer(): DataLayerEntry[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

export function ensureGoogleTagManagerLoaded(): boolean {
  try {
    if (
      scriptRequested ||
      !ANALYTICS_ENABLED ||
      !hasGoogleTagManagerConsent() ||
      typeof document === "undefined" ||
      isAdminRoute(getCurrentPathname())
    ) {
      return false;
    }

    if (document.getElementById(GTM_SCRIPT_ID)) {
      scriptRequested = true;
      return true;
    }

    const dataLayer = getDataLayer();
    if (dataLayer === null) {
      return false;
    }

    scriptRequested = true;
    dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.async = true;
    script.id = GTM_SCRIPT_ID;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(
      GTM_CONTAINER_ID,
    )}`;
    document.head.prepend(script);
    return true;
  } catch {
    return false;
  }
}

export function initializeGoogleTagManager(): void {
  if (loaderInitialized) {
    return;
  }

  loaderInitialized = true;
  subscribeAnalyticsConsent(() => {
    ensureGoogleTagManagerLoaded();
  });
  ensureGoogleTagManagerLoaded();
}
