import { koMessages, koHomeFaqs } from './i18n/ko'
import { zhTwMessages, zhTwHomeFaqs } from './i18n/zh-TW'
import type { BlogPost, Locale, PublicGame } from '#/lib/ggemu'
import { enHomeFaqs, enMessages } from '#/lib/i18n/en'
import { jaHomeFaqs, jaMessages } from '#/lib/i18n/ja'
import { zhCnHomeFaqs, zhCnMessages } from '#/lib/i18n/zh-CN'

export function normalizeLocale(value: unknown): Locale {
  return value === 'en' || value === 'ja' || value === 'ko' || value === 'zh-TW' ? value : 'zh-CN'
}

export function isSupportedLocale(value: unknown): value is Locale {
  return value === 'zh-CN' || value === 'zh-TW' || value === 'en' || value === 'ja' || value === 'ko'
}

export function formatCopy(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? ''),
  )
}

export const i18n = {
  'zh-CN': zhCnMessages,
  'zh-TW': zhTwMessages,
  ko: koMessages,
  en: enMessages,
  ja: jaMessages,
} satisfies Record<Locale, typeof zhCnMessages>

export function getI18n(locale: Locale) {
  return i18n[locale]
}

const homeFaqs = {
  'zh-CN': zhCnHomeFaqs,
  'zh-TW': zhTwHomeFaqs,
  ko: koHomeFaqs,
  en: enHomeFaqs,
  ja: jaHomeFaqs,
} satisfies Record<Locale, typeof zhCnHomeFaqs>

export function getHomeFaqs(locale: Locale) {
  return homeFaqs[locale]
}

export function getLocalizedBlogPostExcerpt(
  blogPost: BlogPost,
  locale: Locale,
) {
  const excerpt = sanitizeBlogExcerpt(blogPost.excerpt)

  if (locale === 'ko') return excerpt && /[가-힣]/.test(excerpt) ? excerpt : `${blogPost.title || 'POKOPIE'}의 게임 가이드와 브라우저 플레이 팁을 읽어보세요.`

  if (locale === 'en') {
    return excerpt && !/[\u3400-\u9fff]/.test(excerpt)
      ? excerpt
      : getEnglishBlogPostFallback(blogPost)
  }

  if (excerpt && isLocalizedText(excerpt, locale)) {
    return excerpt
  }

  const title = blogPost.title?.trim() || getI18n(locale).home.blogPostFallback

  if (locale === 'ja') {
    return `POKOPIEの「${title}」を読み、ブラウザーで遊べるレトロゲーム、エミュレーター体験、関連タイトルをチェックしましょう。`
  }

  return `阅读 POKOPIE 的《${title}》，了解浏览器复古游戏、模拟器体验和相关经典作品。`
}

function sanitizeBlogExcerpt(value: string | undefined) {
  return value
    ?.replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/!\[[^\]]*]\([^)]*$/g, '')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/(^|\s)#{1,6}\s+/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\bGGEMU(?:\.com)?\b/gi, 'POKOPIE')
    .replace(/\s+/g, ' ')
    .trim()
}

function getEnglishBlogPostFallback(blogPost: BlogPost) {
  const title = blogPost.title?.trim() || 'this POKOPIE guide'

  return `Read ${title} on POKOPIE for browser retro games, emulator tips, and related classic titles.`
}

function isLocalizedText(value: string, locale: Locale) {
  if (locale === 'zh-TW') {
    return /[一-鿿]/.test(value)
  }

  if (locale === 'zh-CN') {
    return /[\u4e00-\u9fff]/.test(value)
  }

  if (locale === 'ja') {
    return /[\u3040-\u30ff\u4e00-\u9fff]/.test(value)
  }

  return true
}

