import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import type { Locale } from '#/lib/ggemu'
import { getI18n, normalizeLocale } from '#/lib/i18n'
import { getPoweredByLabel } from '#/lib/locale-labels'
import { siteConfig } from '#/lib/site-config'
import { getSiteThemes, normalizeSiteTheme } from '#/lib/site-themes'

export function SiteLayout({
  children,
  headerActions,
  hideHeaderNav = false,
  locale,
  localePaths,
}: {
  children: ReactNode
  headerActions?: ReactNode
  hideHeaderNav?: boolean
  locale: Locale
  localePaths?: Partial<Record<Locale, string>>
}) {
  const t = getI18n(locale).layout
  const location = useRouterState({ select: (state) => state.location })
  const siteThemes = getSiteThemes()
  const [theme, setTheme] = useState(() => normalizeSiteTheme(null))
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
  const [isLocaleMenuOpen, setIsLocaleMenuOpen] = useState(false)
  const themeMenuRef = useRef<HTMLDetailsElement>(null)
  const localeMenuRef = useRef<HTMLDetailsElement>(null)
  const canSwitchTheme = siteThemes.length > 1

  useEffect(() => {
    const storedTheme = normalizeSiteTheme(
      window.localStorage.getItem('retro-games-theme'),
    )
    setTheme(storedTheme)
    document.documentElement.dataset.theme = storedTheme
  }, [])

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (
        !themeMenuRef.current?.contains(target) &&
        !localeMenuRef.current?.contains(target)
      ) {
        setIsThemeMenuOpen(false)
        setIsLocaleMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  function handleThemeChange(nextTheme: string) {
    setTheme(nextTheme)
    setIsThemeMenuOpen(false)
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem('retro-games-theme', nextTheme)
  }

  function handleLocaleChange(nextValue: string) {
    const nextLocale = normalizeLocale(nextValue)
    const nextPath = localePaths?.[nextLocale] ??
      location.pathname.replace(/^\/(zh-CN|en|ja)(?=\/|$)/, `/${nextLocale}`)

    window.location.assign(nextPath)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-base-100 text-base-content">
      <header className="sticky top-0 z-40 border-b border-base-300/70 bg-base-100/90 [padding-top:env(safe-area-inset-top)] backdrop-blur">
        <div className="navbar mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="navbar-start min-w-0 flex-1">
            <Link
              className="flex min-w-0 items-center gap-2 sm:gap-3"
              params={{ locale }}
              to="/$locale"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg bg-base-100 sm:h-10 sm:w-10">
                <img
                  alt={siteConfig.SITE_NAME}
                  className="h-full w-full object-contain"
                  height="128"
                  src="/logo-128.png"
                  width="128"
                />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-base font-semibold tracking-wide sm:text-lg">
                  {siteConfig.SITE_NAME}
                </span>
                <span className="hidden truncate text-xs text-base-content/55 sm:block">
                  {t.tagline}
                </span>
              </span>
            </Link>
          </div>

          {hideHeaderNav ? null : (
            <nav className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal gap-1 px-1">
                <li>
                  <Link params={{ locale }} to="/$locale">
                    <i className="ri-home-5-line" />
                    {t.games}
                  </Link>
                </li>
                <li>
                  <Link params={{ locale }} to="/$locale/play-my-rom">
                    <i className="ri-gamepad-line" />
                    {t.playMyRom}
                  </Link>
                </li>
                <li>
                  <Link params={{ locale }} to="/$locale/live">
                    <i className="ri-live-line" />
                    {t.live}
                  </Link>
                </li>
                <li>
                  <Link params={{ locale }} to="/$locale/blog">
                    <i className="ri-article-line" />
                    {t.blog}
                  </Link>
                </li>
                <li>
                  <Link params={{ locale }} to="/$locale/about">
                    <i className="ri-information-line" />
                    {t.about}
                  </Link>
                </li>
              </ul>
            </nav>
          )}

          <div className="navbar-end w-auto shrink-0 gap-1 sm:gap-2">
            {headerActions}

            {canSwitchTheme ? (
              <details
                className="dropdown dropdown-end"
                onToggle={(event) => setIsThemeMenuOpen(event.currentTarget.open)}
                open={isThemeMenuOpen}
                ref={themeMenuRef}
              >
                <summary
                  aria-label={t.theme}
                  className="btn btn-sm btn-ghost border border-base-300"
                  onClick={(event) => {
                    event.preventDefault()
                    setIsThemeMenuOpen((isOpen) => !isOpen)
                    setIsLocaleMenuOpen(false)
                  }}
                >
                  <i className="ri-palette-line" />
                  <span className="hidden sm:inline">{t.theme}</span>
                </summary>
                <ul className="menu dropdown-content z-50 mt-3 max-h-96 w-56 overflow-y-auto rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
                  {siteThemes.map((nextTheme) => (
                    <li key={nextTheme}>
                      <button
                        className={theme === nextTheme ? 'active' : ''}
                        onClick={() => handleThemeChange(nextTheme)}
                        type="button"
                      >
                        <span
                          className="inline-block h-3 w-3 rounded-full bg-primary"
                          data-theme={nextTheme}
                        />
                        <span className="capitalize">{nextTheme}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}

            <details
              className="dropdown dropdown-end"
              onToggle={(event) => setIsLocaleMenuOpen(event.currentTarget.open)}
              open={isLocaleMenuOpen}
              ref={localeMenuRef}
            >
              <summary
                aria-label={t.language}
                className="btn btn-sm btn-ghost border border-base-300"
                onClick={(event) => {
                  event.preventDefault()
                  setIsLocaleMenuOpen((isOpen) => !isOpen)
                  setIsThemeMenuOpen(false)
                }}
              >
                <i className="ri-global-line" />
                <span className="sm:hidden">
                  {locale === 'zh-CN' ? '\u4e2d' : locale === 'en' ? 'EN' : '\u65e5'}
                </span>
                <span className="hidden sm:inline">
                  {locale === 'zh-CN'
                    ? '\u4e2d\u6587'
                    : locale === 'en'
                      ? 'EN'
                      : '\u65e5\u672c\u8a9e'}
                </span>
              </summary>
              <ul className="menu dropdown-content z-50 mt-3 w-36 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
                <li>
                  <button
                    className={locale === 'zh-CN' ? 'active' : ''}
                    onClick={() => handleLocaleChange('zh-CN')}
                    type="button"
                  >
                    {'\u4e2d\u6587'}
                  </button>
                </li>
                <li>
                  <button
                    className={locale === 'en' ? 'active' : ''}
                    onClick={() => handleLocaleChange('en')}
                    type="button"
                  >
                    English
                  </button>
                </li>
                <li>
                  <button
                    className={locale === 'ja' ? 'active' : ''}
                    onClick={() => handleLocaleChange('ja')}
                    type="button"
                  >
                    {'\u65e5\u672c\u8a9e'}
                  </button>
                </li>
              </ul>
            </details>
          </div>
        </div>

        {hideHeaderNav ? null : (
          <nav
            aria-label={t.explore}
            className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-3 pb-2 [scrollbar-width:none] sm:px-6 lg:hidden [&::-webkit-scrollbar]:hidden"
          >
            <HeaderMobileLink
              icon="ri-home-5-line"
              label={t.games}
              locale={locale}
              to="/$locale"
            />
            <HeaderMobileLink
              icon="ri-live-line"
              label={t.live}
              locale={locale}
              to="/$locale/live"
            />
            <HeaderMobileLink
              icon="ri-gamepad-line"
              label={t.playMyRom}
              locale={locale}
              to="/$locale/play-my-rom"
            />
            <HeaderMobileLink
              icon="ri-article-line"
              label={t.blog}
              locale={locale}
              to="/$locale/blog"
            />
            <HeaderMobileLink
              icon="ri-information-line"
              label={t.about}
              locale={locale}
              to="/$locale/about"
            />
          </nav>
        )}
      </header>

      {children}

      <SiteFooter locale={locale} />
    </main>
  )
}

function HeaderMobileLink({
  icon,
  label,
  locale,
  to,
}: {
  icon: string
  label: string
  locale: Locale
  to:
    | '/$locale'
    | '/$locale/about'
    | '/$locale/blog'
    | '/$locale/live'
    | '/$locale/play-my-rom'
}) {
  return (
    <Link
      activeOptions={{ exact: to === '/$locale' }}
      activeProps={{ className: 'btn-primary' }}
      className="btn btn-ghost btn-sm shrink-0 gap-2 whitespace-nowrap"
      params={{ locale }}
      to={to}
    >
      <i aria-hidden="true" className={icon} />
      {label}
    </Link>
  )
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getI18n(locale).layout

  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-base-content/70 [padding-bottom:max(2rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-start">
          <section className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-base-100">
                <img
                  alt={siteConfig.SITE_NAME}
                  className="h-full w-full object-contain"
                  decoding="async"
                  height="128"
                  loading="lazy"
                  src="/logo-128.png"
                  width="128"
                />
              </span>
              <div>
                <p className="text-base font-semibold text-base-content">
                  {siteConfig.SITE_NAME}
                </p>
              </div>
            </div>
            <p className="mt-4 leading-6">{t.footer}</p>
            <a
              className="mt-4 badge badge-sm badge-outline gap-2 p-3"
              href="https://ggemu.com"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              <i className="ri-flashlight-line" />
              {getPoweredByLabel(locale)}
            </a>
          </section>

          <nav className="md:min-w-32">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-base-content/45">
              {t.explore}
            </p>
            <div className="flex flex-col items-start gap-2">
              <Link className="link-hover link" params={{ locale }} to="/$locale">
                <i className="ri-home-5-line mr-1" />
                {t.games}
              </Link>
              <Link
                className="link-hover link"
                params={{ locale }}
                to="/$locale/live"
              >
                <i className="ri-live-line mr-1" />
                {t.live}
              </Link>
              <Link
                className="link-hover link"
                params={{ locale }}
                to="/$locale/play-my-rom"
              >
                <i className="ri-gamepad-line mr-1" />
                {t.playMyRom}
              </Link>
              <Link className="link-hover link" params={{ locale }} to="/$locale/blog">
                <i className="ri-article-line mr-1" />
                {t.blog}
              </Link>
              <Link
                className="link-hover link"
                params={{ locale }}
                to="/$locale/about"
              >
                <i className="ri-information-line mr-1" />
                {t.about}
              </Link>
            </div>
          </nav>

          <nav className="md:min-w-40">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-base-content/45">
              {t.legal}
            </p>
            <div className="flex flex-col items-start gap-2">
              <Link
                className="link-hover link"
                params={{ locale }}
                to="/$locale/privacy-policy"
              >
                {t.privacyPolicy}
              </Link>
              <Link
                className="link-hover link"
                params={{ locale }}
                to="/$locale/terms-of-service"
              >
                {t.termsOfService}
              </Link>
            </div>
          </nav>
        </div>

        <div className="mt-8 border-t border-base-300 pt-5">
          <p className="font-medium text-base-content">{t.copyright}</p>
          <p className="mt-2 max-w-5xl leading-6 text-base-content/55">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}
