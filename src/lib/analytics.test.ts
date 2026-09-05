import { afterEach, describe, expect, it, vi } from 'vitest'
import { getGoogleConsentInitScript, initializeGoogleConsentMode, trackEvent } from './analytics'

afterEach(() => {
  const target = window as unknown as Record<string, unknown>
  delete target.dataLayer
  delete target.gtag
  delete target.__POKOPIE_GOOGLE_CONSENT_INITIALIZED__
})

describe('analytics bootstrap', () => {
  it('runs as a standalone head script before config, without duplicate consent defaults', () => {
    window.eval(getGoogleConsentInitScript())
    const target = initializeGoogleConsentMode()
    target.gtag?.('config', 'G-TEST')
    trackEvent('game_play_click', { game_id: 'contra' })
    const commands = target.dataLayer?.map((command) => Array.from(command as ArrayLike<unknown>))
    expect(commands?.map((command) => command[0])).toEqual(['consent', 'set', 'config', 'event'])
    expect(commands?.[0][2]).toMatchObject({ analytics_storage: 'denied', ad_storage: 'denied' })
  })

  it('initializes defaults before events even without advertising', () => {
    trackEvent('game_search_empty', { source: 'home' })
    const commands = initializeGoogleConsentMode().dataLayer?.map((command) => Array.from(command as ArrayLike<unknown>))
    expect(commands?.map((command) => command[0])).toEqual(['consent', 'set', 'event'])
  })

  it('does not break user actions when the analytics tag throws', () => {
    initializeGoogleConsentMode().gtag = vi.fn(() => { throw new Error('Blocked') })
    expect(() => trackEvent('player_retry')).not.toThrow()
  })
})
