import { Link, createFileRoute } from '@tanstack/react-router'

import { BrawlStarsCodeFinder } from '#/components/brawl-stars-code-finder'
import { BrawlStarsGuideShell, GuideSection, SourceLink } from '#/components/brawl-stars-guide-shell'
import { getSeoOrigin } from '#/lib/seo'

const pagePath = '/guides/brawl-stars/creator-codes'
const title = 'Brawl Stars Creator Codes (2026) – List & How to Use'
const description = 'Find Brawl Stars creator codes, search your favorite creators, copy codes instantly, and learn how to use them in the Supercell Store.'
const publishedAt = '2026-10-28'

const faqs = [
  ['What is a Brawl Stars creator code?', 'A creator code lets an eligible creator receive support when you make an in-app purchase. Supercell says using a code does not add an extra cost to your purchase.'],
  ['How do I use a creator code?', 'Open Shop from the left side of the main screen, choose Resources, scroll to the right and use the Enter Code field.'],
  ['Do creator codes give free gems?', 'No. Supercell does not promise gems, skins or other player rewards for using a standard creator code.'],
  ['How long does a creator code last?', 'Supercell says creator codes expire after seven days. Enter the code again if you want to keep supporting the same creator.'],
  ['Where can I find creator codes?', 'Use creator-owned videos and social profiles, or this source-labeled list. A published code may still expire or change.'],
  ['Why is my creator code not working?', 'The code may have expired, changed or been entered in the wrong field. Check the spelling and verify it against the creator’s current content.'],
] as const

export const Route = createFileRoute('/guides/brawl-stars/creator-codes')({
  loader: () => getSeoOrigin(),
  head: ({ loaderData }) => buildCreatorCodesHead(loaderData),
  component: CreatorCodesPage,
})

export function buildCreatorCodesHead(origin?: string) {
  const siteOrigin = origin ?? 'https://pokopie.com'
  const canonical = `${siteOrigin}${pagePath}`
  const socialImage = `${siteOrigin}/og.png`

  return {
    links: [{ rel: 'canonical', href: canonical }],
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: socialImage },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: socialImage },
    ],
    scripts: [articleSchema({ canonical, description, headline: title, name: 'Brawl Stars Creator Codes', siteOrigin })],
  }
}

function articleSchema({ canonical, description: schemaDescription, headline, name, siteOrigin }: { canonical: string; description: string; headline: string; name: string; siteOrigin: string }) {
  return {
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article', '@id': `${canonical}#article`, headline, description: schemaDescription,
          datePublished: publishedAt, dateModified: publishedAt, inLanguage: 'en', mainEntityOfPage: canonical,
          author: { '@type': 'Organization', name: 'POKOPIE Editorial Team', url: siteOrigin },
          publisher: { '@type': 'Organization', name: 'POKOPIE', url: siteOrigin },
          about: { '@type': 'VideoGame', name: 'Brawl Stars' },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteOrigin}/en` },
            { '@type': 'ListItem', position: 2, name: 'Guides', item: `${siteOrigin}/en/guides` },
            { '@type': 'ListItem', position: 3, name, item: canonical },
          ],
        },
      ],
    }).replace(/</g, '\\u003c'),
  }
}

function CreatorCodesPage() {
  return (
    <BrawlStarsGuideShell currentPage={pagePath}>
      <article>
        <header className="overflow-hidden border-b border-sky-400/20 bg-[radial-gradient(circle_at_80%_15%,rgba(14,165,233,0.32),transparent_28rem),radial-gradient(circle_at_15%_80%,rgba(245,158,11,0.16),transparent_25rem)]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">Brawl Stars reference</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">Brawl Stars Creator Codes (2026)</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Search a source-labeled list, copy a code in one click and follow Supercell’s current in-game path. Creator codes support creators; they do not unlock free gems.</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 font-bold text-emerald-200">Last verified: October 28, 2026</span>
              <a className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-bold text-sky-200 hover:bg-white/10" href="#creator-code-finder">Search codes ↓</a>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div id="creator-code-finder"><BrawlStarsCodeFinder /></div>

          <GuideSection id="how-to-use" title="How to use a creator code">
            <ol className="grid gap-4 md:grid-cols-4">
              {[
                ['1', 'Open Shop', 'Select Shop on the left side of the Brawl Stars main screen.'],
                ['2', 'Choose Resources', 'Open the Resources section inside the Shop.'],
                ['3', 'Scroll right', 'Move to the right until you see the Enter Code field.'],
                ['4', 'Enter the code', 'Type or paste the creator code and confirm it.'],
              ].map(([number, stepTitle, body]) => (
                <li className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={number}>
                  <span className="inline-grid size-9 place-items-center rounded-full bg-sky-400 font-black text-slate-950">{number}</span>
                  <h3 className="mt-4 font-bold text-white">{stepTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-amber-100"><strong>Remember:</strong> Supercell says creator codes expire after 7 days. Re-enter the code if you want to continue supporting that creator.</p>
            <p className="mt-5"><SourceLink href="https://support.supercell.com/brawl-stars/en/articles/creator-codes.html">Supercell Support: Creator Codes</SourceLink></p>
          </GuideSection>

          <GuideSection title="Creator Codes vs Store, QR and event codes">
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[44rem] text-left text-sm">
                <thead className="bg-slate-900 text-white"><tr><th className="p-4">Code type</th><th className="p-4">Purpose</th><th className="p-4">Where to use it</th><th className="p-4">Typical result</th></tr></thead>
                <tbody className="divide-y divide-white/10 text-slate-300">
                  <tr><th className="p-4 text-white">Creator Code</th><td className="p-4">Support a creator</td><td className="p-4">Brawl Stars Shop → Resources</td><td className="p-4">Creator receives support on eligible purchases</td></tr>
                  <tr><th className="p-4 text-white">Store Code</th><td className="p-4">Redeem a store offer or reward</td><td className="p-4">Bottom of the relevant Supercell Store</td><td className="p-4">Offer-specific; may expire</td></tr>
                  <tr><th className="p-4 text-white">QR Code</th><td className="p-4">Open an official link or promotion</td><td className="p-4">Phone camera or QR scanner</td><td className="p-4">Promotion-specific destination</td></tr>
                  <tr><th className="p-4 text-white">Event Code</th><td className="p-4">Join a limited event</td><td className="p-4">The event’s in-game page</td><td className="p-4">Event access or progress</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-5"><SourceLink href="https://support.supercell.com/supercell-store/en/articles/what-is-the-supercell-store-4.html">Supercell Support: Store Codes</SourceLink></p>
          </GuideSection>

          <GuideSection title="Frequently asked questions">
            <div className="grid gap-4 md:grid-cols-2">
              {faqs.map(([question, answer]) => <details className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" key={question}><summary className="cursor-pointer font-bold text-white">{question}</summary><p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p></details>)}
            </div>
          </GuideSection>

          <aside className="mb-12 rounded-3xl border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-500/15 to-sky-500/10 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-fuchsia-200">Limited-time event</p>
            <h2 className="mt-2 text-2xl font-black text-white">Looking for Creator Coffins codes?</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-300">The Creator Coffins event uses creator codes differently and locks your selected event creator for the four-day event.</p>
            <Link className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-fuchsia-300 px-5 font-bold text-slate-950 hover:bg-fuchsia-200" to="/guides/brawl-stars/creator-coffins">Open the Creator Coffins guide →</Link>
          </aside>
        </div>
      </article>
    </BrawlStarsGuideShell>
  )
}
