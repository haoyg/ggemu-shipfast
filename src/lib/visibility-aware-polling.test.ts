import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  getPollingDelay,
  startVisibilityAwarePolling,
} from '#/lib/visibility-aware-polling'

function setAvailability({
  isOnline,
  visibilityState,
}: {
  isOnline: boolean
  visibilityState: DocumentVisibilityState
}) {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    value: visibilityState,
  })
  Object.defineProperty(navigator, 'onLine', {
    configurable: true,
    value: isOnline,
  })
}

describe('visibility-aware polling', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setAvailability({ isOnline: true, visibilityState: 'visible' })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('polls repeatedly while the page is visible and online', async () => {
    const run = vi.fn().mockResolvedValue(undefined)
    const stop = startVisibilityAwarePolling({ intervalMs: 1_000, run })

    await vi.advanceTimersByTimeAsync(2_000)

    expect(run).toHaveBeenCalledTimes(2)
    stop()
  })

  it('pauses in the background and refreshes immediately when visible', async () => {
    const run = vi.fn().mockResolvedValue(undefined)
    const stop = startVisibilityAwarePolling({ intervalMs: 1_000, run })

    setAvailability({ isOnline: true, visibilityState: 'hidden' })
    document.dispatchEvent(new Event('visibilitychange'))
    await vi.advanceTimersByTimeAsync(5_000)
    expect(run).not.toHaveBeenCalled()

    setAvailability({ isOnline: true, visibilityState: 'visible' })
    document.dispatchEvent(new Event('visibilitychange'))
    await Promise.resolve()
    expect(run).toHaveBeenCalledTimes(1)
    stop()
  })

  it('uses capped exponential backoff after failures', async () => {
    const run = vi.fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValue(undefined)
    const stop = startVisibilityAwarePolling({
      intervalMs: 100,
      maxIntervalMs: 800,
      run,
    })

    await vi.advanceTimersByTimeAsync(100)
    await vi.advanceTimersByTimeAsync(199)
    expect(run).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(1)
    expect(run).toHaveBeenCalledTimes(2)
    expect(getPollingDelay(100, 800, 10)).toBe(800)
    stop()
  })
})
