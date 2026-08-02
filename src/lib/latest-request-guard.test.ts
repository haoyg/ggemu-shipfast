import { describe, expect, it } from 'vitest'

import { LatestRequestGuard } from '#/lib/latest-request-guard'

describe('LatestRequestGuard', () => {
  it('accepts only the most recently started request', () => {
    const guard = new LatestRequestGuard()
    const first = guard.begin()
    const second = guard.begin()

    expect(guard.isLatest(first)).toBe(false)
    expect(guard.isLatest(second)).toBe(true)
  })

  it('invalidates requests when route data changes', () => {
    const guard = new LatestRequestGuard()
    const request = guard.begin()

    guard.invalidate()

    expect(guard.isLatest(request)).toBe(false)
  })
})
