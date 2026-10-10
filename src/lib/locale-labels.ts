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


export function getPlatformBrowseLabel(locale: Locale, platform: string, popular = false) {
  const name = platform === 'Arcade'
    ? ({ 'zh-CN': '街机', 'zh-TW': '街機', en: 'Arcade', ja: 'アーケード', ko: '아케이드' }[locale])
    : platform
  switch (locale) {
    case 'zh-CN': return popular ? `查看热门 ${name} 游戏` : `在线游玩 ${name} 游戏`
    case 'zh-TW': return popular ? `瀏覽熱門 ${name} 遊戲` : `線上遊玩 ${name} 遊戲`
    case 'ko': return popular ? `인기 ${name} 게임 보기` : `${name} 게임 온라인 플레이`
    case 'ja': return popular ? `人気の${name}ゲームを見る` : `${name}ゲームをオンラインでプレイ`
    default: return popular ? `Show popular ${name} games` : `Play ${name} games online`
  }
}


export function getGamePlayLabel(locale: Locale, name: string, resume = false) {
  switch (locale) {
    case 'zh-CN': return `${resume ? '继续游玩' : '在线游玩'} ${name}`
    case 'zh-TW': return `${resume ? '繼續遊玩' : '線上遊玩'} ${name}`
    case 'ko': return `${name} ${resume ? '계속 플레이' : '온라인 플레이'}`
    case 'ja': return `${name}を${resume ? '続けてプレイ' : 'オンラインでプレイ'}`
    default: return resume ? `Continue playing ${name}` : `Play ${name} online`
  }
}
