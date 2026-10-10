import { createFileRoute } from '@tanstack/react-router'

import { ExternalBrowserGamePage } from '#/components/external-browser-game-page'
import { buildExternalBrowserGameHead } from '#/lib/external-browser-game-seo'
import { featuredBrowserGames } from '#/lib/featured-browser-games'
import { getSeoOrigin } from '#/lib/seo'

const game = featuredBrowserGames.quakeOnline

export const Route = createFileRoute('/en/games/quake-online')({
  loader: async () => ({ origin: await getSeoOrigin() }),
  head: ({ loaderData }) => buildExternalBrowserGameHead(game, loaderData?.origin),
  component: QuakeOnlinePage,
})

function QuakeOnlinePage() {
  return <ExternalBrowserGamePage game={game} relatedGames={[
    { title: 'Quake for Nintendo 64', description: 'See the distinct 1998 N64 conversion in the POKOPIE catalog.', href: '/en/games/quake-n64-1998' },
    { title: 'CS Surf Online', description: 'Practice Source-style surf movement in a creator-hosted browser beta.', href: '/en/games/cs-surf' },
    { title: 'Word Ladder Challenge', description: 'Switch pace with POKOPIE’s original daily word puzzle.', href: '/en/games/word-ladder' },
  ]} />
}
