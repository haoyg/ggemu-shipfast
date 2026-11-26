import type { Locale, PublicGame } from '#/lib/ggemu'
import { getReviewedChineseGameName } from '#/lib/game-name-aliases'
import { getCanonicalGameRouteId } from '#/lib/game-route-id'

const contraTargetSlug = 'contra-nes-1988'
const geometryDashAdvanceTargetSlug = 'geometry-dash-advance-gba-2025'
const murdokuTargetSlug = 'murdoku-html5-2026'
const onetMasterTargetSlug = 'onet-master-html5'
const pokemonEmeraldTargetSlug = 'pokemon-emerald-gba-2004'
const shonenJumpOnePieceTargetSlug = 'shonen-jump-s-one-piece-gba-2005'
const taikoWebTargetSlug = 'taiko-no-tatsujin-taiko-web-html5-2011'

const searchOnlyGameSeoBySlug = {
  'pixeltris-html5-2026': {
    heading: 'Play Pixeltris Online',
    title: 'Pixeltris Online - Play the HTML5 Puzzle Game | POKOPIE',
    description:
      'Play Pixeltris online in your browser. Stack pixel blocks, clear lines and learn the controls. Free to play with no download required.',
    keywords:
      'Pixeltris, Pixeltris online, Pixel Tris, play Pixeltris, HTML5 puzzle game',
  },
} as const

