import { useEffect, useMemo, useRef, useState } from 'react'

import { trackEvent, trackEventOnce } from '#/lib/analytics'
import {
  differsByOneLetter,
  findShortestPath,
  getDailyChallengeNumber,
  getSmartHint,
  getUnlimitedPuzzle,
  isValidWord,
  normalizeWord,
  type WordLadderHint,
  type WordLadderPuzzle,
} from '#/lib/word-ladder/engine'
import {
  emptyWordLadderStorage,
  getDailyStreak,
  loadWordLadderStorage,
  saveWordLadderStorage,
  type WordLadderMode,
  type WordLadderStorage,
} from '#/lib/word-ladder/storage'

export function WordLadderGame({
  dailyDate,
  dailyPuzzle,
}: {
  dailyDate: string
  dailyPuzzle: WordLadderPuzzle
}) {
  const [mode, setMode] = useState<WordLadderMode>('daily')
  const [unlimitedIndex, setUnlimitedIndex] = useState(0)
  const [puzzle, setPuzzle] = useState(dailyPuzzle)
  const [path, setPath] = useState<Array<string>>([dailyPuzzle.start])
  const [entry, setEntry] = useState('')
  const [hint, setHint] = useState<WordLadderHint | null>(null)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [message, setMessage] = useState('Change one letter to make a valid word.')
  const [isComplete, setIsComplete] = useState(false)
  const [savedState, setSavedState] = useState<WordLadderStorage>(emptyWordLadderStorage)
  const [isHydrated, setIsHydrated] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const hasStartedRef = useRef(false)
  const shortestPath = useMemo(
    () => findShortestPath(puzzle.start, puzzle.target),
    [puzzle.start, puzzle.target],
  )
  const streak = getDailyStreak(savedState.history, dailyDate)
  const challengeNumber = getDailyChallengeNumber(dailyDate)
  const existingDailyResult = savedState.history.find(
    (result) => result.mode === 'daily' && result.date === dailyDate,
  )

  useEffect(() => {
    const stored = loadWordLadderStorage(window.localStorage)
    const progress = stored.progress
    setSavedState(stored)
    setUnlimitedIndex(stored.unlimitedIndex)

    if (progress) {
      const resumePuzzle = progress.mode === 'daily'
        ? dailyPuzzle
        : getUnlimitedPuzzle(progress.unlimitedIndex)
      const isCurrentDaily = progress.mode !== 'daily' || progress.date === dailyDate

      if (progress.puzzleId === resumePuzzle.id && isCurrentDaily) {
        setMode(progress.mode)
        setPuzzle(resumePuzzle)
        setPath(progress.path)
        setHintsUsed(progress.hintsUsed)
      }
    }
    setIsHydrated(true)
  }, [dailyDate, dailyPuzzle])

  useEffect(() => {
    trackEventOnce('word-ladder-view', 'game_view', {
      game_type: 'word_ladder',
      mode: 'daily',
    })
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    const nextState: WordLadderStorage = {
      ...savedState,
      progress: isComplete ? null : {
        date: mode === 'daily' ? dailyDate : undefined,
        hintsUsed,
        mode,
        path,
        puzzleId: puzzle.id,
        unlimitedIndex,
      },
      unlimitedIndex,
    }
    saveWordLadderStorage(window.localStorage, nextState)
  }, [dailyDate, hintsUsed, isComplete, isHydrated, mode, path, puzzle.id, savedState, unlimitedIndex])

  function submitWord(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isComplete) return

    const nextWord = normalizeWord(entry)
    const currentWord = path.at(-1) ?? puzzle.start

    if (nextWord.length !== puzzle.start.length) {
      setMessage(`Enter a ${puzzle.start.length}-letter word.`)
      return
    }
    if (!isValidWord(nextWord)) {
      setMessage(`${nextWord.toUpperCase()} is not in this challenge dictionary.`)
      return
    }
    if (!differsByOneLetter(currentWord, nextWord)) {
      setMessage('Change exactly one letter from the previous word.')
      return
    }
    if (path.includes(nextWord)) {
      setMessage('That word is already in your ladder.')
      return
    }

    const nextPath = [...path, nextWord]
    trackStartOnce()
    setPath(nextPath)
    setEntry('')
    setHint(null)

    if (nextWord === puzzle.target) {
      finishPuzzle(nextPath)
    } else {
      setMessage('Valid move. Keep climbing!')
      playTone(savedState.soundEnabled, 'move')
    }
    inputRef.current?.focus()
  }

  function finishPuzzle(nextPath: Array<string>) {
    const result = {
      completedAt: new Date().toISOString(),
      date: mode === 'daily' ? dailyDate : undefined,
      hintsUsed,
      mode,
      moves: nextPath.length - 1,
      optimalMoves: shortestPath.length - 1,
      puzzleId: puzzle.id,
    }
    const alreadyScored = mode === 'daily' && Boolean(existingDailyResult)
    const history = alreadyScored
      ? savedState.history
      : [...savedState.history, result].slice(-90)
    const nextState = { ...savedState, history, progress: null, unlimitedIndex, version: 1 as const }

    setSavedState(nextState)
    setIsComplete(true)
    setMessage(alreadyScored
      ? 'Practice replay complete. Today’s official result was already saved.'
      : 'Ladder complete! Compare your route with the shortest path below.')
    saveWordLadderStorage(window.localStorage, nextState)
    playTone(savedState.soundEnabled, 'complete')
    trackEvent('game_complete', {
      completed_steps: nextPath.length - 1,
      game_type: 'word_ladder',
      hints_used: hintsUsed,
      mode,
      scored: alreadyScored ? 0 : 1,
    })
  }

  function changeMode(nextMode: WordLadderMode) {
    const nextPuzzle = nextMode === 'daily' ? dailyPuzzle : getUnlimitedPuzzle(unlimitedIndex)
    setMode(nextMode)
    startPuzzle(nextPuzzle)
  }

  function startPuzzle(nextPuzzle: WordLadderPuzzle) {
    setPuzzle(nextPuzzle)
    setPath([nextPuzzle.start])
    setEntry('')
    setHint(null)
    setHintsUsed(0)
    setIsComplete(false)
    hasStartedRef.current = false
    setMessage('Change one letter to make a valid word.')
  }

  function startNextUnlimitedPuzzle() {
    const nextIndex = unlimitedIndex + 1
    setUnlimitedIndex(nextIndex)
    startPuzzle(getUnlimitedPuzzle(nextIndex))
  }

  function requestHint() {
    const level = Math.min(hintsUsed + 1, 3) as 1 | 2 | 3
    const nextHint = getSmartHint(path.at(-1) ?? puzzle.start, puzzle.target, level)
    setHintsUsed(level)
    setHint(nextHint)
    setMessage(nextHint?.message ?? 'No hint is needed from this position.')
    trackStartOnce()
    playTone(savedState.soundEnabled, 'hint')
    trackEvent('hint_used', {
      game_type: 'word_ladder',
      hint_level: level,
      mode,
    })
  }

  function undoMove() {
    if (path.length <= 1 || isComplete) return
    setPath((currentPath) => currentPath.slice(0, -1))
    setHint(null)
    setMessage('Last move removed.')
  }

  function restartPuzzle() {
    startPuzzle(puzzle)
    trackEvent('game_restart', { game_type: 'word_ladder', mode })
  }

  function trackStartOnce() {
    if (hasStartedRef.current) return
    hasStartedRef.current = true
    trackEvent('game_start', { game_type: 'word_ladder', mode })
  }

  function toggleSound() {
    const soundEnabled = !savedState.soundEnabled
    const nextState = { ...savedState, soundEnabled }
    setSavedState(nextState)
    saveWordLadderStorage(window.localStorage, nextState)
    if (soundEnabled) playTone(true, 'move')
  }

  async function shareResult() {
    const moves = path.length - 1
    const label = mode === 'daily' ? `Daily #${challengeNumber}` : 'Unlimited'
    const text = `POKOPIE Word Ladder ${label}: ${isComplete ? `${moves} moves` : 'in progress'}${hintsUsed ? `, ${hintsUsed} hints` : ''}.`
    const shareData = { title: 'Word Ladder Challenge', text, url: window.location.href }

    try {
      if (navigator.share) await navigator.share(shareData)
      else {
        await navigator.clipboard.writeText(`${text} ${window.location.href}`)
        setShareMessage('Result copied to your clipboard.')
      }
      trackEvent('game_share', {
        completed_steps: moves,
        game_type: 'word_ladder',
        hints_used: hintsUsed,
        mode,
      })
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        setShareMessage('Sharing is unavailable in this browser.')
      }
    }
  }

  return (
    <section aria-labelledby="word-ladder-play-heading" className="rounded-3xl border border-primary/25 bg-base-100 p-4 shadow-2xl sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Play mode</p>
          <h2 className="mt-1 text-2xl font-black" id="word-ladder-play-heading">
            {mode === 'daily' ? `Daily Challenge #${challengeNumber} · ${dailyDate} UTC` : 'Unlimited Mode'}
          </h2>
        </div>
        <div aria-label="Game mode" className="join" role="group">
          <button className={`btn join-item ${mode === 'daily' ? 'btn-primary' : 'btn-outline'}`} onClick={() => changeMode('daily')} type="button">Daily</button>
          <button className={`btn join-item ${mode === 'unlimited' ? 'btn-secondary' : 'btn-outline'}`} onClick={() => changeMode('unlimited')} type="button">Unlimited</button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div>
          <div className="flex items-center justify-center gap-3 sm:gap-5" aria-label={`Transform ${puzzle.start} into ${puzzle.target}`}>
            <WordTile label="Start" word={puzzle.start} />
            <i aria-hidden="true" className="ri-arrow-right-line text-2xl text-primary" />
            <WordTile label="Target" word={puzzle.target} />
          </div>

          <ol aria-label="Your word ladder" className="mx-auto mt-6 grid max-w-md gap-2">
            {path.map((word, index) => (
              <li className="flex items-center gap-3 rounded-xl border border-base-300 bg-base-200 px-4 py-3" key={`${word}-${index}`}>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/15 text-xs font-black text-primary">{index}</span>
                <span className="font-mono text-xl font-black uppercase tracking-[0.22em]">{word}</span>
              </li>
            ))}
          </ol>

          {isComplete ? (
            <div className="alert alert-success mx-auto mt-5 max-w-md" role="status">
              <i className="ri-trophy-line text-xl" />
              <span>You used {path.length - 1} moves. The shortest route uses {shortestPath.length - 1}.</span>
            </div>
          ) : (
            <form className="mx-auto mt-5 max-w-md" onSubmit={submitWord}>
              <label className="label font-bold" htmlFor="word-ladder-entry">Next word</label>
              <div className="join flex">
                <input
                  autoCapitalize="none"
                  autoComplete="off"
                  className="input input-bordered join-item min-h-12 min-w-0 flex-1 font-mono text-lg uppercase tracking-[0.18em]"
                  id="word-ladder-entry"
                  maxLength={puzzle.start.length}
                  onChange={(event) => setEntry(normalizeWord(event.target.value).slice(0, puzzle.start.length))}
                  placeholder={`${puzzle.start.length} letters`}
                  ref={inputRef}
                  spellCheck={false}
                  value={entry}
                />
                <button className="btn btn-primary join-item min-h-12" type="submit">Add word</button>
              </div>
            </form>
          )}

          <p aria-live="polite" className="mx-auto mt-3 min-h-6 max-w-md text-sm text-base-content/70">{message}</p>
          <div className="mx-auto mt-3 flex max-w-md flex-wrap gap-2">
            <button className="btn btn-outline btn-sm min-h-11" disabled={isComplete || path.length <= 1} onClick={undoMove} type="button"><i className="ri-arrow-go-back-line" /> Undo</button>
            <button className="btn btn-outline btn-sm min-h-11" disabled={isComplete} onClick={requestHint} type="button"><i className="ri-lightbulb-line" /> Hint {Math.min(hintsUsed + 1, 3)}/3</button>
            <button className="btn btn-outline btn-sm min-h-11" onClick={restartPuzzle} type="button"><i className="ri-restart-line" /> Restart</button>
            <button aria-pressed={savedState.soundEnabled} className="btn btn-ghost btn-sm min-h-11" onClick={toggleSound} type="button"><i className={savedState.soundEnabled ? 'ri-volume-up-line' : 'ri-volume-mute-line'} /> Sound {savedState.soundEnabled ? 'on' : 'off'}</button>
            {isComplete ? <button className="btn btn-primary btn-sm min-h-11" onClick={() => void shareResult()} type="button"><i className="ri-share-line" /> Share result</button> : null}
            {mode === 'unlimited' && isComplete ? <button className="btn btn-secondary btn-sm min-h-11" onClick={startNextUnlimitedPuzzle} type="button">Next puzzle <i className="ri-arrow-right-line" /></button> : null}
          </div>
          {shareMessage ? <p aria-live="polite" className="mx-auto mt-3 max-w-md text-sm text-success">{shareMessage}</p> : null}
          {hint ? <div className="alert alert-info mx-auto mt-4 max-w-md py-3"><span><strong>Hint {hint.level}:</strong> {hint.message}</span></div> : null}
        </div>

        <aside className="rounded-2xl bg-base-200 p-5">
          <h3 className="font-black">Your stats</h3>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-center">
            <Stat label="Daily streak" value={isHydrated ? streak : 0} />
            <Stat label="Completed" value={isHydrated ? savedState.history.length : 0} />
            <Stat label="Moves" value={path.length - 1} />
            <Stat label="Difficulty" value={puzzle.difficulty} />
          </dl>
          {isComplete ? (
            <div className="mt-5 border-t border-base-300 pt-4">
              <h3 className="font-black">Shortest path</h3>
              <p className="mt-2 font-mono text-sm font-bold uppercase leading-7">{shortestPath.join(' → ')}</p>
            </div>
          ) : null}
          {isHydrated && savedState.history.length > 0 ? (
            <div className="mt-5 border-t border-base-300 pt-4">
              <h3 className="font-black">Recent results</h3>
              <ul className="mt-2 grid gap-2 text-xs">
                {savedState.history.slice(-3).reverse().map((result) => (
                  <li className="flex items-center justify-between gap-3" key={`${result.puzzleId}-${result.completedAt}`}>
                    <span className="truncate uppercase">{result.puzzleId.replace('-', ' → ')}</span>
                    <span className="shrink-0 font-bold">{result.moves} moves</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className="mt-5 border-t border-base-300 pt-4 text-xs leading-5 text-base-content/60">Progress stays on this device. No account or tracking profile is required.</p>
        </aside>
      </div>
    </section>
  )
}

function playTone(enabled: boolean, kind: 'complete' | 'hint' | 'move') {
  if (!enabled || typeof window === 'undefined') return
  try {
    const AudioContext = window.AudioContext
      ?? (window as typeof window & { webkitAudioContext?: typeof window.AudioContext }).webkitAudioContext
    if (!AudioContext) return
    const context = new AudioContext()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.frequency.value = kind === 'complete' ? 660 : kind === 'hint' ? 440 : 520
    gain.gain.setValueAtTime(0.035, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.12)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.12)
    oscillator.addEventListener('ended', () => void context.close(), { once: true })
  } catch { /* Sound is optional and must never interrupt play. */ }
}

function WordTile({ label, word }: { label: string; word: string }) {
  return (
    <div className="text-center">
      <span className="text-xs font-bold uppercase tracking-wide text-base-content/55">{label}</span>
      <div className="mt-1 rounded-xl bg-neutral px-4 py-3 font-mono text-xl font-black uppercase tracking-[0.2em] text-neutral-content sm:text-2xl">{word}</div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl bg-base-100 p-3">
      <dt className="text-xs text-base-content/55">{label}</dt>
      <dd className="mt-1 text-lg font-black capitalize">{value}</dd>
    </div>
  )
}
