type PublicLegalEnvironment = {
  VITE_IS_DEMO_STORE?: string;
  VITE_LEGAL_EMAIL?: string;
  VITE_LEGAL_OPERATOR_NAME?: string;
  VITE_LEGAL_POSTAL_ADDRESS?: string;
  VITE_SITE_URL?: string;
  VITE_SUPPORT_EMAIL?: string;
};

const environment =
  (import.meta as ImportMeta & { env?: PublicLegalEnvironment }).env ?? {};

function configuredValue(value: string | undefined, fallback: string) {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : fallback;
}

export const legalConfig = Object.freeze({
  isDemoStore: environment.VITE_IS_DEMO_STORE !== "false",
  legalEmail: configuredValue(
    environment.VITE_LEGAL_EMAIL,
    "privacy@avelis.example",
  ),
  operatorAddress: configuredValue(
    environment.VITE_LEGAL_POSTAL_ADDRESS,
    "Warsaw, Poland",
  ),
  operatorName: configuredValue(
    environment.VITE_LEGAL_OPERATOR_NAME,
    "AVELIS Portfolio Demonstration",
  ),
  siteUrl: configuredValue(environment.VITE_SITE_URL, "http://localhost:5173"),
  supportEmail: configuredValue(
    environment.VITE_SUPPORT_EMAIL,
    "hello@avelis.example",
  ),
});
