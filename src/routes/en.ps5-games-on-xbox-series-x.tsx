import { Link, createFileRoute } from '@tanstack/react-router'

import { Ps5xGameChecker } from '#/components/ps5x-game-checker'
import { SiteLayout } from '#/components/site-layout'
import { ps5xCheckedAt, ps5xFaqs, ps5xUpdates } from '#/lib/ps5x'
import { getSeoOrigin, seoLocales } from '#/lib/seo'
import { siteConfig } from '#/lib/site-config'

const pagePath = '/en/ps5-games-on-xbox-series-x'
const localePaths = Object.fromEntries(seoLocales.map((locale) => [locale, pagePath]))
const title = 'PS5 Games Running on Xbox Hardware? PS5X Explained (2026)'
const description =
  'Can PS5 games run on Xbox Series X? Explore PS5X game compatibility, reported FPS, gameplay evidence, download status, and updates.'

export const Route = createFileRoute('/en/ps5-games-on-xbox-series-x')({
  loader: () => getSeoOrigin(),
  head: ({ loaderData }) => buildPs5xHead(loaderData),
  component: Ps5xPage,
})

export function buildPs5xHead(origin?: string) {
  const canonical = `${origin ?? 'https://pokopie.com'}${pagePath}`
  const socialImage = `${origin ?? 'https://pokopie.com'}/og.png`

  return {
    links: [{ rel: 'canonical', href: canonical }],
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: socialImage },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: socialImage },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': canonical,
              url: canonical,
              name: title,
              description,
              inLanguage: 'en',
              dateModified: ps5xCheckedAt,
              isPartOf: {
                '@type': 'WebSite',
                name: siteConfig.SITE_NAME,
                url: origin ?? 'https://pokopie.com',
              },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: `${origin ?? 'https://pokopie.com'}/en`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Guides',
                  item: `${origin ?? 'https://pokopie.com'}/en/guides`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'PS5 games on Xbox Series X',
                  item: canonical,
                },
              ],
            },
          ],
        }).replace(/</g, '\\u003c'),
      },
    ],
  }
}

function Ps5xPage() {
  return (
    <SiteLayout locale="en" localePaths={localePaths}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-base-content/70">
          <Link className="link link-hover" params={{ locale: 'en' }} to="/$locale/guides">
            Guides
          </Link>
          <span aria-hidden="true"> / </span>
          <span>PS5 games on Xbox Series X</span>
        </nav>

        <Hero />

        <QuickAnswer />

        <GameCheckerSection />

        <EvidenceSection />

        <SetupSection />

        <PerformanceSection />

        <UpdatesSection />

        <FaqSection />

        <aside className="mt-10 border-t border-base-300 pt-6 text-sm leading-6 text-base-content/65">
          <p>
            PS5X is an independent, unofficial research project. POKOPIE does not host,
            distribute or endorse PS5X or any PS5 game files. Compatibility entries reflect
            the developer&apos;s own demonstrations and media reports, not independent testing.
          </p>
          <p className="mt-3">
            Spot an error or have a verified update?{' '}
            <a
              className="link link-primary"
              href={`mailto:${siteConfig.SITE_EMAIL}?subject=PS5X%20page%20correction`}
            >
              Send a correction
            </a>
            .
          </p>
        </aside>
      </div>
    </SiteLayout>
  )
}

function Hero() {
  return (
    <header className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#75D58B]">
          PS5X explained
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
          PS5 Games Running on Xbox Hardware?
        </h1>
        <p className="mt-5 text-lg leading-8 text-base-content/85">
          Discover what the experimental PS5X project can actually run on Xbox Series X.
          Explore game tests, performance reports, and download availability.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="btn btn-primary" href="#game-checker">
            Check Game Compatibility
          </a>
          <a className="btn" href="#setup-status">
            See PS5X Setup Status
          </a>
        </div>
        <p className="mt-4 text-sm text-base-content/65">
          POKOPIE Editorial Team · Sources reviewed {ps5xCheckedAt}
        </p>
      </div>
      <Ps5xHeroVisual />
    </header>
  )
}

