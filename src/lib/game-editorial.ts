import type { Locale, PublicGame } from './ggemu'

type GameEditorial = {
  summary: string
  description: string[]
  howToPlay: string[]
  tips: string[]
  faq: Array<{ question: string; answer: string }>
  quickStart?: {
    title: string
    intro: string
    entries: Array<{ label: string; detail: string; keys?: string }>
  }
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
      { question: 'How do I browse Taiko Web song categories?', answer: 'The supplied guide lists Shift + Left Arrow and Shift + Right Arrow while selecting a song. Available songs and categories can differ between player builds.' },
      { question: 'Can I use a drum controller with Taiko Web?', answer: 'The upstream listing says compatible USB controllers are supported. Check the loaded player settings before relying on an external drum or second-player mode.' },
    ],
    quickStart: {
      title: 'Taiko Web controls at a glance',
      intro: 'Focus the game before playing. These shortcuts come from the current upstream guide; song availability and settings can differ by player build.',
      entries: [
        { label: 'Red note · center hit', detail: 'Hit when the red note reaches the timing marker.', keys: 'F or J' },
        { label: 'Blue note · rim hit', detail: 'Hit when the blue note reaches the timing marker.', keys: 'D or K' },
        { label: 'Browse song categories', detail: 'Use while choosing a song.', keys: 'Shift + ← / →' },
        { label: 'Try player modes', detail: 'Use while choosing difficulty: hold Shift for autoplay or Ctrl for 2P.', keys: 'Shift / Ctrl' },
      ],
    },
    sources: [{ label: 'Upstream Taiko Web game guide', href: 'https://ggemu.com/en/game/69a412bab9aa381e667b08cf' }],
  },
  'pokemon-ruby-gba-2002': {
    summary: 'Pokémon Ruby is a Game Boy Advance RPG set in Hoenn. Build a team, earn eight Gym Badges and challenge the Pokémon League while opposing Team Magma.',
    description: [
      'Choose Treecko, Torchic or Mudkip, then travel through Hoenn’s towns, routes, caves and waterways. Wild Pokémon can be caught and trained, while battles against other Trainers provide experience and prize money.',
      'Ruby introduced Double Battles, Pokémon Contests and Pokéblocks alongside the main Gym challenge. It differs from Pokémon Sapphire in its version-exclusive Pokémon and Team Magma storyline.',
    ],
    howToPlay: [
      'Check the browser player’s current GBA key mapping before starting. Use the directional controls to explore, the primary action button to talk or confirm, and the secondary button to cancel or return.',
      'Choose a starter whose strengths fit your preferred approach. Keep several Pokémon with different types instead of relying on one over-levelled team member.',
      'Explore side paths for items, heal at Pokémon Centers and save before major battles. The original cartridge’s trading and multiplayer features should not be assumed to work in the browser player.',
    ],
    tips: ['Carry Poké Balls and status-healing items before leaving a town.', 'Build coverage for upcoming Gyms, but avoid teaching every useful move to the same Pokémon.'],
    faq: [
      { question: 'Where does Pokémon Ruby take place?', answer: 'Pokémon Ruby is set in Hoenn, a region of cities, caves, lakes, sea routes and hidden areas.' },
      { question: 'Which starter Pokémon can I choose in Ruby?', answer: 'The three starters are Treecko, Torchic and Mudkip.' },
      { question: 'What is different between Pokémon Ruby and Sapphire?', answer: 'Ruby focuses on Team Magma and has its own version-exclusive Pokémon. Sapphire instead features Team Aqua and a different set of exclusives.' },
    ],
    sources: [{ label: 'Nintendo: Pokémon Ruby for Game Boy Advance', href: 'https://www.nintendo.com/en-gb/Games/Game-Boy-Advance/Pokemon-Ruby-267167.html' }],
  },
  'pokemon-leafgreen-game-boy-advance-2004': {
    summary: 'Pokémon LeafGreen Version is a Game Boy Advance remake of the original Kanto adventure. Catch and train Pokémon, collect eight Gym Badges and challenge the Pokémon League.',
    description: [
      'The journey begins in Pallet Town with a choice of Bulbasaur, Charmander or Squirtle. From there, explore Kanto, complete the Pokédex and confront Team Rocket while preparing for the Elite Four.',
      'LeafGreen updates the early Pokémon adventure with Game Boy Advance graphics and additional areas. It is paired with FireRed, and each version includes Pokémon that are not normally found in the other.',
    ],
    howToPlay: [
      'Review the browser player’s GBA controls before leaving the title screen. Use the directional controls to move, the primary action button to confirm or interact, and the secondary button to cancel.',
      'Catch Pokémon with different types and train more than your starter. Type advantages make Gym battles and longer routes easier to manage.',
      'Talk to characters, inspect buildings and save before difficult battles. Trading, battling and Wireless Club features from the original hardware are not guaranteed in this browser player.',
    ],
    tips: ['Buy Poké Balls and healing supplies before long routes or caves.', 'Use the Pokédex and party summary to check types and moves before changing your team.'],
    faq: [
      { question: 'Is Pokémon LeafGreen a remake?', answer: 'Yes. Nintendo describes LeafGreen as a Game Boy Advance remake of Pokémon Green Version, known as Pokémon Blue Version in Europe.' },
      { question: 'Which region is in Pokémon LeafGreen?', answer: 'The main adventure takes place in Kanto and later opens additional areas.' },
      { question: 'Does browser play support trading?', answer: 'Do not assume it does. The original game used Game Boy Advance connectivity, while browser-player networking depends on the current emulator implementation.' },
    ],
    sources: [
      { label: 'Nintendo: Pokémon LeafGreen Version overview', href: 'https://www.nintendo.com/fr-fr/Jeux/Jeux-a-telecharger-sur-Nintendo-Switch/Pokemon-LeafGreen-Version-3031289.html' },
      { label: 'Nintendo Support: FireRed and LeafGreen connectivity FAQ', href: 'https://en-americas-support.nintendo.com/app/answers/detail/a_id/71365/' },
    ],
  },
  'fire-emblem-the-blazing-blade-gba-2003': {
    summary: 'Fire Emblem: The Blazing Blade is a turn-based tactical RPG set on the continent of Elibe. Direct Lyn, Eliwood, Hector and their allies across grid-based battles.',
    description: [
      'Each chapter places a limited group of units on a tactical map with an objective such as defeating a commander, protecting a position or reaching a destination. Character classes, weapons, terrain and support relationships affect how safely the army can advance.',
      'The game first introduces its systems through Lyn’s story before continuing with Eliwood and Hector. Nintendo identifies it as the first Fire Emblem installment released outside Japan.',
    ],
    howToPlay: [
      'Check the browser player’s GBA controls, then select a unit and choose where it should move. Review enemy movement and attack ranges before confirming an action.',
      'Match weapons carefully: swords are effective against axes, axes against lances, and lances against swords. Bows attack at range, while magic uses its own strengths and resistances.',
      'Protect vulnerable units and keep recovery options nearby. A defeated character may be lost for the rest of the campaign, so save only when you are comfortable with the current result.',
    ],
    tips: ['Check an enemy’s weapon and attack range before moving into its reach.', 'Share experience across useful units instead of letting one character take every finishing blow.'],
    faq: [
      { question: 'Is Fire Emblem: The Blazing Blade the same as Fire Emblem on GBA?', answer: 'Yes. Nintendo says the Game Boy Advance release titled Fire Emblem is also known as Fire Emblem: The Blazing Blade.' },
      { question: 'Who are the main characters?', answer: 'The story follows Lyn, Eliwood and Hector, with each leading or supporting the army during different parts of the campaign.' },
      { question: 'What happens when a unit is defeated?', answer: 'The original game uses permanent character loss for most units. Treat exposed positions carefully and verify the loaded game’s difficulty and save options.' },
    ],
    sources: [
      { label: 'Nintendo: Fire Emblem for Game Boy Advance', href: 'https://www.nintendo.com/us/whatsnew/fire-emblem-for-game-boy-advance-rekindles-the-flames-of-battle-on-nintendo-switch-online-expansion-pack-june-22/' },
      { label: 'Fire Emblem Heroes: Blazing Knight Eliwood', href: 'https://guide.fire-emblem-heroes.com/en-US/06001001000393/' },
    ],
  },
}

export function getGameEditorial(game: PublicGame, locale: Locale) {
  if (locale !== 'en') return undefined
  return editorials[game.url_slug?.trim().toLowerCase() ?? '']
}
