# Reviewed FxM release — 31 October 2026

The existing resource homepage is preserved. The reviewed Claude offer is a separate page at `/claude-for-fitness-businesses/`, with booking at `/claude-for-fitness-businesses/#book`.

The homepage has a first pale-coral card with independent “Read more” and “Ready to talk” links. Instagram and LinkedIn are aligned horizontally in the post-booking state.

## Verification

- Build and booking/consent regression tests pass.
- Axe: zero violations on homepage, offer page, and simulated confirmation state.
- Mobile Lighthouse on the offer page: performance 100, accessibility 100, best practices 100, SEO 100; LCP 0.8 seconds; CLS 0. These are local lab measurements, not field guarantees.
- Canonical URL, robots rules, sitemap entry and social image verified.
- Existing article and tool files are retained; public tool routes are checked before and after deployment.

## Analytics

GA4: `G-ZHVLV2DEVT`. Clarity: `xtgem716jj`, verified against the connected project's installation screen and website setting.

Neither analytics script loads before acceptance. The compact consent banner offers Accept and Decline, and the footer provides Analytics settings. Preference lasts 180 days, advertising consent remains denied, and revocation removes matching cookies then reloads without trackers. Local previews do not send production analytics.

Campaign parameters are retained in session storage after acceptance, survive homepage-to-offer navigation, and pass into the Calendly iframe and fallback link. Other URL parameters, booking names and email addresses are not forwarded as analytics event properties. Internal links are not tagged with campaign parameters.

Events: `cta_click`, `scheduler_open`, `booking`, and `scheduler_fallback_click`. The booking event validates Calendly's origin and the iframe window and prevents duplicates. Tests simulate the event without creating an appointment.

The `?preview=booked` helper works only on local hosts and does not emit scheduler/booking conversion events.

## Live verification

Deployed Worker version: `7b675840-5bc5-4865-bd27-0a08e8cf7870`.

Homepage, Claude page, privacy policy, sitemap, social image, article index, tool index, and newsletter returned HTTP 200. The three wearable-tool pages matched their pre-release SHA-256 hashes.

The live browser loaded zero GA4/Clarity tags before consent, both tags after acceptance (including Clarity's recording library), and zero after declining and reloading. Campaign tags survived a homepage-to-booking navigation with an untagged internal URL and appeared in the Calendly iframe and fallback URL. Calendly displayed available dates. No test appointment was created.

Remaining account-level choices: confirm `booking` is marked as a GA4 key event; optionally connect GA4 inside Clarity. The tag installation itself is complete. First Clarity data may take time to appear.
