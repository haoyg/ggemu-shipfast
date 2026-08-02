import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import {
  GameInstallButton,
  syncManifestLink,
} from '#/components/game-install-button'
import { getI18n } from '#/lib/i18n'

afterEach(() => {
  cleanup()
  document.head.querySelectorAll('link[rel="manifest"]').forEach((link) => link.remove())
})

describe('GameInstallButton', () => {
  it('opens the install guide when no browser prompt is available', () => {
    const labels = getI18n('en').detail

    render(
      <GameInstallButton
        labels={labels}
        manifestHref="/manifest.webmanifest?locale=en"
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: labels.install }))

    expect(screen.getByRole('dialog').getAttribute('aria-labelledby')).toBeTruthy()
    expect(screen.getByText(labels.installGuideTitle)).toBeTruthy()
  })

  it('creates and updates the active manifest link', () => {
    syncManifestLink('/manifest.webmanifest?locale=ja')
    const manifest = document.head.querySelector<HTMLLinkElement>('link[rel="manifest"]')

    expect(manifest?.getAttribute('href')).toBe('/manifest.webmanifest?locale=ja')

    syncManifestLink('/manifest.webmanifest?locale=en')
    expect(manifest?.getAttribute('href')).toBe('/manifest.webmanifest?locale=en')
  })
})
