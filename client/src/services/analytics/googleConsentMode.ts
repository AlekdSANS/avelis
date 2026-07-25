import type {
  AnalyticsConsentState,
  ConsentStatus,
} from "./consent.ts";
import type {
  DataLayerEntry,
  GoogleConsentPayload,
} from "./types";
import { subscribeAnalyticsConsent } from "./consent.ts";

let consentModeInitialized = false;

function normalizeConsentStatus(
  status: ConsentStatus,
): "granted" | "denied" {
  return status === "granted" ? "granted" : "denied";
}

export function mapAnalyticsConsentToGoogleConsent(
  state: Readonly<AnalyticsConsentState>,
): GoogleConsentPayload {
  return {
    analytics_storage: normalizeConsentStatus(state.analyticsStorage),
    ad_storage: normalizeConsentStatus(state.adStorage),
    ad_user_data: normalizeConsentStatus(state.adUserData),
    ad_personalization: normalizeConsentStatus(state.adPersonalization),
  };
}

function getDataLayer(): DataLayerEntry[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

function queueConsentCommand(
  action: "default" | "update",
  payload: GoogleConsentPayload,
): void {
  const dataLayer = getDataLayer();
  if (dataLayer === null) {
    return;
  }
  const consentDataLayer = dataLayer;

  function gtag(
    command: "consent",
    consentAction: "default" | "update",
    consentPayload: GoogleConsentPayload,
  ): void {
    void command;
    void consentAction;
    void consentPayload;
    // GTM's consent command queue requires the native Arguments object.
    // eslint-disable-next-line prefer-rest-params
    consentDataLayer.push(arguments);
  }

  gtag("consent", action, payload);
}

export function initializeGoogleConsentMode(): void {
  if (consentModeInitialized) {
    return;
  }

  consentModeInitialized = true;
  queueConsentCommand("default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  subscribeAnalyticsConsent((state) => {
    queueConsentCommand(
      "update",
      mapAnalyticsConsentToGoogleConsent(state),
    );
  });
}
