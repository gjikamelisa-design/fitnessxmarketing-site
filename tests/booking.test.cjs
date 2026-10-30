const { transformSync } = require('esbuild');
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

// Exercise routing and the third-party message boundary without creating a booking.
const handlers = {}, tracks = [], ctas = [];
let appended = 0, removed = 0;
const frameWindow = {};
const frame = { contentWindow: frameWindow, addEventListener() {}, remove() { removed++; } };
const elements = {
  scheduler: { append() { appended++; } },
  'calendly-fallback': { addEventListener() {} },
  'booking-confirmation': { hidden: true, querySelector() { return { focus() {} }; }, scrollIntoView() {} },
  '.skip-link': {},
  'booking-title': { focus() {} },
};
const document = {
  documentElement: { dataset: {} }, title: '',
  querySelector(selector) { return elements[selector.replace(/^#/, '')]; },
  querySelectorAll() {
    return Array.from({ length: 7 }, () => ({
      textContent: 'Book a free strategy call',
      addEventListener(_, callback) { ctas.push(callback); },
      closest() { return { id: 'hero' }; }, focus() {},
    }));
  },
  createElement() { return frame; },
};
const location = { hash: '', search: '?utm_source=instagram&utm_medium=social&utm_campaign=launch&email=private', hostname: 'fitnessxmarketing.com' };
const window = {
  trackEvent: (...args) => tracks.push(args),
  addEventListener: (name, callback) => handlers[name] = callback,
  scrollTo() {},
};
vm.runInNewContext(transformSync(fs.readFileSync('src/scripts/booking.ts', 'utf8'), { loader: 'ts', format: 'cjs' }).code, {
  document, location, window, URL, URLSearchParams, matchMedia: () => ({ matches: true }), exports: {},
});
assert.equal(appended, 0, 'Landing page must not load Calendly');
assert.equal(ctas.length, 7);
ctas[0]();
assert.equal(tracks[0][0], 'cta_click');
location.hash = '#book'; handlers.hashchange();
assert.equal(appended, 1);
assert.equal(tracks[1][0], 'scheduler_open');
const url = new URL(frame.src);
assert.equal(url.searchParams.get('utm_source'), 'instagram');
assert.equal(url.searchParams.get('email'), null, 'Only campaign parameters may pass through');
assert.match(elements['calendly-fallback'].href, /utm_campaign=launch/);
handlers.message({ origin: 'https://evil.example', source: frameWindow, data: { event: 'calendly.event_scheduled' } });
assert.equal(elements['booking-confirmation'].hidden, true);
handlers.message({ origin: 'https://calendly.com', source: {}, data: { event: 'calendly.event_scheduled' } });
assert.equal(elements['booking-confirmation'].hidden, true);
const scheduled = { origin: 'https://calendly.com', source: frameWindow, data: { event: 'calendly.event_scheduled' } };
handlers.message(scheduled); handlers.message(scheduled);
assert.equal(elements['booking-confirmation'].hidden, false);
assert.equal(tracks.filter(([name]) => name === 'booking').length, 1);
location.hash = '#top'; handlers.hashchange();
assert.equal(removed, 1);
assert.equal(elements['booking-confirmation'].hidden, true);
console.log('Booking checks passed: deferred embed, CTA/open/booking events, UTM forwarding, fallback attribution, message origin/source validation, deduplication and unloading.');
