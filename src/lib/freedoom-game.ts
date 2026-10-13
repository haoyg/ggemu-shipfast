export const freedoomGame = {
  id: 'freedoom-online',
  title: 'Freedoom Online',
  canonicalPath: '/en/games/freedoom-online',
  description: 'Play Freedoom Phase 1 online in your browser with a Chocolate Doom WebAssembly player, touch controls, keyboard controls, and no proprietary Doom game data.',
  imageUrl: '/game-art/freedoom-online.webp',
  imageAlt: 'Original sci-fi browser FPS artwork for Freedoom Online on POKOPIE',
  embedUrl: 'https://danborden1.github.io/doom-web/',
  sourceUrl: 'https://github.com/danborden1/doom-web',
  faq: [
    {
      question: 'Is Freedoom the original Doom game?',
      answer: 'No. Freedoom is an independently created free-content game for Doom-compatible engines. This player does not include Doom, Doom II, or other proprietary id Software game data.',
    },
    {
      question: 'Does Freedoom Online require a download?',
      answer: 'No installer is required. The first launch still transfers about 35 MB of engine and game data to your browser, so it can take longer on a slow connection.',
    },
    {
      question: 'Can I play on a phone or tablet?',
      answer: 'Yes. The embedded player provides touch buttons below the game view. Landscape orientation is recommended, while keyboard controls remain the better option on desktop.',
    },
    {
      question: 'Who hosts the game files?',
      answer: 'The open-source player and game data are loaded from the project’s public GitHub Pages deployment. POKOPIE embeds that player and provides the surrounding instructions and compatibility information.',
    },
  ],
} as const

