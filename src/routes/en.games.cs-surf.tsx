import { createFileRoute } from '@tanstack/react-router'

import { ExternalBrowserGamePage } from '#/components/external-browser-game-page'
import { buildExternalBrowserGameHead } from '#/lib/external-browser-game-seo'
import { featuredBrowserGames } from '#/lib/featured-browser-games'
import { getSeoOrigin } from '#/lib/seo'

const game = featuredBrowserGames.csSurf

export const Route = createFileRoute('/en/games/cs-surf')({
  loader: async () => ({ origin: await getSeoOrigin() }),
  head: ({ loaderData }) => buildExternalBrowserGameHead(game, loaderData?.origin),
  component: CsSurfPage,
})

function CsSurfPage() {
  return <ExternalBrowserGamePage game={game} relatedGames={[
    { title: 'Quake Online', description: 'Launch a free Quake-engine campaign through the verified external player.', href: '/en/games/quake-online' },
    { title: 'Quake for Nintendo 64', description: 'Explore the separate console conversion already in the POKOPIE catalog.', href: '/en/games/quake-n64-1998' },
    { title: 'Word Ladder Challenge', description: 'Try POKOPIE’s original daily word puzzle.', href: '/en/games/word-ladder' },
  ]} />
}
