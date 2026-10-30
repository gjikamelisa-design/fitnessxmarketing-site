declare global {
  interface Window { trackEvent: (name: string, properties?: Record<string, string>) => void; }
}

const scheduler = document.querySelector<HTMLElement>('#scheduler')!;
const fallback = document.querySelector<HTMLAnchorElement>('#calendly-fallback')!;
const confirmation = document.querySelector<HTMLElement>('#booking-confirmation')!;
const skip = document.querySelector<HTMLAnchorElement>('.skip-link')!;
const utms = new URLSearchParams();
const query = new URLSearchParams(location.search);
for (const [key, value] of query) if (key.startsWith('utm_')) utms.set(key, value);
const calendly = new URL('https://calendly.com/gjikamelisa/discovery/');
utms.forEach((value, key) => calendly.searchParams.set(key, value));
fallback.href = calendly.href;
let frame: HTMLIFrameElement | null = null;
let inBooking = false;
let lastCTA: HTMLElement | null = null;
let booked = false;

function trackEvent(name: string, properties: Record<string, string> = {}) {
  window.trackEvent(name, { ...Object.fromEntries(utms), ...properties });
}

function route(initial = false) {
  const booking = location.hash === '#book';
  document.documentElement.dataset.view = booking ? 'book' : 'landing';
  document.title = booking ? 'Book a Free Strategy Call | Fitness x Marketing' : 'Claude Workspace Sprint for Fitness Businesses | Fitness x Marketing';
  skip.href = booking ? '#book' : '#top';
  if (booking && !inBooking) {
    trackEvent('scheduler_open');
    if (!frame) {
      const embed = new URL(calendly);
      embed.searchParams.set('embed_domain', location.hostname);
      embed.searchParams.set('embed_type', 'Inline');
      embed.searchParams.set('hide_gdpr_banner', '1');
      embed.searchParams.set('hide_event_type_details', '1');
      frame = document.createElement('iframe');
      frame.title = 'Choose a time for your free 30-minute strategy call';
      frame.src = embed.href;
      frame.addEventListener('load', () => document.querySelector('#scheduler-loading')?.remove(), { once: true });
      scheduler.append(frame);
    }
    if (!initial) { window.scrollTo(0, 0); document.querySelector<HTMLElement>('#booking-title')?.focus({ preventScroll: true }); }
  } else if (!booking && inBooking) {
    frame?.remove(); frame = null; booked = false; confirmation.hidden = true;
    if (!initial) lastCTA?.focus({ preventScroll: true });
  }
  inBooking = booking;
}

document.querySelectorAll<HTMLElement>('[data-booking-cta]').forEach(cta => {
  cta.addEventListener('click', () => {
    lastCTA = cta;
    trackEvent('cta_click', { label: cta.textContent?.trim() || '', section: cta.closest('section')?.id || (cta.closest('header') ? 'header' : 'hero') });
  });
});
fallback.addEventListener('click', () => trackEvent('scheduler_fallback_click'));
window.addEventListener('hashchange', () => route());
window.addEventListener('message', event => {
  if (!inBooking || !frame || event.origin !== 'https://calendly.com' || event.source !== frame.contentWindow || event.data?.event !== 'calendly.event_scheduled' || booked) return;
  booked = true;
  trackEvent('booking');
  confirmation.hidden = false;
  confirmation.querySelector<HTMLElement>('h2')?.focus();
  confirmation.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
});
route(true);
