import { siteConfig } from '#/lib/site-config'
import type { HomeFaqs, I18nMessages } from './types'

export const enMessages = {
  layout: {
    games: 'Home',
    live: 'Live',
    explore: 'Explore',
    playMyRom: 'Play My ROM',
    blog: 'Blog',
    about: 'About Us',
    legal: 'Legal',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    theme: 'Theme',
    language: 'Language',
    tagline: 'Play Retro Games on POKOPIE',
    get copyright() {
      return `Copyright 2025 ${siteConfig.SITE_NAME}`
    },
    get disclaimer() {
      return `All the games ROM / programs are submitted by users or collected from the internet, and the copyrights belong to their respective owners. If you have any issues, please email ${siteConfig.SITE_EMAIL}, and we will remove the corresponding content.`
    },
    footer:
      'Play classic retro games directly in your browser. No downloads required.',
  },
  home: {
    title: 'Play Retro Games Online - No Download Required',
    subtitle:
      'Browse 1500+ classic games from NES, SNES, GBA, PS1, Arcade, Sega Genesis and more. Start instantly in your browser with no downloads or sign-up.',
    searchPlaceholder: 'Search by game title, platform, or series...',
    search: 'Search',
    closeSearch: 'Close search',
    reset: 'Reset',
    allPlatforms: 'All platforms',
    allCategories: 'All categories',
    newest: 'Newest',
    popular: 'Popular',
    oldest: 'Oldest',
    nameAsc: 'Name A-Z',
    sortBy: 'Sort by',
    empty: 'No games found',
    previous: 'Previous',
    next: 'Next',
    page: 'Page {page} / {pages}',
    totalGames: '{total} games',
    views: 'Views',
    plays: 'Plays',
    details: 'Details',
    featured: 'Playable retro games',
    recentlyPlayed: 'Recently played',
    latestBlogPosts: 'Latest Blog Posts',
    latestBlogSubtitle:
      'Read the latest game guides, browser play tips, and retro gaming articles.',
    viewAllBlog: 'View all posts',
    blogPostFallback: 'Blog post',
    loadError: 'Games could not be loaded. Check your connection and try again.',
    loading: 'Loading games…',
    retry: 'Retry',
  },
  homeSeo: {
    title:
      'POKOPIE - Play Retro Games Online Free | NES, SNES, GBA, PS1, Arcade Games',
    description:
      'POKOPIE is a browser-based retro games website where you can play NES, SNES, GBA, PS1, Arcade, Sega Genesis and other classic games online free with no download required.',
    keywords:
      'retro games online, play GBA games online, NES games online, SNES games online, PS1 games online, N64 games online, Sega Genesis games, arcade games online, browser emulator games, no download games',
  },
  homeContent: {
    whyTitle: 'Why Play Retro Games Online?',
    whyBody:
      'POKOPIE makes classic games easy to revisit without installing emulators, downloading ROM files, or creating an account. Open a game page, press play, and the browser loads the game directly on desktop, tablet, or mobile. The library brings together retro favorites across NES, SNES, Game Boy Advance, PlayStation, Arcade, Sega Genesis, Nintendo 64, and more, so you can browse by platform, search by title, and discover related games from the same era. Online retro gaming is useful for quick nostalgia sessions, classroom breaks, casual competition, and testing games before you decide what to play next. Because each game has its own detail page, you also get clear descriptions, platform information, controls guidance, related titles, and share options instead of a bare iframe with no context.',
    howTitle: 'How to Play',
    howSteps: [
      {
        title: 'Choose a game',
        body: 'Search by title or browse a platform such as NES, SNES, GBA, PS1, Arcade, or Sega Genesis.',
      },
      {
        title: 'Open the game page',
        body: 'Every card leads to a dedicated game page with cover art, details, related games, and a play button.',
      },
      {
        title: 'Start in your browser',
        body: 'Press Play Now and use the keyboard, touch controls, or a connected gamepad when supported.',
      },
    ],
  },
  detail: {
    home: 'Games',
    play: 'Play Now',
    playPage: 'Play in new tab',
    playPageHint: 'Opens the game player in a new browser tab.',
    install: 'Download',
    installUnavailable:
      'Install is getting ready. Refresh this page and try again if the browser does not show the prompt.',
    installDismissed: 'Install was cancelled.',
    installGuideTitle: 'Add this game to your home screen',
    installGuideIntro:
      'Your browser did not show the install prompt. You can still add this game manually.',
    installGuideIos:
      'iPhone or iPad: open this page in Safari, tap Share, then choose Add to Home Screen.',
    installGuideAndroid:
      'Android: open this page in Chrome, tap the menu or Share button, then choose Install app or Add to Home screen.',
    installGuideDesktop:
      'Desktop Chrome or Edge: use the install icon in the address bar, or open the browser menu and choose Install app.',
    installGuideClose: 'Got it',
    share: 'Share',
    copyFailed: 'Copy failed. Please copy the page URL or select the embed code manually.',
    posterFailed: 'Could not generate the poster. Please try again.',
    generatePoster: 'Generate Poster',
    systemShare: 'System Share',
    copyEmbedCode: 'Copy Embed Code',
    embedCodeCopied: 'Embed code copied.',
    embedCardTitle: 'Embed This Game',
    embedCardDescription:
      'Let other websites place this playable game on their page with a backlink to POKOPIE.',
    embedCodeLabel: 'Iframe embed code',
    posterTitle: 'Share Poster',
    downloadPoster: 'Download Poster',
    posterScanCta: 'Scan to play instantly. No download needed.',
    shareUnavailableCopied: 'System share is unavailable, so the link was copied.',
    overview: 'Overview',
    keywords: 'Keywords',
    howToPlay: 'How to Play',
    details: 'Game Details',
    platform: 'Platform',
    developer: 'Developer',
    released: 'Released',
    players: 'Players',
    views: 'Views',
    plays: 'Plays',
    categories: 'Genres',
    languages: 'Languages',
    noData: 'Not available',
    browserReady: 'Playable in browser',
    noDownload: 'No download required',
    faq: 'FAQ',
    relatedGames: 'Related Games',
  },
  about: {
    title: 'About',
    get description() {
      return `About ${siteConfig.SITE_NAME}, a browser-based classic retro games website.`
    },
  },
  blog: {
    title: 'Blog',
    description:
      'Read game guides, browser play tips, and retro gaming articles.',
    subtitle:
      'Read game guides, browser play tips, and retro gaming articles.',
    eyebrow: 'Blog',
    empty: 'No posts yet',
    total: '{total} posts',
    relatedPosts: 'Related Posts',
  },
  live: {
    title: 'Game Live',
    description: 'Discover classic games and rooms that are live right now.',
    subtitle: 'See which classic games people are streaming and find your next game.',
    eyebrow: 'Live Now',
    empty: 'No games are live right now',
    total: '{total} live rooms',
    watchLive: 'Watch live',
    playGame: 'Play Game',
    closePlayer: 'Close live stream',
    previous: 'Previous',
    next: 'Next',
    page: 'Page {page} / {pages}',
    error: 'Live rooms could not be loaded. Please try again later.',
    retry: 'Try again',
  },
} satisfies I18nMessages

