import type { Locale } from '#/lib/ggemu'

export function getRetroCoverFallbackLabel(locale: Locale) {
  if (locale === 'ko') return '레트로'
  if (locale === 'zh-TW') {
    return '復古'
  }

  if (locale === 'zh-CN') {
    return '复古'
  }

  if (locale === 'ja') {
    return 'レトロ'
  }

  return 'Retro'
}

export function getBlogCoverFallbackLabel(locale: Locale) {
  if (locale === 'ko') return '블로그'
  if (locale === 'zh-TW') {
    return '博客'
  }

  if (locale === 'zh-CN') {
    return '博客'
  }

  if (locale === 'ja') {
    return 'ブログ'
  }

  return 'Blog'
}

export function getPoweredByLabel(locale: Locale) {
  if (locale === 'ko') return 'POKOPIE 제공'
  if (locale === 'zh-TW') {
    return '由 POKOPIE 提供'
  }

  if (locale === 'zh-CN') {
    return '由 POKOPIE 提供'
  }

  if (locale === 'ja') {
    return 'POKOPIE 提供'
  }

  return 'Powered by POKOPIE'
}

export function getLiveBadgeLabel(locale: Locale) {
  if (locale === 'ko') return '방송 중'
  if (locale === 'zh-TW') {
    return '直播中'
  }

  if (locale === 'zh-CN') {
    return '直播中'
  }

  if (locale === 'ja') {
    return '配信中'
  }

  return 'LIVE'
}
