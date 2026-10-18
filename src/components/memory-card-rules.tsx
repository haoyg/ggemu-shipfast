import './memory-card-game.css'

const examples = [
  { title: '1. Remember a miss', cards: ['A♠', '4♥', null, null], matched: false, text: 'You reveal A♠ in position 1 and 4♥ in position 2. The ranks differ, so both turn back after one second. This counts as one move.' },
  { title: '2. Find its partner', cards: [null, null, 'A♥', null], matched: false, text: 'On your next move, you reveal A♥ in position 3. You remember that position 1 holds A♠. Choose position 1 as your second card.' },
  { title: '3. Keep the pair', cards: ['A♠', null, 'A♥', null], matched: true, text: 'A♥ and A♠ have the same rank. They stay face up, your pair count increases to 1, and the move count becomes 2. Find the remaining five pairs to win.' },
] as const

export function MemoryCardRules() {
  return (
    <section aria-labelledby="memory-rules-title" className="my-10 scroll-mt-28" id="memory-rules">
      <h2 className="text-2xl font-bold" id="memory-rules-title">How to play Memory: rules and a worked example</h2>
      <p className="mt-4 max-w-4xl leading-7 text-base-content/80">In this POKOPIE version of Memory (also called Concentration), find six pairs in a shuffled layout of 12 cards. Each rank from ace through six appears twice: once as a spade and once as a heart. Match the rank, not the suit or color. A♠ and A♥ match; A♠ and 4♠ would not.</p>
      <ol className="mt-5 list-decimal space-y-2 pl-5 leading-7 text-base-content/80">
        <li>Press <strong>Start Memory</strong> to shuffle and deal. Select two different face-down cards with your mouse, touch screen or keyboard.</li>
        <li>Every second card completes one move. A matching pair stays visible. A mismatch stays visible for one second, then turns face down; wait before selecting another card.</li>
        <li>Reveal all six pairs to win. There is no time limit. <strong>New game</strong> reshuffles the layout and resets both pairs and moves.</li>
      </ol>
      <h3 className="mt-8 text-xl font-bold">One miss, then one match</h3>
      <p className="mt-3 text-sm leading-6 text-base-content/65">Teaching example only: four positions from an imagined board are shown below. Your actual game has 12 shuffled cards, so these are not the positions in your current game.</p>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {examples.map(example => <figure className="rounded-xl border border-base-300 bg-base-100 p-5" key={example.title}>
          <h4 className="font-bold">{example.title}</h4>
          <div aria-hidden="true" className="memory-example-board">
            {example.cards.map((card, index) => <div className="memory-example-position" key={index}>
              <span className={`memory-example-card ${card ? 'is-face-up' : ''} ${card?.includes('♥') ? 'is-red' : ''} ${card && example.matched ? 'is-matched' : ''}`}>{card ?? 'M'}</span>
              <span>{index + 1}</span>
            </div>)}
          </div>
          <figcaption className="mt-4 text-sm leading-6 text-base-content/80">{example.text}</figcaption>
        </figure>)}
      </div>
      <h3 className="mt-8 text-xl font-bold">A simple way to improve</h3>
      <p className="mt-3 max-w-4xl leading-7 text-base-content/80">Explore in a consistent order, such as left to right across each row. Remember both the rank and its position. When a newly revealed card matches one you have already seen, use your second selection to collect that known pair instead of guessing. Count moves rather than racing: this version has no countdown.</p>
      <p className="mt-4 text-sm leading-6 text-base-content/65">The rules above describe this short solo browser version. The linked Memory directory entry also covers a physical multiplayer game with different setup and scoring.</p>
      <a className="btn btn-primary btn-sm mt-4" href="#play-memory">Back to the Memory game</a>
    </section>
  )
}
