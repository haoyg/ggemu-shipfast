import { afterEach, describe, expect, it, vi } from 'vitest'
import { analyticsConsentKey, buildWebVitalsParameters, getAnalyticsConsent, getGoogleConsentInitScript, initializeGoogleConsentMode, setAnalyticsConsent, trackEvent, trackEventOnce, trackPagePerformance } from './analytics'

afterEach(() => {
  vi.restoreAllMocks()
  const target = window as unknown as Record<string, unknown>
  delete target.dataLayer
  delete target.gtag
  delete target.__POKOPIE_GOOGLE_CONSENT_INITIALIZED__
  delete target.__POKOPIE_ANALYTICS_CHOICE__
  delete target['ga-disable-G-LZVYEMVMZB']
  window.localStorage.clear()
  window.sessionStorage.clear()
})

describe('analytics bootstrap', () => {
  it('runs as a standalone head script before config, without duplicate consent defaults', () => {
    window.localStorage.setItem(analyticsConsentKey, 'granted')
    window.eval(getGoogleConsentInitScript())
    const target = initializeGoogleConsentMode()
    target.gtag?.('config', 'G-TEST')
    trackEvent('game_play_click', { game_id: 'contra' })
    const commands = target.dataLayer?.map((command) => Array.from(command as ArrayLike<unknown>))
    expect(commands?.map((command) => command[0])).toEqual(['consent', 'set', 'consent', 'config', 'event'])
    expect(commands?.[0][2]).toMatchObject({ analytics_storage: 'denied', ad_storage: 'denied' })
  })

  it('initializes defaults before events even without advertising', () => {
    window.localStorage.setItem(analyticsConsentKey, 'granted')
    trackEvent('game_search_empty', { source: 'home' })
    const commands = initializeGoogleConsentMode().dataLayer?.map((command) => Array.from(command as ArrayLike<unknown>))
    expect(commands?.map((command) => command[0])).toEqual(['consent', 'set', 'consent', 'event'])
  })

  it('does not break user actions when the analytics tag throws', () => {
    setAnalyticsConsent('granted')
    initializeGoogleConsentMode().gtag = vi.fn(() => { throw new Error('Blocked') })
    expect(() => trackEvent('player_retry')).not.toThrow()
  })

  it('deduplicates one-time gameplay events within a browser session', () => {
    setAnalyticsConsent('granted')
    trackEventOnce('word-ladder-view', 'game_view', { game_type: 'word_ladder' })
    trackEventOnce('word-ladder-view', 'game_view', { game_type: 'word_ladder' })
    const commands = initializeGoogleConsentMode().dataLayer?.map((command) => Array.from(command as ArrayLike<unknown>))
    expect(commands?.filter((command) => command[0] === 'event')).toHaveLength(1)
  })

  it('reports navigation timing when the browser exposes it', () => {
    vi.spyOn(performance, 'getEntriesByType').mockReturnValue([{
      domContentLoadedEventEnd: 123.4,
      loadEventEnd: 456.7,
      responseEnd: 80.2,
      startTime: 0,
    } as PerformanceNavigationTiming])

    setAnalyticsConsent('granted')
    trackPagePerformance('/en/games/contra')

    const commands = initializeGoogleConsentMode().dataLayer?.map((command) => Array.from(command as ArrayLike<unknown>))
    expect(commands?.at(-1)).toEqual(['event', 'page_performance', {
      page_path: '/en/games/contra',
      dom_content_loaded_ms: 123,
      load_event_ms: 457,
      response_ms: 80,
    }])
  })

  it('quietly skips performance reporting when navigation timing is unavailable', () => {
    vi.spyOn(performance, 'getEntriesByType').mockReturnValue([])

    expect(() => trackPagePerformance('/en')).not.toThrow()
    const commands = initializeGoogleConsentMode().dataLayer?.map((command) => Array.from(command as ArrayLike<unknown>))
    expect(commands?.map((command) => command[0])).toEqual(['consent', 'set'])
  })

  it('normalizes core web vitals for analytics reporting', () => {
    expect(buildWebVitalsParameters('/en/games/contra', {
      cls: 0.1234,
      inp: 187.6,
      lcp: 2345.4,
    })).toEqual({
      page_path: '/en/games/contra',
      cls_milli: 123,
      inp_ms: 188,
      lcp_ms: 2345,
    })
  })
})

 describe('analytics consent choices', () => {
  it('does not send or deduplicate events before consent, and stops immediately on withdrawal', () => {
    trackEventOnce('memory-view', 'game_view', { game_type: 'memory' })
    expect(window.sessionStorage.length).toBe(0)
    expect((window as unknown as { dataLayer?: unknown[] }).dataLayer).toBeUndefined()
    setAnalyticsConsent('granted')
    trackEventOnce('memory-view', 'game_view', { game_type: 'memory' })
    setAnalyticsConsent('denied')
    trackEvent('game_start', { game_type: 'memory' })
    const commands = initializeGoogleConsentMode().dataLayer!.map(c => Array.from(c as ArrayLike<unknown>))
    expect(commands.filter(c => c[0] === 'event')).toHaveLength(1)
    expect(commands.at(-1)).toEqual(['consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }])
    expect(window.localStorage.getItem(analyticsConsentKey)).toBe('denied')
    expect((window as unknown as Record<string, unknown>)['ga-disable-G-LZVYEMVMZB']).toBe(true)
  })

  it('keeps the choice usable when local storage and the analytics tag are blocked', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw Error('blocked') })
    initializeGoogleConsentMode().gtag = vi.fn(() => { throw Error('blocked') })
    expect(() => setAnalyticsConsent('granted')).not.toThrow()
    expect(getAnalyticsConsent()).toBe('granted')
    expect(() => setAnalyticsConsent('denied')).not.toThrow()
    expect(getAnalyticsConsent()).toBe('denied')
  })
})
