import { useEffect } from 'react'

import { initializeGoogleConsentMode } from '#/lib/analytics'
import { siteConfig } from '#/lib/site-config'

const googleAdsenseScriptId = 'pokopie-google-adsense'
export function ThirdPartyScripts({ pathname }: Readonly<{ pathname: string }>) {
  const isPrivacyPolicy = isPrivacyPolicyPath(pathname)

  useGoogleAdsense(isPrivacyPolicy || !isAdSenseEligiblePath(pathname))

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
