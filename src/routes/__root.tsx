import type { ReactNode } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'

import { ThirdPartyScripts } from '#/components/third-party-scripts'
import { getI18n } from '#/lib/i18n'
import { getDocumentLang, getSeoOrigin } from '#/lib/seo'
import { serializeSiteConfig, siteConfig } from '#/lib/site-config'
import { getSiteThemeInitScript } from '#/lib/site-themes'
import appCss from '../styles.css?url'

const defaultSocialImagePath = '/og.png'
const rootSecurityHeaders = {
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
} as const
const embeddableRootSecurityHeaders = {
  'Referrer-Policy': rootSecurityHeaders['Referrer-Policy'],
  'Strict-Transport-Security': rootSecurityHeaders['Strict-Transport-Security'],
  'X-Content-Type-Options': rootSecurityHeaders['X-Content-Type-Options'],
} as const
const defaultRootSeo = {
  title: '在线玩经典复古游戏 | POKOPIE',
  description:
    '在 POKOPIE 直接用浏览器游玩 GBA、NES、SNES、PS1、N64、Sega Genesis、街机等经典复古游戏，无需下载。',
  keywords:
    'POKOPIE, 在线复古游戏, GBA 在线游戏, NES 在线游戏, SNES 在线游戏, PS1 在线游戏, N64 在线游戏, 街机游戏, 浏览器游戏, 免下载游戏',
}

function getDefaultSocialImage(origin?: string) {
  return origin ? `${origin}${defaultSocialImagePath}` : defaultSocialImagePath
}

function getPwaInstallInitScript() {
  return `
    window.__POKOPIE_INSTALL_PROMPT__=null;
    window.addEventListener('beforeinstallprompt',function(event){
      event.preventDefault();
      window.__POKOPIE_INSTALL_PROMPT__=event;
      window.dispatchEvent(new Event('pokopie:installprompt'));
    });
    if('serviceWorker' in navigator){
      window.addEventListener('load',function(){
        navigator.serviceWorker.register('/sw.js').catch(function(){});
      },{once:true});
    }
  `
}

export const Route = createRootRoute({
  headers: ({ matches }) =>
    matches.some((match) => String(match.routeId).startsWith('/embed/'))
      ? embeddableRootSecurityHeaders
      : rootSecurityHeaders,
  loader: () => getSeoOrigin(),
  head: ({ loaderData }) => {
    const defaultSocialImage = getDefaultSocialImage(loaderData)

    return {
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
        {
          title: defaultRootSeo.title,
        },
        {
          name: 'description',
          content: defaultRootSeo.description,
        },
        {
          name: 'keywords',
          content: defaultRootSeo.keywords,
        },
        {
          property: 'og:title',
          content: defaultRootSeo.title,
        },
        {
          property: 'og:site_name',
          content: siteConfig.SITE_NAME,
        },
        {
          property: 'og:description',
          content: defaultRootSeo.description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: defaultSocialImage,
        },
        {
          property: 'og:image:type',
          content: 'image/png',
        },
        {
          property: 'og:image:width',
          content: '1200',
        },
        {
          property: 'og:image:height',
          content: '630',
        },
        {
          property: 'og:image:alt',
          content: defaultRootSeo.title,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: defaultRootSeo.title,
        },
        {
          name: 'twitter:description',
          content: defaultRootSeo.description,
        },
        {
          name: 'twitter:image',
          content: defaultSocialImage,
        },
        {
          name: 'twitter:image:alt',
          content: defaultRootSeo.title,
        },
      ],
      links: [
        {
          rel: 'stylesheet',
          href: appCss,
        },
        {
          rel: 'icon',
          href: '/icon-192.png',
          type: 'image/png',
        },
        {
          rel: 'apple-touch-icon',
          href: '/icon-512.png',
        },
        {
          rel: 'manifest',
          href: '/manifest.webmanifest',
        },
      ],
    }
  },
  component: RootComponent,
  errorComponent: MaintenanceErrorComponent,
  shellComponent: RootDocument,
})

function RootComponent() {
  return <Outlet />
}

function MaintenanceErrorComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const locale = getDocumentLang(pathname)
  const messages = getMaintenanceMessages(locale)
  const tagline = getI18n(locale).layout.tagline

  return (
    <main className="min-h-screen bg-base-100 px-4 py-16 text-base-content sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
        <img
          alt={siteConfig.SITE_NAME}
          className="h-20 w-20 rounded-2xl object-contain"
          height="128"
          src="/logo-128.png"
          width="128"
        />
        <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
          {siteConfig.SITE_NAME}
        </h1>
        <p className="mt-2 max-w-full truncate text-base font-medium text-primary">
          {tagline}
        </p>
        <h2 className="mt-8 text-2xl font-semibold leading-tight sm:text-3xl">
          {messages.title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-base-content/70">
          {messages.description}
        </p>
      </section>
    </main>
  )
}

function getMaintenanceMessages(locale: string) {
  if (locale === 'en') {
    return {
      title: 'The server is under maintenance',
      description: 'Scheduled maintenance is in progress. We will be back online shortly.',
    }
  }

  if (locale === 'ja') {
    return {
      title: 'サーバーはメンテナンス中です',
      description: '予定メンテナンスを実施しています。まもなく再開します。',
    }
  }

  return {
    title: '服务器维护中',
    description: '我们正在进行计划维护，很快恢复访问。',
  }
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  return (
    <html lang={getDocumentLang(pathname)}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: getSiteThemeInitScript(),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: getPwaInstallInitScript(),
          }}
        />
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__SITE_CONFIG__=${serializeSiteConfig()}`,
          }}
        />
        <ThirdPartyScripts pathname={pathname} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
