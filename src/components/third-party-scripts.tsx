import { useEffect } from 'react'

import { siteConfig } from '#/lib/site-config'

const googleAnalyticsScriptId = 'pokopie-google-analytics'
const googleAdsenseScriptId = 'pokopie-google-adsense'

export function ThirdPartyScripts({ pathname }: Readonly<{ pathname: string }>) {
  useGoogleAnalytics()
  useGoogleAdsense(isGamePlayPath(pathname))

  return null
}

export function isGamePlayPath(pathname: string) {
  return /^\/(?:[^/]+\/)?games\/[^/]+\/play\/?$/.test(pathname)
}

function useGoogleAnalytics() {
  const analyticsId = siteConfig.GOOGLE_ANALYTICS_ID.trim()

  useEffect(() => {
    if (!analyticsId || document.getElementById(googleAnalyticsScriptId)) {
      return
    }

    const analyticsWindow = window as Window & {
      dataLayer?: Array<Array<unknown>>
      gtag?: (...args: Array<unknown>) => void
    }
    analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? []
    analyticsWindow.gtag = (...args) => {
      analyticsWindow.dataLayer?.push(args)
    }
    analyticsWindow.gtag('js', new Date())
    analyticsWindow.gtag('config', analyticsId)

    appendAsyncScript(
      googleAnalyticsScriptId,
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`,
    )
  }, [analyticsId])
}

function useGoogleAdsense(disabled: boolean) {
  const client = siteConfig.GOOGLE_ADSENSE_CLIENT.trim()

  useEffect(() => {
    if (disabled || !client || document.getElementById(googleAdsenseScriptId)) {
      return
    }

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
