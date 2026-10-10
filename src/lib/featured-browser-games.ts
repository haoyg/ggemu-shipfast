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
  howToPlayIntro: string
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
      'Open the LibreQuake player and wait for the WebAssembly engine and game data to finish loading. Click inside the game view when prompted so the browser can capture your mouse.',
      'Start the single-player campaign from the in-game menu. Each level is an enclosed combat map: explore its rooms, survive enemy encounters, and locate the route to the exit.',
      'Move with WASD and aim with the mouse. Left click fires and Space jumps. Keep moving during fights—the campaign uses fast projectiles and close-range enemies rather than cover-based combat.',
      'Pick up health, armor, ammunition, and weapons as you explore. Number keys 1–8 select available weapons; a weapon cannot be used when its required ammunition is empty.',
      'Look for doors, floor buttons, wall switches, lifts, and teleporters when the route appears blocked. Colored keys open their matching locked doors and let you continue through the level.',
      'Press P to open the FTEQW game menu. Press Esc when you need to release the captured mouse, and click the game view again before resuming keyboard-and-mouse play.',
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
    howToPlayIntro: 'These steps describe the LibreQuake campaign running in the linked FTEQW browser build, not the commercial Quake data files.',
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
      'Choose a course in the Surfd course browser and select Join map. The click captures the mouse, downloads the selected map if needed, and enters the course; Esc cancels entry or opens the in-game menu.',
      'Cross the green start area to begin the timed run. The HUD tracks your speed, elapsed time, ordered checkpoints, personal best, and verified record where available.',
      'On an angled ramp, release W and hold the strafe key toward the ramp face: A on one orientation, D on the other. Turn the mouse gently in the direction you want to travel instead of making sharp corrections.',
      'Carry momentum off the end of one ramp and line up the next before you leave it. Space or Wheel Down jumps, while Shift ducks when a route needs lower clearance. The default ranked profile supports hold-jump auto-bhop.',
      'Pass the course checkpoints in order and reach the gold finish area. Missing a transfer or touching a map reset area returns you according to that course’s authored route rules.',
      'Press R to restart the run. For difficult transfers, open Practice, save a position, and reload it for repeated attempts; practice runs do not create records. Esc releases controls, but an active run can continue timing while a menu is open.',
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
    howToPlayIntro: 'This guide follows the current Surfd browser client and its default Normal + Auto Bhop course rules.',
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
