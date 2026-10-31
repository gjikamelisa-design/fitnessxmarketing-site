declare global {
  interface Window {
    trackEvent: (name: string, properties?: Record<string, string>) => void;
    gtag?: (...args: unknown[]) => void;
    fxmAnalyticsAllowed?: boolean;
  }
}

// Keep campaign attribution for this tab without adding campaign tags to internal links.
const campaignKey = 'fxm_campaign';
export function getCampaign(): Record<string, string> {
  const current = Object.fromEntries([...new URLSearchParams(location.search)]
    .filter(([key, value]) => key.startsWith('utm_') && value.length <= 500));
  if (window.fxmAnalyticsAllowed === false) return current;
  try {
    if (Object.keys(current).length) {
      sessionStorage.setItem(campaignKey, JSON.stringify(current));
      return current;
    }
    const stored = JSON.parse(sessionStorage.getItem(campaignKey) || '{}');
    return Object.fromEntries(Object.entries(stored).filter(([key, value]) =>
      key.startsWith('utm_') && typeof value === 'string' && value.length <= 500)) as Record<string, string>;
  } catch {
    return current;
  }
}

let campaign = getCampaign();
window.addEventListener('fxm:analytics-consent', () => { campaign = getCampaign(); });
window.trackEvent = window.trackEvent || ((name, properties = {}) => window.gtag?.('event', name, properties));
export function trackEvent(name: string, properties: Record<string, string> = {}) {
  window.trackEvent(name, { ...campaign, ...properties });
}

document.addEventListener('click', event => {
  const cta = (event.target as Element | null)?.closest?.<HTMLElement>('[data-booking-cta]');
  if (!cta) return;
  trackEvent('cta_click', {
    label: cta.textContent?.trim() || '',
    section: cta.closest('section')?.id || (cta.closest('header') ? 'header' : 'homepage'),
  });
});
