# AVELIS analytics integration

This directory is the only frontend analytics boundary. Storefront code calls
the typed functions exported by `index.ts`; those functions map AVELIS domain
models and safely pass GA4-compatible events to `dataLayer.ts`.

Google Tag Manager container `GTM-WDGSKQN9` is connected through an idempotent
runtime loader. Analytics can be disabled with
`VITE_ANALYTICS_ENABLED=false`. When enabled, the container and dataLayer
delivery remain blocked until a consent integration calls:

```ts
setAnalyticsConsent({ analyticsStorage: "granted" });
```

The current consent state starts as `unknown`. A CMP should own that
call and update `analyticsStorage`, `adStorage`, `adUserData`, and
`adPersonalization`. The loader intentionally omits the standard noscript iframe
because an unconditional iframe cannot respect this JavaScript consent gate.
This is basic consent behavior: no Google request is made before analytics
consent is granted.

`VITE_ANALYTICS_DEBUG=true` logs structured, PII-free events in development
even while delivery is disabled. It also exposes
`window.__AVELIS_ANALYTICS__.getRecentEvents()` after the first debug event.
Debug logging is always off in production builds.

GTM configuration requirements:

1. Keep component tracking routed through this module.
2. Configure GA4 event tags and variables from the existing ecommerce
   dataLayer objects.
3. Connect the CMP to `setAnalyticsConsent` before enabling analytics.
4. Exclude `/admin` and `/admin/*` from all GTM page-view, history-change, and
   marketing triggers. AVELIS event emission is already blocked on those paths.
5. Use a CMP-provided GTM consent template or Tag Manager consent APIs to
   communicate revocation after the container has loaded.
6. Add Google Ads conversion tags in GTM only after GA4/GTM validation; do not
   add Ads IDs to these event payloads.
