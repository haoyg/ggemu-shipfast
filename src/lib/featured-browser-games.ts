export type FeaturedBrowserGame = {
  canonicalPath: string
  controls: Array<string>
  description: string
  deviceNote: string
  externalUrl: string
  faq: Array<{ answer: string; question: string }>
  id: string
  imageAlt: string
  imageUrl: string
  intro: string
  licenseNote: string
  sources: Array<{ href: string; label: string }>
  sourceLabel: string
  title: string
  version: string
}

export const featuredBrowserGames = {
  quakeOnline: {
    canonicalPath: '/en/games/quake-online',
    controls: [
      'WASD moves your character; move the mouse to aim.',
      'Left click fires, Space jumps, and number keys 1–8 switch weapons.',
      'Press P for the game menu, Esc to release the mouse, and ~ for the console.',
    ],
    description: 'Learn how to play a free Quake-engine FPS in your browser through the externally hosted LibreQuake build, with controls, requirements, and licensing notes.',
    deviceNote: 'A modern browser with WebGL 2 is required. Desktop keyboard and mouse are recommended; the host also provides touch controls for phones and tablets.',
    externalUrl: 'https://quake.zone/play/librequake/',
    faq: [
      {
        question: 'Is this the original commercial Quake game?',
        answer: 'No. The recommended external build is LibreQuake, a free replacement campaign for a Quake-compatible engine. POKOPIE does not host the original commercial game files.',
      },
      {
        question: 'Does Quake Online require a download?',
        answer: 'No installer is required, but the external player downloads about 75 MiB of game data in the browser before the first launch.',
      },
      {
        question: 'Why does the game open on another website?',
        answer: 'Quake.zone only allows its player to be framed by its own origin. POKOPIE links to the verified official player instead of bypassing that restriction.',
      },
    ],
    id: 'quake-online',
    imageAlt: 'Original dark stone arena artwork for Quake Online',
    imageUrl: '/game-art/quake-online.webp',
    intro: 'LibreQuake is a free Quake-engine campaign with original maps, monsters, textures, sounds, and music. The verified browser build runs with the FTEQW WebAssembly engine on Quake.zone.',
    licenseNote: 'LibreQuake v0.09-beta identifies its assets as BSD-3-Clause and game code as GPL-2.0; FTEQW is GPL-2.0. POKOPIE links to the hosted build and does not redistribute its files.',
    sourceLabel: 'Open LibreQuake on Quake.zone',
    sources: [
      { href: 'https://github.com/lavenderdotpet/LibreQuake', label: 'LibreQuake source and licence' },
      { href: 'https://github.com/fte-team/fteqw', label: 'FTEQW engine source' },
    ],
    title: 'Quake Online',
    version: 'LibreQuake v0.09-beta via FTEQW WebAssembly',
  },
  csSurf: {
    canonicalPath: '/en/games/cs-surf',
    controls: [
      'Use A or D toward the face of a ramp; release W while surfing.',
      'Guide your line with smooth mouse turns and preserve momentum between ramps.',
      'Space or mouse wheel jumps, Shift ducks, R restarts, and Esc opens the menu.',
    ],
    description: 'Play CS-style surf in your browser through the externally hosted Surfd beta, with accurate controls, device requirements, map provenance, and practical beginner tips.',
    deviceNote: 'Surfd requires a desktop browser with keyboard, mouse, WebGL, and Pointer Lock. It is not presented as a mobile game.',
    externalUrl: 'https://surfd.net/',
    faq: [
      {
        question: 'Is Surfd an official Counter-Strike game?',
        answer: 'No. Surfd describes itself as an independent experimental browser game and is not affiliated with Valve, Counter-Strike, or KSF.',
      },
      {
        question: 'How do you stay on a surf ramp?',
        answer: 'Release W, hold the strafe key toward the ramp face, and turn the mouse smoothly along your intended path. Sudden steering usually costs speed.',
      },
      {
        question: 'Can I play CS Surf on a phone?',
        answer: 'The tested Surfd build requires desktop keyboard, mouse, and Pointer Lock. POKOPIE therefore labels it desktop-only.',
      },
    ],
    id: 'cs-surf',
    imageAlt: 'Original neon ramp artwork for CS Surf Online',
    imageUrl: '/game-art/cs-surf.webp',
    intro: 'Surfd recreates classic Counter-Strike: Source-style surf movement in an independent browser client. Choose a course, ride angled ramps, pass checkpoints, and race your best time.',
    licenseNote: 'Surfd states that imported maps and assets retain their authors’ rights and do not carry a general reuse licence. POKOPIE does not copy those files and links to the creator-hosted beta.',
    sourceLabel: 'Open CS Surf on Surfd',
    sources: [
      { href: 'https://surfd.net/terms.html', label: 'Surfd beta terms' },
      { href: 'https://surfd.net/reference.html', label: 'Surfd provenance and validation notes' },
    ],
    title: 'CS Surf Online',
    version: 'Surfd beta · Source-style 66-tick surf',
  },
} as const satisfies Record<string, FeaturedBrowserGame>
