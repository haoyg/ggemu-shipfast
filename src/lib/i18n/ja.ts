import { siteConfig } from '#/lib/site-config'
import type { HomeFaqs, I18nMessages } from './types'

export const jaMessages = {
  layout: {
    games: 'ホーム',
    live: 'ゲーム配信',
    explore: '探す',
    playMyRom: '自分の ROM で遊ぶ',
    blog: 'ブログ',
    about: '私たちについて',
    legal: '法的情報',
    privacyPolicy: 'プライバシーポリシー',
    termsOfService: '利用規約',
    theme: 'テーマ',
    language: '言語',
    tagline: 'POKOPIEでレトロゲームをプレイ',
    get copyright() {
      return `Copyright 2025 ${siteConfig.SITE_NAME}`
    },
    get disclaimer() {
      return `すべてのゲーム ROM / プログラムはユーザー投稿またはインターネット上で収集されたものです。著作権はそれぞれの権利者に帰属します。問題がある場合は ${siteConfig.SITE_EMAIL} までご連絡ください。該当するコンテンツを削除します。`
    },
    footer:
      'クラシックなレトロゲームをブラウザーでそのままプレイ。ダウンロードは不要です。',
  },
  home: {
    title: 'レトロゲームをオンラインでプレイ',
    subtitle:
      'GBA、NES、SNES、PS1、N64、Sega Genesis、アーケードなどの名作をブラウザーでそのまま遊べます。ダウンロードは不要です。',
    searchPlaceholder: 'ゲーム名、プラットフォーム、シリーズを検索...',
    search: '検索',
    closeSearch: '検索を閉じる',
    reset: 'リセット',
    allPlatforms: 'すべてのプラットフォーム',
    allCategories: 'すべてのカテゴリー',
    newest: '新着',
    popular: '人気',
    oldest: '古い順',
    nameAsc: '名前 A-Z',
    sortBy: '並び順',
    empty: 'ゲームが見つかりません',
    previous: '前へ',
    next: '次へ',
    page: '{page} / {pages} ページ',
    totalGames: '全 {total} 件のゲーム',
    views: '閲覧',
    plays: 'プレイ',
    details: '詳細を見る',
    featured: 'オンライン対応レトロゲーム',
    recentlyPlayed: '最近プレイしたゲーム',
    latestBlogPosts: '最新ブログ記事',
    latestBlogSubtitle:
      '最新のゲームガイド、ブラウザーでの遊び方、レトロゲーム記事を読めます。',
    viewAllBlog: 'すべての記事を見る',
    blogPostFallback: 'ブログ記事',
    loadError: 'ゲームを読み込めませんでした。接続を確認して、もう一度お試しください。',
    loading: 'ゲームを読み込み中…',
    retry: '再試行',
  },
  homeSeo: {
    title: 'レトロゲームをオンラインでプレイ | ダウンロード不要',
    description:
      'GBA、NES、SNES、PS1、N64、Sega Genesis、アーケードなどの名作レトロゲームをブラウザーでそのまま遊べます。',
    keywords:
      'レトロゲーム オンライン, GBA ゲーム, NES ゲーム, SNES ゲーム, PS1 ゲーム, N64 ゲーム, アーケードゲーム, ブラウザーゲーム, ダウンロード不要',
  },
  homeContent: {
    whyTitle: 'レトロゲームをオンラインで遊ぶ理由',
    whyBody:
      'POKOPIE では、エミュレーターのインストール、ファイルのダウンロード、アカウント登録なしでクラシックゲームをすぐに遊べます。ゲーム詳細ページを開いてプレイボタンを押すだけで、ブラウザー内でゲームが起動します。NES、SNES、GBA、PS1、アーケード、Sega Genesis、N64 など複数のプラットフォームを横断して探せるため、タイトル検索やプラットフォーム別の閲覧がしやすい構成です。各ゲームには専用ページがあり、カバー画像、説明、プラットフォーム情報、遊び方、関連ゲーム、共有機能を掲載しています。',
    howTitle: '遊び方',
    howSteps: [
      {
        title: 'ゲームを選ぶ',
        body: '検索するか、NES、SNES、GBA、PS1、アーケードなどのプラットフォームから探します。',
      },
      {
        title: '詳細ページを開く',
        body: 'カードをクリックすると、ゲーム専用ページで説明や関連ゲームを確認できます。',
      },
      {
        title: 'ブラウザーで開始',
        body: 'プレイボタンを押し、キーボード、タッチ操作、対応するゲームパッドで遊びます。',
      },
    ],
  },
  detail: {
    home: 'ゲーム',
    play: '今すぐプレイ',
    install: 'ダウンロード',
    installUnavailable:
      'インストール機能を準備中です。ブラウザーに表示されない場合は、このページを更新してもう一度お試しください。',
    installDismissed: 'インストールをキャンセルしました。',
    installGuideTitle: 'このゲームをホーム画面に追加',
    installGuideIntro:
      'ブラウザーのインストール画面が表示されませんでした。手動で追加できます。',
    installGuideIos:
      'iPhone または iPad: Safari でこのページを開き、共有ボタンをタップして「ホーム画面に追加」を選びます。',
    installGuideAndroid:
      'Android: Chrome でこのページを開き、メニューまたは共有ボタンから「アプリをインストール」または「ホーム画面に追加」を選びます。',
    installGuideDesktop:
      'デスクトップ版 Chrome または Edge: アドレスバーのインストールアイコン、またはブラウザーメニューから「アプリをインストール」を選びます。',
    installGuideClose: '閉じる',
    share: '共有',
    generatePoster: 'ポスターを生成',
    systemShare: 'システム共有',
    copyEmbedCode: '埋め込みコードをコピー',
    embedCodeCopied: '埋め込みコードをコピーしました。',
    embedCardTitle: 'このゲームを埋め込む',
    embedCardDescription:
      '他のサイトにこのプレイ可能なゲームを表示し、POKOPIE へのリンクを残せます。',
    embedCodeLabel: 'Iframe 埋め込みコード',
    posterTitle: '共有ポスター',
    downloadPoster: 'ポスターをダウンロード',
    posterScanCta: 'スキャンしてすぐプレイ。ダウンロード不要',
    shareUnavailableCopied: 'システム共有を利用できないため、リンクをコピーしました。',
    overview: '概要',
    keywords: 'キーワード',
    howToPlay: '遊び方',
    details: 'ゲーム情報',
    platform: 'プラットフォーム',
    developer: '開発元',
    released: '発売年',
    players: 'プレイヤー',
    views: '閲覧',
    plays: 'プレイ',
    categories: 'ジャンル',
    languages: '言語',
    noData: 'なし',
    browserReady: 'ブラウザーでプレイ',
    noDownload: 'ダウンロード不要',
    faq: 'よくある質問',
    relatedGames: '関連ゲーム',
  },
  about: {
    title: '概要',
    get description() {
      return `ブラウザーで遊べるレトロゲームサイト ${siteConfig.SITE_NAME} について。`
    },
  },
  blog: {
    title: 'ブログ',
    description:
      'ゲームガイド、ブラウザーでの遊び方、レトロゲーム関連記事を読めます。',
    subtitle:
      'ゲームガイド、ブラウザーでの遊び方、レトロゲーム関連記事を読めます。',
    eyebrow: 'ブログ',
    empty: '記事はまだありません',
    total: '全 {total} 件の記事',
    relatedPosts: '関連記事',
  },
  live: {
    title: 'ゲーム配信',
    description: '現在配信中のクラシックゲームとライブ配信ルームを探せます。',
    subtitle:
      'みんなが今配信しているクラシックゲームをチェックして、次に遊ぶ作品を見つけましょう。',
    eyebrow: '配信中',
    empty: '現在配信中のゲームはありません',
    total: '全 {total} 件のライブ配信',
    watchLive: '配信を見る',
    playGame: 'ゲームをプレイ',
    closePlayer: '配信を閉じる',
    previous: '前へ',
    next: '次へ',
    page: '{page} / {pages} ページ',
    error: 'ライブ配信を読み込めませんでした。しばらくしてからもう一度お試しください。',
    retry: '再読み込み',
  },
} satisfies I18nMessages

