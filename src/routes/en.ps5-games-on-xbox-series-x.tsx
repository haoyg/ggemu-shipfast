import { Link, createFileRoute } from '@tanstack/react-router'

import { Ps5xGameChecker } from '#/components/ps5x-game-checker'
import { SiteLayout } from '#/components/site-layout'
import {
  ps5xCheckedAt,
  ps5xFaqs,
  ps5xGitHubReleaseUrl,
  ps5xRepoUrl,
  ps5xUpdates,
} from '#/lib/ps5x'
import { getSeoOrigin, seoLocales } from '#/lib/seo'
import { siteConfig } from '#/lib/site-config'

const pagePath = '/en/ps5-games-on-xbox-series-x'
const localePaths = Object.fromEntries(seoLocales.map((locale) => [locale, pagePath]))
const title = 'PS5 Games Running on Xbox Hardware: What PS5X Can Actually Do'
const description =
  'Can PS5 games really run on Xbox Series X? Explore PS5X emulator gameplay tests, compatibility, FPS results, download status, and the latest updates.'

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

        <SetupSection />

        <PerformanceSection />

        <TechnicalSection />

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
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#75D58B]">
          The Cross-Console Experiment
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/80">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#75D58B]" />
          PS5X LAB
        </p>
        <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
          PS5 Games Running on Xbox Hardware:{' '}
          <span className="bg-gradient-to-r from-[#75D58B] to-[#4776F5] bg-clip-text text-transparent">
            What PS5X Can Actually Do
          </span>
        </h1>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-base-content/60">
          Games · Performance · Updates
        </p>
        <p className="mt-2 text-xl font-bold text-[#75D58B]">It&apos;s being tested.</p>
        <p className="mt-4 text-lg leading-8 text-base-content/85">{description}</p>
        <div className="mt-6 grid max-w-md gap-3 sm:grid-cols-2">
          <a className="btn btn-primary justify-between" href="#game-tests">
            Game Tests <span aria-hidden="true">→</span>
          </a>
          <a className="btn btn-outline justify-between" href="#installation">
            Installation <span aria-hidden="true">→</span>
          </a>
        </div>
        <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-base-content/65">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-base-content/80">
            POKOPIE Editorial Team
          </span>
          Sources reviewed {ps5xCheckedAt}
        </p>
      </div>
      <div>
        <Ps5xHeroVisual />
        <p className="mt-3 text-center text-xs text-base-content/55">
          Visual concept illustration — not a real PS5X gameplay screenshot.
        </p>
      </div>
    </header>
  )
}

