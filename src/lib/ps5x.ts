import rawGames from '#/data/ps5x-games.json'
import rawUpdates from '#/data/ps5x-updates.json'

export type Ps5xGameStatus =
  | 'verified-running'
  | 'reported-running'
  | 'boots-only'
  | 'not-working'
  | 'not-tested'

export type Ps5xGame = {
  id: string
  name: string
  status: Ps5xGameStatus
  fps: string | null
  testDate: string
  sourceUrl: string
  sourceType: string
  notes: string
}

export type Ps5xUpdate = {
  date: string
  title: string
  summary: string
  sourceUrl?: string
}

// The date the compatibility data and page copy were last reviewed against sources.
export const ps5xCheckedAt = '2026-10-19'

// The developer's verified channels. Only these are linked as downloads/evidence.
export const ps5xRepoUrl = 'https://github.com/Cosmo/KytyPS5'
export const ps5xGitHubReleaseUrl =
  'https://github.com/Cosmo/KytyPS5/releases/tag/xbox-1.1.26284.1505'

export const ps5xStatusOrder = [
  'verified-running',
  'reported-running',
  'boots-only',
  'not-working',
  'not-tested',
] as const satisfies ReadonlyArray<Ps5xGameStatus>

export const ps5xStatusLabels: Record<Ps5xGameStatus, string> = {
  'verified-running': 'Verified Running',
  'reported-running': 'Reported Running',
  'boots-only': 'Boots Only',
  'not-working': 'Not Working',
  'not-tested': 'Not Tested',
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function toStatus(value: unknown): Ps5xGameStatus {
  return typeof value === 'string' &&
    (ps5xStatusOrder as ReadonlyArray<string>).includes(value)
    ? (value as Ps5xGameStatus)
    : 'not-tested'
}

export function parsePs5xGames(raw: unknown): Ps5xGame[] {
  if (!Array.isArray(raw)) {
    return []
  }

  return raw.filter(isRecord).map((game) => ({
    id: String(game.id ?? ''),
    name: String(game.name ?? ''),
    status: toStatus(game.status),
    fps: typeof game.fps === 'string' && game.fps ? game.fps : null,
    testDate: String(game.testDate ?? ''),
    sourceUrl: String(game.sourceUrl ?? ''),
    sourceType: String(game.sourceType ?? ''),
    notes: String(game.notes ?? ''),
  }))
}

export function parsePs5xUpdates(raw: unknown): Ps5xUpdate[] {
  if (!Array.isArray(raw)) {
    return []
  }

  return raw.filter(isRecord).map((update) => ({
    date: String(update.date ?? ''),
    title: String(update.title ?? ''),
    summary: String(update.summary ?? ''),
    sourceUrl:
      typeof update.sourceUrl === 'string' && update.sourceUrl
        ? update.sourceUrl
        : undefined,
  }))
}

export const ps5xGames = parsePs5xGames(rawGames)
export const ps5xUpdates = parsePs5xUpdates(rawUpdates)

export type Ps5xStatusFilter = Ps5xGameStatus | 'all'

export function filterPs5xGames(
  query: string,
  status: Ps5xStatusFilter,
): Ps5xGame[] {
  const normalizedQuery = query.trim().toLowerCase()

  return ps5xGames.filter((game) => {
    const matchesQuery =
      normalizedQuery === '' ||
      game.name.toLowerCase().includes(normalizedQuery) ||
      game.notes.toLowerCase().includes(normalizedQuery)
    const matchesStatus = status === 'all' || game.status === status

    return matchesQuery && matchesStatus
  })
}

export const ps5xFaqs = [
  {
    question: 'Can Xbox Series X play PS5 games?',
    answer:
      'Not officially. Xbox Series X has no native PS5 game support, and Microsoft has blocked emulators in retail mode. The only PS5 activity shown on Xbox hardware so far comes from PS5X, an experimental proof-of-concept that boots a few non-exclusive PS5 titles in Developer Mode.',
  },
  {
    question: 'What is the PS5X emulator?',
    answer:
      'PS5X is a port of the open-source KytyPS5 emulator to Xbox Series X as a UWP app. It is a research project by developer Devran Cosmo Uenal, not a finished product. Because the PS5 and Xbox Series X share AMD x86-64 architecture, it behaves more like a compatibility layer than a full hardware emulator.',
  },
  {
    question: 'Is PS5X real?',
    answer:
      'The project is real, but it is an early proof-of-concept rather than a polished emulator. Its developer has shown a handful of non-exclusive PS5 games booting in Xbox Developer Mode. Treat viral claims that overstate its capabilities, or offer downloads, with skepticism.',
  },
  {
    question: 'Can I download PS5X?',
    answer:
      'An experimental build is available from the developer\'s GitHub release (tag xbox-1.1.26284.1505). It is unsigned research software that requires Xbox Developer Mode and an AVX2-capable CPU, so Xbox One is not supported. Download only from the developer\'s verified GitHub. Security researchers have warned of impersonation scams under similar names, including PCS5X (pcs5x.org), which distribute malware.',
  },
  {
    question: 'Is PS5X safe and legal?',
    answer:
      'PS5X is legal research software: it contains no PS5 firmware or decryption keys, and it runs only in Xbox Developer Mode, outside retail mode. The main risk is downloads — the only verified source is the developer\'s GitHub. Impersonation scams under similar names (including PCS5X) distribute malware, so avoid any "PS5X" installer found anywhere else.',
  },
  {
    question: 'Does PS5X work on Xbox Series S?',
    answer:
      'The developer’s demonstration was on Xbox Series X. Series S support has not been demonstrated, and its smaller memory and GPU budget would make the already-tight 5GB Developer Mode cap more restrictive. Treat Series S compatibility as unconfirmed.',
  },
  {
    question: 'Which PS5 games work on Xbox?',
    answer:
      'Only a few non-exclusive titles have been shown booting: Quake II, GEX Trilogy, Hellboy: Web of Wyrd and Marvel Cosmic Invasion, with Astro Bot booting near 10 FPS. No PS5 exclusive has been shown working, and none of these titles are verified as comfortably playable.',
  },
  {
    question: 'Is PS5X officially supported by Microsoft or Sony?',
    answer:
      'No. Microsoft limits emulators to Developer Mode and has blocked them in retail mode. Sony does not license or support PS5 software on Xbox hardware. PS5X is independent, unofficial research.',
  },
  {
    question: 'How fast do PS5 games run on Xbox hardware?',
    answer:
      'Reported results are well below playable for most titles. Quake II was reported around 25–45 FPS with dips below 20 and input latency, while Astro Bot was reported around 10 FPS. No title has been independently shown running at a smooth, sustained frame rate.',
  },
] as const