const localizedPlatformLabels: Record<Locale, Record<string, string>> = {
  en: {},
  'zh-TW': {
    Arcade: '街機',
    Famicom: '紅白機',
    'Game Boy': 'Game Boy',
    'Game Boy Advance': 'GBA',
    'Game Boy Color': 'GBC',
    'Master System': 'Master System',
    NES: 'NES',
    'Nintendo 64': 'N64',
    'Nintendo DS': 'Nintendo DS',
    'PlayStation 1': 'PS1',
    'PlayStation Portable': 'PSP',
    'Sega Genesis': 'Sega Genesis',
    'Super Famicom': 'Super Famicom',
  },
  ko: { Arcade: '아케이드', Action: '액션', Adventure: '어드벤처', Cards: '카드', Educational: '교육', Fighting: '격투', Platform: '플랫포머', Puzzle: '퍼즐', Racing: '레이싱', Role: '롤플레잉', RPG: '롤플레잉', Shooter: '슈팅', Simulation: '시뮬레이션', Sports: '스포츠', Strategy: '전략' },
  'zh-CN': {
    Arcade: '街机',
    Famicom: '红白机',
    'Game Boy': 'Game Boy',
    'Game Boy Advance': 'GBA',
    'Game Boy Color': 'GBC',
    'Master System': 'Master System',
    NES: 'NES',
    'Nintendo 64': 'N64',
    'Nintendo DS': 'Nintendo DS',
    'PlayStation 1': 'PS1',
    'PlayStation Portable': 'PSP',
    'Sega Genesis': 'Sega Genesis',
    'Super Famicom': 'Super Famicom',
  },
  ja: {
    Arcade: 'アーケード',
    Famicom: 'ファミコン',
    'Game Boy': 'ゲームボーイ',
    'Game Boy Advance': 'GBA',
    'Game Boy Color': 'ゲームボーイカラー',
    'Master System': 'マスターシステム',
    NES: 'NES',
    'Nintendo 64': 'NINTENDO 64',
    'Nintendo DS': 'ニンテンドーDS',
    'PlayStation 1': 'PS1',
    'PlayStation Portable': 'PSP',
    'Sega Genesis': 'メガドライブ',
    'Super Famicom': 'スーパーファミコン',
  },
}

const localizedCategoryLabels: Record<Locale, Record<string, string>> = {
  en: {},
  'zh-TW': {
    Action: '動作',
    Adventure: '冒險',
    Arcade: '街機',
    Cards: '卡牌',
    Educational: '教育',
    Fighting: '格鬥',
    Platform: '平臺跳躍',
    Puzzle: '益智',
    Racing: '競速',
    Role: '角色扮演',
    RPG: '角色扮演',
    Shooter: '射擊',
    Simulation: '模擬',
    Sports: '體育',
    Strategy: '策略',
  },
  ko: { Arcade: '아케이드', Action: '액션', Adventure: '어드벤처', Cards: '카드', Educational: '교육', Fighting: '격투', Platform: '플랫포머', Puzzle: '퍼즐', Racing: '레이싱', Role: '롤플레잉', RPG: '롤플레잉', Shooter: '슈팅', Simulation: '시뮬레이션', Sports: '스포츠', Strategy: '전략' },
  'zh-CN': {
    Action: '动作',
    Adventure: '冒险',
    Arcade: '街机',
    Cards: '卡牌',
    Educational: '教育',
    Fighting: '格斗',
    Platform: '平台跳跃',
    Puzzle: '益智',
    Racing: '竞速',
    Role: '角色扮演',
    RPG: '角色扮演',
    Shooter: '射击',
    Simulation: '模拟',
    Sports: '体育',
    Strategy: '策略',
  },
  ja: {
    Action: 'アクション',
    Adventure: 'アドベンチャー',
    Arcade: 'アーケード',
    Cards: 'カード',
    Educational: '教育',
    Fighting: '格闘',
    Platform: 'プラットフォーム',
    Puzzle: 'パズル',
    Racing: 'レース',
    Role: 'ロールプレイング',
    RPG: 'ロールプレイング',
    Shooter: 'シューティング',
    Simulation: 'シミュレーション',
    Sports: 'スポーツ',
    Strategy: 'ストラテジー',
  },
}

export function getLocalizedPlatformLabel(value: string | undefined, locale: Locale) {
  const name = value?.trim()

  if (!name) {
    return ''
  }

  return localizedPlatformLabels[locale][name] ?? name
}

export function getLocalizedCategoryLabel(value: string | undefined, locale: Locale) {
  const name = value?.trim()

  if (!name) {
    return ''
  }

  return localizedCategoryLabels[locale][name] ?? name
}

export function getLocalizedCategoryLabels(
  values: Array<string> | undefined,
  locale: Locale,
) {
  return (
    values
      ?.map((value) => getLocalizedCategoryLabel(value, locale))
      .filter(Boolean) ?? []
  )
}

