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
  { name: '魂斗罗', platform: 'NES', slug: 'contra-nes-1988', collectionPath: '/zh-CN/nes-games', description: '横版射击 · 先核对跳跃和射击', playNote: '在丛林关卡先试方向、跳跃和射击键。想双人游玩时，先分别检查两套按键是否响应。' },
  { name: '坦克大战', platform: 'NES', slug: 'battle-city-nes-1985', collectionPath: '/zh-CN/nes-games', description: '坦克闯关 · 守住基地', playNote: '先试方向键与射击键，再观察敌方坦克的来路。守住基地附近的通道，开火时留意基地周围的砖墙。' },
  { name: '超级马里奥兄弟', platform: 'NES', slug: 'super-mario-bros-nes-1985', collectionPath: '/zh-CN/nes-games', description: '平台跳跃 · 练习跑动和起跳', playNote: '在第一关先分别测试跳跃和加速键。遇到宽缺口时先助跑，跳过障碍后松开方向键，看看落点是否合适。' },
  { name: '宝可梦 绿宝石', platform: 'GBA', slug: 'pokemon-emerald-gba-2004', collectionPath: '/zh-CN/gba-games', description: '丰缘冒险 · 已核对版本为繁体中文', playNote: '已核对的版本使用繁体中文。选好初始伙伴后，先从游戏菜单保存一次并测试能否读取，再继续长时间游玩。' },
  { name: '宝可梦 火红', platform: 'GBA', slug: 'pokemon-firered-game-boy-advance-2004', collectionPath: '/zh-CN/gba-games', description: '关都冒险 · 开玩前查看操作和存档', playNote: '进入真新镇冒险前，确认方向、A、B 和开始键。第一次离开游戏前，通过游戏内菜单存档并测试读取。' },
  { name: '节奏天国', platform: 'GBA', slug: 'rhythm-tengoku-japan-gba-2006', collectionPath: '/zh-CN/gba-games', description: '短局节奏游戏 · 日文版', playNote: '这是 GBA 日文版。先打开声音，核对 A、B 和方向键，再完成关卡练习。跟着声音数拍，有助于判断何时按键。' },
  { name: '古惑狼 2', platform: 'PS1', slug: 'crash-bandicoot-2-cortex-strikes-back-ps1-1997', collectionPath: '/zh-CN/ps1-games', description: '动作闯关 · 练习跳跃和旋转', playNote: '在第一关先测试方向、跳跃和旋转按键。通过关卡后可回到传送房间，再选择下一关。' },
  { name: '铁拳', platform: 'PS1', slug: 'tekken-ps1-1995', collectionPath: '/zh-CN/ps1-games', description: '一对一格斗 · 练习四个拳脚按键', playNote: '分别确认左拳、右拳、左脚和右脚的按键。先测试方向和防守，再练一组短连招。' },
  { name: '星际宝贝：天堂危机', platform: 'PS1', slug: 'lilo-stitch-trouble-in-paradise-ps1-2002', collectionPath: '/zh-CN/ps1-games', description: '平台冒险 · 按角色能力应对障碍', playNote: '进入关卡后先确认当前角色。莉萝和史迪奇的能力不同，遇到障碍时可先查看关卡提示和操作按键。' },
]

export function getCollectionPriorityGames(routePath: string) {
  return [...seoPriorityGames, ...chinesePlatformPicks].filter((game) => game.collectionPath === routePath)
}

export function getChinesePlatformPlayNote(gameId: string) {
  return chinesePlatformPicks.find((game) => game.slug === gameId)?.playNote
}
