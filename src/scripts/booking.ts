import { getCampaign, trackEvent } from './analytics';

const scheduler = document.querySelector<HTMLElement>('#scheduler')!;
const fallback = document.querySelector<HTMLAnchorElement>('#calendly-fallback')!;
const flow = document.querySelector<HTMLElement>('#booking-flow')!;
const bookedState = document.querySelector<HTMLElement>('#booked-state')!;
const skip = document.querySelector<HTMLAnchorElement>('.skip-link')!;
const utms = new URLSearchParams(getCampaign());
const query = new URLSearchParams(location.search);
const calendly = new URL('https://calendly.com/gjikamelisa/discovery/');
utms.forEach((value, key) => calendly.searchParams.set(key, value));
fallback.href = calendly.href;
let frame: HTMLIFrameElement | null = null;
let inBooking = false;
let lastCTA: HTMLElement | null = null;
let booked = false;
// Local-only preview of the post-booking state (?preview=booked on localhost). Inert on the live site.
const previewBooked = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname) && query.get('preview') === 'booked';
let warmed = false;

// Open the connection to Calendly when someone is about to click, so the embed loads faster.
function warmCalendly(event: Event) {
  const target = event.target as Element | null;
  if (warmed || !target?.closest?.('[data-booking-cta]')) return;
  warmed = true;
  for (const href of ['https://calendly.com', 'https://assets.calendly.com']) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    document.head.append(link);
  }
}

function route(initial = false) {
  const booking = location.hash === '#book';
  document.documentElement.dataset.view = booking ? 'book' : 'landing';
  document.title = booking ? 'Book a Free Strategy Call | Fitness x Marketing' : 'Claude for Fitness Businesses | Fitness x Marketing';
  skip.href = booking ? '#book' : '#top';
  if (booking && !inBooking) {
    if (!previewBooked) trackEvent('scheduler_open');
    if (!frame && !previewBooked) {
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
    if (previewBooked && !booked) showConfirmation(false);
    else if (!initial) { window.scrollTo(0, 0); document.querySelector<HTMLElement>('#booking-title')?.focus({ preventScroll: true }); }
  } else if (!booking && inBooking) {
    frame?.remove(); frame = null; booked = false; bookedState.hidden = true; flow.hidden = false;
    if (!initial) lastCTA?.focus({ preventScroll: true });
  }
  inBooking = booking;
}

document.querySelectorAll<HTMLElement>('[data-booking-cta]').forEach(cta => {
  cta.addEventListener('click', () => {
    lastCTA = cta;
  });
});
fallback.addEventListener('click', () => trackEvent('scheduler_fallback_click'));
window.addEventListener('hashchange', () => route());
function showConfirmation(track: boolean) {
  booked = true;
  if (track) trackEvent('booking');
  // Unload the embed so no blank block is left under the confirmation.
  frame?.remove(); frame = null;
  flow.hidden = true;
  bookedState.hidden = false;
  bookedState.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

window.addEventListener('pointerover', warmCalendly);
window.addEventListener('focusin', warmCalendly);
window.addEventListener('message', event => {
  if (!inBooking || !frame || event.origin !== 'https://calendly.com' || event.source !== frame.contentWindow || event.data?.event !== 'calendly.event_scheduled' || booked) return;
  showConfirmation(true);
});
route(true);
