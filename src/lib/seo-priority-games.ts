export type SeoPriorityGame = {
  name: string
  platform: string
  slug: string
  collectionPath?: string
  description?: string
  playNote?: string
}

export const seoPriorityGames: ReadonlyArray<SeoPriorityGame> = [
  {
    name: 'Super Mario Bros.: The Lost Levels',
    platform: 'SNES',
    slug: 'super-mario-bros-the-lost-levels-enhanced-snes-1993',
    collectionPath: '/en/snes-games',
  },
  {
    name: 'Paperboy',
    platform: 'Nintendo 64',
    slug: 'paperboy-n64-1999',
    collectionPath: '/en/n64-games',
  },
  {
    name: 'Pokémon HeartGold',
    platform: 'Nintendo DS',
    slug: 'pok-mon-heartgold-version-nds-2009',
  },
  {
    name: 'Donkey Kong',
    platform: 'NES',
    slug: 'donkey-kong-nes-1983',
    collectionPath: '/en/nes-games',
  },
  {
    name: 'Tekken',
    platform: 'PlayStation',
    slug: 'tekken-ps1-1995',
    collectionPath: '/en/ps1-games',
  },
]

const chinesePlatformPicks: ReadonlyArray<SeoPriorityGame> = [
  { name: '宝可梦 绿宝石', platform: 'GBA', slug: 'pokemon-emerald-gba-2004', collectionPath: '/zh-CN/gba-games', description: '丰缘冒险 · 已核对版本为繁体中文', playNote: '已核对的版本使用繁体中文。选好初始伙伴后，先从游戏菜单保存一次并测试能否读取，再继续长时间游玩。' },
  { name: '宝可梦 火红', platform: 'GBA', slug: 'pokemon-firered-game-boy-advance-2004', collectionPath: '/zh-CN/gba-games', description: '关都冒险 · 开玩前查看操作和存档', playNote: '进入真新镇冒险前，确认方向、A、B 和开始键。第一次离开游戏前，通过游戏内菜单存档并测试读取。' },
  { name: '节奏天国', platform: 'GBA', slug: 'rhythm-tengoku-japan-gba-2006', collectionPath: '/zh-CN/gba-games', description: '短局节奏游戏 · 日文版', playNote: '这是 GBA 日文版。先打开声音，核对 A、B 和方向键，再完成关卡练习。跟着声音数拍，有助于判断何时按键。' },
  { name: '头文字 D', platform: 'PS1', slug: 'initial-d-ps1-1998', collectionPath: '/zh-CN/ps1-games', description: '山路竞速 · 先核对转向和油门', playNote: '启动后先在播放器里确认转向、加速和刹车分别对应哪些按键。用一场短比赛检查键盘或手柄输入，再继续游玩。' },
  { name: '铁拳', platform: 'PS1', slug: 'tekken-ps1-1995', collectionPath: '/zh-CN/ps1-games', description: '一对一格斗 · 练习四个拳脚按键', playNote: '分别确认左拳、右拳、左脚和右脚的按键。先测试方向和防守，再练一组短连招。' },
  { name: '寄生前夜', platform: 'PS1', slug: 'parasite-eve-ps1-1998', collectionPath: '/zh-CN/ps1-games', description: '剧情与战斗 · 先检查存档方式', playNote: '确认方向、确认和取消按键。开始长流程前，查看游戏内存档与播放器即时存档的区别，并测试一种可用的读取方式。' },
]

export function getCollectionPriorityGames(routePath: string) {
  return [...seoPriorityGames, ...chinesePlatformPicks].filter((game) => game.collectionPath === routePath)
}

export function getChinesePlatformPlayNote(gameId: string) {
  return chinesePlatformPicks.find((game) => game.slug === gameId)?.playNote
}
