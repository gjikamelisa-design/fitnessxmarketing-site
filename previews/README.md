# FxM launch verification — 30 October 2026

Source: the existing [Figma Make design](https://www.figma.com/make/T8kbQNFkkgiAeaZOWz6iHf/Fitness-Claude-Landing-Page).
The original App.tsx and theme were ported into Astro through build-time React rendering. There is no client hydration or React runtime request. Manrope is a single self-hosted variable Latin font. Existing articles and tools remain in place.

## Screenshots

Full-page screenshots from the locally built Astro site:

| Width | Landing | Booking |
| --- | --- | --- |
| 360px | [Landing](landing-360.jpg) | [Booking](booking-360.jpg) |
| 768px | [Landing](landing-768.jpg) | [Booking](booking-768.jpg) |
| 1280px | [Landing](landing-1280.jpg) | [Booking](booking-1280.jpg) |

The mobile primary CTA is visible above the fold; checked CTA targets are 48px high. No horizontal overflow was observed at the requested widths. Calendly uses its own controls inside a cross-origin frame.

## Lighthouse mobile

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Landing | 100 | 100 | 100 | 100 | 0.8s | 0 |
| Booking | 98 | 100 | 77 | 100 | 1.9s | 0 |

Reports: [landing](lighthouse-landing.report.html), [booking](lighthouse-booking.report.html). These are local mobile lab results, not field guarantees. Booking best-practice deductions are from Calendly/Stripe third-party cookies and their browser cookie issues. The first booking run was slower; after hiding duplicated event details, subsequent runs recorded 2.0s and 1.9s LCP. Vendor response times can vary.

## Accessibility and behavior

`axe-core 4.14.0`: zero violations on both views, with a 10-second delay for the embedded scheduler. Raw output: [axe.json](axe.json). Keyboard focus and view navigation were also checked in the browser.

Run `npm test` for deferred loading, seven CTA handlers, UTM forwarding, fallback-link attribution, message origin and source validation, booking confirmation, duplicate-event prevention and iframe unloading. The booking event was simulated in the test harness; no real appointment was created.

Every free-call CTA uses `#book` in the same tab. The booking view has its own logo-only header. Loading the landing view makes no Calendly request; opening booking creates its iframe, and leaving booking removes it. Only `utm_*` query parameters are forwarded. `trackEvent()` dispatches `cta_click`, `scheduler_open`, and `booking` to the existing Google Analytics property, without booking names or email addresses.