const targetedGameSeoBySlug = {
  'neighbours-from-hell-flash-2003': {
    heading: 'Play Neighbours from Hell Online',
    title: 'Play Neighbours from Hell Online | Puzzle Game | POKOPIE',
    description:
      'Play Neighbours from Hell online. Learn the 2003 prank puzzle game’s controls, watch the neighbour’s routine, set traps and avoid being caught.',
    keywords:
      'Neighbours from Hell online, play Neighbours from Hell, Neighbors from Hell game, prank puzzle game',
  },
  'crash-bandicoot-2-cortex-strikes-back-ps1-1997': {
    heading: 'Play Crash Bandicoot 2: Cortex Strikes Back Online',
    title: 'Play Crash Bandicoot 2 Online | PS1 | POKOPIE',
    description:
      'Play Crash Bandicoot 2 online in your browser. Collect crystals, break crates, explore warp rooms and learn the controls for the original 1997 PS1 game.',
    keywords:
      'Crash Bandicoot 2 online, play Crash 2 online, Cortex Strikes Back online, Crash Bandicoot PS1 game',
  },
  'harry-potter-and-the-philosopher-s-stone-ps1-2001': {
    heading: 'Play Harry Potter and the Philosopher’s Stone Online',
    title: 'Harry Potter and the Philosopher’s Stone Online | PS1',
    description:
      'Play Harry Potter and the Philosopher’s Stone online. Explore Hogwarts, learn spells and check controls for the original 2001 PlayStation adventure.',
    keywords:
      'Harry Potter Philosopher’s Stone online, Sorcerer’s Stone PS1 online, play Harry Potter PS1, Hogwarts game',
  },
  'tenchu-2-birth-of-the-stealth-assassins-ps1-2000': {
    heading: 'Play Tenchu 2: Birth of the Stealth Assassins Online',
    title: 'Play Tenchu 2 Online | PS1 Stealth Game | POKOPIE',
    description:
      'Play Tenchu 2 online in your browser. Study guard routes, use stealth and items, and learn the controls for the 2000 PlayStation prequel.',
    keywords:
      'Tenchu 2 online, play Tenchu 2, Birth of the Stealth Assassins online, PS1 stealth game',
  },
  'super-mario-bros-the-lost-levels-enhanced-snes-1993': {
    heading: 'Play Super Mario Bros.: The Lost Levels Online',
    title: 'Play Super Mario Bros. The Lost Levels Online | POKOPIE',
    description:
      'Play Super Mario Bros.: The Lost Levels online in your browser. Learn the SNES controls, poison mushroom hazards, wind mechanics and beginner tips.',
    keywords:
      'Super Mario Bros The Lost Levels online, play Lost Levels online, Lost Levels online game, SNES Mario game',
  },
  'paperboy-n64-1999': {
    heading: 'Play Paperboy Online Free',
    title: 'Play Paperboy Online Free | Nintendo 64 | POKOPIE',
    description:
      'Play Paperboy online free in your browser. Deliver newspapers, avoid street hazards, learn the Nintendo 64 controls and improve your route score.',
    keywords:
      'Paperboy online, play Paperboy online, Paperboy online free, Paperboy game online free, Paperboy N64',
  },
  'pok-mon-heartgold-version-nds-2009': {
    heading: 'Play Pokémon HeartGold Online',
    title: 'Play Pokémon HeartGold Online | Nintendo DS | POKOPIE',
    description:
      'Play Pokémon HeartGold online in your browser. Explore Johto, choose a starter, learn the Nintendo DS controls and check browser save guidance before playing.',
    keywords:
      'Pokémon HeartGold online, Pokemon HeartGold game online, Pokemon Heart Gold online, play HeartGold online',
  },
  'donkey-kong-nes-1983': {
    heading: 'Play Donkey Kong Online',
    title: 'Play Donkey Kong Online | Classic NES Game | POKOPIE',
    description:
      'Play Donkey Kong online in your browser. Climb ladders, dodge barrels, use hammers and learn the controls for Nintendo’s classic NES arcade game.',
    keywords:
      'Donkey Kong play online, Donkey Kong online, play Donkey Kong NES, classic Donkey Kong game',
  },
  'tekken-ps1-1995': {
    heading: 'Play Tekken Online',
    title: 'Play Tekken Online | PlayStation Fighting Game | POKOPIE',
    description:
      'Play Tekken online in your browser. Choose a fighter, learn the PlayStation controls, practice basic attacks and start a match without a separate download.',
    keywords:
      'Tekken online, play Tekken online, unblocked Tekken, Tekken PS1, PlayStation fighting game',
  },
  'commandos-dos-1998': {
    heading: 'Play Commandos: Behind Enemy Lines Online',
    title: 'Play Commandos: Behind Enemy Lines Online | POKOPIE',
    description:
      'Play Commandos: Behind Enemy Lines online. Lead six specialists through stealth missions, study patrols and coordinate each move in this 1998 tactics game.',
    keywords:
      'play Commandos Behind Enemy Lines online, Commandos online, Commandos 1998, real-time tactics game, Pyro Studios',
  },
  'the-king-of-fighters-97-arcade-1997': {
    heading: "Play The King of Fighters '97 Online",
    title: "The King of Fighters '97 Online | Arcade Fighting Game",
    description:
      "Play The King of Fighters '97 online in your browser. Choose a three-fighter team, learn the Advanced and Extra systems, and check the arcade controls before starting.",
    keywords:
      "The King of Fighters 97 online, play KOF 97, KOF 97 arcade, SNK fighting game",
  },
  'lilo-stitch-trouble-in-paradise-ps1-2002': {
    heading: "Play Disney's Lilo & Stitch: Trouble in Paradise Online",
    title: "Lilo & Stitch: Trouble in Paradise Online | PS1 Game",
    description:
      "Play Disney's Lilo & Stitch: Trouble in Paradise online. Switch between Lilo and Stitch, explore island levels, and check the PlayStation controls before starting.",
    keywords:
      "Lilo and Stitch Trouble in Paradise online, play Lilo and Stitch PS1, Disney PlayStation game",
  },
  'prince-of-persia-the-sands-of-time-java-2003': {
    heading: 'Play Prince of Persia: The Sands of Time Online',
    title: 'Prince of Persia: The Sands of Time Online | Java Game',
    description:
      'Play Prince of Persia: The Sands of Time online. Explore the Java mobile adaptation, avoid traps, fight guards and check the keyboard controls before starting.',
    keywords:
      'Prince of Persia Sands of Time Java online, play Prince of Persia mobile game, Java platform game',
  },
  'gals-panic-arcade': {
    heading: 'Play Gals Panic Online',
    title: 'Gals Panic Online - Arcade Area-Capture Game | POKOPIE',
    description: 'Play Gals Panic online. Learn the arcade area-capture rules, draw lines to enclose territory, avoid enemies and check the browser player controls before starting.',
    keywords: 'Gals Panic, Gals Panic online, Kaneko arcade, area capture game',
  },
  'three-wonders-arcade-1991': {
    heading: 'Play Three Wonders Online',
    title: 'Three Wonders Online - Midnight Wanderers & More | POKOPIE',
    description: 'Explore Three Wonders in your browser: Midnight Wanderers, Chariot and Don’t Pull. Read the arcade controls and choose an action, shooter or puzzle game.',
    keywords: 'Three Wonders online, Midnight Wanderers online, Chariot arcade, Don’t Pull puzzle, Capcom arcade',
  },
  'pipi-and-bibis-other-1991': {
    heading: 'Play Pipi and Bibis Online',
    title: 'Pipi and Bibis Online - Whoopee!! Arcade Game | POKOPIE',
    description: 'Play Pipi and Bibis, also known as Whoopee!!, in your browser. Learn the bomb-planting objective, Shredder Beam controls and escape strategy.',
    keywords: 'Pipi and Bibis online, Pipi & Bibi’s, Whoopee arcade, Toaplan arcade game',
  },
  [contraTargetSlug]: {
    heading: 'Play Contra Game Online Free',
    title: 'Play Contra Game Online Free | NES Classic | POKOPIE',
    description:
      'Play Contra game online free in your browser. Start the classic NES run-and-gun game with keyboard or controller support and no separate emulator download.',
    keywords:
      'play contra game online free, Contra online, play Contra online, Contra NES game, free browser games',
  },
  [geometryDashAdvanceTargetSlug]: {
    heading: 'Play Geometry Dash Advance Online',
    title: 'Geometry Dash Advance Online | Play the GBA Demake',
    description:
      'Play Geometry Dash Advance online, the community GBA demake also known as Geometry Dash GBA. Check browser controls, practice mode, levels and version details.',
    keywords:
      'Geometry Dash Advance, Geometry Dash Advance online, Geometry Dash GBA, Geometry Dash Game Boy Advance, GD Advance, play Geometry Dash Advance, GBA demake',
  },
  [murdokuTargetSlug]: {
    heading: 'Play Murdoku Online Free',
    title: 'Play Murdoku Online Free — Murder Mystery Sudoku',
    description:
      'Play Murdoku online free in your browser. Place suspects at the crime scene, solve the Sudoku-style murder mystery, and reveal the killer. No download.',
    keywords:
      'murdoku online, play Murdoku online, Murdoku game, murder mystery Sudoku, free browser puzzle game',
  },
  [onetMasterTargetSlug]: {
    heading: 'Play Onet Master Online Free',
    title: 'Play Onet Master Online Free — Tile Matching Puzzle',
    description:
      'Play Onet Master online free in your browser. Match identical tiles, connect pairs with up to two turns, and clear the board. No download required.',
    keywords:
      'Onet Master, Onet Master online, play Onet Master, tile matching game, pair connect puzzle',
  },
  [pokemonEmeraldTargetSlug]: {
    heading: 'Play Pokémon Emerald Online – Game Boy Advance',
    title: 'Play Pokémon Emerald Online | GBA | POKOPIE',
    description:
      'Play Pokémon Emerald online in your browser. Explore Hoenn, challenge its Gym Leaders, encounter legendary Pokémon, and reach the Battle Frontier.',
    keywords:
      'Pokemon Emerald online, play Pokémon Emerald, Pokémon Emerald GBA, Hoenn game, Battle Frontier',
  },
  'pokemon-ruby-gba-2002': {
    heading: 'Play Pokémon Ruby Online',
    title: 'Play Pokémon Ruby Online | GBA Adventure | POKOPIE',
    description:
      'Play Pokémon Ruby online in your browser. Explore Hoenn, choose Treecko, Torchic or Mudkip, earn Gym Badges and challenge Team Magma.',
    keywords:
      'Pokémon Ruby online, play Pokémon Ruby, Pokémon Ruby GBA, Hoenn Pokémon game, Team Magma',
  },
  'pokemon-leafgreen-game-boy-advance-2004': {
    heading: 'Play Pokémon LeafGreen Online',
    title: 'Play Pokémon LeafGreen Online | GBA Kanto Adventure',
    description:
      'Play Pokémon LeafGreen online in your browser. Explore Kanto, collect Gym Badges, complete the Pokédex and confront Team Rocket.',
    keywords:
      'Pokémon LeafGreen online, play Pokémon LeafGreen, Pokémon LeafGreen GBA, Kanto Pokémon game',
  },
  'fire-emblem-the-blazing-blade-gba-2003': {
    heading: 'Play Fire Emblem: The Blazing Blade Online',
    title: 'Fire Emblem: The Blazing Blade Online | GBA | POKOPIE',
    description:
      'Play Fire Emblem: The Blazing Blade online. Lead Lyn, Eliwood and Hector through tactical GBA battles across the continent of Elibe.',
    keywords:
      'Fire Emblem The Blazing Blade online, play Fire Emblem GBA, Lyn Eliwood Hector, tactical RPG',
  },
  'professor-layton-and-the-curious-village-nds-2007': {
    heading: 'Play Professor Layton and the Curious Village Online',
    title: 'Professor Layton and the Curious Village Online | POKOPIE',
    description:
      'Play Professor Layton and the Curious Village online. Explore St. Mystere, solve logic puzzles and investigate the mystery of the Golden Apple.',
    keywords:
      'Professor Layton and the Curious Village online, play Professor Layton online, St Mystere puzzles, Golden Apple',
  },
  'theme-hospital-dos-1997': {
    heading: 'Play Theme Hospital Online',
    title: 'Play Theme Hospital Online | DOS Management Game',
    description:
      'Play Theme Hospital online in your browser. Build treatment rooms, hire staff, manage queues and run Bullfrog’s classic hospital simulation.',
    keywords:
      'Theme Hospital online, play Theme Hospital, Theme Hospital DOS, Bullfrog hospital game, management simulation',
  },
  'pokemon-mystery-dungeon-red-rescue-team-game-boy-advance-2005': {
    heading: 'Play Pokémon Mystery Dungeon: Red Rescue Team Online',
    title: 'Pokémon Mystery Dungeon: Red Rescue Team Online | GBA',
    description:
      'Play Pokémon Mystery Dungeon: Red Rescue Team online. Form a rescue team, accept jobs and explore turn-based dungeons on Game Boy Advance.',
    keywords:
      'Pokémon Mystery Dungeon Red Rescue Team online, play Red Rescue Team, Pokémon Mystery Dungeon GBA, rescue team game',
  },
  'jin-yong-qun-xia-zhuan-dos-1996': {
    heading: 'Play Heroes of Jin Yong Online',
    title: 'Play Heroes of Jin Yong Online | DOS Wuxia RPG',
    description:
      'Play Heroes of Jin Yong online in your browser. Explore its open-ended wuxia world, recruit companions and search for fourteen legendary books.',
    keywords:
      'Heroes of Jin Yong online, play Heroes of Jin Yong, Jin Yong DOS game, wuxia RPG, 金庸群侠传',
  },
  'xuan-yuan-sword-dos-1990': {
    heading: 'Play Xuan-Yuan Sword Online',
    title: 'Play Xuan-Yuan Sword Online | 1990 DOS RPG',
    description:
      'Play the original Xuan-Yuan Sword online. Explore Softstar and DOMO Studio’s 1990 DOS RPG inspired by Chinese mythology and fantasy.',
    keywords:
      'Xuan-Yuan Sword online, play Xuan-Yuan Sword, Xuan-Yuan Sword DOS, Softstar RPG, Chinese mythology game',
  },
  'mario-and-luigi-superstar-saga-gba-2003': {
    heading: 'Play Mario & Luigi: Superstar Saga Online',
    title: 'Mario & Luigi: Superstar Saga Online | GBA RPG',
    description:
      'Play Mario & Luigi: Superstar Saga online. Explore the Beanbean Kingdom, solve Bros. puzzles and use timed attacks in this Game Boy Advance RPG.',
    keywords:
      'Mario and Luigi Superstar Saga online, play Superstar Saga, Beanbean Kingdom, Mario GBA RPG',
  },
  'dad-n-me-flash-2005': {
    heading: 'Play Dad ’n Me Online',
    title: 'Play Dad ’n Me Online | Classic Newgrounds Brawler',
    description:
      'Play Dad ’n Me online in your browser. Use light and heavy attacks, learn combos and fight through Tom Fulp and Dan Paladin’s Flash brawler.',
    keywords:
      'Dad n Me online, play Dad n Me, Newgrounds brawler, Tom Fulp game, Dan Paladin game',
  },
  'chobits-atashi-dake-no-hito-game-boy-advance-2002': {
    heading: 'Play Chobits: Atashi Dake no Hito Online',
    title: 'Chobits: Atashi Dake no Hito Online | GBA Game',
    description:
      'Play Chobits: Atashi Dake no Hito online. Explore the Japan-only GBA story game built around conversations and Chi’s training activities.',
    keywords:
      'Chobits Atashi Dake no Hito online, Chobits GBA game, play Chobits online, Japanese GBA adventure',
  },
  'labrador-and-his-friends-nintendo-ds-2009': {
    heading: 'Play Nintendogs: Labrador & Friends Online',
    title: 'Nintendogs: Labrador & Friends Online | Nintendo DS',
    description:
      'Play Nintendogs: Labrador & Friends online. Care for a puppy, teach tricks and learn which Nintendo DS touch and microphone features may vary in a browser.',
    keywords:
      'Nintendogs Labrador and Friends online, play Nintendogs online, Nintendo DS dog game, Labrador and Friends',
  },
  'ghost-chaser-densei-snes-1994': {
    heading: 'Play Ghost Chaser Densei Online',
    title: 'Play Ghost Chaser Densei Online | Super Famicom',
    description:
      'Play Ghost Chaser Densei online. Choose a fighter, learn special moves and battle through Winkysoft and Banpresto’s 1994 beat ’em up.',
    keywords:
      'Ghost Chaser Densei online, play Ghost Chaser Densei, Denjin Makai SNES, Super Famicom beat em up',
  },
  '1944-cn-nes-1988': {
    heading: 'Play 1944 — Unofficial 1943 ROM Hack',
    title: 'Play 1944 Online | Unofficial 1943 NES ROM Hack',
    description:
      'Play the unofficial 1944 NES ROM hack online. Learn how this modified version relates to Capcom’s 1943: The Battle of Midway before starting.',
    keywords:
      '1944 NES hack, 1943 ROM hack, play 1944 online, unofficial NES shooter, 1943 Battle of Midway',
  },
  'pokemon-team-rocket-game-boy-advance-2000': {
    heading: 'Play Pokémon Team Rocket — Unofficial ROM Hack',
    title: 'Pokémon Team Rocket Online | Unofficial GBA ROM Hack',
    description:
      'Play this unofficial Pokémon Team Rocket ROM hack online. Learn why its exact creator, base game and release year must be verified from the loaded version.',
    keywords:
      'Pokémon Team Rocket ROM hack, play Pokémon Team Rocket online, unofficial Pokémon GBA game, Team Rocket hack',
  },
  'light-and-darkness-crystal-conflict-nes-2003': {
    heading: 'Play Final Fantasy IV — Unlicensed NES Demake',
    title: 'Final Fantasy IV Online | Unlicensed NES Demake',
    description:
      'Play the unlicensed Final Fantasy IV NES demake online. Read how this Nanjing-attributed 8-bit adaptation differs from the official Square RPG.',
    keywords:
      'Final Fantasy IV NES demake, Conflict of Light and Dark Crystals, unlicensed Famicom RPG, Nanjing game',
  },
  'saiyuki-tang-sanzang-nes-1996': {
    heading: 'Play Zui You Ji: Tang Sanzang Online',
    title: 'Zui You Ji: Tang Sanzang | Unlicensed NES RPG',
    description:
      'Play Zui You Ji: Tang Sanzang online. Learn about this unlicensed Chinese-language Famicom RPG without confusing it with licensed Saiyuki games.',
    keywords:
      'Zui You Ji Tang Sanzang online, 最游记之唐三藏, unlicensed Chinese NES RPG, Nanjing Famicom game',
  },
  'chinese-paladin-dos-1995': {
    heading: 'Play The Legend of Sword and Fairy Online',
    title: 'The Legend of Sword and Fairy Online | 1995 DOS RPG',
    description:
      'Play the original Legend of Sword and Fairy online. Follow Li Xiaoyao through Softstar’s 1995 Chinese fantasy RPG and check the DOS gameplay guide.',
    keywords:
      'Legend of Sword and Fairy online, Chinese Paladin DOS, play 仙劍奇俠傳, Li Xiaoyao game, Softstar RPG',
  },
  'xuan-yuan-sword-ii-dos-1994': {
    heading: 'Play Xuan-Yuan Sword II Online',
    title: 'Play Xuan-Yuan Sword II Online | 1994 DOS RPG',
    description:
      'Play Xuan-Yuan Sword II online. Explore Softstar’s 1994 DOS RPG, learn its elemental techniques and use the Lianyao Pot to capture and combine creatures.',
    keywords:
      'Xuan-Yuan Sword II online, play Xuan-Yuan Sword 2, Softstar DOS RPG, Lianyao Pot, 軒轅劍貳',
  },
  'flame-dragon-knights-seal-of-the-evil-god-dos-1994': {
    heading: 'Play Flame Dragon Knights Online',
    title: 'Flame Dragon Knights Online | 1994 DOS Tactical RPG',
    description:
      'Play Flame Dragon Knights: Seal of the Evil God online. Plan movement, attack ranges and party development in Han Tang’s 1994 DOS tactical RPG.',
    keywords:
      'Flame Dragon Knights online, Seal of the Evil God, play 炎龍騎士團, DOS tactical RPG, Han Tang game',
  },
  'flame-dragon-knight-2-dos-1995': {
    heading: 'Play Flame Dragon Knights II Online',
    title: 'Flame Dragon Knights II Online | Golden Castle DOS RPG',
    description:
      'Play Flame Dragon Knights II: Legend of the Golden Castle online. Plan tactical battles and learn about its hidden items, shops and optional stages.',
    keywords:
      'Flame Dragon Knights II online, Legend of the Golden Castle, play 炎龍騎士團2, DOS tactical RPG',
  },
  'pokemon-firered-game-boy-advance-2004': {
    heading: 'Play Pokémon FireRed Online',
    title: 'Play Pokémon FireRed Online | GBA Kanto Adventure',
    description:
      'Play Pokémon FireRed online. Explore Kanto, choose a starter, collect eight Gym Badges and learn which original GBA link features may not work in a browser.',
    keywords:
      'Pokémon FireRed online, play Pokémon FireRed, Pokémon FireRed GBA, Kanto Pokémon game, FireRed browser game',
  },
  'maplestory-ds-nds-2010': {
    heading: 'Play MapleStory DS Online',
    title: 'Play MapleStory DS Online | Nintendo DS Action RPG',
    description:
      'Play MapleStory DS online. Follow four connected stories as a Warrior, Thief, Archer or Magician in Nexon and Nintendo’s standalone action RPG.',
    keywords:
      'MapleStory DS online, play MapleStory DS, Nintendo DS action RPG, MapleStory Warrior Thief Archer Magician',
  },
  'naruto-shippuden-ultimate-impact-psp-2011': {
    heading: 'Play Naruto Shippuden: Ultimate Ninja Impact Online',
    title: 'Naruto Shippuden: Ultimate Ninja Impact Online | PSP',
    description:
      'Play Naruto Shippuden: Ultimate Ninja Impact online. Fight large enemy groups, complete story missions and learn how the original PSP ad hoc co-op differs.',
    keywords:
      'Naruto Shippuden Ultimate Ninja Impact online, play Ultimate Ninja Impact, Naruto PSP game, CyberConnect2 Naruto',
  },
  'initial-d-another-stage-cn-gba-2002': {
    heading: 'Play Initial D: Another Stage — Chinese Translation',
    title: 'Initial D: Another Stage Online | Chinese GBA Translation',
    description:
      'Play the Chinese translation of Initial D: Another Stage online. Explore Sammy’s 2002 GBA racing RPG and its command-based mountain-pass battles.',
    keywords:
      'Initial D Another Stage online, Initial D GBA Chinese translation, play Initial D GBA, racing RPG',
  },
  '1942-cn-nes-1985': {
    heading: 'Play 1942 — Chinese NES Translation',
    title: 'Play 1942 Online | Chinese NES Translation',
    description: 'Play the Chinese translation of Capcom’s 1942 NES shooter online. Learn the controls, evasive loop and survival basics before starting.',
    keywords: '1942 NES online, 1942 Chinese translation, play 1942 online, Capcom vertical shooter',
  },
  '1943-the-battle-of-midway-cn-nes-1988': {
    heading: 'Play 1943: The Battle of Midway — Chinese Translation',
    title: '1943: The Battle of Midway Online | Chinese NES Translation',
    description: 'Play the Chinese translation of Capcom’s 1943 NES game online. Manage aircraft energy, collect upgrades and learn how it differs from the arcade version.',
    keywords: '1943 Battle of Midway online, 1943 NES Chinese translation, Capcom shooter, NES aircraft upgrades',
  },
  'double-dragon-ii-revenge-nes-1989': {
    heading: 'Play Double Dragon II — Chinese NES Translation',
    title: 'Double Dragon II Online | Chinese NES Translation',
    description: 'Play the Chinese translation of Double Dragon II: The Revenge online. Learn its direction-based attacks, movement and NES-specific stages.',
    keywords: 'Double Dragon II online, Double Dragon 2 Chinese translation, NES beat em up, Technos Japan',
  },
  'saint-seiya-ougon-densetsu-kanketsu-hen-cn-nes-1988': {
    heading: 'Play Saint Seiya: Ougon Densetsu Kanketsu Hen',
    title: 'Saint Seiya Kanketsu Hen Online | Chinese NES Translation',
    description: 'Play the Chinese translation of Saint Seiya: Ougon Densetsu Kanketsu Hen. Battle through the Twelve Houses in TOSE and Bandai’s 1988 action RPG.',
    keywords: 'Saint Seiya Kanketsu Hen online, Saint Seiya NES Chinese translation, Ougon Densetsu, Twelve Houses game',
  },
  'satomi-hakkenden-cn-nes-1989': {
    heading: 'Play Satomi Hakkenden — Chinese NES Translation',
    title: 'Satomi Hakkenden Online | Chinese NES RPG Translation',
    description: 'Play the Chinese translation of Satomi Hakkenden online. Explore Alpha Denshi and SNK’s 1989 Famicom RPG based on the Japanese epic.',
    keywords: 'Satomi Hakkenden online, Chinese NES translation, Alpha Denshi RPG, SNK Famicom game',
  },
  'richman-2-dos-1993': {
    heading: 'Play Richman 2 Online',
    title: 'Play Richman 2 Online | 1993 DOS Board Game',
    description: 'Play Softstar’s Richman 2 in your browser. Roll the dice, buy properties and save cash for tolls and random events. Check the DOS controls before playing.',
    keywords: 'Richman 2 online, play Richman 2, 大富翁2, Softstar DOS board game, property game',
  },
  'rich-man-3-dos-1996': {
    heading: 'Play Richman 3 Online',
    title: 'Play Richman 3 Online | 1996 DOS Board Game',
    description: 'Play Softstar’s Richman 3 in your browser. Upgrade properties, time your card plays and keep cash for unexpected tolls. Check the DOS controls before you start.',
    keywords: 'Richman 3 online, play Richman 3, 大富翁3, Softstar DOS game, property board game',
  },
  'romance-of-the-three-kingdoms-iv-dos-1994': {
    heading: 'Play Romance of the Three Kingdoms IV Online',
    title: 'Romance of the Three Kingdoms IV Online | DOS Strategy',
    description: 'Play Romance of the Three Kingdoms IV: Wall of Fire online. Govern cities, manage officers, conduct diplomacy and command tactical battles.',
    keywords: 'Romance of the Three Kingdoms IV online, Wall of Fire DOS, play RTK 4, Koei strategy game',
  },
  'san-guo-qun-ying-zhuan-2-html5-1998': {
    heading: 'Play Heroes of the Three Kingdoms 2 Online',
    title: 'Heroes of the Three Kingdoms 2 Online | 1999 Strategy Game',
    description: 'Play Heroes of the Three Kingdoms 2 online. Manage cities and generals, build armies and command Odin Soft’s large real-time battles.',
    keywords: 'Heroes of the Three Kingdoms 2 online, 三國群英傳2, Odin Soft strategy game, Three Kingdoms browser game',
  },
  'sanguosha-html5-2011': {
    heading: 'Play Sanguosha Online in Your Browser',
    title: 'Play Sanguosha Online | Three Kingdoms Card Game',
    description: 'Play a browser version of Sanguosha. Learn the hidden roles, character abilities and card timing, and verify which rules this HTML5 build includes.',
    keywords: 'Sanguosha online, play Sanguosha, 三国杀 browser game, Three Kingdoms card game, hidden role game',
  },
  'the-killing-blade-arcade-1998': {
    heading: 'Play The Killing Blade Online',
    title: 'Play The Killing Blade Online | IGS Arcade Fighting Game',
    description: 'Play The Killing Blade online. Choose a fighter, learn spacing and special moves, and check the browser controls for IGS’s 1998 PGM arcade game.',
    keywords: 'The Killing Blade online, play Killing Blade, IGS fighting game, PGM arcade game',
  },
  'the-legend-of-sword-and-saber-arcade-2003': {
    heading: 'Play The Gladiator Online',
    title: 'Play The Gladiator Online | IGS PGM Arcade Beat ’Em Up',
    description: 'Play The Gladiator: Road of the Sword online. Choose a martial-arts fighter and battle through IGS’s 2003 PGM scrolling action game.',
    keywords: 'The Gladiator arcade online, Road of the Sword, IGS beat em up, PGM arcade game',
  },
  'metal-gear-2030-cn-gbc': {
    heading: 'Play Metal Gear 2030 — Unofficial Chinese GBC Version',
    title: 'Metal Gear 2030 Online | Unofficial Chinese GBC Game',
    description: 'Play the unofficial Chinese GBC game listed as Metal Gear 2030. Check its title screen and version before using a Metal Gear Solid or Ghost Babel guide.',
    keywords: 'Metal Gear 2030 online, Chinese Metal Gear GBC, unofficial Game Boy Color game, Ghost Babel translation',
  },
  'xian-jian-qi-xia-zhuan-gba-2001': {
    heading: 'Play The Legend of Sword and Fairy — Unofficial GBA Port',
    title: 'Legend of Sword and Fairy Online | Unofficial GBA Port',
    description: 'Play the unofficial GBA port of The Legend of Sword and Fairy. Learn how this fan adaptation differs from Softstar’s official DOS RPG.',
    keywords: 'Legend of Sword and Fairy GBA, unofficial 仙劍奇俠傳 port, Chinese GBA RPG, Li Xiaoyao game',
  },
  'naruto-rpg-gba-2003': {
    heading: 'Play Naruto RPG: Uketsugareshi Hi no Ishi Online',
    title: 'Naruto RPG Online | Chinese GBA Translation V3',
    description: 'Play the Chinese V3 translation of Naruto RPG: Uketsugareshi Hi no Ishi, TOSE’s 2004 GBA role-playing game with turn-based ninja battles.',
    keywords: 'Naruto RPG GBA online, Uketsugareshi Hi no Ishi, Chinese Naruto translation, Naruto turn based RPG',
  },
  'yan-loong-story-flash-2008': {
    heading: 'Play Yan Loong Legend Online',
    title: 'Play Yan Loong Legend Online | Creetor Flash Game',
    description: 'Play Yan Loong Legend online. Fight through side-scrolling stages, build combos, gain experience and learn qigong skills in Creetor’s Flash action RPG.',
    keywords: 'Yan Loong Legend online, play Yan Loong Legend, Creetor Flash game, side scrolling action RPG',
  },
  'yanlong-chuanshuo-2-erdu-chongji-flash-2009': {
    heading: 'Play Yan Loong Legend 2: 2nd Impact Online',
    title: 'Yan Loong Legend 2: 2nd Impact Online | Flash Game',
    description: 'Play Yan Loong Legend 2: 2nd Impact online. Build combos, level up and allocate ability points in Creetor’s side-scrolling Flash action game.',
    keywords: 'Yan Loong Legend 2 2nd Impact online, play Yan Loong Legend 2, Creetor Flash game, ability points',
  },
  'yanlong-chuanshuo-2-shuang-long-flash-2009': {
    heading: 'Play Yan Loong Legend 2: The Double Dragon Online',
    title: 'Yan Loong Legend 2: The Double Dragon Online | Co-op',
    description: 'Play Yan Loong Legend 2: The Double Dragon online. Use local two-player controls to fight through Creetor’s combo-driven Flash adventure together.',
    keywords: 'Yan Loong Legend 2 Double Dragon online, Yan Loong Legend co-op, two player Flash game, Creetor',
  },
  'yanlong-chuanshuo-3-chifeng-flash-2010': {
    heading: 'Play Yan Loong Legend 3: Phenix Online',
    title: 'Yan Loong Legend 3: Phenix Online | Flash Action Game',
    description: 'Play Yan Loong Legend 3: Phenix online. Try the Phenix character, power burst, vertical stages and expanded combat in Creetor’s Flash series.',
    keywords: 'Yan Loong Legend 3 Phenix online, play Yan Loong Legend 3, Creetor Flash game, Phenix character',
  },
  'yanlong-chuanshuo-3-shuang-yan-flash-2009': {
    heading: 'Play Yan Loong Legend 3: Double Swallow Online',
    title: 'Yan Loong Legend 3: Double Swallow Online | Flash Game',
    description: 'Play Yan Loong Legend 3: Double Swallow online. Use Pink Swallow, equipment and new super combos in this expanded Creetor Flash action game.',
    keywords: 'Yan Loong Legend 3 Double Swallow online, Pink Swallow, Creetor Flash game, Yan Loong Legend equipment',
  },
  'jin-yong-heroes-2-enhanced-flash-2006': {
    heading: 'Play Heroes of Jin Yong 2 — Enhanced Edition Online',
    title: 'Heroes of Jin Yong 2 Enhanced Edition Online | Flash RPG',
    description: 'Play Heroes of Jin Yong 2 Enhanced Edition online. Explore Guo Lei’s unofficial martial-arts Flash RPG, train skills and choose a faction route.',
    keywords: 'Heroes of Jin Yong 2 online, 金庸群侠传2加强版, Half a Bottle of Vinegar, Chinese Flash RPG',
  },
  'jin-yong-heroes-3-flash-2009': {
    heading: 'Play Heroes of Jin Yong 3 Online',
    title: 'Play Heroes of Jin Yong 3 Online | 2009 Flash RPG',
    description: 'Play Heroes of Jin Yong 3 online. Create a martial artist, join a school, train meridians and recruit companions in Guo Lei’s 2009 Flash RPG.',
    keywords: 'Heroes of Jin Yong 3 online, 金庸群侠传3, Chinese Flash RPG, Half a Bottle of Vinegar',
  },
  'magic-tower-flash-2000': {
    heading: 'Play Magic Tower 1.1 Online',
    title: 'Play Magic Tower 1.1 Online | 24-Floor Flash RPG',
    description: 'Play Magic Tower 1.1 online. Plan battles, preserve keys and manage fixed resources in Fat Mouse Studio’s expanded Chinese Flash strategy RPG.',
    keywords: 'Magic Tower 1.1 online, 24 floor Magic Tower, 胖老鼠魔塔, Chinese Flash strategy RPG',
  },
  'mahjong-academy-arcade-1989': {
    heading: 'Play Mahjong Academy Online',
    title: 'Play Mahjong Academy Online | Japanese Arcade Mahjong',
    description: 'Play Mahjong Academy online with arcade controls. Learn the basic riichi mahjong flow and check the title screen to identify the exact series entry.',
    keywords: 'Mahjong Academy online, Mahjong Gakuen arcade, Japanese riichi mahjong game, arcade mahjong',
  },
  'doudizhu-html5-2013': {
    heading: 'Play Dou Dizhu Online',
    title: 'Play Dou Dizhu Online | Fight the Landlord Card Game',
    description: 'Play Dou Dizhu online. Bid for the landlord role, combine cards and race to empty your hand in the classic three-player Chinese climbing game.',
    keywords: 'Dou Dizhu online, Fight the Landlord online, 斗地主 browser game, Chinese climbing card game',
  },
  'doudizhu-gcoin-html5-2013': {
    heading: 'Play Dou Dizhu — GCoin Edition Online',
    title: 'Dou Dizhu GCoin Edition Online | Fight the Landlord',
    description: 'Play the GCoin Edition of Dou Dizhu online. Bid, form legal card combinations and compete as the landlord or one of the two farmers.',
    keywords: 'Dou Dizhu GCoin online, Fight the Landlord browser game, 斗地主 GCoin, Chinese card game',
  },
  'hong-kong-mahjong-html5': {
    heading: 'Play Hong Kong Mahjong Online',
    title: 'Play Hong Kong Mahjong Online | Browser Tile Game',
    description: 'Play Hong Kong Mahjong online. Learn the draw-and-discard flow, build four groups and a pair, and check the browser game’s fan requirements.',
    keywords: 'Hong Kong Mahjong online, Cantonese mahjong game, play mahjong online, fan scoring',
  },
  'sichuan-mahjong-html5': {
    heading: 'Play Sichuan Mahjong: Xue Zhan Dao Di Online',
    title: 'Sichuan Mahjong Online | Xue Zhan Dao Di Rules',
    description: 'Play Sichuan Mahjong online. Clear a missing suit, learn the no-chow rule and continue after the first win in Xue Zhan Dao Di mode.',
    keywords: 'Sichuan Mahjong online, Xue Zhan Dao Di, blood battle mahjong, missing suit mahjong',
  },
  'taiwan-mahjong-16-tile-html5': {
    heading: 'Play Taiwanese Mahjong — 16 Tiles Online',
    title: 'Play Taiwanese Mahjong Online | 16-Tile Browser Game',
    description: 'Play Taiwanese 16-tile Mahjong online. Build five groups and a pair, learn the 17-tile winning structure and check the game’s tai scoring.',
    keywords: 'Taiwanese Mahjong online, 16 tile mahjong, Taiwan mahjong browser game, tai scoring',
  },
  'chinese-mahjong-html5': {
    heading: 'Play Chinese Mahjong Online',
    title: 'Play Chinese Mahjong Online | Browser Tile Game',
    description: 'Play Chinese Mahjong online. Learn the draw-and-discard flow, build four groups and a pair, and check which scoring rules the HTML5 game uses.',
    keywords: 'Chinese Mahjong online, play mahjong in browser, Chinese tile game, Mahjong Competition Rules',
  },
  'ra2web-html5-2026': {
    heading: 'Play RA2WEB in Your Browser',
    title: 'RA2WEB Online | Unofficial Browser Strategy Project',
    description: 'Open RA2WEB in your browser and check the setup requirements for this unofficial Red Alert 2-inspired project, including original game-file import.',
    keywords: 'RA2WEB online, Red Alert 2 browser project, unofficial RA2 web game, browser real time strategy',
  },
  [shonenJumpOnePieceTargetSlug]: {
    heading: "Play Shonen Jump's One Piece Online",
    title: 'Play One Piece Online - Shonen Jump GBA Game | POKOPIE',
    description:
      "Play Shonen Jump's One Piece online in your browser. Guide Luffy through the 2005 GBA action game with keyboard or controller support and no download.",
    keywords:
      "play One Piece online, Shonen Jump's One Piece, One Piece GBA game, Luffy game online, anime action game",
  },
  [taikoWebTargetSlug]: {
    heading: 'Play Taiko Web Online',
    title: 'Taiko Web - Play Taiko no Tatsujin Online | POKOPIE',
    description:
      'Play Taiko Web online free in your browser. Hit red and blue drum notes to the beat, choose songs and difficulties, and check the keyboard controls before starting.',
    keywords:
      'Taiko Web, Taiko Web online, play Taiko Web, Taiko no Tatsujin online, browser rhythm game',
  },
} as const