export const jaHomeFaqs = {
  title: 'よくある質問',
  subtitle:
    'オンラインプレイ、ゲーム検索、プラットフォーム別フィルター、コンテンツに関する連絡方法を確認できます。',
  items: [
    {
      question: 'これらのレトロゲームはオンラインで遊べますか？',
      answer:
        'はい。ゲーム詳細ページを開いてプレイボタンを押すだけで、エミュレーターをインストールせずにブラウザーで直接遊べます。',
    },
    {
      question: 'エミュレーターや ROM ファイルのダウンロードは必要ですか？',
      answer:
        '必要ありません。ゲーム詳細ページを開くだけで、追加ソフトをインストールせずにブラウザーから直接プレイできます。',
    },
    {
      question: 'どのプラットフォームに対応していますか？',
      answer:
        'Game Boy Advance（GBA）、Game Boy、Game Boy Color（GBC）、Nintendo DS（NDS）、NES / Famicom、SNES / Super Famicom、Nintendo 64（N64）、PlayStation / PS1、Sega Genesis / Genesis、Master System、Sega CD、Neo Geo、Atari、Arcade、MS-DOS / DOS、HTML5、Flash、Java などに対応しています。',
    },
    {
      question: 'どの端末で遊べますか？',
      answer:
        'iOS、Android、iPad、Mac、Windows など、主要なスマートデバイスを幅広くサポートしています。多くのモダンブラウザーで動作しますが、安定した体験には Chrome をおすすめします。',
    },
    {
      question: '探しているゲームが見つからない場合は？',
      answer:
        '英語タイトル、シリーズ名、プラットフォーム名、短いキーワードで検索してみてください。地域によって名前が異なる場合があります。',
    },
    {
      question: '著作権や削除依頼はどう扱われますか？',
      get answer() {
        return `ゲーム ROM / プログラムはユーザー投稿またはインターネット上で収集されたもので、著作権は各権利者に帰属します。削除依頼は ${siteConfig.SITE_EMAIL} までご連絡ください。`
      },
    },
  ],
} satisfies HomeFaqs

