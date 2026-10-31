const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('src/components/Clarity.astro', 'utf8').match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];
const storage = new Map();
function load() {
  const scripts = [], cookies = [];
  let reloads = 0;
  const context = {
    clarityId: 'xtgem716jj', googleId: 'G-ZHVLV2DEVT',
    localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
    sessionStorage: { removeItem() {} },
    location: { hostname: 'fitnessxmarketing.com', reload() { reloads++; } },
    document: { cookie: '_ga=example; _clck=example', createElement() { return {}; }, head: { append(script) { scripts.push(script); } } },
    Event: class Event { constructor(type) { this.type = type; } }, dispatchEvent() {},
  };
  context.window = context;
  vm.runInNewContext(source, context);
  return { context, scripts, reloads: () => reloads };
}
const first = load();
assert.equal(first.scripts.length, 0, 'No analytics scripts may load before acceptance');
assert.equal(first.context.fxmAnalyticsAllowed, false);
first.context.trackEvent('booking');
assert.equal(first.context.dataLayer.filter(args => args[0] === 'event').length, 0);
first.context.fxmSetAnalyticsConsent('granted');
assert.equal(first.scripts.length, 2);
assert.ok(first.scripts.some(script => script.src.endsWith('/tag/xtgem716jj')));
first.context.fxmSetAnalyticsConsent('granted');
assert.equal(first.scripts.length, 2, 'Repeated acceptance must not duplicate trackers');
first.context.trackEvent('booking');
assert.equal(first.context.dataLayer.filter(args => args[0] === 'event').length, 1);
assert.ok(first.context.clarity.q.some(args => args[0] === 'consentv2' && args[1].ad_Storage === 'denied'));
first.context.fxmSetAnalyticsConsent('denied');
assert.equal(first.reloads(), 1, 'Revocation reloads without loaded trackers');
const declined = load();
assert.equal(declined.context.fxmHasAnalyticsChoice, true);
assert.equal(declined.scripts.length, 0, 'A saved decline remains respected');
storage.set('fxm_analytics_consent_v1', JSON.stringify({ status: 'granted', at: Date.now() - 181 * 86400000 }));
const expired = load();
assert.equal(expired.scripts.length, 0);
assert.equal(expired.context.fxmHasAnalyticsChoice, false);
console.log('Consent checks passed: no tracking before acceptance, consent persistence, no duplicate tags, advertising denied, revocation, and expiry.');