const localizedTaikoSeo = {
  'zh-CN': {
    heading: '太鼓 Web 在线玩',
    title: '太鼓 Web 在线玩｜太鼓达人网页版与按键说明｜POKOPIE',
    description: '在浏览器中游玩太鼓 Web（Taiko Web）。先选曲和难度，等音符到达判定线时，用 F/J 敲红色鼓面、D/K 敲蓝色鼓边。页面也说明如何切换曲目分类，以及无声、节拍不同步或按键没反应时该检查哪些设置。',
    keywords: '太鼓web，太鼓 Web 在线玩，太鼓达人网页版，Taiko Web，太鼓按键说明',
  },
  ja: {
    heading: '太鼓ウェブ（Taiko Web）をオンラインで遊ぶ',
    title: '太鼓ウェブ（Taiko Web）｜遊び方・操作方法｜POKOPIE',
    description: '太鼓ウェブ（Taiko Web）をブラウザーで遊ぼう。曲と難易度を選び、判定枠に合わせて赤い音符は F/J で面、青い音符は D/K で縁を打ちます。曲カテゴリの切り替え方や、音が出ないとき、音と譜面がずれるとき、キーが反応しないときの確認手順も紹介します。',
    keywords: '太鼓ウェブ, Taiko Web, 太鼓web, 太鼓ウェブ 遊び方, 太鼓ウェブ 操作方法',
  },
} as const

