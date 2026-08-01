import { createFileRoute } from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'
import type { Locale } from '#/lib/ggemu'
import { normalizeLocale } from '#/lib/i18n'
import { getLocalizedSeoLinks, getSeoOrigin } from '#/lib/seo'
import { siteConfig } from '#/lib/site-config'

const supportedPlatforms = [
  'Arcade',
  'Atari Jaguar',
  'DOS',
  'FLASH',
  'Famicom',
  'Game Boy',
  'Game Boy Advance',
  'Game Boy Color',
  'Game Gear',
  'Genesis',
  'HTML5',
  'Java',
  'Master System',
  'Neo Geo Pocket Color',
  'Nintendo 64',
  'Nintendo DS',
  'Nintendo Switch',
  'PC Engine',
  'PlayStation 1',
  'PlayStation Portable',
  'Sega 32X',
  'Sega CD',
  'Sega Genesis',
  'Sega Saturn',
  'Super Famicom',
  'Virtual Boy',
  'WonderSwan',
  'WonderSwan Color',
]

type AboutCopy = {
  eyebrow: string
  title: string
  description: string
  keywords: string
  intro: string
  platformTitle: string
  platformBody: (platforms: string) => string
  sections: Array<{ title: string; body: string }>
}

function getAboutCopies(siteName: string): Record<Locale, AboutCopy> {
  return {
    'zh-CN': {
      eyebrow: '关于',
      title: `关于 ${siteName}`,
      description: `了解 ${siteName}，一个支持 Arcade、Famicom、Game Boy、GBA、Nintendo DS、Nintendo 64、PlayStation 1、Sega Genesis 等平台的浏览器复古游戏网站。`,
      keywords:
        '经典游戏在线玩, 复古游戏在线玩, 街机游戏在线玩, GBA 在线游戏, NES 在线游戏, SNES 在线游戏, PS1 在线游戏, N64 在线游戏, 浏览器游戏, 免下载游戏',
      intro: `${siteName} 面向想要快速浏览、搜索并在浏览器里游玩经典游戏的玩家。网站重点是快速发现游戏、清晰展示游戏信息，并在可用时直接进入可游玩版本。`,
      platformTitle: '支持的游戏平台',
      platformBody: (platforms) =>
        `游戏库面向正在搜索经典和复古游戏的玩家，覆盖 ${platforms} 等平台。具体覆盖范围取决于可用游戏数据和浏览器兼容性。`,
      sections: [
        {
          title: '网站提供什么',
          body:
            '本网站提供一种基于浏览器的方式来发现并在线游玩经典游戏。访客可以浏览游戏库，按标题、平台、类型或系列搜索，打开游戏详情页，并直接从浏览器启动可玩的游戏。',
        },
        {
          title: '游戏搜索与发现',
          body:
            '目录围绕常见搜索需求组织，例如 GBA 在线游戏、浏览器 NES 游戏、SNES 经典作品、PS1 在线游戏、N64 游戏、Sega Genesis 游戏、街机游戏和免下载复古游戏。',
        },
        {
          title: '浏览器游玩',
          body:
            '支持的游戏设计为从游戏页面直接启动，不需要单独安装桌面应用。可用性、性能和控制体验可能因游戏、浏览器、设备和网络情况而不同。',
        },
        {
          title: '内容与可用性',
          body:
            '游戏信息、媒体和可玩状态可能随时间变化。如果内容不可用、不准确或需要审核，用户可以通过公开联系方式联系网站运营者。',
        },
      ],
    },
    en: {
      eyebrow: 'About',
      title: `About ${siteName}`,
      description: `Learn about ${siteName}, a browser-based classic games website for Arcade, Famicom, Game Boy, Game Boy Advance, Nintendo DS, Nintendo 64, PlayStation 1, Sega Genesis and other supported platforms online.`,
      keywords:
        'classic games online, retro games online, arcade games online, Famicom games online, Game Boy games online, Game Boy Advance games online, Nintendo DS games online, Nintendo 64 games online, PlayStation 1 games online, Sega Genesis games, browser games, no download games',
      intro: `${siteName} is built for visitors who want a simple way to browse, search, and play classic games in the browser. The focus is fast discovery across supported platforms, clear game information, and direct access to playable titles when available.`,
      platformTitle: 'Supported game platforms',
      platformBody: (platforms) =>
        `The catalog is designed for players searching for classic and retro games from platforms such as ${platforms}. Platform coverage depends on available game data and browser compatibility.`,
      sections: [
        {
          title: 'What this site offers',
          body:
            'This website provides a browser-based way to discover and play classic games online. Visitors can browse a game library, search by title, platform, genre, or series, open game detail pages, and start playable games directly from the browser.',
        },
        {
          title: 'Game search and discovery',
          body:
            'The catalog is organized for common search intent such as play GBA games online, NES games in browser, SNES classics, PS1 games online, N64 games, Sega Genesis titles, arcade games, and no-download retro games.',
        },
        {
          title: 'Browser play',
          body:
            'Supported games are designed to launch from the game page without requiring a separate desktop application. Availability, performance, and controls may vary by game, browser, device, and network conditions.',
        },
        {
          title: 'Content and availability',
          body:
            'Game information, media, and playable availability may change over time. If content is unavailable, inaccurate, or should be reviewed, users can contact the site operator through the published contact channel.',
        },
      ],
    },
    ja: {
      eyebrow: '概要',
      title: `${siteName} について`,
      description: `${siteName} は Arcade、Famicom、Game Boy、GBA、Nintendo DS、Nintendo 64、PlayStation 1、Sega Genesis などに対応するブラウザーベースのレトロゲームサイトです。`,
      keywords:
        'クラシックゲーム オンライン, レトロゲーム オンライン, アーケードゲーム, GBA ゲーム, NES ゲーム, SNES ゲーム, PS1 ゲーム, N64 ゲーム, ブラウザーゲーム, ダウンロード不要',
      intro: `${siteName} は、クラシックゲームをブラウザーで簡単に探して遊びたい訪問者向けに作られています。対応プラットフォームをすばやく見つけられること、分かりやすいゲーム情報、利用可能なタイトルへの直接アクセスを重視しています。`,
      platformTitle: '対応ゲームプラットフォーム',
      platformBody: (platforms) =>
        `このカタログは、${platforms} などのクラシックゲームやレトロゲームを探すプレイヤー向けに構成されています。対応範囲は利用可能なゲームデータとブラウザー互換性によって異なります。`,
      sections: [
        {
          title: 'このサイトでできること',
          body:
            '本サイトでは、ブラウザー上でクラシックゲームを見つけてオンラインで遊べます。ゲームライブラリの閲覧、タイトル、プラットフォーム、ジャンル、シリーズによる検索、詳細ページからの直接プレイが可能です。',
        },
        {
          title: 'ゲーム検索と発見',
          body:
            'カタログは、GBA オンラインゲーム、ブラウザーで遊べる NES、SNES 名作、PS1 オンラインゲーム、N64、Sega Genesis、アーケードゲーム、ダウンロード不要のレトロゲームなどの検索意図に合わせて整理されています。',
        },
        {
          title: 'ブラウザーでプレイ',
          body:
            '対応ゲームは、別のデスクトップアプリを必要とせず、ゲームページから起動できるよう設計されています。利用可否、性能、操作性はゲーム、ブラウザー、端末、ネットワーク状況によって異なる場合があります。',
        },
        {
          title: 'コンテンツと提供状況',
          body:
            'ゲーム情報、メディア、プレイ可能状況は時間とともに変わる場合があります。コンテンツが利用できない、不正確、または確認が必要な場合は、公開されている連絡先から運営者へお問い合わせください。',
        },
      ],
    },
  }
}

