import { cleanup, render, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import {
  AdsterraNativeBanner,
  adsterraScriptId,
} from './adsterra-native-banner'

afterEach(() => {
  cleanup()
  document.getElementById(adsterraScriptId)?.remove()
})

describe('AdsterraNativeBanner', () => {
  it('loads one asynchronous native-banner script after mounting', async () => {
    const { container } = render(<AdsterraNativeBanner locale="en" />)

    await waitFor(() => {
      expect(document.getElementById(adsterraScriptId)).not.toBeNull()
    })

    const script = document.getElementById(adsterraScriptId) as HTMLScriptElement

    expect(script.async).toBe(true)
    expect(script.getAttribute('data-cfasync')).toBe('false')
    expect(script.src).toContain('profitableratecpmnetwork.com')
    expect(container.textContent).toContain('Advertisement')
    expect(container.querySelectorAll('[id^="container-"]')).toHaveLength(1)
  })

  it('does not add duplicate scripts', async () => {
    const { rerender } = render(<AdsterraNativeBanner locale="en" />)

    rerender(<AdsterraNativeBanner locale="zh-CN" />)

    await waitFor(() => {
      expect(document.querySelectorAll(`#${adsterraScriptId}`)).toHaveLength(1)
    })
  })

  it('hides the placement when the provider script fails', async () => {
    const { container } = render(<AdsterraNativeBanner locale="en" />)

    await waitFor(() => {
      expect(document.getElementById(adsterraScriptId)).not.toBeNull()
    })

    document.getElementById(adsterraScriptId)?.dispatchEvent(new Event('error'))

    await waitFor(() => {
      expect(container.textContent).toBe('')
    })
  })
})
