const { buildSync } = require('esbuild');
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

// Exercise routing and the third-party message boundary without creating a booking.
const handlers = {}, tracks = [], ctas = [], documentHandlers = {};
const storedCampaign = new Map();
const sessionStorage = { getItem: key => storedCampaign.get(key) || null, setItem: (key, value) => storedCampaign.set(key, value) };
let appended = 0, removed = 0;
const frameWindow = {};
const frame = { contentWindow: frameWindow, addEventListener() {}, remove() { removed++; } };
const elements = {
  scheduler: { append() { appended++; } },
  'calendly-fallback': { addEventListener() {} },
  'booking-flow': { hidden: false },
  'booked-state': { hidden: true, querySelector() { return { focus() {} }; } },
  '.skip-link': {},
  'booking-title': { focus() {} },
};
const document = {
  documentElement: { dataset: {} }, title: '',
  addEventListener(name, callback) { documentHandlers[name] = callback; },
  head: { append() {} },
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
function execute(entry) {
  const module = { exports: {} };
  vm.runInNewContext(buildSync({ entryPoints: [entry], bundle: true, platform: 'browser', format: 'cjs', write: false }).outputFiles[0].text, {
    document, location, window, URL, URLSearchParams, sessionStorage, module, exports: module.exports,
  });
  return module.exports;
}
// Arrival on the homepage saves attribution; a later service-page visit has no query tags.
execute('src/scripts/analytics.ts');
assert.match(storedCampaign.get('fxm_campaign'), /instagram/);
assert.ok(!storedCampaign.get('fxm_campaign').includes('email'));
location.search = '';
execute('src/scripts/booking.ts');
assert.equal(appended, 0, 'Landing page must not load Calendly');
assert.equal(ctas.length, 7);
ctas[0]();
const clickedCTA = { textContent: 'Ready to talk', closest(selector) { return selector === '[data-booking-cta]' ? this : null; } };
documentHandlers.click({ target: clickedCTA });
assert.equal(tracks[0][0], 'cta_click');
location.hash = '#book'; handlers.hashchange();
assert.equal(appended, 1);
assert.equal(tracks[1][0], 'scheduler_open');
const url = new URL(frame.src);
assert.equal(url.searchParams.get('utm_source'), 'instagram');
assert.equal(url.searchParams.get('email'), null, 'Only campaign parameters may pass through');
assert.match(elements['calendly-fallback'].href, /utm_campaign=launch/);
handlers.message({ origin: 'https://evil.example', source: frameWindow, data: { event: 'calendly.event_scheduled' } });
assert.equal(elements['booked-state'].hidden, true);
handlers.message({ origin: 'https://calendly.com', source: {}, data: { event: 'calendly.event_scheduled' } });
assert.equal(elements['booked-state'].hidden, true);
const scheduled = { origin: 'https://calendly.com', source: frameWindow, data: { event: 'calendly.event_scheduled' } };
handlers.message(scheduled); handlers.message(scheduled);
assert.equal(elements['booked-state'].hidden, false);
assert.equal(elements['booking-flow'].hidden, true, 'Scheduler view is hidden after booking');
assert.equal(removed, 1, 'Embed is unloaded after booking');
assert.equal(tracks.filter(([name]) => name === 'booking').length, 1);
location.hash = '#top'; handlers.hashchange();
assert.equal(elements['booked-state'].hidden, true);
assert.equal(elements['booking-flow'].hidden, false);
console.log('Cross-page campaign retention and booking checks passed: deferred embed, CTA/open/booking events, UTM forwarding, fallback attribution, message origin/source validation, deduplication and unloading.');
