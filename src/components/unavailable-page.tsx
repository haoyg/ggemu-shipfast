import { Link } from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'
import type { Locale } from '#/lib/ggemu'

export type UnavailableContentType = 'blog' | 'game'

export function UnavailablePage({
  locale,
  type,
}: {
  locale: Locale
  type: UnavailableContentType
}) {
  const copy = getUnavailableCopy(locale, type)

  return (
    <SiteLayout locale={locale}>
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <img
          alt="POKOPIE"
          className="h-16 w-16 rounded-2xl object-contain"
          height="128"
          src="/logo-128.png"
          width="128"
        />
        <h1 className="mt-6 text-3xl font-semibold leading-tight">
          {copy.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-base-content/70">
          {copy.description}
        </p>
        <Link className="btn btn-primary mt-8" params={{ locale }} to="/$locale">
          <i className="ri-home-5-line" />
          {copy.action}
        </Link>
      </section>
    </SiteLayout>
  )
}

export function getUnavailableCopy(
  locale: Locale,
  type: UnavailableContentType,
) {
  if (locale === 'en') {
    return {
      action: 'Back to games',
      description:
        type === 'game'
          ? 'This game is unavailable or has been removed. Browse other retro games on POKOPIE.'
          : 'This article is unavailable or has been removed. Browse more retro game guides on POKOPIE.',
      title: type === 'game' ? 'Game not available' : 'Article not available',
    }
  }

  if (locale === 'ja') {
    return {
      action: 'ゲーム一覧へ',
      description:
        type === 'game'
          ? 'このゲームは利用できないか、削除されています。POKOPIEでほかのレトロゲームを探せます。'
          : 'この記事は利用できないか、削除されています。POKOPIEでほかのガイドを確認できます。',
      title: type === 'game' ? 'ゲームを利用できません' : '記事を利用できません',
    }
  }

  return {
    action: '返回游戏库',
    description:
      type === 'game'
        ? '这个游戏暂时不可用或已被移除。你可以继续在 POKOPIE 浏览其他复古游戏。'
        : '这篇文章暂时不可用或已被移除。你可以继续在 POKOPIE 浏览更多游戏指南。',
    title: type === 'game' ? '游戏暂不可用' : '文章暂不可用',
  }
}
