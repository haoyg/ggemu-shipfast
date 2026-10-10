import { siteConfig } from '#/lib/site-config'
import type { HomeFaqs, I18nMessages } from './types'

export const zhTwMessages = {
  layout: {
    games: '首頁',
    live: '遊戲直播',
    explore: '探索',
    playMyRom: '玩本地 ROM',
    blog: '博客',
    about: '關於我們',
    legal: '法律',
    privacyPolicy: '隱私政策',
    termsOfService: '服務條款',
    copyrightRemoval: '版權與下架',
    theme: '主題',
    language: '語言',
    tagline: '在 POKOPIE 玩復古遊戲',
    get copyright() {
      return `Copyright ${new Date().getUTCFullYear()} ${siteConfig.SITE_NAME}`
    },
    get disclaimer() {
      return `遊戲名稱、美術素材、商標及相關內容歸各自權利人所有。權利人可通過版權處理流程或發送郵件至 ${siteConfig.SITE_EMAIL} 申請審核或下架。`
    },
    footer:
      '直接在瀏覽器裡遊玩經典復古遊戲，無需下載。覆蓋掌機、主機、街機與更多平臺。',
  },
  home: {
    title: '在線遊玩經典復古遊戲',
    subtitle:
      '在瀏覽器裡直接遊玩 GBA、NES、SNES、PS1、N64、Sega Genesis、街機等經典遊戲，無需下載。',
    heroSearchHint: '按遊戲名、平臺或系列查找經典遊戲。',
    browsePopular: '瀏覽熱門遊戲',
    discovery: '繼續發現',
    searchPlaceholder: '搜索遊戲名、平臺或系列...',
    search: '搜索',
    closeSearch: '關閉搜索',
    reset: '重置',
    allPlatforms: '全部平臺',
    allCategories: '全部分類',
    newest: '最新遊戲',
    popular: '熱門遊戲',
    oldest: '最早發佈',
    nameAsc: '名稱 A-Z',
    sortBy: '排序方式',
    empty: '沒有找到遊戲',
    previous: '上一頁',
    next: '下一頁',
    page: '第 {page} / {pages} 頁',
    totalGames: '共 {total} 款遊戲',
    views: '瀏覽',
    plays: '遊玩',
    details: '查看詳情',
    featured: '可在線遊玩的復古遊戲',
    recentlyPlayed: '最近玩過',
    latestBlogPosts: '最新博客文章',
    latestBlogSubtitle: '閱讀最新遊戲指南、瀏覽器遊玩技巧和復古遊戲相關文章。',
    viewAllBlog: '查看全部文章',
    blogPostFallback: '博客文章',
    loadError: '遊戲加載失敗，請檢查網絡後重試。',
    loading: '正在加載遊戲…',
    retry: '重試',
  },
  homeSeo: {
    title: '在線玩經典復古遊戲 | GBA、NES、SNES、PS1、N64 免下載',
    description:
      '在瀏覽器裡直接遊玩 GBA、NES、SNES、PS1、N64、Sega Genesis、街機等經典復古遊戲，無需下載。',
    keywords:
      '在線復古遊戲, GBA 在線遊戲, NES 在線遊戲, SNES 在線遊戲, PS1 在線遊戲, N64 在線遊戲, 街機遊戲, 瀏覽器遊戲, 免下載遊戲',
  },
  homeContent: {
    whyTitle: '為什麼在線玩復古遊戲？',
    whyBody:
      'POKOPIE 讓經典遊戲可以更輕鬆地重新打開，不需要安裝模擬器、下載文件或註冊賬號。進入遊戲詳情頁後點擊開始，就能直接在瀏覽器里加載遊戲，桌面、平板和手機都可以訪問。網站收錄 NES、SNES、GBA、PS1、街機、Sega Genesis、N64 等多個平臺的經典作品，你可以按平臺瀏覽，也可以直接搜索遊戲名。每個遊戲都有獨立詳情頁，包含封面、平臺信息、玩法說明、相關遊戲和分享入口，比單純嵌入 iframe 更利於搜索引擎理解頁面內容，也更方便玩家繼續發現下一款遊戲。',
    howTitle: '如何開始遊戲',
    howSteps: [
      {
        title: '選擇遊戲',
        body: '通過搜索框輸入遊戲名，或按 NES、SNES、GBA、PS1、街機等平臺瀏覽。',
      },
      {
        title: '進入詳情頁',
        body: '首頁卡片會跳轉到遊戲專屬頁面，頁面裡有封面、介紹、相關遊戲和開始按鈕。',
      },
      {
        title: '瀏覽器直接開玩',
        body: '點擊開始遊戲後，使用鍵盤、觸屏控件或支持的手柄進行操作。',
      },
    ],
  },
  detail: {
    home: '遊戲庫',
    play: '立即開玩',
    playPage: '在新標籤頁中游玩',
    playPageHint: '遊戲將在新的瀏覽器標籤頁中打開。',
    install: '安裝應用',
    installUnavailable:
      '安裝功能正在準備中。如果瀏覽器沒有彈出安裝提示，請刷新本頁後重試。',
    installDismissed: '已取消安裝。',
    installGuideTitle: '添加遊戲到主屏幕',
    installGuideIntro:
      '當前瀏覽器沒有彈出安裝提示，你仍然可以手動添加這個遊戲。',
    installGuideIos:
      'iPhone 或 iPad：用 Safari 打開本頁，點擊分享按鈕，然後選擇“添加到主屏幕”。',
    installGuideAndroid:
      'Android：用 Chrome 打開本頁，點擊菜單或分享按鈕，然後選擇“安裝應用”或“添加到主屏幕”。',
    installGuideDesktop:
      '桌面版 Chrome 或 Edge：點擊地址欄裡的安裝圖標，或打開瀏覽器菜單後選擇“安裝應用”。',
    installGuideClose: '知道了',
    share: '分享',
    copyFailed: '複製失敗，請手動複製頁面地址或選取下方嵌入代碼。',
    posterFailed: '海報生成失敗，請重試。',
    generatePoster: '生成海報',
    systemShare: '系統分享',
    copyEmbedCode: '複製嵌入代碼',
    embedCodeCopied: '嵌入代碼已複製。',
    embedCardTitle: '嵌入這個遊戲',
    embedCardDescription:
      '讓其他網站把這個可玩的遊戲放到頁面裡，並保留指向 POKOPIE 的回鏈。',
    embedCodeLabel: 'Iframe 嵌入代碼',
    posterTitle: '分享海報',
    downloadPoster: '下載海報',
    posterScanCta: '掃碼立即遊戲，無需下載',
    shareUnavailableCopied: '當前瀏覽器不支持系統分享，鏈接已複製。',
    overview: '遊戲簡介',
    keywords: '關鍵詞',
    howToPlay: '玩法指南',
    details: '遊戲信息',
    platform: '平臺',
    developer: '開發商',
    released: '發行年份',
    players: '玩家',
    views: '瀏覽',
    plays: '遊玩',
    categories: '類型',
    languages: '語言',
    noData: '暫無',
    browserReady: '瀏覽器直接遊玩',
    noDownload: '無需下載',
    faq: '常見問題',
    relatedGames: '相關遊戲',
  },
  about: {
    title: '關於',
    get description() {
      return `關於 ${siteConfig.SITE_NAME} 在線復古遊戲網站。`
    },
  },
  blog: {
    title: '博客',
    description: '閱讀遊戲指南、瀏覽器遊玩技巧和復古遊戲相關文章。',
    subtitle: '閱讀遊戲指南、瀏覽器遊玩技巧和復古遊戲相關文章。',
    eyebrow: '博客',
    empty: '暫無文章',
    total: '共 {total} 篇文章',
    relatedPosts: '相關文章',
  },
  live: {
    title: '遊戲直播',
    description: '發現正在直播的經典復古遊戲和活躍直播間。',
    subtitle: '看看大家此刻正在直播哪些經典遊戲，找到下一款想玩的作品。',
    eyebrow: '正在直播',
    empty: '目前沒有正在直播的遊戲',
    total: '當前共有 {total} 個直播間',
    watchLive: '進入直播',
    playGame: '遊玩遊戲',
    closePlayer: '關閉直播',
    previous: '上一頁',
    next: '下一頁',
    page: '第 {page} / {pages} 頁',
    error: '直播間列表暫時無法加載，請稍後重試。',
    retry: '重新加載',
  },
} satisfies I18nMessages

