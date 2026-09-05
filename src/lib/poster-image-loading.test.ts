import { afterEach, describe, expect, it, vi } from 'vitest'
import { loadPosterImage } from './game-poster'

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals() })

function mockImage() {
  const image = { src: '', onload: null as null | (() => void), onerror: null as null | (() => void) }
  vi.stubGlobal('Image', class { constructor() { return image } })
  return image
}

describe('poster image loading', () => {
  it('rejects stalled images and releases handlers and the pending request', async () => {
    vi.useFakeTimers()
    const image = mockImage()
    const pending = loadPosterImage('/slow-cover')
    const assertion = expect(pending).rejects.toThrow('timed out')
    await vi.advanceTimersByTimeAsync(10_000)
    await assertion
    expect(image.src).toBe('')
    expect(image.onload).toBeNull()
    expect(image.onerror).toBeNull()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('clears the timeout after a successful load', async () => {
    vi.useFakeTimers()
    const image = mockImage()
    const pending = loadPosterImage('/cover')
    image.onload?.()
    expect(await pending).toBe(image)
    expect(vi.getTimerCount()).toBe(0)
    expect(image.onload).toBeNull()
  })

  it('rejects broken images immediately without leaving a timer', async () => {
    vi.useFakeTimers()
    const image = mockImage()
    const pending = loadPosterImage('/missing-cover')
    image.onerror?.()
    await expect(pending).rejects.toThrow('could not be loaded')
    expect(vi.getTimerCount()).toBe(0)
  })
})
