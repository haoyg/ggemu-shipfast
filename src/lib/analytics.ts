type GoogleTagWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  __POKOPIE_GOOGLE_CONSENT_INITIALIZED__?: boolean
}

const consentDefaults = {
  ad_personalization: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500,
}

export function initializeGoogleConsentMode() {
  const target = window as GoogleTagWindow
  target.dataLayer ??= []
  target.gtag ??= function () {
    target.dataLayer!.push(arguments)
  }
  if (!target.__POKOPIE_GOOGLE_CONSENT_INITIALIZED__) {
    target.gtag('consent', 'default', consentDefaults)
    target.gtag('set', 'ads_data_redaction', true)
    target.__POKOPIE_GOOGLE_CONSENT_INITIALIZED__ = true
  }
  return target
}

export function getGoogleConsentInitScript() {
  // Function.toString() differs between the server and client bundles.
  return `
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
    if (!window.__POKOPIE_GOOGLE_CONSENT_INITIALIZED__) {
      window.gtag('consent', 'default', ${JSON.stringify(consentDefaults)});
      window.gtag('set', 'ads_data_redaction', true);
      window.__POKOPIE_GOOGLE_CONSENT_INITIALIZED__ = true;
    }
  `
}

type FunnelEvent = 'game_play_click' | 'player_load_start' | 'player_frame_loaded'
  | 'player_load_timeout' | 'player_retry'
  | 'game_search' | 'game_search_results' | 'game_search_error' | 'game_search_empty'

export function trackEvent(name: FunnelEvent, parameters: Record<string, string | number> = {}) {
  if (typeof window === 'undefined') return
  try {
    // Never let unavailable or blocked analytics interrupt gameplay.
    initializeGoogleConsentMode().gtag?.('event', name, parameters)
  } catch { /* Analytics is best effort. */ }
}