const platformSearchTerms = supportedPlatforms.join(', ')

export const Route = createFileRoute('/$locale/about')({
  loader: () => getSeoOrigin(),
  head: ({ loaderData, params }) => {
    const locale = normalizeLocale(params.locale)
    const copy = getAboutCopies(siteConfig.SITE_NAME)[locale]

    return {
      links: loaderData
        ? getLocalizedSeoLinks({
            locale,
            origin: loaderData,
            path: '/about',
          })
        : undefined,
      meta: [
        { title: copy.title },
        { name: 'description', content: copy.description },
        { name: 'keywords', content: copy.keywords },
      ],
    }
  },
  component: AboutPage,
})

function AboutPage() {
  const { locale } = Route.useParams()
  const lang = normalizeLocale(locale)
  const copy = getAboutCopies(siteConfig.SITE_NAME)[lang]

  return (
    <SiteLayout locale={lang}>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {copy.eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight">
          {copy.title}
        </h1>
        <p className="mt-5 text-base leading-7 text-base-content/70">
          {copy.intro}
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">{copy.platformTitle}</h2>
          <p className="mt-3 leading-7 text-base-content/70">
            {copy.platformBody(platformSearchTerms)}
          </p>
        </section>

        <div className="mt-10 grid gap-5">
          {copy.sections.map((section) => (
            <article
              className="rounded-lg border border-base-300 bg-base-100 p-5"
              key={section.title}
            >
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <p className="mt-3 leading-7 text-base-content/70">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  )
}
