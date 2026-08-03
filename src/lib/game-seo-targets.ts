import type { Locale, PublicGame } from '#/lib/ggemu'

const contraTargetSlug = 'contra-nes-1988'

export function getTargetedGameSeo(game: PublicGame, locale: Locale) {
  if (!isContraSeoTarget(game, locale)) {
    return null
  }

  return {
    heading: 'Play Contra Game Online Free',
    title: 'Play Contra Game Online Free | NES Classic | POKOPIE',
    description:
      'Play Contra game online free in your browser. Start the classic NES run-and-gun game with keyboard or controller support and no separate emulator download.',
    keywords:
      'play contra game online free, Contra online, play Contra online, Contra NES game, free browser games',
  }
}

export function isContraSeoTarget(game: PublicGame, locale: Locale) {
  return locale === 'en' && game.url_slug?.trim().toLowerCase() === contraTargetSlug
}