function Ps5xHeroVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md">
      <svg className="w-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ps5x-xbox" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#75D58B" stopOpacity="0.32" />
            <stop offset="1" stopColor="#75D58B" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="ps5x-ps" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4776F5" stopOpacity="0.32" />
            <stop offset="1" stopColor="#4776F5" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        <rect x="0.5" y="0.5" width="399" height="299" rx="16" fill="#0B1020" stroke="rgba(181,190,255,0.18)" />

        {/* Xbox Series X tower */}
        <rect x="46" y="64" width="118" height="188" rx="10" fill="url(#ps5x-xbox)" stroke="#75D58B" strokeOpacity="0.5" strokeWidth="1.5" />
        <rect x="66" y="86" width="78" height="34" rx="6" fill="#0B1020" stroke="#75D58B" strokeOpacity="0.4" />
        <circle cx="105" cy="160" r="24" stroke="#75D58B" strokeWidth="1.5" />
        <circle cx="105" cy="160" r="7" fill="#75D58B" />
        <rect x="66" y="210" width="78" height="6" rx="3" fill="#75D58B" fillOpacity="0.55" />
        <rect x="66" y="222" width="56" height="6" rx="3" fill="#75D58B" fillOpacity="0.3" />
        <text x="105" y="268" textAnchor="middle" fill="#75D58B" fillOpacity="0.9" fontSize="13" fontWeight="700" fontFamily="monospace">
          SERIES X
        </text>

        {/* PlayStation 5 silhouette */}
        <rect x="236" y="64" width="118" height="188" rx="10" fill="url(#ps5x-ps)" stroke="#4776F5" strokeOpacity="0.5" strokeWidth="1.5" />
        <rect x="252" y="84" width="86" height="14" rx="7" fill="#4776F5" fillOpacity="0.85" />
        <rect x="252" y="104" width="62" height="14" rx="7" fill="#4776F5" fillOpacity="0.5" />
        <path d="M258 160h62" stroke="#4776F5" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="252" y="186" width="86" height="6" rx="3" fill="#4776F5" fillOpacity="0.55" />
        <rect x="252" y="198" width="62" height="6" rx="3" fill="#4776F5" fillOpacity="0.3" />
        <text x="295" y="268" textAnchor="middle" fill="#4776F5" fillOpacity="0.9" fontSize="13" fontWeight="700" fontFamily="monospace">
          PS5
        </text>

        {/* divider */}
        <path d="M200 96 L200 206" stroke="rgba(181,190,255,0.3)" strokeWidth="1" />
        <text x="200" y="156" textAnchor="middle" fill="#edf1ff" fillOpacity="0.75" fontSize="18" fontWeight="900" fontFamily="monospace">
          ?
        </text>
      </svg>
    </div>
  )
}

function QuickAnswer() {
  return (
    <section aria-labelledby="quick-answer" className="mt-12">
      <h2 className="text-2xl font-bold" id="quick-answer">
        Can Xbox Series X run PS5 games?
      </h2>
      <p className="mt-4 max-w-3xl leading-8 text-base-content/85">
        No — Xbox Series X cannot officially run PS5 games, and there is no retail-mode
        method. PS5X is an experimental proof-of-concept that ports the open-source KytyPS5
        emulator to Xbox Series X in Developer Mode. It has booted a handful of non-exclusive
        PS5 titles at low, unstable frame rates. This does not mean Xbox supports PS5 games:
        the project is unreleased, runs only in Developer Mode under a 5GB memory cap, and has
        no public download. Treat any &ldquo;PS5X&rdquo; installer as unverified.
      </p>
    </section>
  )
}

function GameCheckerSection() {
  return (
    <section aria-labelledby="game-checker" className="mt-12">
      <h2 className="text-2xl font-bold" id="game-checker">
        Will Your PS5 Game Run on Xbox?
      </h2>
      <p className="mt-3 max-w-3xl leading-7 text-base-content/80">
        Search the titles shown so far in the PS5X demonstrations. Every entry links to a
        source. Status reflects what has been <em>reported</em> — none of these titles have
        been independently verified as comfortably playable.
      </p>
      <div className="mt-6 rounded-xl border border-base-300 bg-base-100 p-5 sm:p-6">
        <Ps5xGameChecker />
      </div>
      <p className="mt-3 text-sm text-base-content/65">
        Compatibility data is loaded from the page&apos;s static JSON. No title here is marked
        &ldquo;Verified Running&rdquo; because independent confirmation is not yet available.
      </p>
    </section>
  )
}

function EvidenceSection() {
  return (
    <section aria-labelledby="evidence" className="mt-12">
      <h2 className="text-2xl font-bold" id="evidence">
        PS5X Gameplay: See the Evidence
      </h2>
      <p className="mt-4 max-w-3xl leading-8 text-base-content/85">
        The primary evidence for PS5X is developer Devran Cosmo Uenal&apos;s original
        demonstration video, posted in early September 2026, showing Quake II booting in Xbox
        Developer Mode. POKOPIE has not independently captured or verified gameplay footage,
        so we link to the press coverage rather than embedding an unverified video.
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        <li className="rounded-xl border border-base-300 bg-base-100 p-5">
          <p className="font-semibold text-base-content">Engadget</p>
          <p className="mt-2 text-sm leading-6 text-base-content/70">
            An Xbox Series X can now run PlayStation 5 games, but there&apos;s a catch.
          </p>
          <a
            className="link link-primary mt-2 inline-block text-sm font-semibold"
            href="https://www.engadget.com/2286776/xbox-series-x-users-can-play-playstation-5-games-ps5x-emulator-issues/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Read the report <span aria-hidden="true">↗</span>
          </a>
        </li>
        <li className="rounded-xl border border-base-300 bg-base-100 p-5">
          <p className="font-semibold text-base-content">SlashGear</p>
          <p className="mt-2 text-sm leading-6 text-base-content/70">
            Modders are making PlayStation 5 games playable on Xbox Series X.
          </p>
          <a
            className="link link-primary mt-2 inline-block text-sm font-semibold"
            href="https://www.slashgear.com/2280925/playstation-5-games-on-xbox-series-x-kityps5-emulator/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Read the report <span aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
      <p className="mt-4 text-sm leading-6 text-base-content/65">
        No verified, independently captured gameplay footage is available to embed. If you have
        a verifiable link to the developer&apos;s original demo,{' '}
        <a
          className="link link-primary"
          href={`mailto:${siteConfig.SITE_EMAIL}?subject=PS5X%20evidence`}
        >
          send it to us
        </a>
        .
      </p>
    </section>
  )
}

