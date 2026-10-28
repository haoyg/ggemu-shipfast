import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { BrawlStarsGuideShell, BrawlStarsHero, GuideSection, SourceLink } from '#/components/brawl-stars-guide-shell'
import { creatorCodes, creatorCoffinsEndDate, creatorCoffinsStartDate, getCreatorCoffinsStatus } from '#/lib/brawl-stars-guides'
import { getSeoOrigin } from '#/lib/seo'

const pagePath = '/guides/brawl-stars/creator-coffins'
const title = 'Brawl Stars Creator Coffins – Codes, Teams & Rewards (2026)'
const description = 'Explore the Brawl Stars Creator Coffins event, participating creator codes, team challenges, rewards, and how the event works.'
const publishedAt = '2026-10-28'
const heroImagePath = '/guide-art/brawl-stars/creator-coffins-hero.webp'

const eventFaqs = [
  ['What is Creator Coffins?', 'Creator Coffins is a four-day Brawl Stars community event in which players support a participating creator, complete daily tasks and contribute to shared reward tiers.'],
  ['How do I join Creator Coffins?', 'Open the in-game event page and enter a participating creator code. Confirm the choice carefully because the event creator cannot be changed.'],
  ['Which creator code should I use?', 'Choose a participating creator you want to support and confirm eligibility in game. Supercell does not publish a complete in-game participant directory.'],
  ['Can I get free rewards?', 'Players who contribute on a given day can receive community-tier in-game rewards reached that day. The physical coffins belong to creators, not players.'],
  ['When does Creator Coffins end?', 'Supercell published October 29, 2026 as the end date but did not publish an exact closing time.'],
  ['Can I still participate after the event?', 'No new participation is expected after the published event window. This page remains available as a historical guide after the status changes to Ended.'],
] as const

export const Route = createFileRoute('/guides/brawl-stars/creator-coffins')({
  loader: () => getSeoOrigin(),
  head: ({ loaderData }) => buildCreatorCoffinsHead(loaderData),
  component: CreatorCoffinsPage,
})

export function buildCreatorCoffinsHead(origin?: string) {
  const siteOrigin = origin ?? 'https://pokopie.com'
  const canonical = `${siteOrigin}${pagePath}`
  const socialImage = `${siteOrigin}${heroImagePath}`
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article', '@id': `${canonical}#article`, headline: title, description,
        datePublished: publishedAt, dateModified: publishedAt, inLanguage: 'en', mainEntityOfPage: canonical,
        author: { '@type': 'Organization', name: 'POKOPIE Editorial Team', url: siteOrigin },
        publisher: { '@type': 'Organization', name: 'POKOPIE', url: siteOrigin },
        about: [{ '@type': 'VideoGame', name: 'Brawl Stars' }, { '@type': 'Event', name: 'Creator Coffins', startDate: creatorCoffinsStartDate, endDate: creatorCoffinsEndDate }],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteOrigin}/en` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${siteOrigin}/en/guides` },
          { '@type': 'ListItem', position: 3, name: 'Brawl Stars Creator Coffins', item: canonical },
        ],
      },
    ],
  }

  return {
    links: [
      { rel: 'canonical', href: canonical },
      { rel: 'preload', href: heroImagePath, as: 'image', type: 'image/webp' },
    ],
    meta: [
      { title }, { name: 'description', content: description },
      { property: 'og:title', content: title }, { property: 'og:description', content: description },
      { property: 'og:type', content: 'article' }, { property: 'og:url', content: canonical }, { property: 'og:image', content: socialImage },
      { name: 'twitter:card', content: 'summary_large_image' }, { name: 'twitter:title', content: title }, { name: 'twitter:description', content: description }, { name: 'twitter:image', content: socialImage },
    ],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(graph).replace(/</g, '\\u003c') }],
  }
}