export function getGameSeoRouteIds() {
  return [
    ...Object.keys(searchOnlyGameSeoBySlug),
    ...Object.keys(targetedGameSeoBySlug),
    murdokuTargetSlug,
    'san-guo-qun-ying-zhuan-2-html5-1998',
    taikoWebTargetSlug,
  ]
}

export function getTargetedGameSeo(game: PublicGame, locale: Locale) {
  if (locale !== 'en') {
    if (locale === 'zh-CN' && normalizeGameSlug(game) === 'san-guo-qun-ying-zhuan-2-html5-1998') {
      return {
        heading: '三国群英传 2 在线玩',
        title: '三国群英传 2 在线玩｜网页版玩法与存档说明｜POKOPIE',
        description: '在浏览器中游玩《三国群英传 2》。先查看己方城池、武将和兵力，留足守军再安排部队出征；交战时观察兵种和阵形，选择使用武将技的时机。页面提供网页版入口、内政与行军说明，以及刷新页面前需要确认的存档事项。',
        keywords: '三国群英传2，三国群英传 2 在线玩，三国群英传2网页版，三國群英傳 II，三国策略游戏',
      }
    }
    if (normalizeGameSlug(game) === taikoWebTargetSlug && (locale === 'zh-CN' || locale === 'ja')) {
      return localizedTaikoSeo[locale]
    }
    return null
  }

  const slug = normalizeGameSlug(game)
  return targetedGameSeoBySlug[slug as keyof typeof targetedGameSeoBySlug] ?? null
}

