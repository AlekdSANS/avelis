# AVELIS analytics integration

This directory is the only frontend analytics boundary. Storefront code calls
the typed functions exported by `index.ts`; those functions map AVELIS domain
models and safely pass GA4-compatible events to `dataLayer.ts`.

Analytics is deliberately disabled by default. `VITE_ANALYTICS_ENABLED=true`
allows dataLayer delivery only after a future consent integration calls:

```ts
setAnalyticsConsent({ analyticsStorage: "granted" });
```

The current consent state starts as `unknown`. A future CMP should own that
call and update `analyticsStorage`, `adStorage`, `adUserData`, and
`adPersonalization`. This module does not send Consent Mode commands because
no GTM container or GA property is connected.

`VITE_ANALYTICS_DEBUG=true` logs structured, PII-free events in development
even while delivery is disabled. It also exposes
`window.__AVELIS_ANALYTICS__.getRecentEvents()` after the first debug event.
Debug logging is always off in production builds.

When GTM is connected later:

1. Keep component tracking routed through this module.
2. Add the approved GTM container bootstrap in the single application entry
   point.
3. Configure GA4 event tags and variables from the existing ecommerce
   dataLayer objects.
4. Connect the CMP to `setAnalyticsConsent` before enabling analytics.
5. Add Google Ads conversion tags in GTM only after GA4/GTM validation; do not
   add Ads IDs to these event payloads.
