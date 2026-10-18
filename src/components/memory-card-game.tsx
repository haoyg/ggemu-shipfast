import { useEffect, useState } from 'react'

const ranks = ['A', '2', '3', '4', '5', '6']
type Card = { rank: string; suit: string }

function shuffledDeck(): Card[] {
  const cards = ranks.flatMap(rank => ['♠', '♥'].map(suit => ({ rank, suit })))
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  return cards
}

export function MemoryCardGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [open, setOpen] = useState<number[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [moves, setMoves] = useState(0)
  const locked = open.length === 2
  const won = matched.length === ranks.length

  useEffect(() => {
    if (open.length !== 2) return
    const timeout = window.setTimeout(() => setOpen([]), 1000)
    return () => window.clearTimeout(timeout)
  }, [open])

  function start() {
    setCards(shuffledDeck())
    setOpen([])
    setMatched([])
    setMoves(0)
  }

  function flip(index: number) {
    if (locked || open.includes(index) || matched.includes(cards[index].rank)) return
    if (open.length === 0) {
      setOpen([index])
      return
    }
    setMoves(value => value + 1)
    if (cards[open[0]].rank === cards[index].rank) {
      setMatched(value => [...value, cards[index].rank])
      setOpen([])
    } else {
      setOpen([open[0], index])
    }
  }

  return (
    <section aria-labelledby="play-memory-title" className="my-8 scroll-mt-28 rounded-xl border border-primary/40 bg-base-100 p-5 sm:p-6" id="play-memory">
      <p className="text-sm font-semibold text-primary">Play here · Free browser game</p>
      <h2 className="mt-2 text-2xl font-bold" id="play-memory-title">Play Memory online</h2>
      <p className="mt-3 max-w-3xl leading-7 text-base-content/80">Turn over two cards per move. Match the same rank, such as A♠ and A♥, to keep a pair face up. Different ranks turn back after one second. Find all 6 pairs to win this short, single-player version.</p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button className="btn btn-primary" onClick={start} type="button">{cards.length ? 'New game' : 'Start Memory'}</button>
        <p aria-live="polite" role="status">{won ? `You won in ${moves} moves!` : `Pairs: ${matched.length} / 6 · Moves: ${moves}`}</p>
      </div>
      {cards.length ? <div aria-label="Memory cards" className="mt-5 grid max-w-lg grid-cols-4 gap-2 sm:gap-3">
        {cards.map((card, index) => {
          const isMatched = matched.includes(card.rank)
          const visible = isMatched || open.includes(index)
          return <button
            aria-label={`Card ${index + 1}: ${visible ? `${card.rank}${card.suit}${isMatched ? ', matched' : ''}` : 'face down'}`}
            className={`flex aspect-[3/4] items-center justify-center rounded-lg border-2 text-2xl font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-3xl ${visible ? `border-base-300 bg-base-200 ${card.suit === '♥' ? 'text-error' : 'text-base-content'}` : 'border-primary bg-primary text-primary-content'} ${isMatched ? 'border-success' : ''}`}
            disabled={isMatched || open.includes(index) || locked}
            key={index}
            onClick={() => flip(index)}
            type="button"
          >{visible ? `${card.rank}${card.suit}` : '?'}</button>
        })}
      </div> : null}
      <p className="mt-4 text-sm text-base-content/65">No account or download needed. Mouse, touch and keyboard supported. Each new game shuffles the cards.</p>
    </section>
  )
}
