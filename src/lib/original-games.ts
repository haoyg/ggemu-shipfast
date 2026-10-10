export type OriginalGameMetadata = {
  category: 'word-games' | 'puzzle-games' | 'logic-games'
  description: string
  id: string
  path: string
  title: string
}

export const originalGames = {
  wordLadder: {
    category: 'word-games',
    description: 'Change one letter at a time in a daily or unlimited word puzzle.',
    id: 'word-ladder',
    path: '/en/games/word-ladder',
    title: 'Word Ladder Challenge',
  },
} as const satisfies Record<string, OriginalGameMetadata>
