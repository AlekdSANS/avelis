import { setAnalyticsConsent } from "./consent.ts";

const CONSENT_STORAGE_KEY = "avelis.cookie-preferences.v1";
const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

export type CookiePreferenceSelection = {
  analytics: boolean;
  advertising: boolean;
};

type StoredCookiePreferences = CookiePreferenceSelection & {
  savedAt: string;
  version: 1;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStoredCookiePreferences(
  value: unknown,
): value is StoredCookiePreferences {
  return (
    isRecord(value) &&
    value.version === 1 &&
    typeof value.analytics === "boolean" &&
    typeof value.advertising === "boolean" &&
    typeof value.savedAt === "string" &&
    Number.isFinite(Date.parse(value.savedAt))
  );
}

export function applyCookiePreferences(
  preferences: CookiePreferenceSelection,
): void {
  setAnalyticsConsent({
    analyticsStorage: preferences.analytics ? "granted" : "denied",
    adStorage: preferences.advertising ? "granted" : "denied",
    adUserData: preferences.advertising ? "granted" : "denied",
    adPersonalization: preferences.advertising ? "granted" : "denied",
  });
}

export function readCookiePreferences(): CookiePreferenceSelection | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    const parsedValue = storedValue
      ? (JSON.parse(storedValue) as unknown)
      : null;

    if (!isStoredCookiePreferences(parsedValue)) {
      return null;
    }

    if (
      Date.now() - Date.parse(parsedValue.savedAt) >
      CONSENT_MAX_AGE_MS
    ) {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      return null;
    }

    return {
      analytics: parsedValue.analytics,
      advertising: parsedValue.advertising,
    };
  } catch {
    return null;
  }
}

export function saveCookiePreferences(
  preferences: CookiePreferenceSelection,
): void {
  applyCookiePreferences(preferences);

  if (typeof window === "undefined") {
    return;
  }

  try {
    const storedValue: StoredCookiePreferences = {
      ...preferences,
      savedAt: new Date().toISOString(),
      version: 1,
    };
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify(storedValue),
    );
  } catch {
    // Consent still applies for the current page when storage is unavailable.
  }
}

export function hydrateCookiePreferences(): CookiePreferenceSelection | null {
  const preferences = readCookiePreferences();
  if (preferences) {
    applyCookiePreferences(preferences);
  }
  return preferences;
}
