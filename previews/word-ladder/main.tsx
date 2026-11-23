import { createRoot } from 'react-dom/client'
import { WordLadderGame } from '#/components/word-ladder-game'
import { getDailyPuzzle } from '#/lib/word-ladder/engine'
import './styles.css'

const game = document.getElementById('game')
if (!game) throw new Error('Word Ladder mount point is missing')

const dailyDate = new Date().toISOString().slice(0, 10)
createRoot(game).render(
  <WordLadderGame
    dailyDate={dailyDate}
    dailyPuzzle={getDailyPuzzle(dailyDate)}
    shareUrl="https://pokopie.com/en/games/word-ladder"
  />,
)