export const jaBlogFaqs = {
  title: 'よくある質問',
  subtitle: 'レトロゲームをオンラインでプレイする方法、ゲームガイドの見つけ方、サイトの使い方について説明します。',
  items: [
    {
      question: 'このサイトでレトロゲームをプレイするには？',
      answer: 'ゲームライブラリから好きなゲームをクリックし、ブラウザに直接アクセスするだけでプレイできます。ダウンロードやエミュレータのセットアップは不要です。',
    },
    {
      question: 'ゲームは無料でプレイできますか？',
      answer: 'はい、プラットフォーム上のすべてのゲームは無料でプレイできます。ウェブベースのエミュレーション技術を使用してブラウザで直接動作します。',
    },
    {
      question: 'どのようなレトロゲームがありますか？',
      answer: 'Game Boy Advance、NES、SNES、PlayStation (PS1)、Sega Genesis、Nintendo 64、Arcade など、幅広いプラットフォームのクラシックゲームを取り揃えています。',
    },
    {
      question: 'ゲームガイドや記事は読めますか？',
      answer: 'はい。ブログセクションでは、ゲームガイド、ブラウザでの遊び方、レトロゲーム関連記事をわかりやすく解説しています。',
    },
    {
      question: 'ゲームをプレイするためにアカウント作成が必要ですか？',
      answer: '不要です。ゲームを選ぶだけですぐにプレイを開始できます。',
    },
  ],
} satisfies HomeFaqs