function Ps5xHeroVisual() {
  return (
    <div aria-hidden="true" className="ps5x-hero-visual relative mx-auto w-full max-w-md">
      <svg className="w-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ps5x-xbox" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#75D58B" stopOpacity="0.28" />
            <stop offset="1" stopColor="#75D58B" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="ps5x-ps" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4776F5" stopOpacity="0.28" />
            <stop offset="1" stopColor="#4776F5" stopOpacity="0.02" />
          </linearGradient>
          <radialGradient id="ps5x-xbox-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#75D58B" stopOpacity="0.35" />
            <stop offset="1" stopColor="#75D58B" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ps5x-ps-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#4776F5" stopOpacity="0.35" />
            <stop offset="1" stopColor="#4776F5" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ps5x-divider" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(181,190,255,0)" />
            <stop offset="0.5" stopColor="rgba(181,190,255,0.4)" />
            <stop offset="1" stopColor="rgba(181,190,255,0)" />
          </linearGradient>
        </defs>

        <rect x="0.5" y="0.5" width="399" height="299" rx="20" fill="#0B1020" stroke="rgba(181,190,255,0.16)" />

        <circle cx="108" cy="150" r="86" fill="url(#ps5x-xbox-glow)" />
        <circle cx="292" cy="150" r="86" fill="url(#ps5x-ps-glow)" />

        {/* Xbox Series X tower */}
        <rect x="62" y="66" width="92" height="172" rx="14" fill="url(#ps5x-xbox)" stroke="#75D58B" strokeOpacity="0.65" strokeWidth="1.5" />
        <circle cx="108" cy="94" r="15" stroke="#75D58B" strokeOpacity="0.85" strokeWidth="1.5" />
        <circle cx="108" cy="94" r="4.5" fill="#75D58B" />
        <path d="M108 122v72" stroke="#75D58B" strokeOpacity="0.3" strokeWidth="1.5" />
        <rect x="80" y="206" width="56" height="6" rx="3" fill="#75D58B" fillOpacity="0.5" />
        <rect x="80" y="218" width="38" height="6" rx="3" fill="#75D58B" fillOpacity="0.28" />
        <text x="108" y="256" textAnchor="middle" fill="#75D58B" fillOpacity="0.95" fontSize="11" fontWeight="700" letterSpacing="1.5" fontFamily="monospace">
          SERIES X
        </text>

        {/* PlayStation 5 silhouette */}
        <rect x="246" y="66" width="92" height="172" rx="14" fill="url(#ps5x-ps)" stroke="#4776F5" strokeOpacity="0.65" strokeWidth="1.5" />
        <rect x="256" y="80" width="72" height="22" rx="11" fill="#4776F5" fillOpacity="0.8" />
        <rect x="256" y="110" width="48" height="6" rx="3" fill="#4776F5" fillOpacity="0.45" />
        <circle cx="292" cy="150" r="14" stroke="#4776F5" strokeOpacity="0.7" strokeWidth="1.5" />
        <circle cx="292" cy="150" r="4" fill="#4776F5" />
        <rect x="256" y="206" width="56" height="6" rx="3" fill="#4776F5" fillOpacity="0.5" />
        <rect x="256" y="218" width="38" height="6" rx="3" fill="#4776F5" fillOpacity="0.28" />
        <text x="292" y="256" textAnchor="middle" fill="#4776F5" fillOpacity="0.95" fontSize="13" fontWeight="700" letterSpacing="1.5" fontFamily="monospace">
          PS5
        </text>

        {/* divider */}
        <rect x="199" y="92" width="2" height="120" rx="1" fill="url(#ps5x-divider)" />
        <rect x="182" y="146" width="36" height="24" rx="12" fill="rgba(181,190,255,0.08)" stroke="rgba(181,190,255,0.35)" strokeWidth="1" />
        <text x="200" y="162" textAnchor="middle" fill="#edf1ff" fillOpacity="0.9" fontSize="11" fontWeight="800" letterSpacing="1" fontFamily="monospace">
          VS
        </text>
      </svg>
    </div>
  )
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#75D58B]">
      <span className="mr-2 rounded border border-[#75D58B]/30 px-1.5 py-0.5 text-[10px] tracking-normal">
        {number}
      </span>
      {label}
    </p>
  )
}

function QuickAnswer() {
  return (
    <section aria-labelledby="quick-answer" className="mt-14">
      <h2 className="text-2xl font-bold" id="quick-answer">
        Can Xbox Series X run PS5 games?
      </h2>
      <p className="mt-4 max-w-3xl leading-8 text-base-content/85">
        No — Xbox Series X cannot officially run PS5 games, and there is no retail-mode
        method. PS5X is an experimental proof-of-concept that ports the open-source KytyPS5
        emulator to Xbox Series X in Developer Mode. It has booted a handful of non-exclusive
        PS5 titles at low, unstable frame rates. This does not mean Xbox supports PS5 games:
        the project is early research, runs only in Developer Mode under a 5GB memory cap, and
        requires an AVX2-capable CPU. Treat any &ldquo;PS5X&rdquo; installer outside the
        developer&apos;s GitHub as unverified.
      </p>
    </section>
  )
}