function CreatorCoffinsPage() {
  const status = getCreatorCoffinsStatus()
  const verifiedCodes = creatorCodes.filter((code) => code.status === 'verified')
  const statusClass = status === 'Active' ? 'bg-emerald-300 text-emerald-950' : status === 'Upcoming' ? 'bg-sky-300 text-sky-950' : 'bg-slate-300 text-slate-950'

  return (
    <BrawlStarsGuideShell currentPage={pagePath}>
      <article>
        <BrawlStarsHero imageAlt="Glowing ceremonial event chest in a purple and orange arena" imagePath={heroImagePath} tone="purple">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-4 py-2 text-sm font-black uppercase tracking-wider shadow-lg ${statusClass}`}>{status}</span>
            <span className="text-sm font-semibold text-slate-200">October 26–29, 2026</span>
          </div>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] text-white drop-shadow-2xl sm:text-6xl">Brawl Stars Creator Coffins: <span className="text-fuchsia-300">Codes, Teams &amp; Rewards</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">Join through the in-game event page, support a creator and complete daily tasks toward community rewards. Your event creator is locked for the full four days.</p>
          <p className="mt-6 max-w-2xl border-l-2 border-fuchsia-300 pl-4 text-sm leading-6 text-slate-300">Status uses Supercell’s published UTC date window. No exact closing time was announced, so this is intentionally not a countdown.</p>
        </BrawlStarsHero>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Event facts">
            {[
              ['Start', 'October 26, 2026'], ['End', 'October 29, 2026'], ['Daily reset', '08:00 UTC'], ['Official tag', '#CreatorCoffins'],
            ].map(([label, value]) => <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5" key={label}><p className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">{label}</p><p className="mt-2 font-black text-white">{value}</p></div>)}
          </section>

          <GuideSection id="codes" title="Creator Coffins codes">
            <p>Supercell does not publish an official in-game participant directory. It tells players to find participating creators on social platforms using <strong className="text-white">#CreatorCoffins</strong>. The entries below are verified as ordinary Brawl Stars creator codes from creator-owned sources; <strong className="text-white">event eligibility must still be confirmed on the in-game Creator Coffins page</strong>.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {verifiedCodes.map((item) => (
                <EventCodeCard code={item.code} creatorName={item.creatorName} sourceUrl={item.sourceUrl!} verifiedAt={item.verifiedAt!} key={item.code} />
              ))}
            </div>
          </GuideSection>

          <GuideSection id="join" title="How to join Creator Coffins">
            <ol className="space-y-4">
              {[
                ['Open the event page', 'Use the Creator Coffins event entry on the Brawl Stars home screen.'],
                ['Enter a participating creator code', 'Use a code promoted for #CreatorCoffins and confirm that the game accepts it for the event.'],
                ['Choose carefully', 'Your selected event creator is locked for all four days and cannot be changed.'],
                ['Complete daily tasks', 'Tasks refresh at 08:00 UTC. Your contribution helps the community meter for that creator.'],
              ].map(([step, body], index) => <li className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-[3rem_1fr]" key={step}><span className="grid size-10 place-items-center rounded-xl bg-fuchsia-300 font-black text-slate-950">{index + 1}</span><div><h3 className="font-bold text-white">{step}</h3><p className="mt-1 text-sm leading-6 text-slate-400">{body}</p></div></li>)}
            </ol>
          </GuideSection>

          <GuideSection title="Rewards and community progress">
            <p>Daily contributions fill a creator’s community meter. Supercell says supporters who contribute on that day share the community-tier rewards that are reached. Published rewards include:</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {['Brawl-O-Ween Boxes', 'Progression rewards', 'Drops', 'Exclusive Brawloween Coffin Box Pin'].map((reward) => <li className="rounded-xl border border-amber-300/20 bg-amber-300/[0.06] px-4 py-3 font-semibold text-amber-100" key={reward}>✓ {reward}</li>)}
            </ul>
            <p className="mt-5">Physical coffin gifts and their reveals are for the creators. They are not player inventory rewards.</p>
            <p className="mt-5"><SourceLink href="https://supercell.com/en/games/brawlstars/blog/community/creatorcoffins-earn-rewards-by-supporting-your-favorite-creator/">Official Creator Coffins announcement</SourceLink></p>
          </GuideSection>

          <GuideSection title="Frequently asked questions">
            <div className="grid gap-4 md:grid-cols-2">
              {eventFaqs.map(([question, answer]) => <details className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={question}><summary className="cursor-pointer font-bold text-white">{question}</summary><p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p></details>)}
            </div>
          </GuideSection>

          <aside className="mb-12 rounded-3xl border border-sky-400/30 bg-sky-400/10 p-6 sm:p-8">
            <h2 className="text-2xl font-black text-white">Need standard creator codes?</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-300">Use the searchable list to compare source status, copy a code and see the current Shop entry path.</p>
            <Link className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-sky-300 px-5 font-bold text-slate-950 hover:bg-sky-200" to="/guides/brawl-stars/creator-codes">Open the creator code finder →</Link>
          </aside>
        </div>
      </article>
    </BrawlStarsGuideShell>
  )
}

function EventCodeCard({ code, creatorName, sourceUrl, verifiedAt }: { code: string; creatorName: string; sourceUrl: string; verifiedAt: string }) {
  const [copyResult, setCopyResult] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
      setCopyResult('copied')
    } catch {
      setCopyResult('failed')
    }
  }

  return (
    <article className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/[0.06] p-5">
      <p className="font-bold text-white">{creatorName}</p>
      <p className="mt-2 font-mono text-3xl font-black tracking-widest text-amber-300">{code}</p>
      <p className="mt-3 text-xs text-slate-400">Creator code source checked {verifiedAt}. Team / reward: not confirmed. Event participation: confirm in game.</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button className="min-h-11 rounded-xl bg-fuchsia-300 px-5 font-bold text-slate-950 hover:bg-fuchsia-200" onClick={copyCode} type="button">
          {copyResult === 'copied' ? 'Copied' : copyResult === 'failed' ? 'Copy failed' : 'Copy code'}
        </button>
        <a className="font-semibold text-sky-300 underline underline-offset-4" href={sourceUrl} rel="noopener noreferrer" target="_blank">Creator-owned source ↗</a>
      </div>
    </article>
  )
}