export function getGameDetailFaqs(game: PublicGame, locale: Locale) {
  const name = game.name?.trim() || getFallbackGameName(locale)
  const platform = getLocalizedPlatformLabel(game.platform, locale)
  const developer = game.developer?.trim()
  const category = getLocalizedCategoryLabels(game.categories, locale)[0]

  if (locale === 'ko') return [
    { question: `${name}을 온라인으로 플레이할 수 있나요?`, answer: '게임 페이지의 플레이 버튼을 누르면 브라우저에서 시작할 수 있습니다. 게임 내 언어는 웹사이트 언어와 다를 수 있습니다.' },
    { question: '별도 설치가 필요한가요?', answer: '별도 에뮬레이터 설치 없이 브라우저가 게임 데이터를 불러옵니다.' },
    { question: '어떤 플랫폼의 게임인가요?', answer: `${platform || '클래식 게임'}${category ? ` · ${category}` : ''}. 관련 게임에서 비슷한 작품을 찾아보세요.` },
    { question: '모바일에서도 플레이할 수 있나요?', answer: '호환성과 터치 조작은 게임 및 플레이어에 따라 다릅니다. 플레이어의 조작 설정을 확인하세요.' },
  ]

  if (locale === 'zh-TW') {
    return [
      {
        question: `${name} 可以在線玩嗎？`,
        answer: `可以。${name} 可以直接在瀏覽器中在線遊玩，打開頁面後點擊開始遊戲即可，不需要先安裝模擬器。`,
      },
      {
        question: `玩 ${name} 需要下載文件嗎？`,
        answer: `不需要。${name} 支持免下載遊玩，遊戲會在瀏覽器中啟動，適合快速體驗經典復古遊戲。`,
      },
      {
        question: `${name} 屬於什麼平臺或類型？`,
        answer: `${name}${platform ? ` 是 ${platform} 平臺遊戲` : ' 是一款復古遊戲'}${category ? `，類型包含 ${category}` : ''}。你也可以通過平臺、類型和相關遊戲繼續查找類似作品。`,
      },
      {
        question: `${name} 適合在哪些設備上游玩？`,
        answer: `${name} 通常可以在現代瀏覽器中運行，包括桌面電腦、平板和手機。為了獲得更穩定的體驗，建議使用 Chrome 或其他主流瀏覽器。`,
      },
      ...(developer
        ? [
            {
              question: `${name} 的開發商是誰？`,
              answer: `${name} 的開發商信息為 ${developer}。如果你喜歡這款遊戲，可以繼續瀏覽同開發商或同類型的相關遊戲。`,
            },
          ]
        : []),
    ]
  }

  if (locale === 'zh-CN') {
    return [
      {
        question: `${name} 可以在线玩吗？`,
        answer: `可以。${name} 可以直接在浏览器中在线游玩，打开页面后点击开始游戏即可，不需要先安装模拟器。`,
      },
      {
        question: `玩 ${name} 需要下载文件吗？`,
        answer: `不需要。${name} 支持免下载游玩，游戏会在浏览器中启动，适合快速体验经典复古游戏。`,
      },
      {
        question: `${name} 属于什么平台或类型？`,
        answer: `${name}${platform ? ` 是 ${platform} 平台游戏` : ' 是一款复古游戏'}${category ? `，类型包含 ${category}` : ''}。你也可以通过平台、类型和相关游戏继续查找类似作品。`,
      },
      {
        question: `${name} 适合在哪些设备上游玩？`,
        answer: `${name} 通常可以在现代浏览器中运行，包括桌面电脑、平板和手机。为了获得更稳定的体验，建议使用 Chrome 或其他主流浏览器。`,
      },
      ...(developer
        ? [
            {
              question: `${name} 的开发商是谁？`,
              answer: `${name} 的开发商信息为 ${developer}。如果你喜欢这款游戏，可以继续浏览同开发商或同类型的相关游戏。`,
            },
          ]
        : []),
    ]
  }

  if (locale === 'ja') {
    return [
      {
        question: `${name} はオンラインで遊べますか？`,
        answer: `はい。${name} はブラウザーで直接プレイできます。ゲームページを開いてプレイボタンを押すだけで始められます。`,
      },
      {
        question: `${name} を遊ぶためにダウンロードは必要ですか？`,
        answer: `必要ありません。${name} はダウンロード不要で、ブラウザー内で起動できます。`,
      },
      {
        question: `${name} はどのプラットフォームまたはジャンルのゲームですか？`,
        answer: `${name}${platform ? ` は ${platform} のゲームです` : ' はレトロゲームです'}${category ? `。ジャンルには ${category} が含まれます` : ''}。関連ゲームから似た作品も探せます。`,
      },
      {
        question: `${name} はどの端末で遊べますか？`,
        answer: `${name} は多くのモダンブラウザーで動作し、PC、タブレット、スマートフォンでプレイできます。安定した体験には Chrome などの主要ブラウザーをおすすめします。`,
      },
      ...(developer
        ? [
            {
              question: `${name} の開発元はどこですか？`,
              answer: `${name} の開発元情報は ${developer} です。同じ開発元や同じジャンルの関連ゲームも確認できます。`,
            },
          ]
        : []),
    ]
  }

  return [
    {
      question: `Can I play ${name} online?`,
      answer: `Yes. You can play ${name} directly in your browser. Open the game page and click play to start without setting up an emulator first.`,
    },
    {
      question: `Do I need to download anything to play ${name}?`,
      answer: `No. ${name} is available as a no-download browser game, so you can start playing without installing extra software or downloading files.`,
    },
    {
      question: `What platform or genre is ${name}?`,
      answer: `${name}${platform ? ` is a ${platform} game` : ' is a retro game'}${category ? ` in the ${category} category` : ''}. You can use the platform, genre, and related games sections to find similar titles.`,
    },
    {
      question: `What devices can run ${name}?`,
      answer: `${name} usually works in modern browsers on desktop, tablet, and mobile devices. For the most stable gameplay experience, use Chrome or another mainstream browser.`,
    },
    ...(developer
      ? [
          {
            question: `Who developed ${name}?`,
            answer: `${name} is listed with developer information for ${developer}. You can also browse related games from the same developer or genre.`,
          },
        ]
      : []),
  ]
}