const reviewedChineseMetaDescriptions: Partial<Record<string, string>> = {
  'double-dragon-ii-revenge-nes-1989': '在浏览器中游玩红白机《双截龙 II：复仇》。穿过横版关卡，练习左右攻击和跳跃招式，可先查看本页的按键、版本与设备说明。',
  'donkey-kong-nes-1983': '在浏览器中游玩红白机《大金刚》。操控马里奥攀爬梯子、跳过滚桶，向宝琳所在的平台前进。启动前可查看 NES 版本与街机原版的区别及按键说明。',
  'jackal-nes-1988': '红白机《赤色要塞》在线玩。驾驶吉普车深入敌方基地，用机枪和手榴弹开路，把救出的战俘送到撤离点。打开浏览器播放器前可先查看移动和攻击按键。',
  'life-force-nes-1988': '在浏览器中游玩红白机《沙罗曼蛇》（Life Force）。驾驶战机穿越横向和纵向卷轴关卡，拾取强化道具并挑战首领。页面提供版本介绍、操作说明与游玩入口。',
  'battle-city-nes-1985': '在浏览器中游玩红白机《坦克大战》（Battle City）。驾驶坦克穿过砖墙和障碍，拦截敌方坦克并保护基地。可先查看方向和射击按键，再进入游戏。',
  'super-mario-bros-nes-1985': '在浏览器中重温红白机《超级马里奥兄弟》。操控马里奥穿过水管、砖块和城堡，跳过敌人、收集金币和强化道具。从第一关开始练习跑动和起跳，遇到较宽的缺口时尝试助跑。页面提供按键、设备兼容说明和游玩入口。',
  'super-mario-64-n64-1996': '在浏览器中体验 N64《超级马里奥 64》。从城堡进入画中世界，探索 3D 关卡并收集力量之星。先查看模拟摇杆、镜头操作和设备兼容说明，再启动游戏。',
  'new-super-mario-bros-nds-2006': '在浏览器中游玩 NDS《新超级马里奥兄弟》。在横版关卡中踩踏敌人、寻找星星金币，使用巨大蘑菇等道具。启动前可查看按键和设备支持说明。',
  'pokemon-emerald-gba-2004': '在浏览器中体验 GBA《宝可梦 绿宝石》。从未白镇出发，捕捉并培养伙伴，挑战丰缘道馆，后期可前往对战开拓区。游玩前可在详情页核对游戏语言、键盘操作和存档方式，再打开网页播放器。',
  'pokemon-ruby-gba-2002': '在浏览器中体验 GBA《宝可梦 红宝石》。探索丰缘地区，捕捉并培养伙伴，挑战道馆并阻止熔岩队。进入游戏前可查看按键和存档提示。',
  'pokemon-leafgreen-game-boy-advance-2004': '在浏览器中体验 GBA《宝可梦 叶绿》。从真新镇出发，捕捉并培养伙伴、挑战关都道馆。页面介绍《叶绿》与《火红》的版本区别，以及浏览器操作和存档注意事项。',
  'theme-hospital-dos-1997': '在浏览器里体验 Bullfrog 的 DOS 经营游戏《主题医院》。规划诊室、雇用员工、治疗虚构怪病，并维持医院收支。查看本页的鼠标操作与设备兼容提示后开始游戏。',
  'commandos-dos-1998': '在浏览器中体验 DOS《盟军敢死队：深入敌后》。利用小队成员各自的技能规划潜入路线，避开巡逻和视野范围。页面提供玩法、操作说明与游玩入口。',
  'three-wonders-arcade-1991': '在浏览器中游玩 Capcom 街机合集《三个奇迹》。从横版动作、飞行射击和推块解谜三种玩法中选一款，先看本页的选模式、投币和按键说明。',
  'the-king-of-fighters-97-arcade-1997': '《拳皇 97》街机版在线玩。挑选三名角色、安排出场顺序，在 Advanced 和 Extra 两种模式中选择适合自己的移动与能量机制。页面说明投币、开始和对战按键，也可在进入播放器前核对设备支持。',
  'contra-nes-1988': '在浏览器中游玩红白机《魂斗罗》。从丛林关卡出发，在横版战斗里边走边射击、拾取武器，再闯过视角不同的基地关卡。页面介绍方向、跳跃和射击按键，也列出双人游玩前应确认的操作设置。',
  'pokemon-firered-game-boy-advance-2004': '在浏览器中体验 GBA《宝可梦 火红》。从真新镇挑选初始伙伴，在关都挑战八座道馆并对抗火箭队，之后还可探索七之岛。页面介绍版本特色、网页按键和存档注意事项，方便开始前核对。',
  'super-mario-bros-the-lost-levels-enhanced-snes-1993': '挑战《超级马里奥兄弟：失落的关卡》的 SNES 增强版。关卡包含毒蘑菇、隐藏砖块、强风和要求精确起跳的地形。页面说明增强版与日本原版的区别，提供跑动、跳跃等操作提示，以及浏览器游玩入口。',
}

