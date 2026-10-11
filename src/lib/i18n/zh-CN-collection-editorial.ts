import type { GameCollectionPageConfig } from '#/components/game-collection-page'

type CollectionEditorial = Pick<GameCollectionPageConfig, 'articleTitle' | 'articleParagraphs' | 'benefits' | 'genresTitle' | 'genres' | 'faqs'>

export const chineseCollectionEditorials: Record<'arcade' | 'nes' | 'snes', CollectionEditorial> = {
  arcade: {
    articleTitle: '街机游戏在线玩：投币、开始与操作说明',
    articleParagraphs: [
      '本页集中展示街机游戏，包含格斗、卷轴射击、清版动作、益智和赛车等类型。点击游戏封面进入详情页，查看玩法和浏览器启动入口，再选择适合自己的作品。',
      '部分街机游戏需要先投币，再按开始键。浏览器播放器的投币、开始和动作键可能因游戏而异，请查看当前控制菜单，不要直接套用其他游戏的键位。',
      '手机触控和手柄支持取决于游戏、播放器与设备。双人游戏也不等于支持网络联机；开始前请确认当前版本的控制和多人选项。',
    ],
    benefits: [
      { icon: 'bolt', title: '从详情页启动', body: '先查看游戏版本和玩法，再打开浏览器播放器。' },
      { icon: 'gamepad', title: '确认投币和开始键', body: '街机游戏可能需要投币后才能开始，键位以控制菜单为准。' },
      { icon: 'trophy', title: '适合短局挑战', body: '按格斗、射击和益智类型挑选下一款游戏。' },
      { icon: 'monitor', title: '检查设备支持', body: '手机、键盘和手柄是否可用，请查看具体游戏。' },
    ],
    genresTitle: '按类型查找街机游戏',
    genres: [
      { name: '格斗', description: '对战与招式练习', icon: 'boxing', matchTerms: ['Fighting', '格斗'] },
      { name: '射击', description: '卷轴与弹幕挑战', icon: 'rocket', matchTerms: ['Shoot', 'Shmup', '射击'] },
      { name: '清版动作', description: '闯关与近身战斗', icon: 'dumbbell', matchTerms: ['Beat', 'Brawler', 'Action', '动作'] },
      { name: '益智', description: '解谜与短局挑战', icon: 'puzzle', matchTerms: ['Puzzle', '益智'] },
      { name: '赛车', description: '竞速与驾驶', icon: 'flag', matchTerms: ['Racing', '赛车'] },
      { name: '平台', description: '跳跃与关卡探索', icon: 'platform', matchTerms: ['Platform', '平台'] },
    ],
    faqs: [
      { question: '街机游戏可以直接在浏览器里玩吗？', answer: '支持的游戏可以从详情页启动浏览器播放器，无需单独安装模拟器。首次启动仍需要加载资源，具体支持情况以游戏页面为准。' },
      { question: '街机游戏怎么投币和开始？', answer: '查看当前播放器的控制菜单，找到投币和开始键。部分游戏需要先投币，再选择玩家数量并开始。不同游戏的按键可能不同。' },
      { question: '街机游戏能用手机或手柄玩吗？', answer: '部分播放器提供触控或手柄输入，但并非所有游戏和设备都已验证。先查看详情页并测试移动、投币、开始和动作键。' },
      { question: '双人街机游戏支持在线联机吗？', answer: '双人模式可能只表示同一设备上的本地双人游玩，不能据此认定支持网络联机。请检查当前游戏的多人设置。' },
    ],
  },
  nes: {
    articleTitle: '红白机 NES 游戏在线玩：选择版本与熟悉按键',
    articleParagraphs: [
      'NES 也常被称为红白机或 Famicom。本页汇集目录中的动作、平台、益智和冒险游戏。选择封面进入详情页，确认游戏名称、语言和玩法后再启动。',
      '原版控制器常见方向键、A、B、Start 和 Select，浏览器中的对应键位由播放器决定。先查看操作菜单并点击游戏区域，再测试方向与确认键。',
      '长时间游玩前先检查保存和读取功能。游戏自身的存档与播放器即时存档可能不同，清理站点数据或更换浏览器前，请确认是否能备份当前进度。',
    ],
    benefits: [
      { icon: 'platform', title: '重温红白机作品', body: '从动作与平台游戏开始，也可以继续探索益智和冒险。' },
      { icon: 'gamepad', title: '熟悉基本按键', body: '查看方向、A/B、Start 和 Select 在当前播放器中的对应键。' },
      { icon: 'monitor', title: '查看游戏版本', body: '网站使用中文界面，不代表每款游戏内的文字都是中文。' },
      { icon: 'puzzle', title: '先测试保存', body: '确认能读取进度，再开始长时间挑战。' },
    ],
    genresTitle: '按类型查找 NES 游戏',
    genres: [
      { name: '动作', description: '战斗与反应挑战', icon: 'swords', matchTerms: ['Action', '动作'] },
      { name: '平台', description: '跳跃与闯关', icon: 'platform', matchTerms: ['Platform', '平台'] },
      { name: '益智', description: '逻辑与消除', icon: 'puzzle', matchTerms: ['Puzzle', '益智'] },
      { name: '体育', description: '经典运动项目', icon: 'ball', matchTerms: ['Sports', '体育'] },
      { name: '冒险', description: '探索与解谜', icon: 'compass', matchTerms: ['Adventure', '冒险'] },
      { name: '射击', description: '躲避与射击挑战', icon: 'rocket', matchTerms: ['Shoot', '射击'] },
    ],
    faqs: [
      { question: '红白机和 NES 是同一类游戏吗？', answer: '本页把目录中的 Famicom／NES 游戏归为红白机分类。不同地区和语言版本可能存在差异，请查看具体游戏信息。' },
      { question: 'NES 游戏在线玩需要安装模拟器吗？', answer: '支持的游戏通过浏览器播放器启动，无需单独安装模拟器。首次启动需要等待资源加载。' },
      { question: '红白机游戏怎么按开始键？', answer: '打开播放器控制菜单，查看 Start 对应的键位。先点击游戏区域，使其获得焦点，再按开始键。' },
      { question: 'NES 网页版可以存档吗？', answer: '是否提供保存取决于游戏和播放器。先测试保存与读取；游戏内存档和播放器即时存档可能是两种不同功能。' },
    ],
  },
  snes: {
    articleTitle: '超级任天堂 SNES 游戏在线玩：操作、语言与进度',
    articleParagraphs: [
      'SNES 又称 Super Nintendo，日版平台为 Super Famicom。本页集中展示目录中的角色扮演、动作、平台、赛车和冒险游戏，点击封面即可进入对应详情页。',
      'SNES 控制器包含方向键、A/B/X/Y、L/R、Start 和 Select。浏览器播放器不一定在每个设备上提供完整控制布局，开始前请确认当前游戏需要的按键是否可用。',
      '选择剧情较长的游戏时，先确认游戏内语言，再检查保存和读取菜单。网站界面语言不会自动翻译游戏内容，也不能保证不同浏览器之间自动同步进度。',
    ],
    benefits: [
      { icon: 'wand', title: '发现角色扮演游戏', body: '先确认游戏语言和存档方式，再开始长流程冒险。' },
      { icon: 'platform', title: '选择动作与平台游戏', body: '通过类型入口继续查找适合短局体验的作品。' },
      { icon: 'gamepad', title: '核对完整控制布局', body: '确认 A/B/X/Y 和 L/R 等当前游戏需要的按键。' },
      { icon: 'monitor', title: '按设备选择游戏', body: '键盘、触控与手柄输入以当前播放器支持为准。' },
    ],
    genresTitle: '按类型查找 SNES 游戏',
    genres: [
      { name: '角色扮演', description: '剧情与角色成长', icon: 'wand', matchTerms: ['RPG', 'Role', '角色扮演'] },
      { name: '平台', description: '跳跃与关卡探索', icon: 'platform', matchTerms: ['Platform', '平台'] },
      { name: '赛车', description: '竞速与驾驶', icon: 'flag', matchTerms: ['Racing', '赛车'] },
      { name: '动作', description: '战斗与闯关', icon: 'swords', matchTerms: ['Action', '动作'] },
      { name: '冒险', description: '探索经典世界', icon: 'compass', matchTerms: ['Adventure', '冒险'] },
      { name: '益智', description: '逻辑与解谜', icon: 'puzzle', matchTerms: ['Puzzle', '益智'] },
    ],
    faqs: [
      { question: 'SNES 和 NES 有什么区别？', answer: '本网站分别整理 NES／Famicom 的 8 位游戏与 SNES／Super Famicom 的 16 位游戏。两者是不同平台，请按想玩的作品选择分类。' },
      { question: 'SNES 游戏可以在线玩吗？', answer: '支持的游戏可以从详情页启动浏览器播放器，无需单独安装模拟器。请查看当前游戏的操作和设备支持。' },
      { question: '手机上能使用全部 SNES 按键吗？', answer: '不能统一保证。触控布局由播放器决定，请确认当前游戏需要的 A/B/X/Y、L/R 等按键是否可用。' },
      { question: 'SNES 游戏怎么保存进度？', answer: '查看游戏内保存和播放器即时存档菜单，先验证能否读取。更换浏览器、清理站点数据或使用无痕窗口可能影响本地进度。' },
    ],
  },
}
