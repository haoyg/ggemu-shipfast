export const WORD_LADDER_STORAGE_KEY = 'pokopie-word-ladder-v1'
export const WORD_LADDER_STORAGE_VERSION = 1

export type WordLadderMode = 'daily' | 'unlimited'
export type WordLadderResult = {
  completedAt: string
  date?: string
  hintsUsed: number
  mode: WordLadderMode
  moves: number
  optimalMoves: number
  puzzleId: string
}
export type WordLadderProgress = {
  date?: string
  hintsUsed: number
  mode: WordLadderMode
  path: Array<string>
  puzzleId: string
  unlimitedIndex: number
}
export type WordLadderStorage = {
  history: Array<WordLadderResult>
  progress: WordLadderProgress | null
  unlimitedIndex: number
  version: 1
}

export const emptyWordLadderStorage: WordLadderStorage = {
  history: [], progress: null, unlimitedIndex: 0, version: WORD_LADDER_STORAGE_VERSION,
}

export function loadWordLadderStorage(storage: Pick<Storage, 'getItem'>) {
  try {
    const raw = storage.getItem(WORD_LADDER_STORAGE_KEY)
    return raw ? migrateWordLadderStorage(JSON.parse(raw) as unknown) : emptyWordLadderStorage
  } catch {
    return emptyWordLadderStorage
  }
}

export function saveWordLadderStorage(storage: Pick<Storage, 'setItem'>, state: WordLadderStorage) {
  try {
    storage.setItem(WORD_LADDER_STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

export function migrateWordLadderStorage(value: unknown): WordLadderStorage {
  if (!isRecord(value)) return emptyWordLadderStorage
  const history = Array.isArray(value.history) ? value.history.filter(isWordLadderResult).slice(-90) : []
  const unlimitedIndex = isNonNegativeInteger(value.unlimitedIndex) ? value.unlimitedIndex : 0
  const progress = isWordLadderProgress(value.progress) ? value.progress : null
  return { history, progress, unlimitedIndex, version: WORD_LADDER_STORAGE_VERSION }
}

export function getDailyStreak(history: ReadonlyArray<WordLadderResult>, today: string) {
  const completedDates = new Set(history
    .filter((result) => result.mode === 'daily' && result.date)
    .map((result) => result.date as string))
  let cursor = new Date(`${today}T00:00:00.000Z`)
  if (!completedDates.has(today)) cursor = new Date(cursor.getTime() - 86_400_000)

  let streak = 0
  while (completedDates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor = new Date(cursor.getTime() - 86_400_000)
  }
  return streak
}

function isWordLadderResult(value: unknown): value is WordLadderResult {
  if (!isRecord(value)) return false
  return typeof value.completedAt === 'string'
    && (value.mode === 'daily' || value.mode === 'unlimited')
    && typeof value.puzzleId === 'string'
    && isNonNegativeInteger(value.moves)
    && isNonNegativeInteger(value.optimalMoves)
    && isNonNegativeInteger(value.hintsUsed)
    && (value.date === undefined || typeof value.date === 'string')
}

function isWordLadderProgress(value: unknown): value is WordLadderProgress {
  if (!isRecord(value)) return false
  return (value.mode === 'daily' || value.mode === 'unlimited')
    && typeof value.puzzleId === 'string'
    && Array.isArray(value.path)
    && value.path.length > 0
    && value.path.every((word) => typeof word === 'string')
    && isNonNegativeInteger(value.hintsUsed)
    && isNonNegativeInteger(value.unlimitedIndex)
    && (value.date === undefined || typeof value.date === 'string')
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object'
}

function isNonNegativeInteger(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) >= 0
}
