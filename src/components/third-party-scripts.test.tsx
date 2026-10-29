import { act, cleanup, render, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import {
  ThirdPartyScripts,
  isAdSenseEligiblePath,
  isPrivacyPolicyPath,
} from './third-party-scripts'

import { analyticsConsentKey, setAnalyticsConsent } from '#/lib/analytics'

const adsenseScriptId = 'pokopie-google-adsense'
const analyticsScriptId = 'pokopie-google-analytics'
const googleConsentInitializedKey = '__POKOPIE_GOOGLE_CONSENT_INITIALIZED__'

type GoogleTagWindow = Window & {
  dataLayer?: Array<Array<unknown>>
  gtag?: (...args: Array<unknown>) => void
  [googleConsentInitializedKey]?: boolean
}

afterEach(() => {
  cleanup()
  document.getElementById(adsenseScriptId)?.remove()
  document.getElementById(analyticsScriptId)?.remove()

  const googleWindow = window as GoogleTagWindow

  delete googleWindow.dataLayer
  delete googleWindow.gtag
  delete googleWindow[googleConsentInitializedKey]
  delete (window as unknown as Record<string, unknown>).__POKOPIE_ANALYTICS_CHOICE__
  window.localStorage.clear()
})

describe('ThirdPartyScripts', () => {
  it('loads Analytics once after hydration and queues its configuration', async () => {
    window.localStorage.setItem(analyticsConsentKey, 'granted')
    const { rerender } = render(<ThirdPartyScripts pathname="/en/about" />)

    await waitFor(() => {
      expect(document.getElementById(analyticsScriptId)).not.toBeNull()
    })

    const analyticsScript = document.getElementById(
      analyticsScriptId,
    ) as HTMLScriptElement
    const commands = (window as GoogleTagWindow).dataLayer ?? []

    expect(analyticsScript.async).toBe(true)
    expect(analyticsScript.src).toContain(
      `id=${encodeURIComponent('G-LZVYEMVMZB')}`,
    )
    expect(commands.map((command) => command[0])).toEqual([
      'consent',
      'set',
      'consent',
      'js',
      'config',
    ])
    expect(Array.from(commands[4])).toEqual(['config', 'G-LZVYEMVMZB'])

    rerender(<ThirdPartyScripts pathname="/en" />)
    expect(document.querySelectorAll(`#${analyticsScriptId}`)).toHaveLength(1)
  })

  it('does not load Analytics until allowed and disables it after withdrawal', async () => {
    render(<ThirdPartyScripts pathname="/en/about" />)
    expect(document.getElementById(analyticsScriptId)).toBeNull()
    act(() => setAnalyticsConsent('denied'))
    expect(document.getElementById(analyticsScriptId)).toBeNull()
    act(() => setAnalyticsConsent('granted'))
    await waitFor(() => expect(document.getElementById(analyticsScriptId)).not.toBeNull())
    act(() => setAnalyticsConsent('denied'))
    expect((window as unknown as Record<string, unknown>)['ga-disable-G-LZVYEMVMZB']).toBe(true)
    act(() => setAnalyticsConsent('granted'))
    expect(document.querySelectorAll(`#${analyticsScriptId}`)).toHaveLength(1)
  })

  it('loads AdSense when the browser becomes idle on content pages', async () => {
    render(<ThirdPartyScripts pathname="/en" />)

    await waitFor(() => {
      expect(document.getElementById(adsenseScriptId)).not.toBeNull()
    })

    const [command, action, defaults] = (window as GoogleTagWindow)
      .dataLayer?.[0] ?? []

    expect(command).toBe('consent')
    expect(action).toBe('default')
    expect(defaults).toEqual({
      ad_personalization: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500,
    })
  })

  it('recognizes content-rich AdSense pages', () => {
    expect(isAdSenseEligiblePath('/en')).toBe(true)
    expect(isAdSenseEligiblePath('/zh-CN/games/demo')).toBe(true)
    expect(isAdSenseEligiblePath('/ja/blog/retro-guide')).toBe(true)
  })

  it('does not load AdSense on excluded or unknown pages', () => {
    render(<ThirdPartyScripts pathname="/en/games/contra/play" />)

    expect(document.getElementById(adsenseScriptId)).toBeNull()
    expect(isAdSenseEligiblePath('/embed/en/games/demo')).toBe(false)
    expect(isAdSenseEligiblePath('/en/live')).toBe(false)
    expect(isAdSenseEligiblePath('/en/play-my-rom')).toBe(false)
    expect(isAdSenseEligiblePath('/en/about')).toBe(false)
    expect(isAdSenseEligiblePath('/en/terms-of-service')).toBe(false)
    expect(isAdSenseEligiblePath('/unknown-page')).toBe(false)
  })

  it('does not load Google scripts on privacy policy pages', () => {
    render(<ThirdPartyScripts pathname="/en/privacy-policy" />)

    expect(document.getElementById(adsenseScriptId)).toBeNull()
    expect(document.getElementById(analyticsScriptId)).toBeNull()
    expect((window as GoogleTagWindow).dataLayer).toBeUndefined()
  })

  it('recognizes localized privacy policy paths', () => {
    expect(isPrivacyPolicyPath('/zh-CN/privacy-policy')).toBe(true)
    expect(isPrivacyPolicyPath('/ja/privacy-policy/')).toBe(true)
    expect(isPrivacyPolicyPath('/en/terms-of-service')).toBe(false)
  })
})
