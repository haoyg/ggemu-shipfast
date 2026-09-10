import type { Locale, PublicGame } from './ggemu'

type GameEditorial = {
  summary: string
  description: string[]
  howToPlay: string[]
  tips: string[]
  faq: Array<{ question: string; answer: string }>
  sources: Array<{ label: string; href: string }>
}

// Reviewed against the linked sources on 2026-09-10. Player builds may differ.
const editorials: Record<string, GameEditorial> = {
  'murdoku-html5-2026': {
    summary: 'Murdoku is a deduction puzzle by Manuel Garand. Use the clues to place people in a crime scene, then identify who was alone with the victim.',
    description: [
      'The grid contains people and locations rather than a conventional set of Sudoku numbers. Each person must occupy a different row and column, while also satisfying the clues for that case.',
      'Read the scene legend before placing anyone: furniture and other marked spaces can restrict where a person may stand. The official site offers free online cases and separate puzzle books.',
    ],
    howToPlay: [
      'Read every clue and the scene legend. Start with a person whose clue identifies a specific area or feature.',
      'After placing a person, rule out their row and column for everyone else. Recheck earlier clues whenever a new placement removes possibilities.',
      'When all positions fit the clues, find the person sharing an area with the victim and nobody else. That person is the killer.',
    ],
    tips: ['Treat “beside” as a horizontal or vertical neighbor in the same area, not a diagonal.', 'Use the clues and occupied rows to eliminate options before guessing.'],
    faq: [
      { question: 'What kind of puzzle is Murdoku?', answer: 'Murdoku is a deduction puzzle with people, locations and clues. It uses row-and-column elimination, but its goal is to identify the person who was alone with the victim.' },
      { question: 'How do I solve a Murdoku case?', answer: 'Use the clues and scene legend to place each person in a unique row and column. Then find the person who shares an area with the victim and nobody else.' },
      { question: 'Where can I find the original Murdoku rules?', answer: 'The Game references section links to Manuel Garand’s official Murdoku site and a printable case with the full rules.' },
    ],
    sources: [{ label: 'Official Murdoku rules: The Courtroom', href: 'https://murdoku.com/pdf/the-courtroom-bw.pdf' }, { label: 'Murdoku by Manuel Garand', href: 'https://murdoku.com/?lang=en' }],
  },
  'onet-master-html5': {
    summary: 'Onet Master is a pair-connecting puzzle. Select matching pictures and clear a route between them to remove both tiles.',
    description: [
      'In the standard Onet Master rules, a pair must connect through empty space using at most three straight segments: that means no more than two turns. This differs from the exposed-left-or-right-edge rule used in Mahjong solitaire.',
      'Check the instructions in the loaded game for its timer and available hints. Similarly named mobile apps can use different rules; this page is the browser tile-matching entry.',
    ],
    howToPlay: [
      'Select a tile, then select another with the same picture. Look for a clear connecting path with no more than two corners.',
      'If a pair is rejected, inspect the route for a blocking tile or an extra turn. Try a different pair to open more space.',
      'Repeat until the board is empty. If the current level provides a timer or hint button, check those before committing to a long search.',
    ],
    tips: ['An identical picture alone does not make a valid match: the connecting route matters.', 'Look again after each removal, because the newly empty spaces can unlock other pairs.'],
    faq: [
      { question: 'How do pairs connect in Onet Master?', answer: 'A matching pair needs a clear path through empty space with at most three straight segments. That means the path can turn no more than twice.' },
      { question: 'Why does an identical pair not clear?', answer: 'Another tile may block the path, or the route may need more than two turns. Remove a different available pair to create more space.' },
      { question: 'Is Onet Master the same as Mahjong solitaire?', answer: 'No. Onet uses a path between matching tiles; Mahjong solitaire uses exposed tile positions. Similar-looking versions may also differ in timers and hints.' },
    ],
    sources: [{ label: 'Onet Master published rules and controls', href: 'https://poki.com/en/g/onet-master' }],
  },
  'geometry-dash-advance-gba-2025': {
    summary: 'Geometry Dash Advance is AleFunky’s GBA demake of Geometry Dash. It adapts the obstacle-timing platform game to Game Boy Advance hardware.',
    description: [
      'This is the community GBA project, rather than the commercial mobile or PC release. The developer maintains source code and releases separately; the build loaded by this player may not match the newest release.',
      'Use the player below for browser play. For project information or developer releases, follow the original repository linked in the sources.',
    ],
    howToPlay: [
      'Open the player controls and identify the mapped GBA buttons, including Start and Select, before choosing a level.',
      'Time your actions around the approaching obstacles. Repeat short sections to learn their timing rather than changing several controls at once.',
      'The supplied game notes describe practice mode through Start, then Select on the pause screen. Check the loaded build’s menu if those options differ.',
    ],
    tips: ['Use practice mode if the loaded build offers it.', 'Distinguish game menu buttons from browser keyboard shortcuts.'],
    faq: [
      { question: 'Is Geometry Dash Advance an official Geometry Dash release?', answer: 'No. It is AleFunky’s community GBA demake. The Game references section links to the original developer repository.' },
      { question: 'How do I start practice mode in Geometry Dash Advance?', answer: 'The supplied notes describe opening the pause screen with Start, then selecting practice with Select. Check the loaded build’s menu, because controls can differ by version.' },
      { question: 'Does this browser build include every Geometry Dash feature?', answer: 'Do not assume so. The browser player can use a different build from the project’s latest release; check the loaded game menu for available levels and options.' },
    ],
    sources: [{ label: 'Geometry Dash Advance developer repository', href: 'https://github.com/AleFunky/geometry_dash_advance' }],
  },
  'three-wonders-arcade-1991': {
    summary: 'Three Wonders is Capcom’s three-game arcade collection: Midnight Wanderers, Chariot and Don’t Pull.',
    description: [
      'Midnight Wanderers is the action-platform adventure. Chariot is the scrolling flying shooter. Don’t Pull is the block-pushing puzzle game. Choose the mode you want from the game’s selection screen.',
      'Looking for Midnight Wanderers? It is part of Three Wonders, so you do not need a separate page to identify the collection. This page provides a browser player, not a downloadable game installer.',
    ],
    howToPlay: [
      'Check the arcade player’s credit, start and action mappings, then choose one of the three games.',
      'In Midnight Wanderers, use movement, jumping and attacks to progress. In Chariot, steer through the flying stages and avoid incoming attacks.',
      'In Don’t Pull, plan how to push blocks against enemies. Check the controls again when switching modes, since each game uses a different style of play.',
    ],
    tips: ['Choose Midnight Wanderers for platform action, Chariot for shooting, or Don’t Pull for puzzles.', 'Check the player’s options before assuming a second controller or online multiplayer is supported.'],
    faq: [
      { question: 'Which games are included in Three Wonders?', answer: 'The collection contains Midnight Wanderers, the action-platform game; Chariot, the flying shooter; and Don’t Pull, the block-pushing puzzle game.' },
      { question: 'Is Midnight Wanderers a separate game?', answer: 'Midnight Wanderers is one of the three games in Three Wonders. Select it from the collection’s game menu.' },
      { question: 'Does Three Wonders have online multiplayer?', answer: 'This page does not promise online multiplayer. Check the current player controls and options before assuming a second controller or multiplayer mode is available.' },
    ],
    sources: [{ label: 'Capcom Classics Collection Remixed manual: Three Wonders, page 23', href: 'https://static.capcom.com/cccr/manuals/PSP_Manual.pdf' }],
  },
  'pipi-and-bibis-other-1991': {
    summary: 'Pipi & Bibi’s, also known as Whoopee!!, is a Toaplan arcade action game about planting bombs and escaping safely.',
    description: [
      'The original uses four-direction movement and a Shredder Beam to deal with enemies. Its stage-clear bonus imagery includes adult themes, so it is not presented here as a children’s game.',
      'The browser player’s key assignments are separate from the original cabinet controls. Check its control menu before starting.',
    ],
    howToPlay: [
      'Find the required bomb locations and plan a route through the stage that leaves a safe way out.',
      'Use the Shredder Beam against enemies. Continued hits can knock an enemy down a floor, giving you room to move.',
      'After planting the bombs, escape safely. Enemy contact, enemy attacks and your own bomb blasts can cost a life.',
    ],
    tips: ['Plan the escape before placing the final bomb.', 'Do not assume local two-player support means online multiplayer.'],
    faq: [
      { question: 'What is the objective in Pipi & Bibi’s?', answer: 'Plant the required bombs and escape safely. Plan the route before placing the final bomb, because enemy contact and blasts can cost a life.' },
      { question: 'What is the Shredder Beam for?', answer: 'Use the Shredder Beam against enemies. Continued hits can knock an enemy down a floor and create room to move.' },
      { question: 'Is Pipi & Bibi’s suitable for children?', answer: 'The original stage-clear bonus imagery includes adult themes. Consider that content before choosing the game for children.' },
    ],
    sources: [{ label: 'Toaplan / TATSUJIN: Pipi & Bibi’s controls', href: 'https://www.toaplangames.co.jp/en/license/license-21.html' }],
  },
  'taiko-no-tatsujin-taiko-web-html5-2011': {
    summary: 'Taiko Web is a browser drum-rhythm game with red center notes and blue rim notes. Choose a song and match your hits to the timing marker.',
    description: [
      'This page is the HTML5 browser entry. Song lists, difficulty options and controller support depend on the loaded player; do not assume they match a console edition.',
      'The supplied game guide lists F or J for red notes and D or K for blue notes. If those keys do not respond, focus the game and inspect its current control settings.',
    ],
    howToPlay: [
      'Choose a song and an accessible difficulty. Check the volume and focus the game area before the first note.',
      'Use the center hit for red notes and the rim hit for blue notes as they reach the timing marker. The supplied mapping is F/J for center and D/K for rim.',
      'The supplied guide lists Escape or Q to pause. Check the loaded game’s settings before enabling autoplay, a second player or an external drum controller.',
    ],
    tips: ['Start with a slower chart to separate timing mistakes from missed key inputs.', 'If sound and notes feel out of sync, check whether the game offers timing adjustment.'],
    faq: [
      { question: 'Which keys play Taiko Web notes?', answer: 'The supplied guide lists F or J for red center notes and D or K for blue rim notes. Focus the game first and check the loaded player’s controls if they do not respond.' },
      { question: 'What do red and blue notes mean in Taiko Web?', answer: 'Red notes use the drum center hit; blue notes use the rim hit. Match the correct hit as the note reaches the timing marker.' },
      { question: 'Can I use a drum controller with Taiko Web?', answer: 'Controller and external drum support depend on the loaded player. Check its settings before assuming a device or second-player option is supported.' },
    ],
    sources: [{ label: 'Upstream Taiko Web game guide', href: 'https://ggemu.com/en/game/69a412bab9aa381e667b08cf' }],
  },
}

export function getGameEditorial(game: PublicGame, locale: Locale) {
  if (locale !== 'en') return undefined
  return editorials[game.url_slug?.trim().toLowerCase() ?? '']
}
