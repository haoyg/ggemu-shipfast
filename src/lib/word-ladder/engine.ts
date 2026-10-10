import { WORD_LADDER_WORD_SET, WORD_LADDER_WORDS } from './dictionary'

export type WordLadderDifficulty = 'easy' | 'medium' | 'hard'

export type WordLadderPuzzle = {
  id: string
  start: string
  target: string
  difficulty: WordLadderDifficulty
}

export type WordLadderHint = {
  level: 1 | 2 | 3
  message: string
  suggestedWord?: string
}

const puzzleSeeds = [
  ['cold', 'warm'], ['lead', 'gold'], ['head', 'tail'],
  ['same', 'cost'], ['four', 'five'], ['love', 'hate'],
  ['ship', 'dock'], ['fire', 'cold'], ['wolf', 'lion'],
  ['seed', 'team'], ['book', 'read'], ['time', 'past'],
] as const

const neighborBuckets = buildNeighborBuckets(WORD_LADDER_WORDS)

export const WORD_LADDER_PUZZLES: ReadonlyArray<WordLadderPuzzle> = Object.freeze(
  puzzleSeeds.map(([start, target]) => {
    const steps = Math.max(0, findShortestPath(start, target).length - 1)
    return { id: `${start}-${target}`, start, target, difficulty: getDifficulty(steps) }
  }),
)

export function normalizeWord(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z]/g, '')
}

export function isValidWord(word: string) {
  return WORD_LADDER_WORD_SET.has(normalizeWord(word))
}

export function differsByOneLetter(left: string, right: string) {
  const normalizedLeft = normalizeWord(left)
  const normalizedRight = normalizeWord(right)
  if (normalizedLeft.length !== normalizedRight.length) return false

  let differences = 0
  for (let index = 0; index < normalizedLeft.length; index += 1) {
    if (normalizedLeft[index] !== normalizedRight[index]) differences += 1
    if (differences > 1) return false
  }
  return differences === 1
}

export function findShortestPath(startValue: string, targetValue: string) {
  const start = normalizeWord(startValue)
  const target = normalizeWord(targetValue)
  if (!WORD_LADDER_WORD_SET.has(start) || !WORD_LADDER_WORD_SET.has(target)) return []
  if (start === target) return [start]

  const queue = [start]
  const previous = new Map<string, string | null>([[start, null]])

  for (let queueIndex = 0; queueIndex < queue.length; queueIndex += 1) {
    const current = queue[queueIndex]
    for (const neighbor of getNeighbors(current)) {
      if (previous.has(neighbor)) continue
      previous.set(neighbor, current)
      if (neighbor === target) return reconstructPath(previous, target)
      queue.push(neighbor)
    }
  }
  return []
}

export function getSmartHint(
  current: string,
  target: string,
  requestedLevel: 1 | 2 | 3,
): WordLadderHint | null {
  const path = findShortestPath(current, target)
  if (path.length < 2) return null

  const remainingSteps = path.length - 1
  const suggestedWord = path[1]
  const changedIndex = findChangedIndex(current, suggestedWord)

  if (requestedLevel === 1) {
    return {
      level: 1,
      message: `A shortest route needs ${remainingSteps} more ${remainingSteps === 1 ? 'step' : 'steps'}.`,
    }
  }
  if (requestedLevel === 2) {
    return { level: 2, message: `Try changing letter ${changedIndex + 1}.` }
  }
  return {
    level: 3,
    message: `A strong next move is ${suggestedWord.toUpperCase()}.`,
    suggestedWord,
  }
}

export function getDailyPuzzle(utcDate: string) {
  const date = parseUtcDate(utcDate)
  const dayNumber = Math.floor(date.getTime() / 86_400_000)
  return WORD_LADDER_PUZZLES[positiveModulo(dayNumber, WORD_LADDER_PUZZLES.length)]
}

export function getUnlimitedPuzzle(index: number) {
  return WORD_LADDER_PUZZLES[positiveModulo(index * 7 + 3, WORD_LADDER_PUZZLES.length)]
}

export function validatePuzzle(puzzle: WordLadderPuzzle) {
  const path = findShortestPath(puzzle.start, puzzle.target)
  const steps = Math.max(0, path.length - 1)
  return { isValid: path.length > 1, path, steps, difficulty: getDifficulty(steps) }
}

function buildNeighborBuckets(words: ReadonlyArray<string>) {
  const buckets = new Map<string, Array<string>>()
  for (const word of words) {
    for (let index = 0; index < word.length; index += 1) {
      const pattern = `${word.slice(0, index)}*${word.slice(index + 1)}`
      const matches = buckets.get(pattern)
      if (matches) matches.push(word)
      else buckets.set(pattern, [word])
    }
  }
  return buckets
}

function getNeighbors(word: string) {
  const neighbors = new Set<string>()
  for (let index = 0; index < word.length; index += 1) {
    const pattern = `${word.slice(0, index)}*${word.slice(index + 1)}`
    for (const candidate of neighborBuckets.get(pattern) ?? []) {
      if (candidate !== word) neighbors.add(candidate)
    }
  }
  return neighbors
}

function reconstructPath(previous: Map<string, string | null>, target: string) {
  const path: Array<string> = []
  let current: string | null = target
  while (current) {
    path.push(current)
    current = previous.get(current) ?? null
  }
  return path.reverse()
}

function findChangedIndex(left: string, right: string) {
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) return index
  }
  return 0
}

function getDifficulty(steps: number): WordLadderDifficulty {
  if (steps <= 4) return 'easy'
  if (steps <= 6) return 'medium'
  return 'hard'
}

function parseUtcDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Daily puzzle date must use YYYY-MM-DD.')
  const date = new Date(`${value}T00:00:00.000Z`)
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error('Daily puzzle date is invalid.')
  }
  return date
}

function positiveModulo(value: number, modulus: number) {
  return ((value % modulus) + modulus) % modulus
}
