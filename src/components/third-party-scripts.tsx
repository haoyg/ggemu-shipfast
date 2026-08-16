import { useEffect } from 'react'

import { siteConfig } from '#/lib/site-config'

const googleAnalyticsScriptId = 'pokopie-google-analytics'
const googleAdsenseScriptId = 'pokopie-google-adsense'
const googleConsentInitializedKey = '__POKOPIE_GOOGLE_CONSENT_INITIALIZED__'

type GoogleTagWindow = Window & {
  dataLayer?: Array<Array<unknown>>
  gtag?: (...args: Array<unknown>) => void
  [googleConsentInitializedKey]?: boolean
}

export function ThirdPartyScripts({ pathname }: Readonly<{ pathname: string }>) {
  const isPrivacyPolicy = isPrivacyPolicyPath(pathname)

  useGoogleAnalytics(isPrivacyPolicy)
  useGoogleAdsense(!isAdSenseEligiblePath(pathname))

  return null
}

export function isAdSenseEligiblePath(pathname: string) {
  const localizedContentPath =
    /^\/(?:zh-CN|en|ja)(?:\/?|\/games\/[^/]+\/?|\/blog(?:\/[^/]+)?\/?)$/

  return localizedContentPath.test(pathname)
}

export function isPrivacyPolicyPath(pathname: string) {
  return /^\/(?:[^/]+\/)?privacy-policy\/?$/.test(pathname)
}

function useGoogleAnalytics(disabled: boolean) {
  const analyticsId = siteConfig.GOOGLE_ANALYTICS_ID.trim()

  useEffect(() => {
    if (
      disabled ||
      !analyticsId ||
      document.getElementById(googleAnalyticsScriptId)
    ) {
      return
    }

    const googleWindow = initializeGoogleConsentMode()

    googleWindow.gtag?.('js', new Date())
    googleWindow.gtag?.('config', analyticsId)

    appendAsyncScript(
      googleAnalyticsScriptId,
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`,
    )
  }, [analyticsId, disabled])
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

function initializeGoogleConsentMode() {
  const googleWindow = window as GoogleTagWindow

  googleWindow.dataLayer = googleWindow.dataLayer ?? []
  googleWindow.gtag =
    googleWindow.gtag ??
    ((...args) => {
      googleWindow.dataLayer?.push(args)
    })

  if (!googleWindow[googleConsentInitializedKey]) {
    googleWindow.gtag('consent', 'default', {
      ad_personalization: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500,
    })
    googleWindow.gtag('set', 'ads_data_redaction', true)
    googleWindow[googleConsentInitializedKey] = true
  }

  return googleWindow
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
