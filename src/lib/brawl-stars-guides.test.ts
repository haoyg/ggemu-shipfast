import { describe, expect, it } from 'vitest'

import { creatorCodes, filterCreatorCodes, getCreatorCoffinsStatus } from './brawl-stars-guides'

describe('Brawl Stars guide data', () => {
  it('keeps verified codes backed by a dated creator-owned source', () => {
    const verified = creatorCodes.filter((item) => item.status === 'verified')

    expect(verified.length).toBeGreaterThanOrEqual(2)
    expect(verified.every((item) => item.sourceUrl && item.verifiedAt)).toBe(true)
  })

  it('filters by creator or code without case sensitivity', () => {
    expect(filterCreatorCodes('kairos').map((item) => item.code)).toEqual(['KAIROS'])
    expect(filterCreatorCodes('oj').map((item) => item.creatorName)).toEqual(['Orange Juice Gaming'])
    expect(filterCreatorCodes('missing')).toEqual([])
  })

  it('derives event status from the UTC calendar date', () => {
    expect(getCreatorCoffinsStatus(new Date('2026-10-25T23:59:59Z'))).toBe('Upcoming')
    expect(getCreatorCoffinsStatus(new Date('2026-10-26T00:00:00Z'))).toBe('Active')
    expect(getCreatorCoffinsStatus(new Date('2026-10-29T23:59:59Z'))).toBe('Active')
    expect(getCreatorCoffinsStatus(new Date('2026-10-30T00:00:00Z'))).toBe('Ended')
  })
})