export const zhTwHomeFaqs = {
  title: '常見問題',
  subtitle:
    '瞭解如何在線遊玩、查找遊戲、按平臺篩選，以及聯繫站點處理內容問題。',
  items: [
    {
      question: '這些復古遊戲可以直接在線玩嗎？',
      answer:
        '可以。打開遊戲詳情頁後點擊開始遊戲，就能在瀏覽器中直接遊玩，不需要先安裝模擬器。',
    },
    {
      question: '需要下載模擬器或 ROM 文件嗎？',
      answer:
        '不需要。你可以直接打開遊戲詳情頁並開始遊玩，無需額外安裝模擬器或下載文件。',
    },
    {
      question: '支持哪些遊戲平臺？',
      answer:
        '遊戲庫支持 Game Boy Advance（GBA）、Game Boy、Game Boy Color（GBC）、Nintendo DS（NDS）、NES / Famicom、SNES / Super Famicom、Nintendo 64（N64）、PlayStation / PS1、Sega Genesis / Genesis、Master System、Sega CD、Neo Geo、Atari、Arcade、MS-DOS / DOS、HTML5、Flash、Java 等平臺，也可以用平臺篩選查找。',
    },
    {
      question: '支持哪些設備遊玩？',
      answer:
        '我們支持大多數主流智能設備，例如 iOS、Android、iPad、Mac 和 Windows。多數現代瀏覽器都可以運行，但建議使用 Chrome 獲得更穩定的遊戲體驗。',
    },
    {
      question: '搜索不到想玩的遊戲怎麼辦？',
      answer:
        '可以嘗試使用英文名、系列名、平臺名或更短的關鍵詞搜索；部分遊戲可能使用不同地區名稱。',
    },
    {
      question: '遊戲內容的版權如何處理？',
      get answer() {
        return `權利人可通過版權處理流程或發送郵件至 ${siteConfig.SITE_EMAIL} 申請審核或下架。我們會審核信息完整的通知，並在適當情況下限制存在爭議的內容。`
      },
    },
  ],
} satisfies HomeFaqs

