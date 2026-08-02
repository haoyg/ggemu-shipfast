import { useEffect, useId, useRef, useState } from 'react'

import { AccessibleModal } from '#/components/accessible-modal'
import type { PublicGame } from '#/lib/ggemu'
import {
  createPosterDataUrl,
  getPosterFileName,
} from '#/lib/game-poster'
import { getI18n } from '#/lib/i18n'

export function GameShareActions({
  canonicalUrl,
  game,
  labels,
}: {
  canonicalUrl: string
  game: PublicGame
  labels: ReturnType<typeof getI18n>['detail']
}) {
  const dropdownRef = useRef<HTMLDetailsElement>(null)
  const [posterUrl, setPosterUrl] = useState('')
  const [shareMessage, setShareMessage] = useState('')
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false)
  const title = game.name || 'POKOPIE'

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!dropdownRef.current?.open) {
        return
      }

      if (dropdownRef.current.contains(event.target as Node)) {
        return
      }

      closeDropdown()
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  function closeDropdown() {
    if (dropdownRef.current) {
      dropdownRef.current.open = false
    }
  }

  async function handleGeneratePoster() {
    closeDropdown()
    setIsGeneratingPoster(true)

    try {
      setPosterUrl(await createPosterDataUrl({ cta: labels.posterScanCta, game, url: canonicalUrl }))
    } finally {
      setIsGeneratingPoster(false)
    }
  }

  async function handleSystemShare() {
    closeDropdown()
    setShareMessage('')

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: title,
          url: canonicalUrl,
        })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        await copyShareLink(canonicalUrl)
      }
      return
    }

    await copyShareLink(canonicalUrl)
  }

  async function copyShareLink(url: string) {
    await navigator.clipboard?.writeText(url).catch(() => undefined)
    setShareMessage(labels.shareUnavailableCopied)
  }

  return (
    <>
      <details className="dropdown" ref={dropdownRef}>
        <summary className="btn btn-outline btn-lg w-full px-5 sm:w-auto">
          <i className="ri-share-line text-xl" />
          {labels.share}
        </summary>
        <ul className="menu dropdown-content z-50 mt-2 w-44 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
          <li>
            <button
              disabled={isGeneratingPoster}
              onClick={() => void handleGeneratePoster()}
              type="button"
            >
              <i className={isGeneratingPoster ? 'loading loading-spinner loading-xs' : 'ri-image-line'} />
              {labels.generatePoster}
            </button>
          </li>
          <li>
            <button onClick={() => void handleSystemShare()} type="button">
              <i className="ri-share-forward-line" />
              {labels.systemShare}
            </button>
          </li>
        </ul>
      </details>

      {shareMessage ? (
        <div className="toast toast-top toast-center z-50">
          <div
            aria-live="polite"
            className="alert alert-info w-[calc(100vw-1rem)] max-w-sm py-2 text-sm"
            role="status"
          >
            {shareMessage}
          </div>
        </div>
      ) : null}

      {posterUrl ? (
        <PosterModal
          labels={labels}
          onClose={() => setPosterUrl('')}
          posterUrl={posterUrl}
          title={title}
        />
      ) : null}
    </>
  )
}

function PosterModal({
  labels,
  onClose,
  posterUrl,
  title,
}: {
  labels: ReturnType<typeof getI18n>['detail']
  onClose: () => void
  posterUrl: string
  title: string
}) {
  const titleId = useId()

  return (
    <AccessibleModal
      closeLabel={labels.installGuideClose}
      labelledBy={titleId}
      modalBoxClassName="max-w-sm p-4"
      onClose={onClose}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold" id={titleId}>
          {labels.posterTitle}
        </h2>
        <button
          aria-label={labels.installGuideClose}
          className="btn btn-ghost btn-sm btn-circle"
          onClick={onClose}
          type="button"
        >
          <i className="ri-close-line text-xl" />
        </button>
      </div>
      <img
        alt={labels.posterTitle}
        className="mt-4 w-full rounded-box border border-base-300 bg-base-200"
        decoding="async"
        height="1080"
        src={posterUrl}
        width="720"
      />
      <div className="modal-action">
        <a
          className="btn btn-primary"
          download={`${getPosterFileName(title)}.png`}
          href={posterUrl}
        >
          <i className="ri-download-line" />
          {labels.downloadPoster}
        </a>
      </div>
    </AccessibleModal>
  )
}
