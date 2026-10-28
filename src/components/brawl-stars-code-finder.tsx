import { useDeferredValue, useState } from 'react'

import { filterCreatorCodes } from '#/lib/brawl-stars-guides'

type CopyState = { code: string; result: 'copied' | 'failed' } | null

export function BrawlStarsCodeFinder() {
  const [query, setQuery] = useState('')
  const [copyState, setCopyState] = useState<CopyState>(null)
  const deferredQuery = useDeferredValue(query)
  const results = filterCreatorCodes(deferredQuery)

  async function copyCode(code: string) {
    try {
      await navigator.clipboard.writeText(code)
      setCopyState({ code, result: 'copied' })
    } catch {
      setCopyState({ code, result: 'failed' })
    }
  }

  return (
    <section aria-labelledby="code-finder-title" className="rounded-3xl border border-sky-400/25 bg-slate-950/70 p-5 shadow-2xl shadow-sky-950/30 sm:p-8">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-300">Updated source list</p>
        <h2 className="mt-2 text-3xl font-black text-white" id="code-finder-title">Find a Brawl Stars creator code</h2>
        <p className="mt-3 leading-7 text-slate-300">Search by creator or code. “Verified” means we found the code in that creator’s own published content; it does not guarantee that the code is still active today.</p>
      </div>

      <label className="mt-6 block" htmlFor="creator-code-search">
        <span className="sr-only">Search creator codes</span>
        <div className="flex min-h-12 items-center gap-3 rounded-2xl border border-slate-600 bg-slate-900 px-4 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-400/30">
          <span aria-hidden="true" className="text-xl text-sky-300">⌕</span>
          <input
            autoComplete="off"
            className="w-full bg-transparent py-3 text-base text-white outline-none placeholder:text-slate-500"
            id="creator-code-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try KAIROS, OJ or a creator name"
            type="search"
            value={query}
          />
        </div>
      </label>

      <p aria-live="polite" className="mt-4 text-sm text-slate-400">{results.length} {results.length === 1 ? 'result' : 'results'}</p>

      {results.length ? (
        <ul className="mt-3 grid gap-4 md:grid-cols-2">
          {results.map((item) => {
            const copied = copyState?.code === item.code ? copyState.result : null
            return (
              <li className="rounded-2xl border border-white/10 bg-white/[0.05] p-5" key={item.code}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-white">{item.creatorName}</h3>
                    <p className="mt-1 font-mono text-2xl font-black tracking-wider text-amber-300">{item.code}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === 'verified' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-amber-400/15 text-amber-200'}`}>
                    {item.status === 'verified' ? 'Verified source' : 'Not recently verified'}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    className="min-h-11 rounded-xl bg-sky-400 px-5 font-bold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                    onClick={() => copyCode(item.code)}
                    type="button"
                  >
                    {copied === 'copied' ? 'Copied' : copied === 'failed' ? 'Copy failed' : 'Copy code'}
                  </button>
                  {item.sourceUrl ? (
                    <a className="font-semibold text-sky-300 underline decoration-sky-500/60 underline-offset-4 hover:text-sky-200" href={item.sourceUrl} rel="noopener noreferrer" target="_blank">View creator source ↗</a>
                  ) : null}
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-400">
                  {item.verifiedAt ? `Last source check: ${item.verifiedAt} · ${item.sourceLabel}` : 'No current creator-owned source has been checked for this entry.'}
                </p>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="mt-3 rounded-2xl border border-dashed border-slate-600 bg-slate-900/70 p-8 text-center">
          <p className="font-bold text-white">No creator code found</p>
          <p className="mt-2 text-sm text-slate-400">Try a shorter creator name or code. We only list codes that can be labeled honestly.</p>
        </div>
      )}
    </section>
  )
}
