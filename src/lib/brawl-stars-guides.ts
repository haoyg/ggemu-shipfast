export type CreatorCodeStatus = 'verified' | 'unverified'

export type CreatorCode = {
  creatorName: string
  code: string
  status: CreatorCodeStatus
  verifiedAt?: string
  sourceUrl?: string
  sourceLabel?: string
}

export type CreatorCoffinsStatus = 'Upcoming' | 'Active' | 'Ended'

export const creatorCodes: ReadonlyArray<CreatorCode> = [
  {
    creatorName: 'KairosTime Gaming',
    code: 'KAIROS',
    status: 'verified',
    verifiedAt: '2026-08-29',
    sourceUrl: 'https://www.youtube.com/watch?v=F9o_XwN1bBg',
    sourceLabel: 'KairosTime video description',
  },
  {
    creatorName: 'Orange Juice Gaming',
    code: 'OJ',
    status: 'verified',
    verifiedAt: '2026-03-16',
    sourceUrl: 'https://www.youtube.com/watch?v=k4Gff4r3BL0',
    sourceLabel: 'Orange Juice video description',
  },
  { creatorName: 'Lex', code: 'LEX', status: 'unverified' },
  { creatorName: 'BenTimm1', code: 'BT1', status: 'unverified' },
  { creatorName: 'SpenLC', code: 'SPEN', status: 'unverified' },
]

export const creatorCoffinsStartDate = '2026-10-26'
export const creatorCoffinsEndDate = '2026-10-29'

export function getCreatorCoffinsStatus(now = new Date()): CreatorCoffinsStatus {
  const utcDate = now.toISOString().slice(0, 10)

  if (utcDate < creatorCoffinsStartDate) return 'Upcoming'
  if (utcDate > creatorCoffinsEndDate) return 'Ended'
  return 'Active'
}

export function filterCreatorCodes(query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase('en')
  if (!normalizedQuery) return creatorCodes

  return creatorCodes.filter(({ code, creatorName }) =>
    `${creatorName} ${code}`.toLocaleLowerCase('en').includes(normalizedQuery),
  )
}
