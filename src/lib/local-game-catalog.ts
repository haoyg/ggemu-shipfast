import type {
  FilterOption,
  GameFilterOptions,
  GameSearchSort,
  PublicGame,
  RelatedGamesData,
} from '#/lib/ggemu'

type LocalGameSearchOptions = {
  category?: string
  limit: number
  page: number
  platform?: string
  query?: string
  sort?: GameSearchSort
}

const platformAliases: ReadonlyArray<ReadonlySet<string>> = [
  new Set(['famicom', 'nes', 'nintendoentertainmentsystem']),
  new Set(['snes', 'superfamicom', 'supernintendo', 'supernintendoentertainmentsystem']),
  new Set(['gba', 'gameboyadvance']),
  new Set(['n64', 'nintendo64']),
  new Set(['ps1', 'playstation', 'playstation1']),
  new Set(['nds', 'nintendods']),
  new Set(['html5', 'browser']),
  new Set(['dos', 'msdos']),
  new Set(['arcade']),
]

const localGames = [
  {
    url_slug: 'contra-nes-1988',
    name: 'Contra',
    description: 'Contra is Konami’s 1988 run-and-gun game for the Nintendo Entertainment System. Fight through side-scrolling stages, use weapon upgrades and coordinate with a second player.',
    how_to_play: 'Move, jump and fire while watching enemy patterns. Open the browser player controls before starting to confirm the mapped direction, attack, jump, Start and Select keys.',
    developer: 'Konami',
    released_year: '1988',
    keywords: 'Contra, Contra online, NES Contra, run and gun game',
    platform: 'Nintendo Entertainment System',
    platform_slug: 'nes',
    categories: ['Action', 'Shooter', 'Run and Gun'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/blog-art/contra-games-guide.jpg',
  },
  {
    url_slug: 'geometry-dash-advance-gba-2025',
    name: 'Geometry Dash Advance',
    description: 'Geometry Dash Advance is AleFunky’s community-made rhythm platformer for Game Boy Advance. Time jumps to the music, learn each obstacle sequence and use practice features when available.',
    how_to_play: 'Check the browser player mapping, focus the game, then use the mapped action button to jump. Short taps and deliberate practice are more reliable than reacting at the last moment.',
    developer: 'AleFunky',
    released_year: '2025',
    keywords: 'Geometry Dash Advance, GBA rhythm game, Geometry Dash GBA',
    platform: 'Game Boy Advance',
    platform_slug: 'gba',
    categories: ['Action', 'Rhythm', 'Platform'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/blog-art/geometry-dash-advance-guide.jpg',
  },
  {
    url_slug: 'gals-panic-arcade',
    name: 'Gals Panic',
    description: 'Gals Panic is Kaneko’s 1990 arcade area-capture game. Draw lines from a safe boundary, reconnect them to enclose sections of the playfield and avoid enemies while the line is exposed.',
    how_to_play: 'Identify the direction, Draw, credit and Start controls. Leave a boundary, trace a short route through open space and reconnect it to capture an area. The original game contains adult imagery.',
    developer: 'Kaneko',
    released_year: '1990',
    keywords: 'Gals Panic, Gals Panic arcade, area capture game',
    platform: 'Arcade',
    platform_slug: 'arcade',
    categories: ['Action', 'Puzzle'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
  },
  {
    url_slug: 'commandos-dos-1998',
    name: 'Commandos: Behind Enemy Lines',
    description: 'Commandos: Behind Enemy Lines is Pyro Studios’ 1998 real-time tactics game. Coordinate specialists, observe patrol routes and complete stealth, sabotage and rescue objectives.',
    how_to_play: 'Check the browser controls for selection, movement, actions and pause. Study guard routes before moving, then combine each commando’s specialist abilities instead of starting a direct firefight.',
    developer: 'Pyro Studios',
    released_year: '1998',
    keywords: 'Commandos Behind Enemy Lines, play Commandos online, DOS tactics game',
    platform: 'DOS',
    platform_slug: 'dos',
    categories: ['Strategy', 'Real-time Tactics'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
  },
  {
    url_slug: 'paperboy-n64-1999',
    name: 'Paperboy',
    description: 'Paperboy for Nintendo 64 turns a newspaper route into an arcade challenge. Deliver papers to subscribers, avoid neighborhood hazards and finish each route with customers intact.',
    how_to_play: 'Confirm the mapped steering, acceleration, braking and throw controls. Look ahead for subscribers, line up each delivery early and favor a safe route over optional score targets.',
    developer: 'High Voltage Software',
    released_year: '1999',
    keywords: 'Paperboy online, play Paperboy online, Paperboy N64',
    platform: 'Nintendo 64',
    platform_slug: 'n64',
    categories: ['Action', 'Arcade'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
  },
  {
    url_slug: 'donkey-kong-nes-1983',
    name: 'Donkey Kong',
    description: 'Donkey Kong for NES is Nintendo’s home-console adaptation of the arcade climbing game. Guide Mario across platforms and ladders, avoid rolling hazards and reach the top.',
    how_to_play: 'Check movement, jump, Start and Select in the browser controls. Watch a barrel’s path before crossing a ladder and use deliberate jumps instead of rushing into a moving hazard.',
    developer: 'Nintendo',
    released_year: '1983',
    keywords: 'Donkey Kong play online, Donkey Kong NES, Donkey Kong online',
    platform: 'Nintendo Entertainment System',
    platform_slug: 'nes',
    categories: ['Platform', 'Arcade'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
  },
  {
    url_slug: 'tekken-ps1-1995',
    name: 'Tekken',
    description: 'Tekken is Namco’s 1995 PlayStation version of its early 3D fighting game. Learn the four-limb attack layout, block consistently and test movement before attempting longer combinations.',
    how_to_play: 'Open the player controls and map left punch, right punch, left kick and right kick. Focus the player, confirm Start works and practice one short attack sequence at a time.',
    developer: 'Namco',
    released_year: '1995',
    keywords: 'Tekken online, unblocked Tekken, Tekken PS1',
    platform: 'PlayStation',
    platform_slug: 'ps1',
    categories: ['Fighting'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
  },
  {
    url_slug: 'pok-mon-heartgold-version-nds-2009',
    name: 'Pokémon HeartGold Version',
    description: 'Pokémon HeartGold Version is a 2009 Nintendo DS adventure through the Johto region. Build a balanced party, challenge Gym Leaders and work toward completing the regional Pokédex.',
    how_to_play: 'Confirm the directional, A, B, Start, Select and touch-screen mappings. Save through the game menu and test browser storage before a long session. Original Pokéwalker and network features are not expected to work.',
    developer: 'Game Freak',
    released_year: '2009',
    keywords: 'Pokemon HeartGold online, play HeartGold online, Pokemon HeartGold browser',
    platform: 'Nintendo DS',
    platform_slug: 'nds',
    categories: ['Role-playing', 'Adventure'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
  },
  {
    url_slug: 'super-mario-bros-the-lost-levels-enhanced-snes-1993',
    name: 'Super Mario Bros.: The Lost Levels Enhanced',
    description: 'Super Mario Bros.: The Lost Levels is Nintendo’s difficult follow-up to the original Super Mario Bros. This catalog entry is labeled as an enhanced 1993 SNES edition.',
    how_to_play: 'Check movement, jump, run, Start and pause in the player controls. Use short taps near narrow platforms, watch for hidden blocks and identify unfamiliar mushrooms before collecting them.',
    developer: 'Nintendo',
    released_year: '1993',
    keywords: 'Super Mario Lost Levels online, Lost Levels SNES, play Lost Levels',
    platform: 'Super Nintendo Entertainment System',
    platform_slug: 'snes',
    categories: ['Platform'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
  },
  {
    url_slug: 'murdoku-html5-2026',
    name: 'Murdoku',
    description: 'Murdoku is a deduction puzzle by Manuel Garand. Use the clues to place people in a crime scene, then identify the person who was alone with the victim.',
    how_to_play: 'Read every clue and the scene legend, place each person in a unique row and column, and eliminate impossible squares. Finish the arrangement before identifying the killer.',
    developer: 'Manuel Garand',
    released_year: '2026',
    keywords: 'Murdoku, Murdoku puzzle, deduction puzzle online',
    platform: 'HTML5',
    platform_slug: 'html5',
    categories: ['Puzzle', 'Logic'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 1,
    downloadable: 0,
  },
  {
    url_slug: 'three-wonders-arcade-1991',
    name: 'Three Wonders',
    description: 'Three Wonders is Capcom’s 1991 arcade collection containing Midnight Wanderers, Chariot and Don’t Pull. Choose between platform action, a scrolling shooter and a block-pushing puzzle.',
    how_to_play: 'Add a credit, press Start and choose one of the three games. Check the current arcade mappings because movement and action buttons serve different roles in each game.',
    developer: 'Capcom',
    released_year: '1991',
    keywords: 'Three Wonders online, Midnight Wanderers online, Chariot arcade, Don’t Pull puzzle',
    platform: 'Arcade',
    platform_slug: 'arcade',
    categories: ['Action', 'Shooter', 'Puzzle'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/three-wonders.svg',
  },
  {
    url_slug: 'pipi-and-bibis-other-1991',
    name: 'Pipi & Bibi’s',
    description: 'Pipi & Bibi’s, also known as Whoopee!!, is Toaplan’s arcade action game about planting bombs and escaping each building safely. The original includes adult-themed bonus imagery.',
    how_to_play: 'Check movement, attack, credit and Start mappings. Plan an escape route before placing the final bomb, use the Shredder Beam to create space and keep clear of the blast.',
    developer: 'Toaplan',
    released_year: '1992',
    keywords: 'Pipi and Bibis online, Pipi & Bibi’s, Whoopee arcade, Toaplan arcade game',
    platform: 'Arcade',
    platform_slug: 'arcade',
    categories: ['Action', 'Arcade'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/pipi-and-bibis.svg',
  },
  {
    url_slug: 'the-king-of-fighters-97-arcade-1997',
    name: "The King of Fighters '97",
    description: "The King of Fighters '97 is SNK’s 1997 team fighting game and the conclusion of the Orochi Saga. Build a three-fighter team and choose the Advanced or Extra battle system.",
    how_to_play: 'Map movement, four attacks, credit and Start before playing. Keep one team order while learning, practice blocking and simple attacks, then add special moves.',
    developer: 'SNK',
    released_year: '1997',
    keywords: "The King of Fighters 97 online, play KOF 97, KOF 97 arcade, SNK fighting game",
    platform: 'Arcade',
    platform_slug: 'arcade',
    categories: ['Fighting', 'Action'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/kof-97.svg',
  },
  {
    url_slug: 'super-mario-bros-nes-1985',
    name: 'Super Mario Bros.',
    description: 'Super Mario Bros. is Nintendo’s 1985 NES platform game. Guide Mario or Luigi through the Mushroom Kingdom, avoid enemies, find power-ups and reach each stage flag.',
    how_to_play: 'Confirm movement, jump, run, Start and Select in the player controls. Hold run for longer jumps, use momentum carefully and test the current save-state support before a long session.',
    developer: 'Nintendo',
    released_year: '1985',
    keywords: 'Super Mario Bros online, play Super Mario Bros, Mario NES game, Super Mario online',
    platform: 'Nintendo Entertainment System',
    platform_slug: 'nes',
    categories: ['Platform', 'Action'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/super-mario-bros.svg',
  },
  {
    url_slug: 'battle-city-nes-1985',
    name: 'Battle City',
    description: 'Battle City is Namco’s 1985 NES tank action game. Defend the eagle base, clear enemy waves, collect power-ups and use the destructible battlefield to control each approach.',
    how_to_play: 'Check movement, fire, Start and Select before beginning. Protect the base opening, avoid destroying useful cover and coordinate lanes when a second local player joins.',
    developer: 'Namco',
    released_year: '1985',
    keywords: 'Battle City online, play Battle City, Tank 1990 online, NES tank game',
    platform: 'Nintendo Entertainment System',
    platform_slug: 'nes',
    categories: ['Action', 'Shooter'],
    languages: ['English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/battle-city.svg',
  },
  {
    url_slug: 'double-dragon-ii-revenge-nes-1989',
    name: 'Double Dragon II: The Revenge — Chinese Translation',
    description: 'Double Dragon II: The Revenge is Technōs Japan’s 1989 NES beat ’em up. This catalog entry uses a Chinese translation of the console game rather than a separate official release.',
    how_to_play: 'Check movement, left attack, right attack, jump, Start and Select. Face away from an enemy to use the rear attack, protect both sides and coordinate space in two-player mode.',
    developer: 'Technōs Japan',
    released_year: '1989',
    keywords: 'Double Dragon II online, Double Dragon 2 NES, 双截龙 2, 双截龙 II',
    platform: 'Nintendo Entertainment System',
    platform_slug: 'nes',
    categories: ['Beat ’em up', 'Action'],
    languages: ['Chinese'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/double-dragon-ii.svg',
  },
  {
    url_slug: 'crash-bandicoot-2-cortex-strikes-back-ps1-1997',
    name: 'Crash Bandicoot 2: Cortex Strikes Back',
    description: 'Crash Bandicoot 2: Cortex Strikes Back is Naughty Dog’s 1997 PlayStation platform game. Explore warp-room stages, collect crystals and combine jumps, spins, slides and body slams.',
    how_to_play: 'Map movement, jump, spin, crouch and Start before entering a stage. Collect the crystal, use checkpoints and revisit special gem routes when their requirements become available.',
    developer: 'Naughty Dog',
    released_year: '1997',
    keywords: 'Crash Bandicoot 2 online, play Crash 2, Cortex Strikes Back PS1, Crash Bandicoot browser game',
    platform: 'PlayStation',
    platform_slug: 'ps1',
    categories: ['Platform', 'Action'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/crash-bandicoot-2.svg',
  },
  {
    url_slug: 'harry-potter-and-the-philosopher-s-stone-ps1-2001',
    name: 'Harry Potter and the Philosopher’s Stone',
    description: 'Harry Potter and the Philosopher’s Stone is Argonaut Games’ 2001 PlayStation action-adventure. Explore Hogwarts, attend lessons, learn spells and solve story challenges.',
    how_to_play: 'Confirm movement, action, spell, jump, camera and Start inputs. Follow each lesson prompt, use learned spells on matching objects and line up carefully before platforming sections.',
    developer: 'Argonaut Games',
    released_year: '2001',
    keywords: 'Harry Potter Philosopher’s Stone online, Sorcerer’s Stone PS1, Harry Potter PlayStation game, explore Hogwarts',
    platform: 'PlayStation',
    platform_slug: 'ps1',
    categories: ['Adventure', 'Platform'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/harry-potter-stone.svg',
  },
  {
    url_slug: 'tenchu-2-birth-of-the-stealth-assassins-ps1-2000',
    name: 'Tenchu 2: Birth of the Stealth Assassins',
    description: 'Tenchu 2: Birth of the Stealth Assassins is Acquire’s 2000 PlayStation stealth-action prequel. Observe patrols, use rooftops and complete objectives without unnecessary combat.',
    how_to_play: 'Map movement, camera, crouch, attack, items and the grappling hook. Watch a full patrol before moving, break line of sight when detected and prioritize the mission exit.',
    developer: 'Acquire',
    released_year: '2000',
    keywords: 'Tenchu 2 online, Birth of the Stealth Assassins, Tenchu PS1, ninja stealth game',
    platform: 'PlayStation',
    platform_slug: 'ps1',
    categories: ['Stealth', 'Action'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/tenchu-2.svg',
  },
  {
    url_slug: 'theme-hospital-dos-1997',
    name: 'Theme Hospital',
    description: 'Theme Hospital is Bullfrog Productions’ 1997 management game. Build treatment rooms, hire and train staff, manage queues and keep a hospital running through unusual fictional illnesses.',
    how_to_play: 'Check pointer, keyboard, pause and speed controls. Start with reception, diagnosis and essential treatment rooms, then expand only when staff and cash flow can support them.',
    developer: 'Bullfrog Productions',
    released_year: '1997',
    keywords: 'Theme Hospital online, play Theme Hospital, hospital management game, Bullfrog game',
    platform: 'DOS',
    platform_slug: 'dos',
    categories: ['Simulation', 'Strategy'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 1,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/theme-hospital.svg',
  },
  {
    url_slug: 'pokemon-emerald-gba-2004',
    name: 'Pokémon Emerald',
    description: 'Pokémon Emerald is Game Freak’s 2004 Game Boy Advance RPG set in Hoenn. The version tested on POKOPIE uses Traditional Chinese text; website language does not change the game language.',
    how_to_play: 'Check the GBA mapping, choose a starter and save through the game menu before relying on a long session. Trading and multiplayer have not been verified in the browser player.',
    developer: 'Game Freak',
    released_year: '2004',
    keywords: 'Pokémon Emerald online, Pokemon Emerald browser, 宝可梦绿宝石, 口袋妖怪绿宝石',
    platform: 'Game Boy Advance',
    platform_slug: 'gba',
    categories: ['Role-playing', 'Adventure'],
    languages: ['Traditional Chinese'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/pokemon-emerald.svg',
  },
  {
    url_slug: 'pokemon-ruby-gba-2002',
    name: 'Pokémon Ruby',
    description: 'Pokémon Ruby is Game Freak’s 2002 Game Boy Advance RPG set in Hoenn. Build a balanced team, earn eight Gym Badges and challenge the Pokémon League while opposing Team Magma.',
    how_to_play: 'Confirm direction, A, B, Start and Select inputs. Carry Poké Balls and healing items, learn type matchups and save before major battles or difficult captures.',
    developer: 'Game Freak',
    released_year: '2002',
    keywords: 'Pokémon Ruby online, Pokemon Ruby GBA, 宝可梦红宝石, play Pokemon Ruby',
    platform: 'Game Boy Advance',
    platform_slug: 'gba',
    categories: ['Role-playing', 'Adventure'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/pokemon-ruby.svg',
  },
  {
    url_slug: 'pokemon-leafgreen-game-boy-advance-2004',
    name: 'Pokémon LeafGreen',
    description: 'Pokémon LeafGreen is Game Freak’s 2004 Game Boy Advance remake of the original Kanto adventure. Catch and train Pokémon, collect eight Gym Badges and explore later areas.',
    how_to_play: 'Check the GBA controls, choose a starter and train a varied party. Save before Gym battles and remember that some original Pokédex goals require trading, which may not work here.',
    developer: 'Game Freak',
    released_year: '2004',
    keywords: 'Pokémon LeafGreen online, Pokemon Leaf Green GBA, 宝可梦叶绿, play Pokemon LeafGreen',
    platform: 'Game Boy Advance',
    platform_slug: 'gba',
    categories: ['Role-playing', 'Adventure'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/pokemon-leafgreen.svg',
  },
  {
    url_slug: 'rhythm-tengoku-japan-gba-2006',
    name: 'Rhythm Tengoku',
    description: 'Rhythm Tengoku is Nintendo’s 2006 Japan-only Game Boy Advance rhythm collection. Learn each compact music game from its visual cues, then follow the beat with simple timed inputs.',
    how_to_play: 'Confirm A, B, direction and Start mappings, then use the practice sequence before each rhythm game. Listen for the beat instead of reacting only to animation timing.',
    developer: 'Nintendo',
    released_year: '2006',
    keywords: 'Rhythm Tengoku online, Rhythm Heaven GBA, Japanese rhythm game, リズム天国',
    platform: 'Game Boy Advance',
    platform_slug: 'gba',
    categories: ['Rhythm', 'Music'],
    languages: ['Japanese'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/rhythm-tengoku.svg',
  },
  {
    url_slug: 'rhythm-heaven-nds-2008',
    name: 'Rhythm Heaven',
    description: 'Rhythm Heaven is Nintendo’s 2008 Nintendo DS rhythm collection. Complete short music games by following audio patterns and using the touch-screen actions introduced in practice.',
    how_to_play: 'Check the touch-screen or pointer mapping and complete the practice sequence first. Use the music as the primary timing cue and avoid adding extra taps between beats.',
    developer: 'Nintendo',
    released_year: '2008',
    keywords: 'Rhythm Heaven online, Rhythm Heaven DS, rhythm game browser, play Rhythm Heaven',
    platform: 'Nintendo DS',
    platform_slug: 'nds',
    categories: ['Rhythm', 'Music'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/rhythm-heaven.svg',
  },
  {
    url_slug: 'onet-master-html5',
    name: 'Onet Master',
    description: 'Onet Master is a browser tile-matching puzzle. Remove identical pictures by connecting each pair through empty space with a route that turns no more than twice.',
    how_to_play: 'Select two matching tiles and check whether a clear path of no more than three straight segments connects them. Clear easy edge pairs first to open new routes through the board.',
    developer: 'Famobi',
    released_year: '2021',
    keywords: 'Onet Master online, tile matching puzzle, connect pairs game, Onet puzzle',
    platform: 'HTML5',
    platform_slug: 'html5',
    categories: ['Puzzle', 'Matching'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 1,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/onet-master.svg',
  },
  {
    url_slug: 'space-is-key-flash-2011',
    name: 'Space Is Key',
    description: 'Space Is Key is Chris Jeff’s 2011 one-button platform game. Time each jump through compact obstacle courses and expect mistakes to become part of the challenge.',
    how_to_play: 'Press Space to jump while the block moves automatically. Watch one obstacle sequence, then time a deliberate press instead of tapping repeatedly.',
    developer: 'Chris Jeff',
    released_year: '2011',
    keywords: 'Space Is Key online, Space Is Key Flash, one button platform game, Chris Jeff game',
    platform: 'Flash',
    platform_slug: 'flash',
    categories: ['Platform', 'Skill'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/space-is-key.svg',
  },
  {
    url_slug: 'taiko-no-tatsujin-taiko-web-html5-2011',
    name: 'Taiko Web',
    description: 'Taiko Web is a browser drum-rhythm game. Choose a song and strike red center notes or blue rim notes as they reach the timing marker.',
    how_to_play: 'Focus the game, then use F or J for red center notes and D or K for blue rim notes. Begin with a slower chart and use the music rather than animation alone for timing.',
    developer: 'Taiko Web community project',
    released_year: '2011',
    keywords: 'Taiko Web online, Taiko no Tatsujin browser, 太鼓网页, drum rhythm game',
    platform: 'HTML5',
    platform_slug: 'html5',
    categories: ['Rhythm', 'Music'],
    languages: ['Japanese', 'English'],
    players: 2,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/taiko-web.svg',
  },
  {
    url_slug: 'romance-of-the-three-kingdoms-iv-dos-1994',
    name: 'Romance of the Three Kingdoms IV: Wall of Fire',
    description: 'Romance of the Three Kingdoms IV: Wall of Fire is Koei’s 1994 historical strategy game. Govern cities, appoint officers, negotiate and command campaigns across ancient China.',
    how_to_play: 'Choose a ruler, inspect each city’s officers, troops, supplies and economy, then assign officers to domestic or military work according to their strengths.',
    developer: 'Koei',
    released_year: '1994',
    keywords: 'Romance of the Three Kingdoms IV online, Wall of Fire DOS, RTK 4, 三国志4',
    platform: 'DOS',
    platform_slug: 'dos',
    categories: ['Strategy', 'Simulation'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/romance-three-kingdoms-iv.svg',
  },
  {
    url_slug: 'lilo-stitch-trouble-in-paradise-ps1-2002',
    name: 'Disney’s Lilo & Stitch: Trouble in Paradise',
    description: 'Disney’s Lilo & Stitch: Trouble in Paradise is a 2002 PlayStation action platform game. Play as Lilo and Stitch across Hawaiian island stages with character-specific abilities.',
    how_to_play: 'Check direction, face button, shoulder button and Start mappings before playing. Follow each stage prompt and confirm which character is active before testing an ability.',
    developer: 'Blitz Games',
    released_year: '2002',
    keywords: 'Lilo and Stitch Trouble in Paradise online, Lilo and Stitch PS1, Disney platform game',
    platform: 'PlayStation',
    platform_slug: 'ps1',
    categories: ['Action', 'Platform'],
    languages: ['English'],
    players: 1,
    play_online: 1,
    play_device: 0,
    downloadable: 0,
    game_cover: 'https://pokopie.com/game-covers/lilo-stitch.svg',
  },
] satisfies Array<PublicGame>

const gameBySlug = new Map(
  localGames.map((game) => [game.url_slug, game] as const),
)

function cloneGame(game: PublicGame): PublicGame {
  return {
    ...game,
    categories: game.categories ? [...game.categories] : undefined,
    languages: game.languages ? [...game.languages] : undefined,
  }
}

export function getLocalGame(id: string) {
  const game = gameBySlug.get(id.trim().toLowerCase())

  return game ? cloneGame(game) : undefined
}

export function getLocalGames() {
  return localGames.map(cloneGame)
}

export function searchLocalGames({
  category = '',
  limit,
  page,
  platform = '',
  query = '',
  sort = 'popular',
}: LocalGameSearchOptions) {
  const queryTerms = normalizeSearchText(query).split(' ').filter(Boolean)
  const normalizedCategory = normalizeSearchText(category)
  const filteredGames = localGames.filter((game) => {
    if (platform && !matchesPlatform(game, platform)) return false
    if (normalizedCategory && !(game.categories ?? []).some((value) => normalizeSearchText(value) === normalizedCategory)) return false

    if (queryTerms.length > 0) {
      const searchableText = normalizeSearchText([
        game.name,
        game.description,
        game.developer,
        game.keywords,
        game.platform,
        ...(game.categories ?? []),
      ].filter(Boolean).join(' '))

      if (!queryTerms.every((term) => searchableText.includes(term))) return false
    }

    return true
  })

  const sortedGames = [...filteredGames].sort(getLocalGameComparator(sort))
  const start = (page - 1) * limit

  return {
    games: sortedGames.slice(start, start + limit).map(cloneGame),
    pagination: {
      limit,
      page,
      pages: Math.ceil(sortedGames.length / limit),
      total: sortedGames.length,
    },
  }
}

export function getLocalGameFilterOptions(): GameFilterOptions {
  return {
    platforms: countFilterOptions(localGames.map((game) => game.platform).filter(Boolean)),
    categories: countFilterOptions(localGames.flatMap((game) => game.categories ?? [])),
  }
}

export function getLocalRelatedGames(currentId: string): RelatedGamesData | undefined {
  const current = gameBySlug.get(currentId.trim().toLowerCase())

  if (!current) return undefined

  const currentCategories = new Set(current.categories ?? [])
  const scoredGames = localGames
    .filter((game) => game.url_slug !== current.url_slug)
    .map((game) => ({
      game,
      score:
        (game.platform_slug === current.platform_slug ? 4 : 0)
        + (game.categories ?? []).filter((category) => currentCategories.has(category)).length * 2
        + (game.developer === current.developer ? 1 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || (left.game.name ?? '').localeCompare(right.game.name ?? ''))
    .slice(0, 6)
    .map(({ game }) => cloneGame(game))

  return {
    relatedByCategory: scoredGames,
    relatedByDeveloper: [],
  }
}

function normalizeSearchText(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

function normalizePlatform(value: string) {
  return normalizeSearchText(value).replaceAll(' ', '')
}

function matchesPlatform(game: PublicGame, requestedPlatform: string) {
  const requested = normalizePlatform(requestedPlatform)
  const requestedGroup = platformAliases.find((group) => group.has(requested))
  const candidates = [game.platform, game.platform_slug, game.platformSlug]
    .filter((value): value is string => Boolean(value))
    .map(normalizePlatform)

  return candidates.some((candidate) => (
    requestedGroup ? requestedGroup.has(candidate) : candidate === requested
  ))
}

function getLocalGameComparator(sort: GameSearchSort) {
  if (sort === 'newest') {
    return (left: PublicGame, right: PublicGame) => Number(right.released_year ?? 0) - Number(left.released_year ?? 0)
  }

  if (sort === 'oldest') {
    return (left: PublicGame, right: PublicGame) => Number(left.released_year ?? 0) - Number(right.released_year ?? 0)
  }

  if (sort === 'name_asc') {
    return (left: PublicGame, right: PublicGame) => (left.name ?? '').localeCompare(right.name ?? '')
  }

  return () => 0
}

function countFilterOptions(values: Array<string>): Array<FilterOption> {
  const counts = new Map<string, number>()

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }

  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))
}
