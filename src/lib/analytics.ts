import { siteConfig } from '#/lib/site-config'

export type AnalyticsConsent = 'granted' | 'denied'
export const analyticsConsentKey = 'pokopie-analytics-consent-v1'
export const analyticsConsentEvent = 'pokopie-analytics-consent-change'

type GoogleTagWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  __POKOPIE_GOOGLE_CONSENT_INITIALIZED__?: boolean
  __POKOPIE_ANALYTICS_CHOICE__?: AnalyticsConsent
}

export function readAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const value = window.localStorage.getItem(analyticsConsentKey)
    return value === 'granted' || value === 'denied' ? value : null
  } catch { return null }
}

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === 'undefined') return null
  return (window as GoogleTagWindow).__POKOPIE_ANALYTICS_CHOICE__ ?? readAnalyticsConsent()
}

export function setAnalyticsConsent(choice: AnalyticsConsent, persist = true) {
  const target = window as GoogleTagWindow
  target.__POKOPIE_ANALYTICS_CHOICE__ = choice
  Object.assign(target, { [`ga-disable-${siteConfig.GOOGLE_ANALYTICS_ID}`]: choice !== 'granted' })
  try { initializeGoogleConsentMode().gtag?.('consent', 'update', {
    analytics_storage: choice,
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  }) } catch { /* Consent controls remain usable if analytics is blocked. */ }
  if (persist) {
    try { window.localStorage.setItem(analyticsConsentKey, choice) } catch { /* Keep this page's choice when storage is unavailable. */ }
  }
  window.dispatchEvent(new CustomEvent(analyticsConsentEvent, { detail: choice }))
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
    const choice = getAnalyticsConsent()
    if (choice) {
      target.__POKOPIE_ANALYTICS_CHOICE__ = choice
      target.gtag('consent', 'update', { analytics_storage: choice })
    }
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
      try {
        var choice = window.localStorage.getItem(${JSON.stringify(analyticsConsentKey)});
        if (choice === 'granted' || choice === 'denied') {
          window.__POKOPIE_ANALYTICS_CHOICE__ = choice;
          window.gtag('consent', 'update', {analytics_storage: choice});
        }
      } catch (e) {}
    }
  `
}

type FunnelEvent = 'game_play_click' | 'player_load_start' | 'player_frame_loaded'
  | 'player_load_timeout' | 'player_retry' | 'player_ready'
  | 'game_search' | 'game_search_results' | 'game_search_error' | 'game_search_empty'
  | 'game_view' | 'game_start' | 'game_complete' | 'game_restart' | 'hint_used' | 'game_share'
  | 'page_performance'
  | 'web_vitals'
  | 'game_promotion_click' | 'related_game_click' | 'card_directory_filter' | 'guide_click' | 'ps5x_checker_filter'

type LayoutShiftEntry = PerformanceEntry & {
  hadRecentInput: boolean
  value: number
}

type EventTimingEntry = PerformanceEntry & {
  duration: number
  interactionId: number
}

type WebVitalsState = {
  cls: number
  inp: number
  lcp: number
}

export function trackEvent(name: FunnelEvent, parameters: Record<string, string | number> = {}) {
  if (typeof window === 'undefined' || getAnalyticsConsent() !== 'granted') return
  try {
    // Never let unavailable or blocked analytics interrupt gameplay.
    initializeGoogleConsentMode().gtag?.('event', name, parameters)
  } catch { /* Analytics is best effort. */ }
}

export function trackEventOnce(
  key: string,
  name: FunnelEvent,
  parameters: Record<string, string | number> = {},
) {
  if (typeof window === 'undefined' || getAnalyticsConsent() !== 'granted') return
  const storageKey = `pokopie-analytics-${key}`
  try {
    if (window.sessionStorage.getItem(storageKey)) return
    window.sessionStorage.setItem(storageKey, '1')
  } catch { /* Continue without deduplication when storage is blocked. */ }
  trackEvent(name, parameters)
}

export function trackPagePerformance(pathname?: string) {
  if (typeof window === 'undefined' || typeof performance === 'undefined') return

  const pagePath = pathname ?? window.location.pathname
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  if (!navigation) return

  trackEvent('page_performance', {
    page_path: pagePath,
    dom_content_loaded_ms: Math.round(navigation.domContentLoadedEventEnd),
    load_event_ms: Math.round(navigation.loadEventEnd),
    response_ms: Math.round(navigation.responseEnd - navigation.startTime),
  })
}

export function observeCoreWebVitals(pathname?: string) {
  if (
    typeof window === 'undefined' ||
    typeof document === 'undefined' ||
    typeof PerformanceObserver === 'undefined'
  ) {
    return () => undefined
  }

  const pagePath = pathname ?? window.location.pathname
  const supportedEntryTypes = PerformanceObserver.supportedEntryTypes ?? []
  const state: WebVitalsState = { cls: 0, inp: 0, lcp: 0 }
  const observers: Array<PerformanceObserver> = []
  let reported = false

  const observe = (
    type: string,
    callback: (entries: Array<PerformanceEntry>) => void,
    options: PerformanceObserverInit = { buffered: true, type },
  ) => {
    if (!supportedEntryTypes.includes(type)) return

    try {
      const observer = new PerformanceObserver((list) => callback(list.getEntries()))
      observer.observe(options)
      observers.push(observer)
    } catch {
      // Unsupported metrics must never affect page rendering.
    }
  }

  observe('largest-contentful-paint', (entries) => {
    const entry = entries.at(-1)
    if (entry) state.lcp = Math.max(state.lcp, entry.startTime)
  })
  observe('layout-shift', (entries) => {
    for (const entry of entries as Array<LayoutShiftEntry>) {
      if (!entry.hadRecentInput) state.cls += entry.value
    }
  })
  observe(
    'event',
    (entries) => {
      for (const entry of entries as Array<EventTimingEntry>) {
        if (entry.interactionId > 0) state.inp = Math.max(state.inp, entry.duration)
      }
    },
    { buffered: true, durationThreshold: 40, type: 'event' } as PerformanceObserverInit,
  )

  const report = () => {
    if (reported || !Object.values(state).some((value) => value > 0)) return
    reported = true
    trackEvent('web_vitals', buildWebVitalsParameters(pagePath, state))
  }
  const reportWhenHidden = () => {
    if (document.visibilityState === 'hidden') report()
  }

  document.addEventListener('visibilitychange', reportWhenHidden)
  window.addEventListener('pagehide', report, { once: true })

  return () => {
    report()
    observers.forEach((observer) => observer.disconnect())
    document.removeEventListener('visibilitychange', reportWhenHidden)
    window.removeEventListener('pagehide', report)
  }
}

export function buildWebVitalsParameters(
  pagePath: string,
  state: WebVitalsState,
) {
  return {
    page_path: pagePath,
    cls_milli: Math.round(state.cls * 1000),
    inp_ms: Math.round(state.inp),
    lcp_ms: Math.round(state.lcp),
  }
}