function SetupSection() {
  return (
    <section aria-labelledby="setup-status" className="mt-12">
      <h2 className="text-2xl font-bold" id="setup-status">
        Can You Download and Install PS5X?
      </h2>
      <div className="mt-4 max-w-3xl space-y-4 leading-7 text-base-content/85">
        <p>
          <strong className="font-semibold text-base-content">No verified public build exists.</strong>{' '}
          The developer has not released PS5X publicly and describes it as research software.
          Until an official release and installation guide appear, POKOPIE does not publish
          installation steps.
        </p>
        <p>
          <strong className="font-semibold text-base-content">Xbox Developer Mode is required.</strong>{' '}
          PS5X runs as a Universal Windows Platform (UWP) app inside Microsoft&apos;s official
          Developer Mode, which is separate from normal retail mode. Games running there are
          subject to a 5GB memory cap.
        </p>
        <p>
          <strong className="font-semibold text-base-content">The known limits are significant.</strong>{' '}
          Developer Mode supports DirectX 11/12 but not Vulkan, so the emulator&apos;s graphics
          calls must be translated, and the 5GB cap rules out most large current-gen titles.
        </p>
        <p>
          <strong className="font-semibold text-base-content">Watch for fake installers.</strong>{' '}
          Because no public build exists, any website or file claiming to be a &ldquo;PS5X&rdquo;
          download is unverified. Scam sites have used similar names to distribute malware.
          Only trust releases from the developer&apos;s own verified channels.
        </p>
      </div>
    </section>
  )
}

function PerformanceSection() {
  return (
    <section aria-labelledby="performance" className="mt-12">
      <h2 className="text-2xl font-bold" id="performance">
        Performance &amp; Limitations
      </h2>
      <div className="mt-4 max-w-3xl space-y-4 leading-7 text-base-content/85">
        <p>
          <strong className="font-semibold text-base-content">Frame rates are far from playable for most titles.</strong>{' '}
          Quake II was reported around 25&ndash;45 FPS with occasional dips below 20 and input
          latency. Astro Bot was reported near 10 FPS on Xbox, while the PC KytyPS5 build runs
          the same title above 60 FPS.
        </p>
        <p>
          <strong className="font-semibold text-base-content">Memory is the hard ceiling.</strong>{' '}
          Microsoft caps Developer Mode games at 5GB of RAM versus roughly 13.5GB for a retail
          Xbox game, giving PS5X about 37% of a normal game&apos;s allowance.
        </p>
        <p>
          <strong className="font-semibold text-base-content">Graphics and audio are partial.</strong>{' '}
          The original emulator uses Vulkan, so PS5X translates rendering to DirectX, and audio
          works on only some titles.
        </p>
        <p>
          <strong className="font-semibold text-base-content">Separate the evidence tiers.</strong>{' '}
          Media reports describe the developer&apos;s demonstration. There is currently no
          independent, reproducible test confirming smooth, sustained play of any title.
        </p>
      </div>
    </section>
  )
}

function UpdatesSection() {
  return (
    <section aria-labelledby="updates" className="mt-12">
      <h2 className="text-2xl font-bold" id="updates">
        Latest Updates
      </h2>
      <ol className="mt-5 max-w-3xl space-y-4">
        {ps5xUpdates.map((update) => (
          <li className="rounded-xl border border-base-300 bg-base-100 p-5" key={`${update.date}-${update.title}`}>
            <p className="text-sm font-semibold text-base-content/60">{update.date}</p>
            <h3 className="mt-1 text-lg font-bold leading-snug">{update.title}</h3>
            <p className="mt-2 text-sm leading-6 text-base-content/80">{update.summary}</p>
            {update.sourceUrl ? (
              <a
                className="link link-primary mt-2 inline-block text-sm font-semibold"
                href={update.sourceUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Read source <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  )
}

function FaqSection() {
  return (
    <section aria-labelledby="faq" className="mt-12">
      <h2 className="text-2xl font-bold" id="faq">
        Frequently Asked Questions
      </h2>
      <div className="mt-5 max-w-3xl space-y-3">
        {ps5xFaqs.map((faq) => (
          <details className="rounded-xl border border-base-300 bg-base-100 p-5" key={faq.question}>
            <summary className="cursor-pointer font-semibold">{faq.question}</summary>
            <p className="mt-3 leading-7 text-base-content/80">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
