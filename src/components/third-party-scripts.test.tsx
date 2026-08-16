import { cleanup, render, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import {
  ThirdPartyScripts,
  isAdSenseEligiblePath,
  isPrivacyPolicyPath,
} from './third-party-scripts'

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
})

describe('ThirdPartyScripts', () => {
  it('loads AdSense after hydration on content pages', async () => {
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
