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
  'professor-layton-and-the-curious-village-nds-2007': {
    summary: 'Professor Layton and the Curious Village is a Nintendo DS puzzle adventure. Explore St. Mystere with Professor Layton and Luke while investigating the secret of the Golden Apple.',
    description: [
      'The investigation advances through conversations, environmental clues and more than 135 logic and lateral-thinking puzzles. Solving key puzzles opens new parts of the story, while optional puzzles can be found by examining the village and speaking with its residents.',
      'The original game was designed around the Nintendo DS Touch Screen. In a browser player, pointer or touch behavior depends on the current emulator and device, so review the player controls before starting a puzzle.',
    ],
    howToPlay: [
      'Check how the browser maps the Nintendo DS stylus and buttons. Use the pointer or touch input to inspect scenes, choose dialogue options and enter puzzle answers.',
      'Read every condition before answering. When a puzzle includes a diagram, test what the wording actually requires instead of relying only on the illustration.',
      'Use hints sparingly when you are stuck, then revisit missed puzzles as the story progresses. The discontinued Nintendo Wi-Fi puzzle service should not be expected in this browser version.',
    ],
    tips: ['Tap or click around each scene for hidden hint coins and optional puzzles.', 'For counting puzzles, list the valid cases before choosing an answer.'],
    faq: [
      { question: 'How many puzzles are in Professor Layton and the Curious Village?', answer: 'Nintendo describes the Nintendo DS game as containing more than 135 puzzles.' },
      { question: 'What is Professor Layton investigating?', answer: 'Layton and Luke visit St. Mystere to investigate a mysterious will and the hidden treasure called the Golden Apple.' },
      { question: 'Do the old downloadable puzzles still work?', answer: 'Nintendo discontinued the Nintendo Wi-Fi Connection service in 2014. Do not expect its downloadable-puzzle feature to work in the browser player.' },
    ],
    sources: [
      { label: 'Nintendo: Professor Layton and the Curious Village', href: 'https://www.nintendo.com/en-gb/Games/Nintendo-DS/Professor-Layton-and-the-Curious-Village-272563.html' },
      { label: 'Nintendo: Professor Layton comes to Nintendo DS', href: 'https://www.nintendo.com/en-gb/News/2008/Professor-Layton-comes-to-Nintendo-DS-250766.html' },
    ],
  },
  'theme-hospital-dos-1997': {
    summary: 'Theme Hospital is Bullfrog Productions’ 1997 hospital-management game. Build treatment rooms, hire staff and keep the hospital functioning while handling unusual fictional illnesses.',
    description: [
      'Each level asks you to turn an empty building into a working hospital. Patients need reception, diagnosis and treatment, while staff require sensible workloads and access to the rooms they need.',
      'Money, space and patient flow are connected. Expanding too quickly can leave expensive rooms idle, but too few diagnosis or treatment facilities create queues and reduce the hospital’s effectiveness.',
    ],
    howToPlay: [
      'Review the browser player’s mouse and keyboard controls. Start with reception, a GP’s office and the basic facilities required by the current level rather than filling the entire building immediately.',
      'Hire enough doctors, nurses, receptionists and handymen to keep essential rooms open. Watch queues and move or duplicate bottleneck rooms when patients wait too long.',
      'Balance treatment income against wages, construction and equipment costs. Read the level messages and objectives before spending heavily on optional rooms.',
    ],
    tips: ['Keep frequently used diagnosis rooms close together to shorten patient routes.', 'Build for current demand and leave room to expand after new illnesses or machines appear.'],
    faq: [
      { question: 'What is the goal of Theme Hospital?', answer: 'Design and manage a hospital that diagnoses and cures patients while meeting the financial and operational goals of each level.' },
      { question: 'Why are patients waiting so long?', answer: 'Look for queues at reception, GP offices and diagnosis rooms. Add staff or another high-demand room, and reduce unnecessary walking distance.' },
      { question: 'Who developed Theme Hospital?', answer: 'Bullfrog Productions developed Theme Hospital, and Electronic Arts published it in 1997.' },
    ],
    sources: [{ label: 'Electronic Arts: Theme Hospital', href: 'https://www.ea.com/games/theme/theme-hospital' }],
  },
  'pokemon-mystery-dungeon-red-rescue-team-game-boy-advance-2005': {
    summary: 'Pokémon Mystery Dungeon: Red Rescue Team is a Game Boy Advance dungeon RPG. Play as a Pokémon, form a rescue team and complete jobs in changing dungeons.',
    description: [
      'The story begins after the player wakes up as a Pokémon and meets a partner. Rescue requests arrive through the mailbox and notice board, sending the team into dungeons to find Pokémon, deliver items or reach specific floors.',
      'Dungeon movement is turn-based: opponents act as the player moves or takes an action. Items, hunger, positioning and move usage all matter, especially during longer jobs where a careless step can expose the team to several enemies.',
    ],
    howToPlay: [
      'Check the browser player’s GBA controls before entering a dungeon. Prepare in Pokémon Square, select a rescue request and bring suitable items in the Toolbox.',
      'Move one tile at a time and use corridors to avoid being surrounded. Regular attacks conserve move uses, while Pokémon moves provide stronger effects when needed.',
      'Complete the job objective and leave safely. Store important items between trips, because failing a dungeon can cost carried money or supplies depending on the situation.',
    ],
    tips: ['Check the mailbox and job list before choosing a dungeon.', 'Carry food and recovery items, then watch enemy positions before moving into an open room.'],
    faq: [
      { question: 'What do you do in Red Rescue Team?', answer: 'Form a Pokémon rescue team, accept jobs and explore dungeons to rescue Pokémon, retrieve items and progress the story.' },
      { question: 'Is dungeon movement turn-based?', answer: 'Yes. Enemies generally act when the player moves or performs an action, allowing you to plan positioning one turn at a time.' },
      { question: 'Where do rescue jobs come from?', answer: 'Requests arrive through the mailbox and can also be selected from the job listings before entering a dungeon.' },
    ],
    sources: [{ label: 'Nintendo: Pokémon Mystery Dungeon Red Rescue Team manual', href: 'https://www.nintendo.com/eu/media/downloads/games_8/emanuals/game_boy_advance_8/Manual_GameBoyAdvance_PokemonMysteryDungeonRedRescueTeam_EN.pdf' }],
  },
  'jin-yong-qun-xia-zhuan-dos-1996': {
    summary: 'Heroes of Jin Yong is a 1996 DOS wuxia RPG by Heluo Studio. Explore an open-ended martial-arts world, recruit companions and search for fourteen books connected to Jin Yong’s novels.',
    description: [
      'The player is transported from the modern world into a jianghu setting populated by characters and locations drawn from Jin Yong’s fiction. Progress depends on exploration, conversations and quests rather than a single straight route.',
      'Combat uses a tactical layout and character-specific martial arts. Recruiting allies, improving techniques and choosing how to handle different encounters shape the route through the game.',
    ],
    howToPlay: [
      'Check the DOS player’s keyboard mapping before leaving the opening area. Speak with characters and inspect locations carefully, because quest information is often delivered through dialogue rather than a modern objective marker.',
      'Build a party whose skills cover different ranges and situations. Before a difficult fight, review health, internal energy, equipment and the martial arts available to each character.',
      'Keep multiple saves as you explore. Some decisions, recruitment conditions and quest sequences can affect which options remain available later.',
    ],
    tips: ['Write down unresolved names and locations when dialogue points to another part of the world.', 'Avoid training only one fighter; a balanced group gives you more options on tactical maps.'],
    faq: [
      { question: 'What is the goal in Heroes of Jin Yong?', answer: 'The central objective is to travel through the jianghu world and recover fourteen books associated with Jin Yong’s novels so the protagonist can return home.' },
      { question: 'Is Heroes of Jin Yong a linear RPG?', answer: 'No. It is known for open-ended exploration, recruitable characters and quests that can be approached in different orders.' },
      { question: 'Was Heroes of Jin Yong officially released in English?', answer: 'This page uses the established English catalog title, but the original 1996 DOS release was a Chinese-language game. Do not assume the loaded build contains an official English translation.' },
    ],
    sources: [
      { label: 'Heroes of Jin Yong game overview', href: 'https://en.wikipedia.org/wiki/Heroes_of_Jin_Yong' },
      { label: 'Heluo Studio official site', href: 'https://hl.cubejoy.com/' },
    ],
  },
  'xuan-yuan-sword-dos-1990': {
    summary: 'Xuan-Yuan Sword is DOMO Studio and Softstar’s 1990 DOS role-playing game. It began the long-running historical-fantasy series built around Chinese mythology.',
    description: [
      'The first game follows a young swordsman through a world threatened by conflict between humans and monsters. Exploration, party development and turn-based encounters provide the foundation for the series’ later games.',
      'This is the original DOS-era entry, not Xuan-Yuan Sword VII or one of the later English releases. The interface and available language depend on the loaded build, and the 1990 release should be expected to use Chinese text.',
    ],
    howToPlay: [
      'Review the DOS keyboard controls before starting. Explore towns and routes, speak with characters and check menus for party status, equipment and available commands.',
      'Use turn-based battles to gain experience and strengthen the party. Monitor health and resources before travelling farther from safe areas.',
      'Save regularly and keep more than one save point. Early DOS role-playing games provide fewer navigation prompts than modern entries, so record useful dialogue and unexplored routes.',
    ],
    tips: ['Confirm the loaded game’s language before investing time in a new save.', 'Prepare recovery supplies before exploring unfamiliar areas or entering a long sequence of battles.'],
    faq: [
      { question: 'Is this Xuan-Yuan Sword VII?', answer: 'No. This page covers the original Xuan-Yuan Sword released for DOS in 1990.' },
      { question: 'Who developed the first Xuan-Yuan Sword?', answer: 'DOMO Studio developed it and Softstar Entertainment published the game.' },
      { question: 'Does the original Xuan-Yuan Sword have an official English version?', answer: 'The series now uses the official English name Xuan-Yuan Sword, but the original 1990 game was not an English-language release. Check the loaded build’s language before playing.' },
    ],
    sources: [
      { label: 'Softstar corporate overview: Xuan-Yuan Sword', href: 'https://group.softstar.com.tw/uploads/news/6111-20211020%28EN%29.pdf' },
      { label: 'Xuan-Yuan Sword series and first-game overview', href: 'https://en.wikipedia.org/wiki/Xuan-Yuan_Sword' },
    ],
  },
  'mario-and-luigi-superstar-saga-gba-2003': {
    summary: 'Mario & Luigi: Superstar Saga is a Game Boy Advance action RPG set in the Beanbean Kingdom. Control both brothers to solve puzzles and recover Princess Peach’s stolen voice.',
    description: [
      'Mario and Luigi travel beyond the Mushroom Kingdom after Cackletta and Fawful steal Peach’s voice. Exploration uses each brother’s movement abilities, while environmental puzzles often require them to act in sequence.',
      'Battles mix menu-based RPG commands with timed button presses. Accurate timing can strengthen attacks or help the brothers avoid damage, and Bros. techniques combine their abilities for stronger results.',
    ],
    howToPlay: [
      'Check the browser player’s GBA button mapping before starting. Pay attention to which button controls Mario and which controls Luigi during exploration and timed actions.',
      'Watch enemy movement and press the indicated brother’s button at the right moment to defend. Practice basic timing before spending Bros. Points on advanced techniques.',
      'Use each brother’s field abilities to cross obstacles and solve puzzles. If a route appears blocked, check whether the brothers need to separate, jump in sequence or use a newly learned move.',
    ],
    tips: ['Keep both brothers equipped and healed, because puzzles and battles rely on the pair.', 'Learn enemy attack cues instead of pressing both buttons at random.'],
    faq: [
      { question: 'Where does Superstar Saga take place?', answer: 'Most of the adventure takes place in the Beanbean Kingdom, beyond the Mushroom Kingdom.' },
      { question: 'Is combat turn-based?', answer: 'Commands are selected like a turn-based RPG, but timed button presses affect attacks and defense.' },
      { question: 'Does this browser version support the original link features?', answer: 'Do not assume it does. Nintendo notes that some rereleases omit the original Game Boy Advance communication features, and browser-player support depends on the emulator.' },
    ],
    sources: [
      { label: 'Nintendo: Mario & Luigi Superstar Saga', href: 'https://www.nintendo.com/en-gb/Games/Game-Boy-Advance/Mario-Luigi-Superstar-Saga-267024.html' },
      { label: 'Nintendo: Classic Mario RPG adventures', href: 'https://www.nintendo.com/us/whatsnew/adventure-with-mario-in-classic-rpgs-available-with-nintendo-switch-online-expansion-pack/' },
    ],
  },
  'dad-n-me-flash-2005': {
    summary: 'Dad ’n Me is a 2005 Newgrounds side-scrolling brawler programmed by Tom Fulp with art by Dan Paladin. Fight through the neighborhood using light attacks, heavy attacks and combos.',
    description: [
      'The game sends its purple protagonist through short combat areas filled with groups of opponents. Movement, spacing and attack combinations matter more than simply repeating one button.',
      'Dad ’n Me uses cartoon violence and is not presented as a children’s game. The original Flash controls use the arrow keys to move, A for a light jab and S for a heavy attack.',
    ],
    howToPlay: [
      'Focus the game area, then test the current wrapper controls. The original mapping is the arrow keys for movement, A for a light jab and S for a heavy attack.',
      'Approach enemies from an angle instead of walking directly into a group. Mix light and heavy attacks to find combos that keep opponents from responding.',
      'Keep moving after a knockdown and avoid being surrounded. If performance is uneven, the original author notes that Q toggles the Flash quality setting, though this may differ in an emulated player.',
    ],
    tips: ['Use movement to line up one or two opponents instead of fighting a whole group at once.', 'Experiment with light-to-heavy attack sequences rather than holding one key.'],
    faq: [
      { question: 'Who made Dad ’n Me?', answer: 'The original Newgrounds page credits Tom Fulp for programming, Dan Paladin for art and Dustball for music.' },
      { question: 'What are the original Dad ’n Me controls?', answer: 'Arrow keys move, A performs a light jab and S performs a heavy attack. The browser wrapper may remap these controls.' },
      { question: 'Is Dad ’n Me suitable for children?', answer: 'It contains cartoon violence centered on fighting other characters, so it should not be treated as a children’s game despite its stylized artwork.' },
    ],
    sources: [{ label: 'Newgrounds: original Dad ’n Me release', href: 'https://www.newgrounds.com/portal/view/254456' }],
  },
  'chobits-atashi-dake-no-hito-game-boy-advance-2002': {
    summary: 'Chobits: Atashi Dake no Hito is a Japan-only 2002 Game Boy Advance character-development adventure published by Marvelous Entertainment.',
    description: [
      'The game follows Hideki and Chi through conversations and training activities based on the Chobits series. The official product page describes three development methods: story choices, button-input imitation exercises and learning through conversations with other characters.',
      'This Japanese release should not be confused with the later PlayStation 2 game Chobits: Chii Dake no Hito. The loaded GBA build may contain Japanese text unless it has been separately translated.',
    ],
    howToPlay: [
      'Check the browser player’s GBA controls and the language shown on the opening screen. Progress through dialogue and choose responses carefully during story-based training.',
      'Follow the on-screen button prompts during imitation exercises. These sequences are designed to teach Chi through repeated actions rather than conventional combat.',
      'Keep more than one save if the game allows it. Conversation choices can change how training progresses, and a Japanese text-heavy adventure can be difficult to retrace without notes.',
    ],
    tips: ['Do not assume the loaded ROM includes an English translation.', 'Record unfamiliar menu choices before experimenting with a different response.'],
    faq: [
      { question: 'Was Chobits: Atashi Dake no Hito released in English?', answer: 'The original Game Boy Advance game was released in Japan. Do not assume the browser build contains an official English translation.' },
      { question: 'What kind of game is it?', answer: 'It is a story and character-development game built around conversation choices, button-input imitation activities and interactions with other characters.' },
      { question: 'Is this the PlayStation 2 Chobits game?', answer: 'No. This page covers the 2002 Game Boy Advance title Atashi Dake no Hito, not the later PlayStation 2 game Chii Dake no Hito.' },
    ],
    sources: [
      { label: 'Marvelous: Chobits for Game Boy Advance', href: 'https://www.marv.jp/titles/cs/312/' },
      { label: 'TBS Chobits software catalog', href: 'https://www.tbs.co.jp/chobits/old/goods/soft.html' },
    ],
  },
  'labrador-and-his-friends-nintendo-ds-2009': {
    summary: 'Nintendogs: Labrador & Friends is Nintendo’s 2005 pet simulation for Nintendo DS. Care for a puppy, teach voice commands and enter obedience or agility competitions.',
    description: [
      'The Labrador edition begins with a selection that includes the Labrador Retriever and other breeds. Daily play revolves around feeding, grooming, walking, training and using toys through the Nintendo DS Touch Screen and microphone.',
      'This catalog entry is a Chinese translation of the Nintendo game, not a 2009 Ubisoft release. Its original developer and publisher are Nintendo, and the European Labrador & Friends version was released in 2005.',
    ],
    howToPlay: [
      'Check how the browser player maps the Nintendo DS Touch Screen and microphone. Choose and name a puppy, then use the available care items to maintain its condition.',
      'Repeat voice commands consistently when teaching tricks. Browser microphone support depends on the emulator, browser permissions and the loaded build, so do not assume every original feature will work.',
      'Walk and train the dog before entering competitions. Use rewards and regular care to improve its responsiveness instead of attempting advanced commands immediately.',
    ],
    tips: ['Confirm microphone permission only if the current player explicitly requests it.', 'Keep feeding, water and grooming routines consistent before focusing on competitions.'],
    faq: [
      { question: 'Who developed Nintendogs: Labrador & Friends?', answer: 'Nintendo developed and published the original Nintendo DS game.' },
      { question: 'Was Labrador & Friends released in 2009?', answer: 'The original Labrador & Friends edition dates to 2005. This page corrects the upstream 2009 metadata.' },
      { question: 'Does the microphone work in the browser?', answer: 'It depends on the emulator, browser permissions and loaded build. The original DS used its built-in microphone, but browser support is not guaranteed.' },
    ],
    sources: [
      { label: 'Nintendo: Nintendogs Labrador & Friends', href: 'https://www.nintendo.com/en-gb/Games/Nintendo-DS/Nintendogs-Labrador-Friends-272057.html' },
    ],
  },
  'ghost-chaser-densei-snes-1994': {
    summary: 'Ghost Chaser Densei is Winkysoft and Banpresto’s 1994 Super Famicom beat ’em up. Choose a fighter and battle through side-scrolling stages with standard attacks, special moves and throws.',
    description: [
      'The game is the Japan-only Super Famicom adaptation associated with the arcade title Denjin Makai. It keeps the belt-scrolling combat format while adapting the roster and action for the home console.',
      'This release should not be confused with the unrelated 1984 computer game Ghost Chaser. The Super Famicom title was developed by Winkysoft and published by Banpresto.',
    ],
    howToPlay: [
      'Check the browser player’s Super Famicom controls, then choose a character and test the normal attack, jump and special-move buttons before advancing.',
      'Move vertically as well as horizontally to line enemies up without standing inside a group. Use throws and crowd-control attacks when several opponents close in.',
      'Learn the selected character’s range and recovery time. Avoid repeating special moves without checking their cost or risk in the loaded version.',
    ],
    tips: ['Approach groups from above or below to avoid a direct line of attacks.', 'Test each character briefly, because speed, reach and special moves differ.'],
    faq: [
      { question: 'Is Ghost Chaser Densei related to Denjin Makai?', answer: 'Yes. Ghost Chaser Densei is the Super Famicom release associated with the arcade beat ’em up Denjin Makai.' },
      { question: 'Was it released outside Japan?', answer: 'The Super Famicom version was a Japan-only release. Do not assume the loaded build contains an official English localization.' },
      { question: 'Who made Ghost Chaser Densei?', answer: 'Winkysoft developed the Super Famicom game and Banpresto published it in 1994.' },
    ],
    sources: [
      { label: 'Ghost Chaser Densei release details', href: 'https://gamefaqs.gamespot.com/snes/567027-ghost-chaser-densei/faqs' },
      { label: 'Denjin Makai and Ghost Chaser Densei credits', href: 'https://www.mobygames.com/game/47335/denjinmakai/credits/arcade/' },
    ],
  },
  '1944-cn-nes-1988': {
    summary: 'This “1944” cartridge is an unofficial NES modification of Capcom’s 1943: The Battle of Midway. It is a ROM hack, not an official Capcom sequel or release.',
    description: [
      'The underlying game is a vertical-scrolling shooter built from the NES version of 1943. Fly over ocean stages, attack aircraft and ships, collect upgrades and manage the plane’s energy while progressing toward each target.',
      'Hack variants can change the title screen, weapon behavior, starting upgrades or difficulty. Because copies circulate with different modifications, verify the behavior of the loaded build instead of relying on instructions for one specific cartridge.',
    ],
    howToPlay: [
      'Check the browser player’s NES controls and test both action buttons. Steer with the directional pad, fire at incoming formations and watch the energy meter while avoiding concentrated shots.',
      'Collect upgrades from enemy formations and learn what the loaded hack changes. Preserve energy during ordinary waves so that stronger attacks remain available for ships and bosses.',
      'Treat the title as an unofficial 1943 variant. If a guide for “1944” does not match the loaded game, consult instructions for the NES version of 1943 and then account for the hack’s differences.',
    ],
    tips: ['Prioritize survival and energy management over chasing every target.', 'Test weapon and upgrade behavior early because different hack dumps may not behave identically.'],
    faq: [
      { question: 'Is 1944 an official Capcom NES game?', answer: 'No. This catalog entry is an unofficial modification of the NES version of 1943: The Battle of Midway.' },
      { question: 'Why was the developer and year removed?', answer: 'The hack should not inherit Capcom’s developer credit or the original game’s release year as though it were a separate official release.' },
      { question: 'Is this 1944: The Loop Master?', answer: 'No. 1944: The Loop Master is a different official arcade game. This page covers an unofficial NES hack of 1943.' },
    ],
    sources: [
      { label: '1944 NES hack catalog record', href: 'https://www.vgdb.com.br/nes-nintendo-entertainment-system/jogos/1944-hack/' },
      { label: '1943: The Battle of Midway overview', href: 'https://en.wikipedia.org/wiki/1943%3A_The_Battle_of_Midway' },
    ],
  },
  'pokemon-team-rocket-game-boy-advance-2000': {
    summary: 'This catalog entry is an unofficial Pokémon ROM hack built around Team Rocket. It is not an official Game Freak release, and the current record does not identify the exact hack version reliably.',
    description: [
      'Several separate fan projects use the Pokémon Team Rocket name, including hacks built from different Pokémon games. The title alone is therefore not enough to assign this copy to a particular creator, story or base ROM.',
      'The page deliberately leaves the developer and release year unassigned. Check the loaded game’s title screen, credits and version label before using a walkthrough, because a guide for another Team Rocket hack may describe different maps and mechanics.',
    ],
    howToPlay: [
      'Open the player controls and confirm the mapped Game Boy Advance buttons. On the title or save screen, record any creator name, subtitle or version number shown by the loaded build.',
      'Use the familiar Pokémon loop of exploration, conversations, party management and turn-based battles, but follow the objectives presented by this version instead of assuming it matches an official Pokémon storyline.',
      'Keep more than one save and choose guides only after identifying the exact hack. Fan projects with similar names can use different base games, events and compatibility requirements.',
    ],
    tips: ['Photograph or write down the title-screen version before looking for help.', 'Do not apply patches or save files made for a different Team Rocket hack to this browser build.'],
    faq: [
      { question: 'Is Pokémon Team Rocket an official Pokémon game?', answer: 'No. This catalog entry is an unofficial fan-made ROM hack and should not be attributed to Game Freak as a separate official release.' },
      { question: 'Who created this Pokémon Team Rocket hack?', answer: 'The current catalog record does not identify the exact version reliably. Multiple unrelated fan projects use similar titles, so the loaded build’s title screen or credits are needed for a defensible attribution.' },
      { question: 'Which Pokémon game is this hack based on?', answer: 'That cannot be confirmed from the catalog title alone. Team Rocket hacks exist for different base games; identify the version shown in the player before following a version-specific guide.' },
    ],
    sources: [
      { label: 'Example Team Rocket hack based on Pokémon Emerald', href: 'https://www.pokeharbor.com/2022/02/pokemon-edicion-team-rocket/' },
      { label: 'Separate Team Rocket Edition catalog record based on FireRed', href: 'https://thegamesdb.net/game.php?id=134396' },
    ],
  },
  'light-and-darkness-crystal-conflict-nes-2003': {
    summary: 'Final Fantasy IV: The Conflict of Light and Dark Crystals is an unlicensed 8-bit demake for Famicom-compatible hardware. It is not an official Square or NES release of Final Fantasy IV.',
    description: [
      'The project recreates material from Final Fantasy IV within the technical limits of an unlicensed Famicom game. Its presentation and systems are simplified, so it should not be treated as a complete port of the original Super Famicom RPG.',
      'Public catalog records attribute the demake to Nanjing, but release dates are inconsistent. This page therefore removes the unsupported 2003 year instead of presenting it as settled fact.',
    ],
    howToPlay: [
      'Check the browser player’s NES controls before starting. Explore towns and routes, speak with characters and use the menu to review the party, equipment and items.',
      'Battles use command-based RPG decisions. Watch party health, choose targets carefully and prepare recovery items before leaving safe areas.',
      'Save regularly and expect differences from official Final Fantasy IV versions. If a console walkthrough does not match, follow the objectives and map layout visible in this demake.',
    ],
    tips: ['Treat guides for the official Final Fantasy IV as general context, not exact maps.', 'Keep multiple saves because unlicensed builds can differ in stability and progression.'],
    faq: [
      { question: 'Is this an official NES version of Final Fantasy IV?', answer: 'No. It is an unlicensed Famicom-compatible demake and was not released by Square as an official NES title.' },
      { question: 'Who made the demake?', answer: 'The cited catalog record attributes it to Nanjing. Because unlicensed releases can circulate under variant labels, the page states that attribution without inventing a more specific studio history.' },
      { question: 'Why is there no release year?', answer: 'Available catalog records do not establish one consistent date. The previous 2003 label was removed rather than retained as an unsupported fact.' },
    ],
    sources: [{ label: 'RetroAchievements catalog: unlicensed Final Fantasy IV demake', href: 'https://retroachievements.org/game/15155' }],
  },
  'saiyuki-tang-sanzang-nes-1996': {
    summary: 'Zui You Ji: Tang Sanzang is an unlicensed Chinese-language Famicom-compatible RPG catalogued under the Chinese title 最游记之唐三藏 and attributed to Nanjing.',
    description: [
      'The title refers to Tang Sanzang and the upstream catalog presents the game as a Journey to the West-themed role-playing game. That does not establish an official connection to any manga, anime or licensed Saiyuki release.',
      'Public records identify it as an unlicensed Chinese RPG, but the release date is not consistent enough to preserve the old 1996 label. The romanized title avoids implying a verified English localization.',
    ],
    howToPlay: [
      'Check the browser player’s NES controls and the language shown by the loaded build. Explore with the directional pad, interact with characters and inspect the menus before travelling farther.',
      'Use the game’s turn-based commands to manage attacks, abilities, items and party health. Prepare supplies before longer routes and return to safe areas when resources run low.',
      'Keep multiple saves and take notes if you cannot read the Chinese text. Do not rely on guides for unrelated games named Saiyuki, because this catalog entry is a separate unlicensed title.',
    ],
    tips: ['Confirm the loaded language and menu layout before beginning a long playthrough.', 'Search by the Chinese title 最游记之唐三藏 when looking for version-specific information.'],
    faq: [
      { question: 'Is Zui You Ji: Tang Sanzang an official Saiyuki game?', answer: 'No licensed manga or anime connection is established by the available catalog records. It is presented here as an unlicensed Chinese-language RPG.' },
      { question: 'Who developed the game?', answer: 'The cited catalog record attributes the game to Nanjing, a producer of unlicensed Famicom-compatible titles.' },
      { question: 'Why was the 1996 release year removed?', answer: 'The available public records do not provide a consistent, dependable release date, so the page no longer presents 1996 as verified.' },
    ],
    sources: [{ label: 'FEMOOC catalog: 最游记之唐三藏', href: 'https://www.femooc.com/game/detail?id=20229' }],
  },
  'chinese-paladin-dos-1995': {
    summary: 'The Legend of Sword and Fairy is Softstar’s 1995 DOS role-playing game. Follow Li Xiaoyao on a Chinese fantasy journey shaped by swordplay, mythology and the companions Zhao Ling’er, Lin Yueru and Anu.',
    description: [
      'Originally released as 仙劍奇俠傳, the game combines menu-based battles and world exploration with a story about Li Xiaoyao’s relationships and responsibilities. This page covers the original DOS-era game, not a later remake, television adaptation or mobile title.',
      'The loaded version may use Traditional or Simplified Chinese and may differ from later Windows releases. Check the title screen before choosing a walkthrough, because maps, presentation and save compatibility can vary between editions.',
    ],
    howToPlay: [
      'Review the DOS player’s keyboard mapping, then explore towns and field areas while speaking with characters and inspecting nearby objects. Dialogue often provides the next destination.',
      'In battle, balance normal attacks, techniques and recovery items. Check equipment and party status before entering caves or other areas with repeated encounters.',
      'Save in several slots and note the current location or objective. Use a guide written for the DOS edition if you need help, rather than assuming instructions for a remake will match.',
    ],
    tips: ['Keep recovery items available before leaving a town.', 'Confirm the edition and language on the title screen before following a version-specific guide.'],
    faq: [
      { question: 'Is this the original Legend of Sword and Fairy?', answer: 'This page is for the 1995 DOS game, originally titled 仙劍奇俠傳. It is not one of the later remakes or mobile adaptations.' },
      { question: 'Who made The Legend of Sword and Fairy?', answer: 'Softstar Entertainment released the original game in 1995.' },
      { question: 'Does the DOS game have an official English version?', answer: 'The original release is a Chinese-language RPG. The English page title identifies the game, but it does not mean the loaded build contains an official English localization.' },
    ],
    sources: [
      { label: 'Softstar: Legend of Sword and Fairy 1 DOS retrospective', href: 'https://km.softstar.com.tw/topic.aspx?tid=483' },
      { label: 'Softstar corporate history', href: 'https://www.softstar.com.tw/about/About/about_04.aspx' },
    ],
  },
  'xuan-yuan-sword-ii-dos-1994': {
    summary: 'Xuan-Yuan Sword II is DOMO Studio and Softstar’s 1994 DOS role-playing game. He Ran, Yang Kunshuo and Jiang Ruhong travel through a mythic world divided by conflict between humans and monsters.',
    description: [
      'The sequel expands the ideas of the first Xuan-Yuan Sword into a fuller adventure with party-based battles, elemental relationships and several categories of special techniques. Its story follows He Ran after the earlier game’s events.',
      'The Lianyao Pot becomes both a story object and a game system: weakened enemies can be captured, then combined outside battle. The browser page covers the DOS-era title; features in the modern Steam release should not automatically be assumed here.',
    ],
    howToPlay: [
      'Check the DOS keyboard controls, then speak with characters and explore each accessible route. Review the menu descriptions before spending health, technique points or materials on special abilities.',
      'Learn the elemental relationships used by attacks and enemies. A technique that performs well in one encounter may be a poor choice against a different affinity.',
      'After obtaining the Lianyao Pot, weaken an enemy before attempting to capture it. Save before experimenting with combinations, because the result and level requirements may not suit the current party.',
    ],
    tips: ['Read technique descriptions and resource costs before using them.', 'Keep a separate save before combining creatures in the Lianyao Pot.'],
    faq: [
      { question: 'When was Xuan-Yuan Sword II originally released?', answer: 'Softstar’s company timeline lists Xuan-Yuan Sword II in February 1994.' },
      { question: 'What does the Lianyao Pot do?', answer: 'It can capture sufficiently weakened enemies in battle and combine captured creatures outside battle, subject to the game’s restrictions.' },
      { question: 'Is this the modern Steam version?', answer: 'No. This page targets the DOS-era game. The official Steam release is a useful reference, but its platform features should not be assumed to exist in the browser player.' },
    ],
    sources: [
      { label: 'Softstar release timeline', href: 'https://www.softstar.com.tw/about/about/about_04-1.aspx' },
      { label: 'Official Xuan-Yuan Sword II Steam page', href: 'https://store.steampowered.com/app/1508740/XuanYuan_Sword_2/' },
    ],
  },
  'flame-dragon-knights-seal-of-the-evil-god-dos-1994': {
    summary: 'Flame Dragon Knights: Seal of the Evil God is a 1994 DOS tactical RPG developed by Taiwan’s Han Tang International Information. Move a party across grid-based battlefields and develop its fighters between encounters.',
    description: [
      'This is the first single-player Flame Dragon Knights game, originally titled 炎龍騎士團：邪神之封印. Combat plays out in turns, with positioning, attack range and the order of actions determining how safely the party advances.',
      'The browser build may use a different revision from later collections or mobile rereleases. Treat its in-game menus and save files as specific to the loaded DOS version.',
    ],
    howToPlay: [
      'Check the DOS controls and inspect every unit before moving. Note movement range, attack range, health and available actions before committing to a position.',
      'Advance as a group and protect vulnerable units. Use terrain and spacing to avoid exposing several party members to the same enemy counterattack.',
      'Save before a new battle and keep a separate earlier save. Tactical RPG campaigns can punish poor resource use or lost units over several stages rather than immediately.',
    ],
    tips: ['Check enemy movement and attack range before ending a turn.', 'Do not send a fast unit so far ahead that the rest of the party cannot support it.'],
    faq: [
      { question: 'What type of game is Flame Dragon Knights?', answer: 'It is a single-player tactical role-playing game with turn-based movement and combat on grid-based maps.' },
      { question: 'Who developed Seal of the Evil God?', answer: 'Taiwanese developer Han Tang International Information developed the game.' },
      { question: 'Is this Flame Dragon Knights II?', answer: 'No. Seal of the Evil God is the first game. Legend of the Golden Castle is the 1995 sequel and has its own page.' },
    ],
    sources: [{ label: 'Soft-World history of Flame Dragon Knights', href: 'https://www.soft-world.com/News/NewsDetail?Sn=25' }],
  },
  'flame-dragon-knight-2-dos-1995': {
    summary: 'Flame Dragon Knights II: Legend of the Golden Castle is Han Tang International Information’s 1995 DOS tactical RPG. Lead a growing party through turn-based battles while searching maps for equipment, shops and optional routes.',
    description: [
      'The sequel expands the first game with character development choices, hidden objects and stages that require special conditions. These systems reward careful exploration, but they also make version-specific guides more useful than a general series overview.',
      'The complete English-facing title includes Legend of the Golden Castle, corresponding to 黃金城之謎. This distinguishes the game from the first Flame Dragon Knights and from the later mobile nostalgia edition.',
    ],
    howToPlay: [
      'Before moving, inspect allied and enemy ranges. Position durable units where they can protect weaker party members, then focus attacks rather than spreading damage across many targets.',
      'Search suspicious map positions when it is safe to do so. Some items and shops are hidden, but chasing them should not leave the party exposed or cause the battle objective to fail.',
      'Keep saves from before each stage and before major character-development decisions. Some optional content depends on conditions that cannot be reconstructed after a battle is complete.',
    ],
    tips: ['Balance hidden-item searches against the immediate battle objective.', 'Keep a pre-stage save so a missed condition does not require restarting the campaign.'],
    faq: [
      { question: 'What is the full title of Flame Dragon Knights II?', answer: 'The game is Flame Dragon Knights II: Legend of the Golden Castle, originally 炎龍騎士團II：黃金城之謎.' },
      { question: 'Does Flame Dragon Knights II have hidden content?', answer: 'Yes. The publisher’s retrospective describes hidden items and three hidden chapters that require special conditions.' },
      { question: 'Is this the mobile nostalgia edition?', answer: 'No. This page covers the 1995 DOS game. The later mobile version adapts the original and adds platform-specific changes.' },
    ],
    sources: [{ label: 'Soft-World: Flame Dragon Knights II retrospective', href: 'https://www.soft-world.com/News/NewsDetail?Sn=25' }],
  },
  'pokemon-firered-game-boy-advance-2004': {
    summary: 'Pokémon FireRed is a 2004 Game Boy Advance remake of the original Pokémon Red adventure. Explore Kanto, build a team, earn eight Gym Badges and confront Team Rocket.',
    description: [
      'The journey starts in Pallet Town with Bulbasaur, Charmander or Squirtle. FireRed retains the Kanto structure while using Game Boy Advance-era systems such as abilities, natures, held items and updated battle presentation.',
      'FireRed and LeafGreen have different normally available Pokémon. The original cartridge also used link hardware for trading and battles; those connectivity features should not be assumed to work in this browser player.',
    ],
    howToPlay: [
      'Check the browser player’s GBA controls, then choose a starter and explore each route carefully. Talk to characters, collect useful items and heal at Pokémon Centers before long areas.',
      'Train a varied party instead of relying only on the starter. Type matchups, status effects and held items can make Gym and rival battles easier to manage.',
      'Save before major battles or difficult captures. If completing the Pokédex matters to you, remember that some Pokémon normally require trading or another version, which may not be available here.',
    ],
    tips: ['Carry Poké Balls and healing items before leaving a town.', 'Check the browser player’s connectivity support before planning around trades.'],
    faq: [
      { question: 'Is Pokémon FireRed a remake?', answer: 'Yes. It is a 2004 Game Boy Advance remake of Pokémon Red, with updated graphics and mechanics from the GBA era.' },
      { question: 'Which region is in Pokémon FireRed?', answer: 'The main adventure takes place in Kanto, followed by additional areas including the Sevii Islands.' },
      { question: 'Can I trade Pokémon in the browser version?', answer: 'Do not assume so. The original game used Game Boy Advance link features, while browser connectivity depends on the current emulator.' },
    ],
    sources: [
      { label: 'Nintendo: Pokémon FireRed for Game Boy Advance', href: 'https://www.nintendo.com/en-gb/Games/Game-Boy-Advance/Pokemon-FireRed-267123.html' },
      { label: 'Nintendo: FireRed and LeafGreen version FAQ', href: 'https://en-americas-support.nintendo.com/app/answers/detail/a_id/71365/' },
    ],
  },
  'maplestory-ds-nds-2010': {
    summary: 'MapleStory DS is a 2010 single-player action RPG co-developed by Nexon and Nintendo for the Korean Nintendo DS market. Four character classes experience connected sides of the same story.',
    description: [
      'The four protagonists use the Warrior, Thief, Archer and Magician classes. Each follows a separate route, and their stories overlap to reveal different parts of the central events.',
      'This is not the online PC version of MapleStory. It was designed as a standalone handheld adventure, and the original Korean release should not be assumed to contain an official English localization.',
    ],
    howToPlay: [
      'Confirm the loaded language and Nintendo DS control mapping before choosing a character. Learn the selected class’s attack range and movement options in the early areas.',
      'Explore each map for exits, characters and usable objects. Equip suitable items and use class skills deliberately rather than spending resources on every encounter.',
      'Save regularly and try another protagonist after finishing or reaching a natural stopping point. The four routes are meant to show connected events from different perspectives.',
    ],
    tips: ['Choose a class whose range and pace suit you; each protagonist plays differently.', 'Do not expect progress or characters from the online MapleStory account system.'],
    faq: [
      { question: 'Is MapleStory DS an online game?', answer: 'No. It is a standalone single-player action RPG made for Nintendo DS, not a portable client for the MapleStory MMO.' },
      { question: 'Which classes are playable?', answer: 'The four protagonists represent the Warrior, Thief, Archer and Magician classes.' },
      { question: 'Was MapleStory DS released in English?', answer: 'The original 2010 release targeted South Korea. Check the loaded build’s language rather than assuming it includes an official English version.' },
    ],
    sources: [{ label: 'Nexon release announcement for MapleStory DS', href: 'https://www.newswire.co.kr/newsRead.php?no=458822' }],
  },
  'naruto-shippuden-ultimate-impact-psp-2011': {
    summary: 'Naruto Shippuden: Ultimate Ninja Impact is CyberConnect2’s 2011 PSP action game. Control Naruto and other characters in large battles against groups of enemies and story bosses.',
    description: [
      'Story Battle follows events from Naruto Shippuden through mission-based stages. Combat emphasizes movement, crowd attacks, substitutions and character-specific techniques rather than the one-on-one structure of some other Ultimate Ninja games.',
      'The original PSP release supported one player and two-player ad hoc cooperative play. A browser emulator does not automatically reproduce PSP ad hoc networking, so this page does not promise online co-op.',
    ],
    howToPlay: [
      'Check the PSP button mapping before starting a mission. Practice movement, normal attacks, chakra use, guarding and substitution timing against early groups.',
      'Avoid standing inside a crowd after completing a combo. Reposition, watch warning indicators and save stronger techniques for dense groups or tougher targets.',
      'Review mission conditions and character setup before deployment. Upgrade or customize the available character when the game opens those options, then replay stages if you need more practice.',
    ],
    tips: ['Keep moving after a combo so surrounding enemies cannot attack from behind.', 'Verify emulator networking support before trying to use the original ad hoc co-op mode.'],
    faq: [
      { question: 'Who developed Ultimate Ninja Impact?', answer: 'CyberConnect2 developed the game and Bandai Namco Games published the original PSP release.' },
      { question: 'What kind of combat does it use?', answer: 'It is a mission-based action game built around large groups of enemies, playable Naruto Shippuden characters and boss encounters.' },
      { question: 'Does browser play support two-player co-op?', answer: 'It is not guaranteed. The PSP game used local ad hoc communication, which requires explicit support from the browser emulator.' },
    ],
    sources: [
      { label: 'CyberConnect2: Ultimate Ninja Impact product overview', href: 'https://www.cc2.co.jp/naruto_generation/?page_id=33' },
      { label: 'Bandai Namco: Ultimate Ninja Impact trailer and feature overview', href: 'https://www.youtube.com/watch?v=u8RFoYpdjCU' },
    ],
  },
  'initial-d-another-stage-cn-gba-2002': {
    summary: 'Initial D: Another Stage is Sammy’s 2002 Game Boy Advance racing RPG. This catalog entry contains a Chinese translation of the Japan-only original.',
    description: [
      'Another Stage adapts Initial D into a handheld story game in which conversations, preparation and command choices frame the mountain-pass races. It is distinct from Sega’s arcade-focused Initial D: Arcade Stage series.',
      'Sega’s catalog confirms the original Japanese GBA release on April 26, 2002. The Chinese text belongs to the translated build loaded here; it should not be mistaken for a separate officially documented Chinese retail release.',
    ],
    howToPlay: [
      'Check the GBA controls and read the current story objective before entering a race. Menus and dialogue matter because this game uses RPG-style choices rather than direct arcade steering alone.',
      'During a battle or race sequence, watch the situation text and choose actions that fit the current distance, corner or opponent. Learn what each translated command does before committing important resources.',
      'Keep multiple saves and do not use a guide for Initial D: Arcade Stage as though it were the same game. Search for Another Stage when checking characters, routes or command systems.',
    ],
    tips: ['Confirm the meaning of each translated race command in an early event.', 'Use guides written specifically for the GBA game Another Stage.'],
    faq: [
      { question: 'Is Initial D: Another Stage an arcade racing game?', answer: 'No. It is a Game Boy Advance racing RPG with story scenes and command-based race decisions, separate from Initial D: Arcade Stage.' },
      { question: 'When was the original game released?', answer: 'Sega’s official catalog lists the Japanese Game Boy Advance release on April 26, 2002.' },
      { question: 'Was the original release in Chinese?', answer: 'The documented original release was Japanese. This catalog entry is labeled as a Chinese translation, not as a separately verified Chinese retail edition.' },
    ],
    sources: [
      { label: 'Sega Game Boy Advance catalog: Initial D Another Stage', href: 'https://www.sega.jp/game/gba/' },
      { label: 'Initial D Another Stage release record', href: 'https://gamefaqs.gamespot.com/gba/565817-initial-d-another-stage/data' },
    ],
  },
  '1942-cn-nes-1985': {
    summary: '1942 is Capcom’s vertical-scrolling shooter, adapted for the NES in 1985. This catalog entry adds a Chinese translation to the original game rather than representing a separate Capcom release.',
    description: [
      'Guide the aircraft through waves of enemy planes while managing limited lives and special evasive moves. Enemy formations reward pattern recognition: chasing every target is less important than keeping a safe route open.',
      'The original game’s combat imagery uses a fictionalized World War II setting. The translated text may change menus or labels, but the underlying developer and NES release year remain Capcom and 1985.',
    ],
    howToPlay: [
      'Check the browser player’s NES mapping and test both action buttons. Keep firing while moving in controlled arcs rather than staying directly beneath incoming formations.',
      'Use the evasive loop when a dense pattern leaves no safe path, but do not waste it on shots that can be avoided with ordinary movement. Watch for formations that provide bonuses when fully cleared.',
      'Prioritize survival near the edges of the screen and learn where larger enemies enter. Continue only after confirming how the loaded translation handles pause, start and status information.',
    ],
    tips: ['Leave yourself an escape lane instead of following one enemy across the screen.', 'Treat the Chinese text as a translation layer; gameplay guides for the NES original should still apply.'],
    faq: [
      { question: 'Is this an official Chinese edition of 1942?', answer: 'No official Chinese retail release is established by the catalog record. This page identifies the loaded ROM as a Chinese translation of Capcom’s NES game.' },
      { question: 'Who developed the original 1942?', answer: 'Capcom created the original game and released the NES adaptation in 1985.' },
      { question: 'What type of game is 1942?', answer: 'It is a vertically scrolling shooter built around aircraft movement, continuous fire, enemy formations and evasive loops.' },
    ],
    sources: [{ label: 'Capcom 1942 NES instruction manual', href: 'https://captown.capcom.com/uploads/game/manual/44/1942_en_G.73731e07-448b-4fda-9112-abfe5e6b73b9.pdf' }],
  },
  '1943-the-battle-of-midway-cn-nes-1988': {
    summary: '1943: The Battle of Midway is Capcom’s NES vertical shooter from 1988. This page uses a Chinese-translated ROM while retaining the identity of the original console game.',
    description: [
      'The NES version combines air combat with an energy system and permanent aircraft improvements. Its stages and progression differ substantially from the arcade release, so an arcade walkthrough will not always match this version.',
      'The translation does not make the game a separate 1988 Chinese release. Developer and year refer to Capcom’s NES version; the translation author and date are not established by the current catalog record.',
    ],
    howToPlay: [
      'Confirm the NES fire and special-action buttons, then watch both incoming shots and the aircraft’s energy. Avoid unnecessary collisions even when trying to finish an enemy formation.',
      'Collect useful items and choose upgrades that address the current weakness, such as attack power or survivability. Permanent improvements make long-term planning more important than in a simple score run.',
      'Learn the approach to each large target and preserve energy before the encounter. Use an NES-specific guide if needed, because the arcade stage sequence and systems are not identical.',
    ],
    tips: ['Protect the energy meter before boss encounters.', 'Use NES-specific upgrade advice rather than assuming the arcade version behaves the same way.'],
    faq: [
      { question: 'How does the NES version differ from the arcade game?', answer: 'The NES adaptation changes progression and adds permanent aircraft upgrades, making it more than a direct copy of the arcade release.' },
      { question: 'Is the Chinese translation an official Capcom release?', answer: 'The current record does not establish an official Chinese retail edition. The page labels it as a translation of Capcom’s NES version.' },
      { question: 'When did the NES version release?', answer: 'Capcom released the Japanese and North American NES/Famicom versions in 1988.' },
    ],
    sources: [
      { label: '1943 NES release record', href: 'https://gamefaqs.gamespot.com/nes/587059-1943-the-battle-of-midway/data' },
      { label: '1943 platform version comparison', href: 'https://strategywiki.org/wiki/1943%3A_The_Battle_of_Midway/Versions' },
    ],
  },
  'double-dragon-ii-revenge-nes-1989': {
    summary: 'Double Dragon II: The Revenge is Technōs Japan’s 1989 NES beat ’em up. This entry applies a Chinese translation to the console game and does not claim a separate official Chinese release.',
    description: [
      'Billy and Jimmy Lee fight through side-scrolling missions using punches, kicks, jumps and combination attacks. The NES version expands beyond the arcade structure and should be treated as its own console adaptation.',
      'Attack direction matters: the game’s two main attack buttons strike toward different sides of the character. Test the mapping early, because the useful button changes when an enemy crosses behind you.',
    ],
    howToPlay: [
      'Check which browser keys map to the NES A and B buttons. Face a lone enemy and confirm which button attacks left and which attacks right before entering a crowded area.',
      'Use vertical movement to line enemies up, then attack without allowing opponents to surround both sides. Throws, jumping attacks and stronger techniques are safer when you understand their timing.',
      'Treat moving platforms and hazards as part of the challenge, not only the fights. Keep a save before difficult missions if the browser player provides save-state support.',
    ],
    tips: ['Learn the direction-based attack buttons before trying advanced techniques.', 'Move above or below a group so enemies approach along a narrower line.'],
    faq: [
      { question: 'Who developed Double Dragon II on NES?', answer: 'Technōs Japan developed and published the NES game in 1989.' },
      { question: 'Is the NES game identical to the arcade version?', answer: 'No. The NES release is a substantially adapted version with its own stages and console-specific design.' },
      { question: 'Is this an official Chinese release?', answer: 'The catalog record identifies a Chinese translation, but it does not establish a separate official Chinese retail edition.' },
    ],
    sources: [
      { label: 'Double Dragon II NES instruction manual', href: 'https://www.gamingalexandria.com/highquality/NES/Double%20Dragon%20II%20-%20The%20Revenge/Double%20Dragon%20II%20-%20The%20Revenge%20-%20Manual.pdf' },
      { label: 'Technos Collection manual: Double Dragon II release details', href: 'https://evercade.info/wp-content/uploads/2020/10/Technos-Collection-1.pdf' },
    ],
  },
  'saint-seiya-ougon-densetsu-kanketsu-hen-cn-nes-1988': {
    summary: 'Saint Seiya: Ougon Densetsu Kanketsu Hen is a 1988 Famicom action RPG developed by TOSE and published by Bandai. This page runs a Chinese-translated version.',
    description: [
      'The game follows the Sanctuary and Gold Saints storyline across the Twelve Houses. It combines short action sequences with character selection, dialogue and role-playing systems rather than playing like a conventional one-on-one fighter.',
      'Kanketsu Hen is the sequel to the earlier Ougon Densetsu game. The Chinese text helps identify commands and story scenes, but the current record does not verify an official Chinese cartridge release.',
    ],
    howToPlay: [
      'Check the NES controls and read the translated status screens before choosing a Saint. Monitor both Life and Cosmo-related resources instead of treating every encounter as a basic action stage.',
      'Learn each opponent’s pattern and avoid losing resources to repeated contact. Character choice and story conditions can matter, so pause before confirming translated menu options.',
      'Keep saves before entering a new House. If a guide does not match, verify that it covers Kanketsu Hen rather than the first Ougon Densetsu game.',
    ],
    tips: ['Search for the full Kanketsu Hen subtitle when using a walkthrough.', 'Read translated dialogue and status screens before committing a character to the next battle.'],
    faq: [
      { question: 'Which part of Saint Seiya does Kanketsu Hen cover?', answer: 'It focuses on the Sanctuary storyline and the battles through the Twelve Houses to the final confrontation.' },
      { question: 'Who made the original Famicom game?', answer: 'TOSE developed it and Bandai published it in Japan in 1988.' },
      { question: 'Is this the first Ougon Densetsu game?', answer: 'No. Kanketsu Hen is the follow-up and uses a different structure while completing the Sanctuary storyline.' },
    ],
    sources: [
      { label: 'Saint Seiya Kanketsu Hen release record', href: 'https://gamefaqs.gamespot.com/nes/562974-saint-seiya-ougon-densetsu-kanketsu-hen/data' },
      { label: 'Famicom catalog overview of Kanketsu Hen', href: 'https://www.gavas.jp/products/detail.php?product_id=4103' },
    ],
  },
  'satomi-hakkenden-cn-nes-1989': {
    summary: 'Satomi Hakkenden is a 1989 Famicom RPG developed by Alpha Denshi and published by SNK. This catalog entry contains a Chinese translation of the Japan-only original.',
    description: [
      'The game draws from the Japanese epic Nansō Satomi Hakkenden and uses a traditional console-RPG structure of towns, field exploration, conversations and command-based battles.',
      'Do not confuse it with Idol Hakkenden, another 1989 Famicom title with a similar word in its name. The Chinese translation is useful for play, but its author and patch date are not established by the current catalog metadata.',
    ],
    howToPlay: [
      'Check the NES controls and inspect the translated menu. Talk to characters more than once when the next destination is unclear, and review equipment before leaving a town.',
      'Use turn-based commands to manage attacks, items and recovery. Build experience steadily and avoid travelling deep into a new area when the party is already low on resources.',
      'Keep several saves and note important names or locations from dialogue. Use guides for SNK’s Satomi Hakkenden, not Idol Hakkenden or unrelated adaptations of the novel.',
    ],
    tips: ['Restock and save before crossing into an unfamiliar region.', 'Include SNK or Alpha Denshi in searches to avoid similarly named games.'],
    faq: [
      { question: 'What kind of game is Satomi Hakkenden?', answer: 'It is a command-based Famicom role-playing game inspired by the Japanese epic Nansō Satomi Hakkenden.' },
      { question: 'Who developed the game?', answer: 'Alpha Denshi developed it and SNK published the original Japanese release in 1989.' },
      { question: 'Is Satomi Hakkenden the same as Idol Hakkenden?', answer: 'No. They are separate Famicom games with different developers, stories and gameplay.' },
    ],
    sources: [
      { label: 'Satomi Hakkenden game and release overview', href: 'https://strategywiki.org/wiki/Satomi_Hakkenden' },
      { label: 'SNK Famicom catalog record for Satomi Hakkenden', href: 'https://www.gavas.jp/products/detail.php?product_id=4115' },
    ],
  },
}

export function getGameEditorial(game: PublicGame, locale: Locale) {
  if (locale !== 'en') return undefined
  return editorials[game.url_slug?.trim().toLowerCase() ?? '']
}
