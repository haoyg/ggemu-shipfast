import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'
import { getI18n, normalizeLocale } from '#/lib/i18n'
import { getSeoOrigin } from '#/lib/seo'

export type Guide = {
  title: string
  description: string
  facts: Array<string>
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
    sections: [
      { heading: 'In-game saves and save states', paragraphs: ['An in-game save is created by the original game and usually appears at a checkpoint, menu, or save location. A save state captures the current emulator session and is useful before a difficult section.', 'Use in-game saves for long-term progress when possible, and save states for convenience during a single session.'] },
      { heading: 'Keep saves available', paragraphs: ['Browser saves are commonly stored in site storage. Do not use private browsing, clear site data, or switch browsers if you need to continue the same session.', 'If a player offers an export option, keep a backup file in a safe location and import it only through the player menu.'] },
      { heading: 'When a save is missing', paragraphs: ['Confirm that you are using the same browser and domain, then reload the game and check its save menu. If the upstream player changed, an older save format may no longer be compatible.'] },
    ],
    links: [{ label: 'Play GBA games', href: '/$locale/gba-games' }, { label: 'Play PS1 games', href: '/$locale/ps1-games' }, { label: 'Return to the retro gaming guide', href: '/$locale/guides/browser-retro-gaming-guide' }],
  },
}

export const Route = createFileRoute('/$locale/guides/$guideId')({
  beforeLoad: ({ params }) => {
    if (params.locale !== 'en') {
      throw redirect({ params: { guideId: params.guideId, locale: 'en' }, replace: true, to: '/$locale/guides/$guideId' })
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
      { title: loaderData.guide.title },
      { name: 'description', content: loaderData.guide.description },
    ],
    links: loaderData.seoOrigin ? [{ rel: 'canonical', href: `${loaderData.seoOrigin}/${params.locale}/guides/${params.guideId}` }] : undefined,
    scripts: loaderData.seoOrigin ? [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Article',
          author: { '@type': 'Organization', name: 'POKOPIE Editorial Team' },
          dateModified: loaderData.guide.updatedAt,
          datePublished: loaderData.guide.publishedAt,
          description: loaderData.guide.description,
          headline: loaderData.guide.title,
          mainEntityOfPage: `${loaderData.seoOrigin}/${params.locale}/guides/${params.guideId}`,
          publisher: { '@type': 'Organization', name: 'POKOPIE', url: loaderData.seoOrigin },
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
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.tagline}</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{guide.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-base-content/70">{guide.description}</p>
        <p className="mt-4 text-sm text-base-content/60">By POKOPIE Editorial Team · Updated {guide.updatedAt}</p>
        <ul className="mt-6 grid gap-3 rounded-box border border-base-300 bg-base-200/60 p-5 text-sm leading-6 sm:grid-cols-3">
          {guide.facts.map((fact) => <li className="list-disc pl-2 marker:text-primary" key={fact}>{fact}</li>)}
        </ul>
        <div className="mt-10 space-y-8">
          {guide.sections.map((section) => (
            <section className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm" key={section.heading}>
              <h2 className="text-2xl font-semibold">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p className="mt-4 leading-7 text-base-content/75" key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>
        <nav aria-label="Related guides" className="mt-10 rounded-box border border-primary/20 bg-primary/5 p-6">
          <h2 className="text-lg font-semibold">Explore related pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {guide.links.map((link) => <a className="link link-primary" href={link.href.replace('$locale', locale)} key={link.href}>{link.label}</a>)}
          </div>
        </nav>
        <p className="mt-6 text-xs leading-5 text-base-content/55">
          Historical platform details are cross-checked against manufacturer timelines from <a className="underline" href="https://www.nintendo.com/en-gb/Hardware/Nintendo-History/" rel="noreferrer">Nintendo</a> and <a className="underline" href="https://www.playstation.com/en-us/playstation-history/1994-ps-one/" rel="noreferrer">PlayStation</a>. Browser behavior depends on the current embedded player.
        </p>
      </main>
    </SiteLayout>
  )
}
