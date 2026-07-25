const DEFAULT_GTM_CONTAINER_ID = "GTM-WDGSKQN9";
const analyticsEnabledFlag = import.meta.env.VITE_ANALYTICS_ENABLED;

export const ANALYTICS_ENABLED =
  analyticsEnabledFlag === undefined
    ? true
    : analyticsEnabledFlag === "true";
export const ANALYTICS_DEBUG =
  import.meta.env.DEV && import.meta.env.VITE_ANALYTICS_DEBUG === "true";
export const GTM_CONTAINER_ID =
  import.meta.env.VITE_GTM_CONTAINER_ID?.trim() ||
  DEFAULT_GTM_CONTAINER_ID;
