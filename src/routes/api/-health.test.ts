import { afterEach, describe, expect, it, vi } from 'vitest'

import { getHealthResponse } from './health'

afterEach(() => vi.unstubAllGlobals())

describe('health endpoint', () => {
  it('returns 200 when GGEMU is available', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 200 })))
    const response = await getHealthResponse()

    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toBe('no-store')
    expect((await response.json()).status).toBe('ok')
  })

  it('returns 503 when GGEMU is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 503 })))
    const response = await getHealthResponse()

    expect(response.status).toBe(503)
    expect((await response.json()).status).toBe('degraded')
  })
})