const reviewedTraditionalChineseMetaDescriptions: Partial<Record<string, string>> = {
  'contra-nes-1988': '在瀏覽器玩紅白機《魂斗羅》。一邊跳躍一邊射擊，穿越叢林與敵方基地，沿途撿拾武器道具。開玩前可查看移動、跳躍、射擊和雙人操作的按鍵說明。',
  'double-dragon-ii-revenge-nes-1989': '在瀏覽器玩紅白機《雙截龍 II：復仇》。闖過橫向捲軸關卡，熟悉向左、向右攻擊和跳躍招式。遊戲頁提供版本、按鍵和裝置相容資訊。',
  'donkey-kong-nes-1983': '在瀏覽器玩紅白機《大金剛》。操控瑪利歐爬梯子、跳過滾桶，往寶琳所在的平台前進。可先查看紅白機版與街機原版的關卡差異及操作方式。',
  'jackal-nes-1988': '紅白機《赤色要塞》線上玩。駕駛吉普車深入敵方基地，用機槍和手榴彈開路，救出戰俘後送往撤離點。進入遊戲前可先看移動和攻擊的按鍵。',
  'life-force-nes-1988': '在瀏覽器玩紅白機《沙羅曼蛇》（Life Force）。駕駛戰機穿越橫向與直向捲軸關卡，收集強化道具、挑戰頭目。頁面提供版本介紹、按鍵說明與遊玩入口。',
  'battle-city-nes-1985': '在瀏覽器玩紅白機《坦克大戰》（Battle City）。駕駛坦克穿過磚牆和障礙，攔截敵方坦克並守住基地。開玩前可先查看方向和射擊的按鍵。',
  'super-mario-bros-nes-1985': '在瀏覽器重溫紅白機《超級瑪利歐兄弟》。穿越水管、磚塊和城堡，跳過敵人並收集道具。先看跑步和跳躍的按鍵，再從遊戲頁啟動。',
  'super-mario-bros-the-lost-levels-enhanced-snes-1993': '挑戰《超級瑪利歐兄弟：失落的關卡》的超級任天堂強化版。留意毒蘑菇、隱藏磚塊和需要精準起跳的地形，開玩前可先查閱版本差異和操作說明。',
  'super-mario-64-n64-1996': '在瀏覽器體驗 N64《超級瑪利歐 64》。從城堡進入畫中世界，探索 3D 關卡並收集力量之星。啟動前可先查看類比搖桿、鏡頭控制和裝置相容性。',
  'new-super-mario-bros-nds-2006': '在瀏覽器玩 NDS《新超級瑪利歐兄弟》。在橫向捲軸關卡尋找星星金幣，使用巨大蘑菇等道具突破障礙。遊戲頁提供操作和裝置相容資訊。',
  'the-king-of-fighters-97-arcade-1997': '《拳皇 97》街機版線上玩。挑選三名角色組隊，安排出場順序並練習必殺技。遊戲頁提供瀏覽器入口、投幣及開始按鍵，以及裝置相容資訊。',
  'pokemon-emerald-gba-2004': '在瀏覽器體驗 GBA《寶可夢 綠寶石》。從未白鎮出發，探索豐緣地區、培育隊伍並挑戰道館。開玩前可查看按鍵和瀏覽器存檔注意事項。',
  'pokemon-ruby-gba-2002': '在瀏覽器體驗 GBA《寶可夢 紅寶石》。探索豐緣地區、捕捉並培育夥伴，挑戰道館並阻止熔岩隊。遊戲頁提供按鍵說明和存檔提醒。',
  'pokemon-leafgreen-game-boy-advance-2004': '在瀏覽器體驗 GBA《寶可夢 葉綠》。從真新鎮出發，組隊挑戰關都道館。頁面說明《葉綠》和《火紅》的版本差異，也提供操作和存檔提示。',
  'pokemon-firered-game-boy-advance-2004': '在瀏覽器體驗 GBA《寶可夢 火紅》。從真新鎮挑選初始夥伴，收集八枚道館徽章並對抗火箭隊。頁面提供瀏覽器遊玩入口、按鍵和存檔資訊。',
  'theme-hospital-dos-1997': '在瀏覽器體驗 Bullfrog 的 DOS 經營遊戲《主題醫院》。規劃診間、聘僱員工、治療虛構怪病並維持收支。開始前可先查看滑鼠操作及相容性提示。',
  'commandos-dos-1998': '在瀏覽器體驗 DOS《盟軍敢死隊：深入敵後》。運用隊員各自的技能規劃潛入路線，避開巡邏與敵人視線。遊戲頁提供玩法、操作說明和遊玩入口。',
  'three-wonders-arcade-1991': '在瀏覽器玩 Capcom 街機合集《三個奇蹟》。選擇橫向捲軸動作、飛行射擊或推方塊益智遊戲。開玩前可先查看模式選擇、投幣和操作按鍵。',
}

