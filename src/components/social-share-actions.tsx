import { useEffect, useState } from 'react'

import { trackEvent } from '#/lib/analytics'

const productionOrigin = 'https://pokopie.com'

type SharePlatform = 'discord' | 'facebook' | 'link' | 'native' | 'reddit' | 'x'

export function SocialShareActions({
  canonicalPath,
  gameId,
  text,
  title,
  tone = 'light',
}: {
  canonicalPath: string
  gameId: string
  text: string
  title: string
  tone?: 'dark' | 'light'
}) {
  const [message, setMessage] = useState('')
  const shareUrl = `${productionOrigin}${canonicalPath}`
  const links = buildSocialShareLinks({ shareUrl, text, title })
  const buttonClass = tone === 'dark'
    ? 'btn btn-sm min-h-11 border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10'
    : 'btn btn-outline btn-sm min-h-11'

  useEffect(() => {
    if (!message) return
    const timer = window.setTimeout(() => setMessage(''), 3000)
    return () => window.clearTimeout(timer)
  }, [message])

  function trackShare(platform: SharePlatform) {
    trackEvent('game_share', {
      game_id: gameId,
      platform,
    })
  }

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl })
        trackShare('native')
        return
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
      }
    }

    await copyShareText(`${text}\n${shareUrl}`, 'native')
  }

  async function copyShareText(value: string, platform: 'discord' | 'link' | 'native') {
    try {
      await navigator.clipboard.writeText(value)
      setMessage(platform === 'discord'
        ? 'Discord share text copied. Paste it into any server or DM.'
        : 'Share link copied.')
      trackShare(platform)
    } catch {
      setMessage('Copy failed. Please copy the page URL from your browser.')
    }
  }

  return (
    <div aria-label={`Share ${title}`} className="mt-6">
      <p className={`text-xs font-black uppercase tracking-[0.16em] ${tone === 'dark' ? 'text-white/55' : 'text-base-content/55'}`}>
        Share this game
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button className={buttonClass} onClick={() => void handleNativeShare()} type="button">
          <i aria-hidden="true" className="ri-share-forward-line" /> Share
        </button>
        <ShareLink className={buttonClass} href={links.x} label="X" onShare={() => trackShare('x')} icon="ri-twitter-x-line" />
        <ShareLink className={buttonClass} href={links.facebook} label="Facebook" onShare={() => trackShare('facebook')} icon="ri-facebook-circle-fill" />
        <ShareLink className={buttonClass} href={links.reddit} label="Reddit" onShare={() => trackShare('reddit')} icon="ri-reddit-fill" />
        <button className={buttonClass} onClick={() => void copyShareText(`${title}\n${text}\n${shareUrl}`, 'discord')} type="button">
          <i aria-hidden="true" className="ri-discord-fill" /> Discord
        </button>
        <button className={buttonClass} onClick={() => void copyShareText(shareUrl, 'link')} type="button">
          <i aria-hidden="true" className="ri-link" /> Copy link
        </button>
      </div>
      <p aria-live="polite" className={`mt-2 min-h-5 text-sm ${tone === 'dark' ? 'text-success' : 'text-success'}`} role="status">
        {message}
      </p>
    </div>
  )
}

export function buildSocialShareLinks({
  shareUrl,
  text,
  title,
}: {
  shareUrl: string
  text: string
  title: string
}) {
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
  }
}

function ShareLink({
  className,
  href,
  icon,
  label,
  onShare,
}: {
  className: string
  href: string
  icon: string
  label: string
  onShare: () => void
}) {
  return (
    <a className={className} href={href} onClick={onShare} rel="nofollow noopener noreferrer" target="_blank">
      <i aria-hidden="true" className={icon} /> {label}
    </a>
  )
}