function GameCheckerSection() {
  return (
    <section aria-labelledby="game-tests" className="mt-14">
      <SectionLabel label="Can It Run?" number="01" />
      <h2 className="mt-3 text-2xl font-bold" id="game-tests">
        Will Your PS5 Game Run on Xbox?
      </h2>
      <p className="mt-3 max-w-3xl leading-7 text-base-content/80">
        Pick a title or search the games shown so far in the PS5X demonstrations. Every entry
        links to a source. Status reflects what has been <em>reported</em> — none of these
        titles have been independently verified as comfortably playable.
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

function SetupSection() {
  return (
    <section aria-labelledby="installation" className="mt-14">
      <SectionLabel label="Can I Try It?" number="02" />
      <h2 className="mt-3 text-2xl font-bold" id="installation">
        Can You Download and Install PS5X?
      </h2>
      <div className="mt-4 max-w-3xl space-y-4 leading-7 text-base-content/85">
        <p>
          <strong className="font-semibold text-base-content">An experimental build exists.</strong>{' '}
          The developer has published an unsigned, experimental Xbox build — KytyPS5 for Xbox
          1.1.26284.1505 — on the project&apos;s{' '}
          <a
            className="link link-primary"
            href={ps5xGitHubReleaseUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub release page
          </a>
          . It is research software, not a consumer app.
        </p>
        <p>
          <strong className="font-semibold text-base-content">You need Developer Mode and AVX2.</strong>{' '}
          PS5X runs as a Universal Windows Platform (UWP) app inside Microsoft&apos;s official
          Developer Mode, which is separate from retail mode. The build requires an AVX2-capable
          CPU, so Xbox One cannot run it.
        </p>
        <p>
          <strong className="font-semibold text-base-content">Installation is manual.</strong>{' '}
          Unzip the release on a PC, open the Xbox Device Portal (the address shown in Dev Home),
          choose <em>Add</em>, select the <code className="text-sm">.msix</code>, include both
          files from the Dependencies folder, and start the install. In Dev Home, set the app
          type to <em>Game</em> for the larger memory budget, and point the games folder at a
          USB drive.
        </p>
        <p>
          <strong className="font-semibold text-base-content">The known limits are significant.</strong>{' '}
          Developer Mode supports DirectX 11/12 but not Vulkan, so the emulator&apos;s graphics
          calls must be translated, and a 5GB memory cap rules out most large current-gen titles.
        </p>
        <p>
          <strong className="font-semibold text-base-content">Watch for fake installers.</strong>{' '}
          Only trust the developer&apos;s verified GitHub. Security researchers have warned of
          impersonation scams under similar names — including PCS5X (pcs5x.org) — that distribute
          malware. Download from{' '}
          <a
            className="link link-primary"
            href={ps5xRepoUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {ps5xRepoUrl.replace('https://', '')}
          </a>{' '}
          only.
        </p>
      </div>
    </section>
  )
}

function PerformanceSection() {
  return (
    <section aria-labelledby="performance" className="mt-14">
      <SectionLabel label="How Well Does It Run?" number="03" />
      <h2 className="mt-3 text-2xl font-bold" id="performance">
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

function TechnicalSection() {
  return (
    <section aria-labelledby="how-it-works" className="mt-14">
      <h2 className="text-2xl font-bold" id="how-it-works">
        How Does PS5X Work on Xbox Hardware?
      </h2>
      <div className="mt-4 max-w-3xl space-y-4 leading-7 text-base-content/85">
        <p>
          PS5X is a port of <strong className="font-semibold text-base-content">KytyPS5</strong>,
          an open-source PlayStation 5 translation layer. Because the PS5 and Xbox Series X|S
          share AMD x86-64 architecture, PS5X behaves more like a compatibility layer than a
          full hardware emulator — but it still translates a lot.
        </p>
        <p>
          It runs as a UWP app inside Xbox Developer Mode and translates KytyPS5&apos;s Vulkan
          rendering to DirectX 11/12, since Developer Mode does not expose Vulkan. It contains
          no PS5 firmware or decryption keys, so it cannot run every game — only titles whose
          formats it can already handle.
        </p>
        <p>
          The primary evidence is developer Devran Cosmo Uenal&apos;s original demonstration,
          posted in early September 2026, showing Quake II booting in Xbox Developer Mode. POKOPIE
          has not independently captured or verified gameplay footage, so we link to the press
          coverage rather than embedding an unverified video.
        </p>
      </div>
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

function UpdatesSection() {
  return (
    <section aria-labelledby="updates" className="mt-14">
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
    <section aria-labelledby="faq" className="mt-14">
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
