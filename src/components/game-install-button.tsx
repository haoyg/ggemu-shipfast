import { useEffect, useId, useState } from 'react'

import { AccessibleModal } from '#/components/accessible-modal'
import { getI18n } from '#/lib/i18n'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

type InstallPromptWindow = Window & {
  __POKOPIE_INSTALL_PROMPT__?: BeforeInstallPromptEvent | null
}

const defaultManifestHref = '/manifest.webmanifest'

export function GameInstallButton({
  labels,
  manifestHref,
}: {
  labels: ReturnType<typeof getI18n>['detail']
  manifestHref: string
}) {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    syncManifestLink(manifestHref)
    setStoredInstallPrompt(setInstallPrompt)

    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault()
      const prompt = event as BeforeInstallPromptEvent

      ;(window as InstallPromptWindow).__POKOPIE_INSTALL_PROMPT__ = prompt
      setInstallPrompt(prompt)
      setIsGuideOpen(false)
      setMessage('')
    }

    function handleStoredInstallPrompt() {
      setStoredInstallPrompt(setInstallPrompt)
      setIsGuideOpen(false)
      setMessage('')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('pokopie:installprompt', handleStoredInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('pokopie:installprompt', handleStoredInstallPrompt)
      syncManifestLink(defaultManifestHref)
    }
  }, [manifestHref])

  useEffect(() => {
    if (!message) {
      return
    }

    const timer = setTimeout(() => setMessage(''), 3000)

    return () => clearTimeout(timer)
  }, [message])

  async function handleInstall() {
    setMessage('')

    if (!installPrompt) {
      setIsGuideOpen(true)
      return
    }

    await installPrompt.prompt()
    const choice = await installPrompt.userChoice

    ;(window as InstallPromptWindow).__POKOPIE_INSTALL_PROMPT__ = null
    setInstallPrompt(null)

    if (choice.outcome === 'dismissed') {
      setMessage(labels.installDismissed)
    }
  }

  return (
    <>
      <button
        className="btn btn-outline btn-lg w-full px-5 sm:w-auto"
        onClick={() => void handleInstall()}
        type="button"
      >
        <i aria-hidden="true" className="ri-download-cloud-2-line text-xl" />
        {labels.install}
      </button>

      {message ? (
        <div className="toast toast-top toast-center z-50">
          <div
            aria-live="polite"
            className="alert alert-info w-[calc(100vw-1rem)] max-w-sm py-2 text-sm"
            role="status"
          >
            {message}
          </div>
        </div>
      ) : null}

      {isGuideOpen ? (
        <InstallGuideModal labels={labels} onClose={() => setIsGuideOpen(false)} />
      ) : null}
    </>
  )
}

export function syncManifestLink(href: string) {
  const links = Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel="manifest"]'),
  )

  if (links.length === 0) {
    const link = document.createElement('link')

    link.rel = 'manifest'
    link.href = href
    document.head.append(link)
    return
  }

  links.forEach((link) => {
    link.href = href
  })
}

function setStoredInstallPrompt(
  setInstallPrompt: (prompt: BeforeInstallPromptEvent | null) => void,
) {
  setInstallPrompt((window as InstallPromptWindow).__POKOPIE_INSTALL_PROMPT__ ?? null)
}

function InstallGuideModal({
  labels,
  onClose,
}: {
  labels: ReturnType<typeof getI18n>['detail']
  onClose: () => void
}) {
  const titleId = useId()

  return (
    <AccessibleModal
      closeLabel={labels.installGuideClose}
      labelledBy={titleId}
      modalBoxClassName="max-w-md"
      onClose={onClose}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold" id={titleId}>
            {labels.installGuideTitle}
          </h2>
          <p className="mt-2 text-sm leading-6 text-base-content/70">
            {labels.installGuideIntro}
          </p>
        </div>
        <button
          aria-label={labels.installGuideClose}
          className="btn btn-ghost btn-sm btn-circle"
          onClick={onClose}
          type="button"
        >
          <i aria-hidden="true" className="ri-close-line text-xl" />
        </button>
      </div>

      <div className="mt-5 grid gap-3 text-sm">
        <InstallGuideStep icon="ri-share-forward-line" text={labels.installGuideIos} />
        <InstallGuideStep icon="ri-more-2-fill" text={labels.installGuideAndroid} />
        <InstallGuideStep icon="ri-computer-line" text={labels.installGuideDesktop} />
      </div>

      <div className="modal-action">
        <button className="btn btn-primary" onClick={onClose} type="button">
          {labels.installGuideClose}
        </button>
      </div>
    </AccessibleModal>
  )
}

function InstallGuideStep({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-box border border-base-300 bg-base-200/60 p-3">
      <i aria-hidden="true" className={`${icon} mt-0.5 text-lg text-primary`} />
      <p className="leading-6 text-base-content/80">{text}</p>
    </div>
  )
}
