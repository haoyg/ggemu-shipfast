import { cleanup, render, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ThirdPartyScripts } from './third-party-scripts'

const adsenseScriptId = 'pokopie-google-adsense'

afterEach(() => {
  cleanup()
  document.getElementById(adsenseScriptId)?.remove()
})

describe('ThirdPartyScripts', () => {
  it('loads AdSense after hydration on content pages', async () => {
    render(<ThirdPartyScripts pathname="/en" />)

    await waitFor(() => {
      expect(document.getElementById(adsenseScriptId)).not.toBeNull()
    })
  })

  it('does not load AdSense on game play pages', () => {
    render(<ThirdPartyScripts pathname="/en/games/contra/play" />)

    expect(document.getElementById(adsenseScriptId)).toBeNull()
  })
})
