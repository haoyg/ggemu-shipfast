import { describe, expect, it } from 'vitest'

import { evaluateBrowserReadiness } from './browser-compatibility'

describe('browser compatibility readiness', () => {
  it('marks a browser with the core capabilities as ready', () => {
    expect(
      evaluateBrowserReadiness({
        fullscreen: true,
        gamepad: true,
        indexedDb: true,
        sharedArrayBuffer: false,
        wasm: true,
        webgl2: true,
      }),
    ).toEqual({ label: 'Ready', score: 90 })
  })

  it('requires both WebAssembly and WebGL 2', () => {
    expect(
      evaluateBrowserReadiness({
        fullscreen: true,
        gamepad: true,
        indexedDb: true,
        sharedArrayBuffer: true,
        wasm: true,
        webgl2: false,
      }).label,
    ).toBe('Not ready')
  })

  it('reports limited support when persistent storage is unavailable', () => {
    expect(
      evaluateBrowserReadiness({
        fullscreen: true,
        gamepad: false,
        indexedDb: false,
        sharedArrayBuffer: false,
        wasm: true,
        webgl2: true,
      }),
    ).toEqual({ label: 'Limited', score: 60 })
  })
})
