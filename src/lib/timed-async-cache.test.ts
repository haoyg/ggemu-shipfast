import { describe, expect, it, vi } from 'vitest'

import { TimedAsyncCache } from '#/lib/timed-async-cache'

function cacheValue(value: string, staleUntil = 100) {
  return {
    expiresAt: staleUntil - 10,
    staleUntil,
    value,
  }
}

describe('TimedAsyncCache', () => {
  it('evicts the least recently used entry when it reaches capacity', () => {
    const cache = new TimedAsyncCache(2)

    cache.set('first', cacheValue('first'), 0)
    cache.set('second', cacheValue('second'), 0)
    expect(cache.get('first', 0)?.value).toBe('first')

    cache.set('third', cacheValue('third'), 0)

    expect(cache.get('second', 0)).toBeUndefined()
    expect(cache.get('first', 0)?.value).toBe('first')
    expect(cache.get('third', 0)?.value).toBe('third')
  })

  it('removes entries after their stale window', () => {
    const cache = new TimedAsyncCache(2)

    cache.set('expired', cacheValue('expired', 10), 0)

    expect(cache.get('expired', 10)).toBeUndefined()
  })

  it('deduplicates concurrent work for the same key', async () => {
    const cache = new TimedAsyncCache(2)
    let resolveRequest: ((value: string) => void) | undefined
    const load = vi.fn(() => new Promise<string>((resolve) => {
      resolveRequest = resolve
    }))

    const first = cache.run('games', load)
    const second = cache.run('games', load)

    expect(load).toHaveBeenCalledTimes(1)
    resolveRequest?.('result')
    await expect(Promise.all([first, second])).resolves.toEqual(['result', 'result'])
  })

  it('allows another attempt after a request fails', async () => {
    const cache = new TimedAsyncCache(2)
    const load = vi.fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce('recovered')

    await expect(cache.run('games', load)).rejects.toThrow('offline')
    await expect(cache.run('games', load)).resolves.toBe('recovered')
    expect(load).toHaveBeenCalledTimes(2)
  })
})
