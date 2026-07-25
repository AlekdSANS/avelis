import type {
  AnalyticsEvent,
  DataLayerEntry,
} from "../services/analytics/types";

declare global {
  interface Window {
    dataLayer: DataLayerEntry[];
    __AVELIS_ANALYTICS__?: {
      getRecentEvents: () => AnalyticsEvent[];
    };
  }

  interface ImportMetaEnv {
    readonly VITE_ANALYTICS_ENABLED?: string;
    readonly VITE_ANALYTICS_DEBUG?: string;
  }
}

export {};
