import { siteConfig } from '#/lib/site-config'
import type { HomeFaqs, I18nMessages } from './types'

export const zhCnMessages = {
  layout: {
    games: '首页',
    live: '游戏直播',
    explore: '探索',
    playMyRom: '玩本地 ROM',
    blog: '博客',
    about: '关于我们',
    legal: '法律',
    privacyPolicy: '隐私政策',
    termsOfService: '服务条款',
    theme: '主题',
    language: '语言',
    tagline: '在 POKOPIE 玩复古游戏',
    get copyright() {
      return `Copyright 2025 ${siteConfig.SITE_NAME}`
    },
    get disclaimer() {
      return `所有游戏 ROM / 程序均由用户提交或收集自互联网，版权归其各自权利人所有。如有任何问题，请发送邮件至 ${siteConfig.SITE_EMAIL}，我们会移除对应内容。`
    },
    footer:
      '直接在浏览器里游玩经典复古游戏，无需下载。覆盖掌机、主机、街机与更多平台。',
  },
  home: {
    title: '在线游玩经典复古游戏',
    subtitle:
      '在浏览器里直接游玩 GBA、NES、SNES、PS1、N64、Sega Genesis、街机等经典游戏，无需下载。',
    searchPlaceholder: '搜索游戏名、平台或系列...',
    search: '搜索',
    closeSearch: '关闭搜索',
    reset: '重置',
    allPlatforms: '全部平台',
    allCategories: '全部分类',
    newest: '最新游戏',
    popular: '热门游戏',
    oldest: '最早发布',
    nameAsc: '名称 A-Z',
    sortBy: '排序方式',
    empty: '没有找到游戏',
    previous: '上一页',
    next: '下一页',
    page: '第 {page} / {pages} 页',
    totalGames: '共 {total} 款游戏',
    views: '浏览',
    plays: '游玩',
    details: '查看详情',
    featured: '可在线游玩的复古游戏',
    recentlyPlayed: '最近玩过',
    latestBlogPosts: '最新博客文章',
    latestBlogSubtitle: '阅读最新游戏指南、浏览器游玩技巧和复古游戏相关文章。',
    viewAllBlog: '查看全部文章',
    blogPostFallback: '博客文章',
    loadError: '游戏加载失败，请检查网络后重试。',
    loading: '正在加载游戏…',
    retry: '重试',
  },
  homeSeo: {
    title: '在线玩经典复古游戏 | GBA、NES、SNES、PS1、N64 免下载',
    description:
      '在浏览器里直接游玩 GBA、NES、SNES、PS1、N64、Sega Genesis、街机等经典复古游戏，无需下载。',
    keywords:
      '在线复古游戏, GBA 在线游戏, NES 在线游戏, SNES 在线游戏, PS1 在线游戏, N64 在线游戏, 街机游戏, 浏览器游戏, 免下载游戏',
  },
  detail: {
    home: '游戏库',
    play: '开始游戏',
    install: '下载',
    installUnavailable:
      '安装功能正在准备中。如果浏览器没有弹出安装提示，请刷新本页后重试。',
    installDismissed: '已取消安装。',
    installGuideTitle: '添加游戏到主屏幕',
    installGuideIntro:
      '当前浏览器没有弹出安装提示，你仍然可以手动添加这个游戏。',
    installGuideIos:
      'iPhone 或 iPad：用 Safari 打开本页，点击分享按钮，然后选择“添加到主屏幕”。',
    installGuideAndroid:
      'Android：用 Chrome 打开本页，点击菜单或分享按钮，然后选择“安装应用”或“添加到主屏幕”。',
    installGuideDesktop:
      '桌面版 Chrome 或 Edge：点击地址栏里的安装图标，或打开浏览器菜单后选择“安装应用”。',
    installGuideClose: '知道了',
    share: '分享',
    generatePoster: '生成海报',
    systemShare: '系统分享',
    copyEmbedCode: '复制嵌入代码',
    embedCodeCopied: '嵌入代码已复制。',
    embedCardTitle: '嵌入这个游戏',
    embedCardDescription:
      '让其他网站把这个可玩的游戏放到页面里，并保留指向 POKOPIE 的回链。',
    embedCodeLabel: 'Iframe 嵌入代码',
    posterTitle: '分享海报',
    downloadPoster: '下载海报',
    posterScanCta: '扫码立即游戏，无需下载',
    shareUnavailableCopied: '当前浏览器不支持系统分享，链接已复制。',
    overview: '游戏简介',
    keywords: '关键词',
    howToPlay: '玩法指南',
    details: '游戏信息',
    platform: '平台',
    developer: '开发商',
    released: '发行年份',
    players: '玩家',
    views: '浏览',
    plays: '游玩',
    categories: '类型',
    languages: '语言',
    noData: '暂无',
    browserReady: '浏览器直接游玩',
    noDownload: '无需下载',
    faq: '常见问题',
    relatedGames: '相关游戏',
  },
  about: {
    title: '关于',
    get description() {
      return `关于 ${siteConfig.SITE_NAME} 在线复古游戏网站。`
    },
  },
  blog: {
    title: '博客',
    description: '阅读游戏指南、浏览器游玩技巧和复古游戏相关文章。',
    subtitle: '阅读游戏指南、浏览器游玩技巧和复古游戏相关文章。',
    eyebrow: '博客',
    empty: '暂无文章',
    total: '共 {total} 篇文章',
    relatedPosts: '相关文章',
  },
  live: {
    title: '游戏直播',
    description: '发现正在直播的经典复古游戏和活跃直播间。',
    subtitle: '看看大家此刻正在直播哪些经典游戏，找到下一款想玩的作品。',
    eyebrow: '正在直播',
    empty: '目前没有正在直播的游戏',
    total: '当前共有 {total} 个直播间',
    watchLive: '进入直播',
    playGame: '游玩游戏',
    closePlayer: '关闭直播',
    previous: '上一页',
    next: '下一页',
    page: '第 {page} / {pages} 页',
    error: '直播间列表暂时无法加载，请稍后重试。',
    retry: '重新加载',
  },
} satisfies I18nMessages