const reviewedGameMetaDescriptions: Partial<Record<Locale, Partial<Record<string, string>>>> = {
  fr: {
    'onet-master-html5': 'Reliez deux images identiques dans Onet Master. Le chemin doit rester libre et ne faire que deux virages au maximum. Libérez les cases pour ouvrir de nouvelles paires.',
  },
  en: {
    'crash-bandicoot-ps1-1996': 'Explore the original 1996 PlayStation Crash Bandicoot. Time your jumps, spin past enemies and collect Wumpa fruit as you work through the platforming stages.',
    'the-king-of-fighters-2002-arcade-2002': 'Explore the original arcade King of Fighters 2002. Build a three-fighter team, choose its order and learn how MAX mode uses a stock from your power gauge.',
    'super-mario-bros-nes-1985': 'Play the original NES Super Mario Bros. in your browser. Run and jump past enemies, collect power-ups and cross the gap to the flagpole. Check controls first.',
    'battle-city-nes-1985': 'Play Namco’s NES Battle City online. Drive through breakable brick walls, stop waves of enemy tanks and protect the eagle base. Check movement and fire controls.',
    'rhythm-tengoku-japan-gba-2006': 'Play the Japanese GBA release of Rhythm Tengoku in your browser. Practice each short rhythm game, listen for the beat and check the A and B button mappings.',
    'rhythm-heaven-nds-2008': 'Play Rhythm Heaven for Nintendo DS in your browser. Practice each music game, follow the audio cues and check how the player maps taps and flicks.',
    'space-is-key-flash-2011': 'Play Space Is Key, Chris Jeff’s one-button Flash platformer. Press Space to jump as the block moves automatically and time each jump to clear the obstacles.',
    'xiangqi-traveler-html5-2026': 'Try the browser demo of Xiangqi Traveler. Review how the Chinese chess pieces move, plan each turn around threats to your general, and check the controls before playing.',
  },
  'zh-CN': {
    'the-killing-blade-arcade-1998': '了解鈊象电子的 PGM 街机格斗游戏《傲剑狂刀》。选定角色后，先熟悉武器的攻击距离和招式收招时机，再尝试连招。打开播放器前可以核对浏览器里的投币、开始和攻击按键。',
    'initial-d-ps1-1998': '了解初代 PlayStation《头文字 D》的山路竞速玩法与版本信息。在 POKOPIE 查看 PS1 版的游戏介绍、操作提示，以及当前设备的兼容信息。开始前先核对该版本的浏览器游玩状态，避免与其他平台或街机版本混淆。',
    'geometry-dash-advance-gba-2025': '在浏览器中体验 GBA 版 Geometry Dash Advance。跟随节奏跳过尖刺和障碍，先确认跳跃按键，再试用练习模式。页面说明如何开始、核对关卡版本及排查输入问题。',
    'gals-panic-arcade': '在浏览器中游玩街机 Gals Panic，利用移动和画线逐步围出区域，同时避开敌人对角色与未完成线路的干扰。先阅读页面中的玩法介绍，了解区域占领的基本规则，再核对方向、动作、投币与开始按键，确认设备支持后打开浏览器播放器。',
    'paperboy-n64-1999': '体验 Nintendo 64 版《送报童》，骑车沿路向住户投递报纸，在行进中避开车辆和道路障碍。页面提供 N64 版本介绍与浏览器游玩入口，帮助你在开始前核对方向控制、投报按键和设备兼容性，区分这一版本与其他平台上的同名作品。',
    'tekken-ps1-1995': '在浏览器中游玩初代 PlayStation 版《铁拳》。选择角色进行一对一格斗，练习移动、防守和不同拳脚按键。详情页提供版本与设备兼容提示。',
    'pok-mon-heartgold-version-nds-2009': '在浏览器中体验 NDS《宝可梦 心金》。从城都启程，捕捉和培养伙伴、挑战道馆。打开播放器前可先核对按键、设备兼容性与存档方式。',
    'pipi-and-bibis-other-1991': '在浏览器中游玩 Toaplan 街机游戏 Pipi and Bibis（Whoopee!!）。在楼层间移动，布置炸弹并及时逃离，留意敌人的巡逻路线和可用道具。',
    'crash-bandicoot-2-cortex-strikes-back-ps1-1997': '在浏览器中游玩 PS1《古惑狼 2》。穿过传送房间通往各个关卡，用跳跃和旋转躲避敌人、收集水晶。开始前可查看按键和设备支持。',
    'harry-potter-and-the-philosopher-s-stone-ps1-2001': '在浏览器中体验 PS1《哈利·波特与魔法石》。探索霍格沃茨，学习咒语并完成挑战。详情页提供 PlayStation 版本信息、操作和游玩入口。',
    'tenchu-2-birth-of-the-stealth-assassins-ps1-2000': '在浏览器中体验 PS1《天诛 2》。观察敌人的巡逻与视线，利用屋顶和隐蔽路线完成潜行关卡。启动前可核对移动、道具和镜头操作。',
    'rhythm-tengoku-japan-gba-2006': '在浏览器中游玩日本发售的 GBA《节奏天国》。先完成每个音乐小游戏的练习，听清节拍再按键。页面提供日文版本信息与浏览器操作提示。',
    'rhythm-heaven-nds-2008': '在浏览器中游玩 NDS《节奏天国》。先练习触屏动作，再跟随音乐提示在正确时机点击或滑动。启动前可确认播放器如何映射触屏输入。',
    'onet-master-html5': '打开网页版 Onet Master 连连看。选中两块相同图案，最多转两次弯将它们连起来。优先清理边缘的对子，为中间的图块腾出连接路线。',
    'space-is-key-flash-2011': '在浏览器中游玩一键平台游戏 Space Is Key。方块会自动前进，用空格键把握起跳时机，逐段越过障碍。详情页提供 Flash 版本信息和操作提示。',
    'romance-of-the-three-kingdoms-iv-dos-1994': '在浏览器中体验光荣的 DOS 策略游戏《三国志 IV》。选择君主，安排城池内政、武将任命和外交，再组织部队出征。开玩前可检查操作与存档方式。',
    'lilo-stitch-trouble-in-paradise-ps1-2002': '在浏览器中游玩 PS1《星际宝贝：天堂危机》。操控莉萝和史迪奇闯过夏威夷岛屿关卡，按角色能力应对不同障碍。先查看版本和操作提示再启动。',
    'murdoku-html5-2026': '在 Murdoku 中用数独式排除法调查凶案。根据人物和位置线索记录候选、逐项排除，找出与受害者单独相处的人。页面提供玩法指南和浏览器入口。',
    'roadster-rush-html5-2020': '在浏览器中打开 HTML5 赛车游戏 Roadster Rush。进入游戏前查看操作和设备兼容说明，启动后先确认转向等输入是否响应，再开始一局。',
    'king-of-gladiator-arcade-2002': '在浏览器中游玩街机动作游戏 King of Gladiator。游戏详情页提供游玩入口和操作提示。开局前可先确认投币、开始和动作按键，以及当前设备的输入支持。',
    'spin-master-arcade-1993': '在浏览器中游玩 Data East 的街机游戏 Spin Master。操控角色用悠悠球攻击、跳过障碍，并拾取关卡道具。页面提供游戏入口，以及投币、开始和操作提示。',
    'rainbow-six-rogue-spear-gba-2002': '在浏览器中体验 GBA 版《彩虹六号：雷霆战警》（Rogue Spear）。这是掌机上的战术行动游戏。启动前可核对版本、浏览器操作和当前设备支持。',
    'contra-gender-swap-nes-1988': '在浏览器中游玩红白机《魂斗罗》的 Contra Gender Swap 改版。打开详情页核对版本与输入说明，再进入横版关卡练习移动、跳跃和射击。',
    'international-superstar-soccer-pro-ps1-1997': '在浏览器中游玩 PS1 足球游戏 International Superstar Soccer Pro。选择球队并体验传球、射门和防守，开赛前可先在详情页确认键盘或手柄的操作方式。',
    'jian-xia-qing-yuan-wai-chuan-yue-ying-chuan-shuo-html5-2001': '通过浏览器入口体验《剑侠情缘外传：月影传说》。跟随杨影枫展开武侠冒险，在探索、对话和战斗中推进剧情。页面提供版本、操作和设备支持提示。',
    'parasite-eve-ps1-1998': '了解 PS1《寄生前夜》的版本和玩法。跟随警探 Aya Brea 调查纽约发生的异常事件，在探索和战斗中推进剧情。详情页提供设备兼容信息和网页游玩状态。',
    'hikaru-no-go-gba-2002': '在浏览器中体验以围棋为主题的 GBA《棋魂》。先在详情页查看 Game Boy Advance 版本介绍，核对游戏语言、方向选择与确认按键，再从游玩入口打开浏览器播放器。开始前确认当前设备的输入是否正常，并通过页面中的相关作品继续寻找掌机游戏。',
    'richman-4-java-2005': '在浏览器中体验 Java 版《大富翁 4》。掷骰移动、购买地产，安排现金和道具的使用。页面提供游玩入口，启动前可确认这个版本的控制方式与设备支持。',
  },
}

