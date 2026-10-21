import { useEffect, useState } from 'react'

import { analyticsConsentEvent, analyticsConsentKey, getAnalyticsConsent, initializeGoogleConsentMode, readAnalyticsConsent, setAnalyticsConsent, type AnalyticsConsent } from '#/lib/analytics'
import { siteConfig } from '#/lib/site-config'

const googleAdsenseScriptId = 'pokopie-google-adsense'
const googleAnalyticsScriptId = 'pokopie-google-analytics'

export function ThirdPartyScripts({ pathname }: Readonly<{ pathname: string }>) {
  const isPrivacyPolicy = isPrivacyPolicyPath(pathname)

  useGoogleAnalytics(isPrivacyPolicy)
  useGoogleAdsense(isPrivacyPolicy || !isAdSenseEligiblePath(pathname))

  return null
}

function useGoogleAnalytics(disabled: boolean) {
  const analyticsId = siteConfig.GOOGLE_ANALYTICS_ID.trim()
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null)

  useEffect(() => {
    setConsent(getAnalyticsConsent())
    const onChange = (event: Event) => setConsent((event as CustomEvent<AnalyticsConsent>).detail)
    const onStorage = (event: StorageEvent) => {
      if (event.key === analyticsConsentKey || event.key === null) setAnalyticsConsent(readAnalyticsConsent() ?? 'denied', false)
    }
    window.addEventListener(analyticsConsentEvent, onChange)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(analyticsConsentEvent, onChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  useEffect(() => {
    Object.assign(window, { [`ga-disable-${analyticsId}`]: consent !== 'granted' })
    if (
      disabled ||
      consent !== 'granted' ||
      !analyticsId ||
      document.getElementById(googleAnalyticsScriptId)
    ) {
      return
    }

    return scheduleWhenIdle(() => {
      if (document.getElementById(googleAnalyticsScriptId)) return

      const googleWindow = initializeGoogleConsentMode()
      appendAsyncScript(
        googleAnalyticsScriptId,
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`,
      )
      googleWindow.gtag?.('js', new Date())
      googleWindow.gtag?.('config', analyticsId)
    })
  }, [analyticsId, consent, disabled])
}

export function isAdSenseEligiblePath(pathname: string) {
  const localizedContentPath =
    /^\/(?:zh-CN|zh-TW|en|ja|ko|es|pt|fr|de|it)(?:\/?|\/games\/[^/]+\/?|\/blog(?:\/[^/]+)?\/?)$/

  return localizedContentPath.test(pathname)
}

export function isPrivacyPolicyPath(pathname: string) {
  return /^\/(?:[^/]+\/)?privacy-policy\/?$/.test(pathname)
}

function useGoogleAdsense(disabled: boolean) {
  const client = siteConfig.GOOGLE_ADSENSE_CLIENT.trim()

  useEffect(() => {
    if (disabled || !client || document.getElementById(googleAdsenseScriptId)) {
      return
    }

    initializeGoogleConsentMode()
    appendAsyncScript(
      googleAdsenseScriptId,
      `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`,
      'anonymous',
    )
  }, [client, disabled])
}

function appendAsyncScript(
  id: string,
  src: string,
  crossOrigin?: HTMLScriptElement['crossOrigin'],
) {
  const script = document.createElement('script')
  script.id = id
  script.async = true
  script.src = src

  if (crossOrigin) {
    script.crossOrigin = crossOrigin
  }

  document.head.append(script)
}

function scheduleWhenIdle(callback: () => void) {
  const idleWindow = window as Window & {
      cancelIdleCallback?: (handle: number) => void
      requestIdleCallback?: (
        callback: () => void,
        options?: { timeout: number },
      ) => number
  }

  if (idleWindow.requestIdleCallback) {
    const handle = idleWindow.requestIdleCallback(callback, { timeout: 2_000 })

    return () => idleWindow.cancelIdleCallback?.(handle)
  }

  const handle = window.setTimeout(callback, 0)
  return () => window.clearTimeout(handle)
}
