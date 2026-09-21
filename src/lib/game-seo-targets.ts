import type { Locale, PublicGame } from '#/lib/ggemu'

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
    title: 'Geometry Dash Advance - Play the GBA Demake Online | POKOPIE',
    description:
      'Play Geometry Dash Advance online in your browser. Explore AleFunky’s GBA demake, read the control and practice-mode guide, and learn how it differs from the mobile game.',
    keywords:
      'Geometry Dash Advance, Geometry Dash Advance online, play Geometry Dash Advance, GBA demake, rhythm platform game',
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
    description: 'Play Richman 2 online in your browser. Buy property, manage cash, use cards and survive Softstar’s 1993 DOS board game.',
    keywords: 'Richman 2 online, play Richman 2, 大富翁2, Softstar DOS board game, property game',
  },
  'rich-man-3-dos-1996': {
    heading: 'Play Richman 3 Online',
    title: 'Play Richman 3 Online | 1996 DOS Board Game',
    description: 'Play Richman 3 online. Manage property, cash, cards and random events in Softstar’s 1996 DOS board game.',
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

export function getTargetedGameSeo(game: PublicGame, locale: Locale) {
  if (locale !== 'en') {
    return null
  }

  const slug = normalizeGameSlug(game)
  return targetedGameSeoBySlug[slug as keyof typeof targetedGameSeoBySlug] ?? null
}

export function getGameSearchSeo(game: PublicGame, locale: Locale) {
  if (locale !== 'en') {
    return null
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
