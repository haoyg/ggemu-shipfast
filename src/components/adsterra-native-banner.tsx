import { useEffect, useState } from 'react'

import type { Locale } from '#/lib/ggemu'
import { siteConfig } from '#/lib/site-config'

const adsterraScriptId = 'pokopie-adsterra-native-banner'

const labels: Record<Locale, string> = {
  'zh-CN': '广告',
  en: 'Advertisement',
  ja: '広告',
}

export function AdsterraNativeBanner({ locale }: Readonly<{ locale: Locale }>) {
  const [loadFailed, setLoadFailed] = useState(false)
  const containerId = siteConfig.ADSTERRA_NATIVE_CONTAINER_ID.trim()
  const scriptUrl = siteConfig.ADSTERRA_NATIVE_SCRIPT_URL.trim()

  useEffect(() => {
    if (!containerId || !scriptUrl || document.getElementById(adsterraScriptId)) {
      return
    }

    const script = document.createElement('script')
    script.id = adsterraScriptId
    script.async = true
    script.src = scriptUrl
    script.setAttribute('data-cfasync', 'false')
    script.addEventListener('error', () => setLoadFailed(true), { once: true })
    document.body.append(script)

    return () => {
      script.remove()
      document.getElementById(containerId)?.replaceChildren()
    }
  }, [containerId, scriptUrl])

  if (!containerId || !scriptUrl || loadFailed) {
    return null
  }

  return (
    <aside
      aria-label={labels[locale]}
      className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-3 shadow-sm"
    >
      <p className="mb-2 text-center text-[0.65rem] uppercase tracking-[0.16em] text-white/40">
        {labels[locale]}
      </p>
      <div className="min-h-20" id={containerId} />
    </aside>
  )
}

export { adsterraScriptId }
