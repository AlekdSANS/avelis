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

export function getAnalyticsConsent(): Readonly<AnalyticsConsentState> {
  return { ...consentState };
}

export function setAnalyticsConsent(
  nextState: Partial<AnalyticsConsentState>,
): void {
  Object.assign(consentState, nextState);
}

export function hasAnalyticsConsent(): boolean {
  return consentState.analyticsStorage === "granted";
}
