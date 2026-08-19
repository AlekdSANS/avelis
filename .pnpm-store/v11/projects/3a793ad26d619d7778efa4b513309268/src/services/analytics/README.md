# AVELIS analytics integration

This directory is the only frontend analytics boundary. Storefront code calls
the typed functions exported by `index.ts`; those functions map AVELIS domain
models and safely pass GA4-compatible events to `dataLayer.ts`.

Google Tag Manager container `GTM-WDGSKQN9` is connected through an idempotent
runtime loader. Analytics can be disabled with
`VITE_ANALYTICS_ENABLED=false`. When enabled, the container and dataLayer
delivery remain blocked until the AVELIS cookie preference menu applies a
stored or newly confirmed choice through:

```ts
setAnalyticsConsent({ analyticsStorage: "granted" });
```

The current consent state starts as `unknown`. Before GTM can load, AVELIS
queues Consent Mode v2 defaults with analytics and advertising storage denied.
The preference menu independently updates `analyticsStorage`, `adStorage`,
`adUserData`, and `adPersonalization`, and stores only those category choices
for 180 days. The loader intentionally omits the standard noscript iframe
because an unconditional iframe cannot respect this JavaScript consent gate.
No Google request is made while every optional category is denied.

The AVELIS menu is a custom technical consent interface, not a certified CMP or
legal compliance guarantee. Policy content and regional requirements still
require legal review.

`VITE_ANALYTICS_DEBUG=true` logs structured, PII-free events in development
even while delivery is disabled. It also exposes
`window.__AVELIS_ANALYTICS__.getRecentEvents()` after the first debug event.
Debug logging is always off in production builds.

GTM configuration requirements:

1. Keep component tracking routed through this module.
2. Configure GA4 event tags and variables from the existing ecommerce
   dataLayer objects.
3. Validate the custom preference menu and policy wording with privacy counsel.
4. Exclude `/admin` and `/admin/*` from all GTM page-view, history-change, and
   marketing triggers. AVELIS event emission is already blocked on those paths.
5. Prefer a reviewed CMP-provided GTM consent template if AVELIS later adopts
   a certified CMP; the current central fallback queues Consent Mode v2 default
   and update commands.
6. Add Google Ads conversion tags in GTM only after GA4/GTM validation; do not
   add Ads IDs to these event payloads.
