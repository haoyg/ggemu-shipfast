import type { Locale } from '#/lib/ggemu'

export function getRetroCoverFallbackLabel(locale: Locale) {
  if (locale === 'es') return 'Retro'
  if (locale === 'pt') return 'Retrô'
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
  if (locale === 'es') return 'Blog'
  if (locale === 'pt') return 'Blog'
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
  if (locale === 'fr') return 'Lecteur de jeu fourni par GGEMU'
  if (locale === 'de') return 'Spieler bereitgestellt von GGEMU'
  if (locale === 'it') return 'Player di gioco fornito da GGEMU'
  if (locale === 'es') return 'Reproductor de juegos proporcionado por GGEMU'
  if (locale === 'pt') return 'Jogador fornecido pelo GGEMU'
  if (locale === 'ko') return '게임 플레이어 제공: GGEMU'
  if (locale === 'zh-TW') {
    return '遊戲播放器由 GGEMU 提供'
  }

  if (locale === 'zh-CN') {
    return '游戏播放器由 GGEMU 提供'
  }

  if (locale === 'ja') {
    return 'ゲームプレイヤー提供：GGEMU'
  }

  return 'Game player powered by GGEMU'
}

export function getLiveBadgeLabel(locale: Locale) {
  if (locale === 'fr') return 'EN DIRECT'
  if (locale === 'de') return 'LIVE'
  if (locale === 'it') return 'IN DIRETTA'
  if (locale === 'es') return 'EN DIRECTO'
  if (locale === 'pt') return 'AO VIVO'
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
    ? ({
  fr: 'Arcade', de: 'Arcade', it: 'Arcade',
  es: 'Arcade',
  pt: 'Arcade', 'zh-CN': '街机', 'zh-TW': '街機', en: 'Arcade', ja: 'アーケード', ko: '아케이드' }[locale])
    : platform
  switch (locale) {
    case 'fr': return popular ? `Voir les jeux ${name} populaires` : `Jouer aux jeux ${name}`
    case 'de': return popular ? `Beliebte ${name}-Spiele ansehen` : `${name}-Spiele spielen`
    case 'it': return popular ? `Scopri i giochi ${name} più popolari` : `Gioca ai giochi ${name} online`
    case 'es': return popular ? `Ver juegos populares de ${name}` : `Jugar a juegos de ${name} online`
    case 'pt': return popular ? `Ver jogos populares de ${name}` : `Jogar jogos de ${name} online`
    case 'zh-CN': return popular ? `查看热门 ${name} 游戏` : `在线游玩 ${name} 游戏`
    case 'zh-TW': return popular ? `瀏覽熱門 ${name} 遊戲` : `線上遊玩 ${name} 遊戲`
    case 'ko': return popular ? `인기 ${name} 게임 보기` : `${name} 게임 온라인 플레이`
    case 'ja': return popular ? `人気の${name}ゲームを見る` : `${name}ゲームをオンラインでプレイ`
    default: return popular ? `Show popular ${name} games` : `Play ${name} games online`
  }
}


export function getGamePlayLabel(locale: Locale, name: string, resume = false) {
  switch (locale) {
    case 'fr': return `${resume ? 'Continuer' : 'Jouer à'} ${name}`
    case 'de': return `${name} ${resume ? 'weiterspielen' : 'spielen'}`
    case 'it': return `${resume ? 'Continua a giocare a' : 'Gioca a'} ${name}`
    case 'es': return `${resume ? 'Seguir jugando a' : 'Jugar a'} ${name}`
    case 'pt': return `${resume ? 'Continuar jogando' : 'Jogar'} ${name}`
    case 'zh-CN': return `${resume ? '继续游玩' : '在线游玩'} ${name}`
    case 'zh-TW': return `${resume ? '繼續遊玩' : '線上遊玩'} ${name}`
    case 'ko': return `${name} ${resume ? '계속 플레이' : '온라인 플레이'}`
    case 'ja': return `${name}を${resume ? '続けてプレイ' : 'オンラインでプレイ'}`
    default: return resume ? `Continue playing ${name}` : `Play ${name} online`
  }
}