function getFallbackGameName(locale: Locale) {
  if (locale === 'zh-TW') {
    return '這款遊戲'
  }

  if (locale === 'zh-CN') {
    return '这款游戏'
  }

  if (locale === 'ja') {
    return 'このゲーム'
  }

  return 'this game'
}

function compactText(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 1).trim()}...`
}

export function buildGameDetailSeo(game: PublicGame, locale: Locale) {
  const name = game.name?.trim() || 'Retro Game'
  const platform = getLocalizedPlatformLabel(game.platform, locale)
  const year = game.released_year?.trim()
  const categoryText = getLocalizedCategoryLabels(game.categories, locale)
    .slice(0, 3)
    .join(', ')
  const baseDescription = game.description ? compactText(game.description) : ''
  const localizedDescription = getGameDetailSummary(game, locale)

  if (locale === 'ko') return { title: `${name} 온라인 게임 | ${platform || 'POKOPIE'}`, description: getGameDetailSummary(game, locale), keywords: [name, platform, '레트로 게임', '브라우저 게임'].filter(Boolean).join(', ') }

  if (locale === 'zh-TW') {
    return {
      title: [`${name} 在線玩`, platform, year, '瀏覽器免下載']
        .filter(Boolean)
        .join(' | '),
      description: truncateText(localizedDescription, 155),
      keywords: [
        `${name} 在線玩`,
        `${name} online`,
        platform ? `${platform} 遊戲在線玩` : '',
        categoryText,
        '復古遊戲',
        '瀏覽器遊戲',
        '免下載遊戲',
      ]
        .filter(Boolean)
        .join(', '),
    }
  }

  if (locale === 'zh-CN') {
    return {
      title: [`${name} 在线玩`, platform, year, '浏览器免下载']
        .filter(Boolean)
        .join(' | '),
      description: truncateText(localizedDescription, 155),
      keywords: [
        `${name} 在线玩`,
        `${name} online`,
        platform ? `${platform} 游戏在线玩` : '',
        categoryText,
        '复古游戏',
        '浏览器游戏',
        '免下载游戏',
      ]
        .filter(Boolean)
        .join(', '),
    }
  }

  if (locale === 'ja') {
    return {
      title: [`${name} をオンラインでプレイ`, platform, year, 'ダウンロード不要']
        .filter(Boolean)
        .join(' | '),
      description: truncateText(localizedDescription, 155),
      keywords: [
        `${name} オンライン`,
        `${name} play online`,
        platform ? `${platform} ゲーム` : '',
        categoryText,
        'レトロゲーム',
        'ブラウザーゲーム',
        'ダウンロード不要',
      ]
        .filter(Boolean)
        .join(', '),
    }
  }

  return {
    title: [`Play ${name} Online`, platform, year, 'No Download']
      .filter(Boolean)
      .join(' | '),
    description: truncateText(
      baseDescription ||
        `Play ${name}${platform ? ` for ${platform}` : ''} online in your browser. No download required.`,
      155,
    ),
    keywords: [
      `play ${name} online`,
      `${name} browser game`,
      platform ? `${platform} games online` : '',
      categoryText,
      'retro games online',
      'no download games',
      'browser emulator games',
    ]
      .filter(Boolean)
      .join(', '),
  }
}

export function getGameDetailSummary(game: PublicGame, locale: Locale) {
  const name = game.name?.trim() || getFallbackGameName(locale)
  const platform = getLocalizedPlatformLabel(game.platform, locale)
  const year = game.released_year?.trim()
  const baseDescription = game.description ? compactText(game.description) : ''

  if (locale === 'ko') return `${name}${platform ? ` (${platform})` : ''}을 브라우저에서 즐기세요. 별도 설치 없이 플레이 버튼으로 시작할 수 있습니다.`

  if (locale === 'zh-TW') {
    return compactText(
      `在線遊玩 ${name}${platform ? `（${platform}）` : ''}${year ? `，這是一款 ${year} 年發佈的經典復古遊戲` : ' 經典復古遊戲'}。瀏覽器直接啟動，無需下載。`,
    )
  }

  if (locale === 'zh-CN') {
    return compactText(
      `在线游玩 ${name}${platform ? `（${platform}）` : ''}${year ? `，这是一款 ${year} 年发布的经典复古游戏` : ' 经典复古游戏'}。浏览器直接启动，无需下载。`,
    )
  }

  if (locale === 'ja') {
    return compactText(
      `${name}${platform ? `（${platform}）` : ''}${year ? `は${year}年発売のレトロゲームです` : 'をオンラインでプレイできます'}。ブラウザーでそのまま遊べて、ダウンロードは不要です。`,
    )
  }

  return (
    baseDescription ||
    `Play ${name}${platform ? ` for ${platform}` : ''} online in your browser. No download required.`
  )
}

export function getGameDetailKeywordText(game: PublicGame, locale: Locale) {
  const name = game.name?.trim() || getFallbackGameName(locale)
  const platform = getLocalizedPlatformLabel(game.platform, locale)

  if (locale === 'ko') return [name, platform, '레트로 게임', '브라우저 게임', 'POKOPIE'].filter(Boolean).join(', ')

  if (locale === 'zh-TW') {
    return [
      `${name} 在線玩`,
      platform ? `${platform} 復古遊戲` : '',
      '瀏覽器遊戲',
      '免下載',
      'POKOPIE',
    ]
      .filter(Boolean)
      .join(', ')
  }

  if (locale === 'zh-CN') {
    return [
      `${name} 在线玩`,
      platform ? `${platform} 复古游戏` : '',
      '浏览器游戏',
      '免下载',
      'POKOPIE',
    ]
      .filter(Boolean)
      .join(', ')
  }

  if (locale === 'ja') {
    return [
      `${name} オンライン`,
      platform ? `${platform} レトロゲーム` : '',
      'ブラウザーゲーム',
      'ダウンロード不要',
      'POKOPIE',
    ]
      .filter(Boolean)
      .join(', ')
  }

  return game.keywords?.trim() || buildGameDetailSeo(game, locale).keywords
}

export function getGameDetailHowToPlay(game: PublicGame, locale: Locale) {
  const name = game.name?.trim() || getFallbackGameName(locale)
  const platform = getLocalizedPlatformLabel(game.platform, locale)
  const baseHowToPlay = game.how_to_play ? compactText(game.how_to_play) : ''

  if (locale === 'ko') return `${name}의 플레이 버튼을 누르고 플레이어에 Start가 표시되면 선택하세요. 키보드나 지원되는 터치 버튼으로 조작하며, 실제 키 설정과 저장 옵션은 플레이어 메뉴에서 확인하세요.`

  if (locale === 'zh-TW') {
    return compactText(
      `點擊“開始遊戲”即可在瀏覽器中啟動 ${name}${platform ? `（${platform}）` : ''}。使用鍵盤或手柄按頁面內模擬器提示操作；如需調整按鍵、保存進度或切換全屏，請進入遊戲後使用模擬器菜單。`,
    )
  }

  if (locale === 'zh-CN') {
    return compactText(
      `点击“开始游戏”即可在浏览器中启动 ${name}${platform ? `（${platform}）` : ''}。使用键盘或手柄按页面内模拟器提示操作；如需调整按键、保存进度或切换全屏，请进入游戏后使用模拟器菜单。`,
    )
  }

  if (locale === 'ja') {
    return compactText(
      `「プレイ」を押すと、${name}${platform ? `（${platform}）` : ''} がブラウザーで起動します。キーボードまたはゲームパッドで操作し、キー設定、セーブ、全画面表示はゲーム画面内のエミュレーターメニューから調整できます。`,
    )
  }

  return (
    baseHowToPlay ||
    `Select Play to launch ${name}${platform ? ` for ${platform}` : ''} in your browser. Use the emulator menu to adjust controls, save progress, or enter fullscreen mode.`
  )
}