export function getGameMetaDescription(game: PublicGame, locale: Locale) {
  const routeId = getCanonicalGameRouteId(game).toLowerCase()
  const description = reviewedGameMetaDescriptions[locale]?.[routeId]
  if (description && routeId === murdokuTargetSlug && game.play_device === 1) {
    return `${description}站内嵌入版仅支持电脑，手机玩家可前往官方游玩页。`
  }
  return description
}

const reviewedEnglishMetaTitles: Partial<Record<string, string>> = {
  'the-king-of-fighters-97-plus-arcade-1997': 'The King of Fighters ’97 Plus (Arcade) | POKOPIE',
  'driver-2-back-on-the-streets-ps1-2000': 'Driver 2: Back on the Streets (PS1) | POKOPIE',
  'international-superstar-soccer-pro-ps1-1997': 'International Superstar Soccer Pro (PS1) | POKOPIE',
  'spider-man-in-smash-remix-n64-2021': 'Spider-Man in Smash Remix (N64) | POKOPIE',
}

export function getGameMetaTitle(game: PublicGame, locale: Locale) {
  if (locale === 'en') return reviewedEnglishMetaTitles[getCanonicalGameRouteId(game).toLowerCase()]
}

export function getBingReviewedGameRouteIds() {
  return Object.values(reviewedGameMetaDescriptions).flatMap((descriptions) => Object.keys(descriptions))
}

export function getGameSearchSeo(game: PublicGame, locale: Locale) {
  const reviewedChineseName = getReviewedChineseGameName(game, locale)
  if (reviewedChineseName) {
    const routeId = getCanonicalGameRouteId(game).toLowerCase()
    const onlineText = locale === 'zh-TW' ? '在線玩' : '在线玩'
    const noDownloadText = locale === 'zh-TW' ? '瀏覽器免下載' : '浏览器免下载'
    return {
      heading: reviewedChineseName.displayName,
      title: `${reviewedChineseName.localizedName}${onlineText}（${reviewedChineseName.englishName}）｜${noDownloadText}`,
      description: locale === 'zh-TW'
        ? reviewedTraditionalChineseMetaDescriptions[routeId] ??
          `${reviewedChineseName.displayName}遊戲介紹與操作說明。查看原始平台、發行信息、瀏覽器控制、設備兼容性和相關遊戲，再從頁面入口開始遊玩。`
        : reviewedChineseMetaDescriptions[routeId] ??
          `${reviewedChineseName.displayName}游戏介绍与操作说明。查看原始平台、发行信息、浏览器控制、设备兼容性和相关游戏，再从页面入口开始游玩。`,
      keywords: [
        reviewedChineseName.localizedName,
        reviewedChineseName.englishName,
        ...reviewedChineseName.searchAliases,
        `${reviewedChineseName.localizedName}${onlineText}`,
      ].join('，'),
    }
  }

  if (locale === 'zh-CN' && normalizeGameSlug(game) === murdokuTargetSlug) {
    return {
      heading: 'Murdoku 在线玩',
      title: 'Murdoku 在线玩｜数独式凶案推理游戏｜POKOPIE',
      description: `Murdoku 将数独式逻辑推理与凶案调查结合：根据线索安排嫌疑人的位置，逐步找出凶手。本页提供浏览器游玩入口${game.play_device === 1 ? '；站内嵌入版本仅支持电脑，手机玩家可前往官方游玩页面。' : '。启动前请确认播放器的设备支持和操作方式。'}`,
      keywords: 'Murdoku，Murdoku 在线玩，凶案推理游戏，数独逻辑游戏',
    }
  }

  if (locale !== 'en') {
    return getTargetedGameSeo(game, locale)
  }

  const slug = normalizeGameSlug(game)
  return (
    targetedGameSeoBySlug[slug as keyof typeof targetedGameSeoBySlug] ??
    searchOnlyGameSeoBySlug[slug as keyof typeof searchOnlyGameSeoBySlug] ??
    null
  )
}

export function isContraSeoTarget(game: PublicGame, locale: Locale) {
  return locale === 'en' && normalizeGameSlug(game) === contraTargetSlug
}

function normalizeGameSlug(game: PublicGame) {
  return game.url_slug?.trim().toLowerCase() ?? ''
}