export const zhTwBlogFaqs = {
  title: '常見問題',
  subtitle: '瞭解如何在本站玩復古遊戲、查找遊戲攻略，以及獲取使用提示。',
  items: [
    {
      question: '如何在本站玩復古遊戲？',
      answer: '只需瀏覽我們的遊戲庫，點擊任意遊戲，即可在瀏覽器中直接開始遊玩。無需下載或安裝模擬器。',
    },
    {
      question: '遊戲免費嗎？',
      answer: '是的，平臺上所有遊戲均可免費遊玩。遊戲通過網頁模擬技術直接在瀏覽器中運行。',
    },
    {
      question: '支持哪些類型的復古遊戲？',
      answer: '我們提供多種經典遊戲，涵蓋 Game Boy Advance、NES、SNES、PlayStation (PS1)、Sega Genesis、Nintendo 64、 Arcade 等多個平臺。',
    },
    {
      question: '我可以閱讀遊戲攻略和文章嗎？',
      answer: '可以。博客欄目提供遊戲攻略、瀏覽器遊玩技巧和復古遊戲相關文章，幫助你獲得更好的遊戲體驗。',
    },
    {
      question: '需要註冊賬號才能玩遊戲嗎？',
      answer: '無需註冊。只需選擇遊戲即可立即開始遊玩。',
    },
  ],
} satisfies HomeFaqs
