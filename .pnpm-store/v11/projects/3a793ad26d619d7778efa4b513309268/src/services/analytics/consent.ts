export type ConsentStatus = "unknown" | "granted" | "denied";

export type AnalyticsConsentState = {
  analyticsStorage: ConsentStatus;
  adStorage: ConsentStatus;
  adUserData: ConsentStatus;
  adPersonalization: ConsentStatus;
};

const consentState: AnalyticsConsentState = {
  analyticsStorage: "unknown",
  adStorage: "unknown",
  adUserData: "unknown",
  adPersonalization: "unknown",
};
type ConsentListener = (
  state: Readonly<AnalyticsConsentState>,
) => void;
const consentListeners = new Set<ConsentListener>();

export function getAnalyticsConsent(): Readonly<AnalyticsConsentState> {
  return { ...consentState };
}

export function setAnalyticsConsent(
  nextState: Partial<AnalyticsConsentState>,
): void {
  Object.assign(consentState, nextState);
  const currentState = getAnalyticsConsent();

  consentListeners.forEach((listener) => {
    try {
      listener(currentState);
    } catch {
      // A consent integration must not interrupt customer interactions.
    }
  });
}

export function hasAnalyticsConsent(): boolean {
  return consentState.analyticsStorage === "granted";
}

export function hasGoogleTagManagerConsent(): boolean {
  return Object.values(consentState).some(
    (status) => status === "granted",
  );
}

export function subscribeAnalyticsConsent(
  listener: ConsentListener,
): () => void {
  consentListeners.add(listener);
  return () => {
    consentListeners.delete(listener);
  };
}