export const enBlogFaqs = {
  title: 'FAQ',
  subtitle:
    'Learn how to play retro games online, find game guides, and get tips on using our website.',
  items: [
    {
      question: 'How do I play retro games on this website?',
      answer:
        'Simply browse our game library, click on any game you want to play, and start playing directly in your browser. No downloads or emulator setup required.',
    },
    {
      question: 'Are the games free to play?',
      answer:
        'Yes, all games on our platform are free to play. They run directly in your browser using web-based emulation technology.',
    },
    {
      question: 'What types of retro games are available?',
      answer:
        'We offer a wide variety of classic games from platforms including Game Boy Advance, NES, SNES, PlayStation (PS1), Sega Genesis, Nintendo 64, Arcade, and many more.',
    },
    {
      question: 'Can I read game guides and articles?',
      answer:
        'Yes. Our blog section features game guides, browser play tips, and retro gaming articles to help you get the most out of your gaming experience.',
    },
    {
      question: 'Do I need to create an account to play games?',
      answer:
        'No account is required. Simply select a game and start playing immediately.',
    },
  ],
} satisfies HomeFaqs

export const enHomeFaqs = {
  title: 'FAQ',
  subtitle:
    'Learn how to play online, find games, filter by platform, and contact us about content issues.',
  items: [
    {
      question: 'Can I play these retro games online?',
      answer:
        'Yes. Open a game detail page and click play to start the game directly in your browser, with no emulator setup required.',
    },
    {
      question: 'Do I need to download an emulator or ROM files?',
      answer:
        'No. Open a game detail page and start playing directly in the browser without installing extra software.',
    },
    {
      question: 'Which platforms are supported?',
      answer:
        'The library supports Game Boy Advance (GBA), Game Boy, Game Boy Color (GBC), Nintendo DS (NDS), NES / Famicom, SNES / Super Famicom, Nintendo 64 (N64), PlayStation / PS1, Sega Genesis / Genesis, Master System, Sega CD, Neo Geo, Atari, Arcade, MS-DOS / DOS, HTML5, Flash, Java, and more. You can also filter by platform.',
    },
    {
      question: 'Which devices can I play on?',
      answer:
        'We provide broad device support for most mainstream smart devices, including iOS, Android, iPad, Mac, and Windows. Most modern browsers are supported, but we recommend Chrome for the most stable gameplay experience.',
    },
    {
      question: 'What if I cannot find a game?',
      answer:
        'Try searching with the English title, series name, platform name, or shorter keywords. Some games may use regional names.',
    },
    {
      question: 'How do copyright or removal requests work?',
      get answer() {
        return `Game ROMs and programs are submitted by users or collected from the internet, and copyrights belong to their owners. Contact ${siteConfig.SITE_EMAIL} for removal requests.`
      },
    },
  ],
} satisfies HomeFaqs