export const zhCnHomeFaqs = {
  title: '常见问题',
  subtitle:
    '了解如何在线游玩、查找游戏、按平台筛选，以及联系站点处理内容问题。',
  items: [
    {
      question: '这些复古游戏可以直接在线玩吗？',
      answer:
        '可以。打开游戏详情页后点击开始游戏，就能在浏览器中直接游玩，不需要先安装模拟器。',
    },
    {
      question: '需要下载模拟器或 ROM 文件吗？',
      answer:
        '不需要。你可以直接打开游戏详情页并开始游玩，无需额外安装模拟器或下载文件。',
    },
    {
      question: '支持哪些游戏平台？',
      answer:
        '游戏库支持 Game Boy Advance（GBA）、Game Boy、Game Boy Color（GBC）、Nintendo DS（NDS）、NES / Famicom、SNES / Super Famicom、Nintendo 64（N64）、PlayStation / PS1、Sega Genesis / Genesis、Master System、Sega CD、Neo Geo、Atari、Arcade、MS-DOS / DOS、HTML5、Flash、Java 等平台，也可以用平台筛选查找。',
    },
    {
      question: '支持哪些设备游玩？',
      answer:
        '我们支持大多数主流智能设备，例如 iOS、Android、iPad、Mac 和 Windows。多数现代浏览器都可以运行，但建议使用 Chrome 获得更稳定的游戏体验。',
    },
    {
      question: '搜索不到想玩的游戏怎么办？',
      answer:
        '可以尝试使用英文名、系列名、平台名或更短的关键词搜索；部分游戏可能使用不同地区名称。',
    },
    {
      question: '游戏内容的版权如何处理？',
      get answer() {
        return `游戏内容由用户提交或来自互联网收集，版权归原权利人所有。如需下架，请通过 ${siteConfig.SITE_EMAIL} 联系我们。`
      },
    },
  ],
} satisfies HomeFaqs

export const zhCnBlogFaqs = {
  title: '常见问题',
  subtitle: '了解如何在本站玩复古游戏、查找游戏攻略，以及获取使用提示。',
  items: [
    {
      question: '如何在本站玩复古游戏？',
      answer: '只需浏览我们的游戏库，点击任意游戏，即可在浏览器中直接开始游玩。无需下载或安装模拟器。',
    },
    {
      question: '游戏免费吗？',
      answer: '是的，平台上所有游戏均可免费游玩。游戏通过网页模拟技术直接在浏览器中运行。',
    },
    {
      question: '支持哪些类型的复古游戏？',
      answer: '我们提供多种经典游戏，涵盖 Game Boy Advance、NES、SNES、PlayStation (PS1)、Sega Genesis、Nintendo 64、 Arcade 等多个平台。',
    },
    {
      question: '我可以阅读游戏攻略和文章吗？',
      answer: '可以。博客栏目提供游戏攻略、浏览器游玩技巧和复古游戏相关文章，帮助你获得更好的游戏体验。',
    },
    {
      question: '需要注册账号才能玩游戏吗？',
      answer: '无需注册。只需选择游戏即可立即开始游玩。',
    },
  ],
} satisfies HomeFaqs
