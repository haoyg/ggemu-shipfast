import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'
import { getI18n, normalizeLocale } from '#/lib/i18n'
import { getSeoOrigin } from '#/lib/seo'

export type Guide = {
  title: string
  seoTitle?: string
  description: string
  facts: Array<string>
  faqs: Array<{ question: string; answer: string }>
  sources?: Array<{ label: string; href: string }>
  heroImage?: { alt: string; src: string }
  notice?: string
  externalLink?: { href: string; label: string }
  comparison?: Array<{ item: string; officialDescription: string; practicalNote: string }>
  publishedAt: string
  updatedAt: string
  sections: Array<{ heading: string; paragraphs: Array<string> }>
  links: Array<{ label: string; href: string }>
}

export const guides: Record<string, Guide> = {
  'browser-retro-gaming-guide': {
    title: 'Browser Retro Gaming Guide: Start Playing in Minutes',
    description: 'A practical guide to choosing a platform, controller, and browser for classic games.',
    publishedAt: '2026-09-06', updatedAt: '2026-09-06',
    facts: ['NES is an 8-bit home console family; SNES moved to a 16-bit design.', 'Game Boy Advance launched in 2001 and is designed around short portable sessions.', 'Browser support depends on the embedded player and the title, so compatibility can vary by game.'],
    faqs: [
      { question: 'Do I need to download an emulator?', answer: 'No. Supported titles open in the browser. The exact player, controls, and device support can vary by game.' },
      { question: 'Which platform is best for a short session?', answer: 'NES, arcade, and many GBA games are usually easier to start in a short session; larger PS1 and N64 games often benefit from a controller and more time.' },
    ],
    sources: [
      { label: 'Nintendo History', href: 'https://www.nintendo.com/en-gb/Hardware/Nintendo-History/' },
      { label: 'Game Boy Advance history', href: 'https://www.nintendo.com/en-gb/Hardware/Nintendo-History/Game-Boy-Advance/Game-Boy-Advance-627139.html' },
    ],
    sections: [
      { heading: 'Choose the right platform', paragraphs: ['Start with NES, SNES, Game Boy Advance, or arcade games when you want a short session. PlayStation 1 and Nintendo 64 games usually need more loading time and work best on a stable connection.', 'Use the platform collections to compare controls, game length, and the style of games available before opening a title.'] },
      { heading: 'Make browser play reliable', paragraphs: ['Use a current version of Chrome, Edge, Safari, or Firefox. Close unused tabs when a game needs more memory, and keep the player tab visible while it starts.', 'A Bluetooth or USB gamepad is useful for action games. Keyboard controls are usually enough for puzzle, card, and turn-based games.'] },
      { heading: 'Save your progress', paragraphs: ['Many players include their own save menu. Save before leaving the page, and avoid clearing site storage if you want browser saves to remain available.'] },
    ],
    links: [{ label: 'Browse NES games', href: '/$locale/nes-games' }, { label: 'Browse GBA games', href: '/$locale/gba-games' }, { label: 'Read the controller guide', href: '/$locale/guides/retro-game-controller-guide' }],
  },
  'retro-game-controller-guide': {
    title: 'Retro Game Controller Guide for Browser Play',
    description: 'How to choose keyboard, touch, and gamepad controls for browser retro games.',
    publishedAt: '2026-09-06', updatedAt: '2026-09-06',
    facts: ['NES and Game Boy layouts need a directional pad plus a small number of face buttons.', 'SNES adds X, Y, L, and R inputs, which makes a physical controller more useful.', 'PlayStation and N64 games rely more heavily on analog movement and benefit from a gamepad.'],
    faqs: [
      { question: 'Why does my controller not respond?', answer: 'Click inside the game player first, reconnect the controller, and check the player controls menu. Browsers generally detect a controller more reliably when it is connected before the game starts.' },
      { question: 'Is a controller required?', answer: 'No. Many games work with a keyboard, but controllers are more comfortable for games that use shoulder buttons, analog movement, or rapid directional input.' },
    ],
    sources: [{ label: 'Nintendo controller history', href: 'https://www.nintendo.com/en-gb/Hardware/Nintendo-History/' }],
    sections: [
      { heading: 'Keyboard and touch controls', paragraphs: ['Keyboard controls are convenient for quick sessions. Use a full-size layout when a game needs shoulder buttons or several simultaneous inputs. On mobile, touch controls work best for slower games and menus.', 'Before starting a difficult level, open the player menu and confirm the button layout. Small differences between platforms can change which key maps to Start, Select, or a shoulder button.'] },
      { heading: 'Choosing a gamepad', paragraphs: ['A standard XInput or Bluetooth controller covers most modern browsers. A D-pad is usually more comfortable than an analog stick for NES, SNES, and Game Boy titles.', 'Prefer a wired connection if input delay matters. Keep the controller connected before opening the player so the browser can detect it consistently.'] },
      { heading: 'Troubleshooting input', paragraphs: ['If buttons do nothing, click inside the player first, check the browser permission prompt, and reconnect the controller. Test a second title to determine whether the issue is platform-specific.'] },
    ],
    links: [{ label: 'Play SNES games', href: '/$locale/snes-games' }, { label: 'Play arcade games', href: '/$locale/arcade-games' }, { label: 'Learn how browser play works', href: '/$locale/guides/browser-retro-gaming-guide' }],
  },
  'nes-vs-snes-games': {
    title: 'NES vs SNES Games: Which Classic Library Fits You?',
    description: 'Compare NES and SNES libraries by controls, visual style, and session length.',
    publishedAt: '2026-09-06', updatedAt: '2026-09-06',
    facts: ['Nintendo introduced the Super Famicom in Japan in 1990; the SNES name followed in other markets.', 'SNES Game Paks could include enhancement chips such as Super FX, enabling polygon effects in selected titles.', 'The two libraries differ in controller layout, audiovisual capability, and typical game scale.'],
    faqs: [
      { question: 'Are SNES games always longer than NES games?', answer: 'Not always. Both systems have short arcade-style games and longer adventures, though the SNES library includes more games designed around additional controller inputs and larger audiovisual scope.' },
      { question: 'Can the same controller work for both?', answer: 'Yes. A modern gamepad can map controls for both, but SNES games commonly use more face and shoulder buttons than NES games.' },
    ],
    sources: [{ label: 'Nintendo Super Nintendo history', href: 'https://www.nintendo.com/en-gb/Hardware/Nintendo-History/Super-Nintendo/Super-Nintendo-627040.html' }],
    sections: [
      { heading: 'What makes NES different?', paragraphs: ['NES games emphasize simple controls, readable objectives, and compact levels. They are a strong choice when you want a quick browser session or are introducing someone to 8-bit design.', 'The smaller button layout makes keyboard play straightforward, although platform games still benefit from a gamepad.'] },
      { heading: 'When SNES is the better choice', paragraphs: ['SNES adds richer colors, more detailed sound, and games designed around four face buttons and shoulder controls. Its library works well for longer sessions and cooperative classics.', 'Choose SNES when you want more exploration, deeper combat systems, or a wider range of role-playing and racing games.'] },
      { heading: 'A simple way to decide', paragraphs: ['Start with NES for short, focused challenges. Move to SNES when you want larger worlds or more complex controls. Both collections are easy to browse by genre and title.'] },
    ],
    links: [{ label: 'Explore NES games', href: '/$locale/nes-games' }, { label: 'Explore SNES games', href: '/$locale/snes-games' }, { label: 'Compare other platforms', href: '/$locale/guides/retro-platform-comparison' }],
  },
  'retro-platform-comparison': {
    title: 'Retro Platform Comparison: NES, GBA, PS1, and N64',
    description: 'A practical comparison of major retro platforms available to play in a browser.',
    publishedAt: '2026-09-06', updatedAt: '2026-09-06',
    facts: ['Game Boy Advance launched in 2001 as Nintendo’s next-generation handheld system.', 'The original PlayStation launched in Japan on December 3, 1994 and used CD-ROM software.', 'Nintendo 64 is a cartridge-based 3D platform whose analog stick is central to many games.'],
    faqs: [
      { question: 'Which platform is easiest to play with a keyboard?', answer: 'NES and GBA games commonly use fewer simultaneous controls. N64 and many PlayStation games are more comfortable with a controller because of analog movement and additional buttons.' },
      { question: 'Does a platform determine browser compatibility?', answer: 'Not by itself. Compatibility depends on the individual title and the embedded player, so check each game page before assuming a platform will behave the same way.' },
    ],
    sources: [
      { label: 'Game Boy Advance history', href: 'https://www.nintendo.com/en-gb/Hardware/Nintendo-History/Game-Boy-Advance/Game-Boy-Advance-627139.html' },
      { label: 'PlayStation 1994 history', href: 'https://www.playstation.com/en-us/playstation-history/1994-ps-one/' },
    ],
    sections: [
      { heading: 'NES and SNES', paragraphs: ['NES is best for concise 8-bit action and arcade-style challenges. SNES adds more buttons, richer audiovisual design, and longer adventures.'] },
      { heading: 'Game Boy Advance', paragraphs: ['GBA is a versatile middle ground: portable-sized sessions, strong platform games, and a large role-playing library. Its games are easy to pick up on a phone or laptop.'] },
      { heading: 'PlayStation 1 and Nintendo 64', paragraphs: ['PS1 and N64 offer larger 3D worlds and more demanding controls. They are better suited to desktop play, a stable connection, and a controller. Check the compatibility page when a title needs special handling.'] },
    ],
    links: [{ label: 'Browse GBA games', href: '/$locale/gba-games' }, { label: 'Browse PS1 games', href: '/$locale/ps1-games' }, { label: 'Browse N64 games', href: '/$locale/n64-games' }],
  },
  'how-browser-game-saves-work': {
    title: 'How Browser Game Saves Work',
    description: 'Understand save states, in-game saves, and what can remove browser game progress.',
    publishedAt: '2026-09-06', updatedAt: '2026-09-06',
    facts: ['An in-game save is written by the game’s own save system; a save state captures emulator memory at a point in time.', 'Browser storage is scoped to a site and browser profile, so private browsing or clearing site data can remove local progress.', 'Save-state compatibility can change when the embedded emulator or game core changes.'],
    faqs: [
      { question: 'Will my save follow me to another browser?', answer: 'Usually not. Browser storage is commonly isolated to the browser profile and site. Use an export feature when the player provides one.' },
      { question: 'Are save states the same as in-game saves?', answer: 'No. An in-game save uses the game’s original save system. A save state captures the emulator at a precise moment and may be less portable across player versions.' },
    ],
    sections: [
      { heading: 'In-game saves and save states', paragraphs: ['An in-game save is created by the original game and usually appears at a checkpoint, menu, or save location. A save state captures the current emulator session and is useful before a difficult section.', 'Use in-game saves for long-term progress when possible, and save states for convenience during a single session.'] },
      { heading: 'Keep saves available', paragraphs: ['Browser saves are commonly stored in site storage. Do not use private browsing, clear site data, or switch browsers if you need to continue the same session.', 'If a player offers an export option, keep a backup file in a safe location and import it only through the player menu.'] },
      { heading: 'When a save is missing', paragraphs: ['Confirm that you are using the same browser and domain, then reload the game and check its save menu. If the upstream player changed, an older save format may no longer be compatible.'] },
    ],
    links: [{ label: 'Play GBA games', href: '/$locale/gba-games' }, { label: 'Play PS1 games', href: '/$locale/ps1-games' }, { label: 'Return to the retro gaming guide', href: '/$locale/guides/browser-retro-gaming-guide' }],
  },
  'wasm-arcade-review': {
    title: 'WASM Arcade Review: Games, Compatibility, and Alternatives',
    seoTitle: 'WASM Arcade Review: Games, Compatibility & Alternatives | POKOPIE',
    description: 'Independent WASM Arcade review covering its game catalog, browser compatibility, local saves, advertising, limitations, and POKOPIE alternatives.',
    publishedAt: '2026-10-13', updatedAt: '2026-10-13',
    heroImage: {
      alt: 'Original illustration of WebAssembly games running in a desktop browser',
      src: '/guide-art/wasm-arcade-review.webp',
    },
    notice: 'Independent editorial page. POKOPIE is not affiliated with, endorsed by, or sponsored by WASM Arcade. This page does not host or embed its games.',
    externalLink: { href: 'https://wasmarcade.com/', label: 'Visit the official WASM Arcade website' },
    facts: [
      'WASM Arcade describes itself as a free, unofficial browser-game archive rather than a store or official publisher service.',
      'On October 13, 2026, its public catalog reported 1,082 entries across PC, Neo Geo, Capcom arcade, arcade classics, and Flash collections.',
      'Catalog totals, individual builds, advertising behavior, and browser support can change; check the official pages before relying on a specific game.',
    ],
    comparison: [
      { item: 'PC games', officialDescription: 'Five entries were listed: GTA V, GTA: Vice City, GTA III, The Simpsons: Hit & Run, and Minecraft.', practicalNote: 'These are the most demanding listings and are presented primarily for current desktop browsers.' },
      { item: 'Neo Geo', officialDescription: 'The catalog reported 90 games.', practicalNote: 'This section is organized as an emulated arcade collection rather than a set of native PC ports.' },
      { item: 'Capcom arcade', officialDescription: 'The catalog reported 62 CPS1, CPS2, and CPS3 titles.', practicalNote: 'Controls and performance depend on the browser, device, and emulator configuration.' },
      { item: 'Arcade classics', officialDescription: 'The catalog reported 75 games from several arcade hardware families.', practicalNote: 'A keyboard may work, but many arcade games are more comfortable with a controller.' },
      { item: 'Flash games', officialDescription: 'The catalog reported 850 games running through Ruffle.', practicalNote: 'Ruffle compatibility varies because some original Flash features are not implemented in every game.' },
    ],
    sections: [
      {
        heading: 'What is WASM Arcade?',
        paragraphs: [
          'WASM Arcade is a third-party website that groups several kinds of browser-playable games under one catalog. The name refers to WebAssembly, a browser technology that can run compiled code inside a web page. The site says its collection includes native or reimplemented game engines, arcade emulation, and Flash games running through Ruffle.',
          'That distinction matters. Not every listing uses the same technical approach: the PC section names projects such as re3, reVC, EaglercraftX, and other WebAssembly builds, while the arcade catalog uses EmulatorJS with FinalBurn Neo and the Flash section uses Ruffle. “WASM Arcade” is therefore the name of the website, not one universal emulator or game engine.',
        ],
      },
      {
        heading: 'Which games are listed on WASM Arcade?',
        paragraphs: [
          'The official catalog reported 1,082 entries when this page was reviewed on October 13, 2026. Most were Flash games, followed by Neo Geo, Capcom, and other arcade titles. The smaller PC section drew attention by listing well-known 3D and sandbox games.',
          'Treat those figures as a dated snapshot, not a permanent promise. The site was changing during review: different official pages briefly showed different totals, and its catalog can add, remove, or reclassify games. Use the official collection page for the current list rather than assuming every title named here will remain available.',
        ],
      },
      {
        heading: 'Browser compatibility and device requirements',
        paragraphs: [
          'The official PC collection recommends a current version of Chrome, Edge, or Firefox on a desktop or laptop, with keyboard and mouse or a gamepad. Its about page also mentions Safari 15.4 or later for general WebAssembly and WebGL 2 support, but it describes desktop Chrome, Edge, and Firefox as the better fit for the GTA builds.',
          'Actual performance cannot be predicted from browser support alone. A page may pass a WebAssembly check and still run slowly because of CPU speed, graphics drivers, available memory, thermal limits, extensions, or the size of the game data. POKOPIE has not independently benchmarked the WASM Arcade builds, so this review does not assign frame-rate or loading-speed scores.',
        ],
      },
      {
        heading: 'Loading, caching, and local save behavior',
        paragraphs: [
          'WASM Arcade says game data can stream and cache in the browser, which means the first visit may wait for more data than a return visit. There is no single reliable loading-time figure because game size, server conditions, connection speed, cache state, and device performance all affect the result.',
          'According to the site’s privacy and about pages, saves are stored in browser storage and some game pages provide a Save Manager for export and import. Clearing site data, using a different browser profile, or switching devices can remove access to local progress. Export important saves when that option is available instead of treating browser storage as a permanent backup.',
        ],
      },
      {
        heading: 'Advertising and privacy trade-offs',
        paragraphs: [
          'No account is required to browse or play, according to the site. Its privacy policy says it uses advertising to support hosting and identifies Google AdSense and Monetag as partners. It also states that pressing Play may open a sponsor page in another tab and that browsing pages may open an advertising tab after a click.',
          'This behavior is relevant before opening a game, especially on a shared device. Review the current privacy policy, keep the browser’s pop-up controls enabled, and close any unexpected sponsor tab rather than entering information into it. POKOPIE cannot verify or control third-party ads shown by another website.',
        ],
      },
      {
        heading: 'Ownership, ports, and availability',
        paragraphs: [
          'WASM Arcade states that it is unofficial, does not own the listed games, and is not affiliated with their publishers or rights holders. It also publishes a copyright and takedown process. Open-source engine work does not automatically make a game’s original artwork, audio, maps, or other data freely redistributable.',
          'For visitors, the practical rule is simple: do not assume that browser availability settles ownership or licensing questions. Follow the requirements shown for the individual build, use files only when you have the right to use them, and expect listings to disappear if a maintainer or rights holder changes availability.',
        ],
      },
      {
        heading: 'WASM Arcade alternatives on POKOPIE',
        paragraphs: [
          'POKOPIE does not mirror the WASM Arcade library. It offers a different route to browser gaming: platform collections for NES, SNES, GBA, PS1, N64, Genesis, and arcade titles, plus separate verified links for LibreQuake and Surfd and an original Word Ladder game.',
          'Choose WASM Arcade when you specifically want to inspect its current PC, arcade, or Flash catalog. Choose POKOPIE when you want platform-based discovery, individual game information, compatibility guidance, and related retro-game recommendations. Neither catalog should be treated as a substitute for an official commercial release when one is required.',
        ],
      },
    ],
    faqs: [
      { question: 'Is WASM Arcade part of POKOPIE?', answer: 'No. WASM Arcade is a separate third-party website. POKOPIE does not operate it, host its catalog, or control its availability and advertising.' },
      { question: 'Can I play WASM Arcade games on mobile?', answer: 'Support varies by game. The site recommends desktop Chrome, Edge, or Firefox for its PC collection, although it says some GTA builds provide touch controls. A phone supporting WebAssembly does not guarantee smooth performance.' },
      { question: 'Does WASM Arcade require a download?', answer: 'The site presents its games as browser-playable without a traditional installer. Game data still has to transfer to the browser and may be cached locally, so “no download” does not mean zero network data or storage use.' },
      { question: 'Where are WASM Arcade saves stored?', answer: 'The site says saves are stored in the browser, primarily through IndexedDB, with local storage used for some settings. Clearing site data can remove saves, so use the provided export feature when available.' },
      { question: 'Is every game on WASM Arcade a native WebAssembly port?', answer: 'No. The catalog combines several approaches, including engine ports or reimplementations, arcade emulation through EmulatorJS and FinalBurn Neo, and Flash playback through Ruffle.' },
      { question: 'Has POKOPIE tested every WASM Arcade game?', answer: 'No. This page reviews the public catalog and official documentation as of October 13, 2026. It does not claim independent performance testing of every game build.' },
    ],
    sources: [
      { label: 'WASM Arcade official home and current catalog', href: 'https://wasmarcade.com/' },
      { label: 'WASM Arcade PC games collection', href: 'https://wasmarcade.com/pc-games' },
      { label: 'WASM Arcade about and technical overview', href: 'https://wasmarcade.com/about' },
      { label: 'WASM Arcade privacy policy', href: 'https://wasmarcade.com/privacy' },
      { label: 'WASM Arcade terms of service', href: 'https://wasmarcade.com/terms' },
      { label: 'Google people-first content guidance', href: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content' },
    ],
    links: [
      { label: 'Browse POKOPIE arcade games', href: '/$locale/arcade-games' },
      { label: 'Read the browser retro gaming guide', href: '/$locale/guides/browser-retro-gaming-guide' },
      { label: 'Check browser compatibility', href: '/$locale/ps1-compatibility' },
      { label: 'View Quake Online', href: '/en/games/quake-online' },
    ],
  },
}

export const Route = createFileRoute('/$locale/guides/$guideId')({
  beforeLoad: ({ params }) => {
    if (params.locale !== 'en') {
      throw redirect({ params: { guideId: params.guideId, locale: 'en' }, replace: true, statusCode: 301, to: '/$locale/guides/$guideId' })
    }
  },
  loader: async ({ params }) => {
    const guide = guides[params.guideId]
    if (!guide) throw notFound()
    return { guide, seoOrigin: await getSeoOrigin() }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {}
    return {
    meta: [
      { title: loaderData.guide.seoTitle ?? loaderData.guide.title },
      { name: 'description', content: loaderData.guide.description },
      { property: 'og:title', content: loaderData.guide.title },
      { property: 'og:description', content: loaderData.guide.description },
      { property: 'og:type', content: 'article' },
      { property: 'article:published_time', content: loaderData.guide.publishedAt },
      { property: 'article:modified_time', content: loaderData.guide.updatedAt },
      { name: 'twitter:title', content: loaderData.guide.title },
      { name: 'twitter:description', content: loaderData.guide.description },
      ...(loaderData.guide.heroImage && loaderData.seoOrigin ? [
        { property: 'og:image', content: `${loaderData.seoOrigin}${loaderData.guide.heroImage.src}` },
        { property: 'og:image:alt', content: loaderData.guide.heroImage.alt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: `${loaderData.seoOrigin}${loaderData.guide.heroImage.src}` },
        { name: 'twitter:image:alt', content: loaderData.guide.heroImage.alt },
      ] : []),
    ],
    links: loaderData.seoOrigin ? [{ rel: 'canonical', href: `${loaderData.seoOrigin}/${params.locale}/guides/${params.guideId}` }] : undefined,
    scripts: loaderData.seoOrigin ? [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Article',
          author: { '@type': 'Organization', name: 'POKOPIE Editorial Team', url: `${loaderData.seoOrigin}/en/about` },
          dateModified: loaderData.guide.updatedAt,
          datePublished: loaderData.guide.publishedAt,
          description: loaderData.guide.description,
          headline: loaderData.guide.title,
          ...(loaderData.guide.heroImage ? { image: `${loaderData.seoOrigin}${loaderData.guide.heroImage.src}` } : {}),
          inLanguage: 'en',
          isAccessibleForFree: true,
          mainEntityOfPage: `${loaderData.seoOrigin}/${params.locale}/guides/${params.guideId}`,
          publisher: {
            '@type': 'Organization', name: 'POKOPIE', url: loaderData.seoOrigin,
            logo: { '@type': 'ImageObject', url: `${loaderData.seoOrigin}/logo.png` },
          },
        }),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: loaderData.guide.faqs.map((faq) => ({
            '@type': 'Question', name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${loaderData.seoOrigin}/${params.locale}` },
            { '@type': 'ListItem', position: 2, name: 'Guides', item: `${loaderData.seoOrigin}/${params.locale}/guides/${params.guideId}` },
            { '@type': 'ListItem', position: 3, name: loaderData.guide.title, item: `${loaderData.seoOrigin}/${params.locale}/guides/${params.guideId}` },
          ],
        }),
      },
    ] : undefined,
    }
  },
  component: GuidePage,
})

function GuidePage() {
  const { guide } = Route.useLoaderData()
  const locale = normalizeLocale(Route.useParams().locale)
  const t = getI18n(locale).layout

  return (
    <SiteLayout locale={locale}>
      <main className="min-w-0 max-w-[100vw] bg-neutral text-neutral-content">
        <div className="mx-auto w-screen min-w-0 max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="breadcrumbs text-sm text-white/60">
          <ul>
            <li><a href="/en">Home</a></li>
            <li><a href="/en/guides">Guides</a></li>
            <li><span className="max-w-48 truncate">{guide.title}</span></li>
          </ul>
        </nav>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-primary">{t.tagline}</p>
        <h1 className="mt-3 break-words text-4xl font-black leading-tight text-white sm:text-5xl">{guide.title}</h1>
        <p className="mt-5 max-w-3xl break-words text-lg leading-8 text-white/70">{guide.description}</p>
        <p className="mt-4 text-sm text-white/60">By POKOPIE Editorial Team · Updated {guide.updatedAt}</p>
        {guide.heroImage ? (
          <img alt={guide.heroImage.alt} className="mt-8 aspect-video w-full rounded-xl border border-white/10 object-cover shadow-2xl" decoding="async" fetchPriority="high" height="900" src={guide.heroImage.src} width="1600" />
        ) : null}
        {guide.notice ? <p className="mt-6 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm leading-6 text-white/80">{guide.notice}</p> : null}
        <ul className="mt-6 grid gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-white/75 sm:grid-cols-3">
          {guide.facts.map((fact) => <li className="list-disc pl-2 marker:text-primary" key={fact}>{fact}</li>)}
        </ul>
        {guide.comparison?.length ? (
          <section className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] shadow-sm" aria-labelledby="guide-catalog-overview">
            <div className="border-b border-white/10 p-6"><h2 className="text-2xl font-bold text-white" id="guide-catalog-overview">Catalog snapshot</h2><p className="mt-2 text-sm leading-6 text-white/65">Official public listings checked on {guide.updatedAt}. Counts and availability may change.</p></div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead><tr><th>Collection</th><th>Official listing</th><th>Practical note</th></tr></thead>
                <tbody>{guide.comparison.map((row) => <tr key={row.item}><th className="align-top text-white">{row.item}</th><td className="min-w-56 align-top text-white/75">{row.officialDescription}</td><td className="min-w-64 align-top text-white/65">{row.practicalNote}</td></tr>)}</tbody>
              </table>
            </div>
          </section>
        ) : null}
        <div className="mt-10 space-y-8">
          {guide.sections.map((section) => (
            <section className="rounded-xl border border-white/10 bg-white/[0.04] p-6 shadow-sm" key={section.heading}>
              <h2 className="text-2xl font-bold text-white">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p className="mt-4 leading-7 text-white/75" key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>
        {guide.externalLink ? <a className="btn btn-outline mt-8" href={guide.externalLink.href} rel="noopener noreferrer nofollow" target="_blank">{guide.externalLink.label}<i aria-hidden="true" className="ri-external-link-line" /></a> : null}
        <section className="mt-10 rounded-xl border border-white/10 bg-white/[0.04] p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-white/10">
            {guide.faqs.map((faq) => (
              <details className="py-4" key={faq.question}>
                <summary className="cursor-pointer font-semibold text-white">{faq.question}</summary>
                <p className="mt-3 leading-7 text-white/75">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <nav aria-label="Related guides" className="mt-10 rounded-xl border border-primary/25 bg-primary/10 p-6">
          <h2 className="text-lg font-bold text-white">Explore related pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {guide.links.map((link) => <a className="link link-primary" href={link.href.replace('$locale', locale)} key={link.href}>{link.label}</a>)}
          </div>
        </nav>
        {guide.sources?.length ? (
          <section className="mt-8 text-sm leading-6 text-white/65">
            <h2 className="font-semibold text-white">Sources</h2>
            <ul className="mt-2 list-disc pl-5">
              {guide.sources.map((source) => <li key={source.href}><a className="link" href={source.href} rel="noreferrer">{source.label}</a></li>)}
            </ul>
          </section>
        ) : null}
        <p className="mt-6 text-xs leading-5 text-white/55">
          Browser behavior, controls, and save support depend on the current embedded player and the individual game.
        </p>
        </div>
      </main>
    </SiteLayout>
  )
}
