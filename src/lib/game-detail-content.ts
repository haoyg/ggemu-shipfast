import type { Locale, PublicGame } from '#/lib/ggemu'
import {
  getGameDetailHowToPlay,
  getGameDetailSummary,
  getLocalizedCategoryLabels,
  getLocalizedPlatformLabel,
} from '#/lib/i18n'

export function getGameDescriptionParagraphs(game: PublicGame, locale: Locale) {
  const description = normalizeText(game.description) || getGameDetailSummary(game, locale)

  return uniqueTexts([
    description,
    getGameBackgroundText(game, locale),
    getBrowserPlayText(game, locale),
  ])
}

export function getGameHowToPlayParagraphs(game: PublicGame, locale: Locale) {
  const guide = normalizeText(game.how_to_play) || getGameDetailHowToPlay(game, locale)
  const explicitParagraphs = game.how_to_play
    ?.split(/\r?\n\s*\r?\n/)
    .map(normalizeText)
    .filter(Boolean)

  if (explicitParagraphs && explicitParagraphs.length > 1) {
    return explicitParagraphs
  }

  return groupSentences(guide)
}

export function getGameSidebarContent(game: PublicGame, locale: Locale) {
  const name = game.name?.trim() || getFallbackName(locale)
  const playerTip = getPlayerTip(name, game.players, locale)

  if (locale === 'zh-CN') {
    return {
      backgroundTitle: '游戏背景',
      background: getGameBackgroundText(game, locale),
      tipsTitle: '游玩技巧',
      tips: [
        `开始 ${name} 前，先查看模拟器中的按键映射，并按自己的键盘或手柄习惯调整操作。`,
        playerTip,
        '长时间游玩时可使用模拟器菜单保存进度；进入全屏模式前，建议先确认退出全屏的快捷键。',
      ],
    }
  }

  if (locale === 'ja') {
    return {
      backgroundTitle: 'ゲームの背景',
      background: getGameBackgroundText(game, locale),
      tipsTitle: 'プレイのヒント',
      tips: [
        `${name} を始める前に、エミュレーターのキー設定を確認し、キーボードやゲームパッドに合わせて調整してください。`,
        playerTip,
        '長く遊ぶ場合はエミュレーターメニューで進行状況を保存し、全画面表示を使う前に終了キーを確認してください。',
      ],
    }
  }

  return {
    backgroundTitle: 'Game Background',
    background: getGameBackgroundText(game, locale),
    tipsTitle: 'Play Tips',
    tips: [
      `Before starting ${name}, review the emulator controls and adjust the key mapping for your keyboard or controller.`,
      playerTip,
      'For longer sessions, use the emulator menu to save your progress and check the exit shortcut before entering fullscreen mode.',
    ],
  }
}

function getGameBackgroundText(game: PublicGame, locale: Locale) {
  const name = game.name?.trim() || getFallbackName(locale)
  const platform = getLocalizedPlatformLabel(game.platform, locale)
  const year = game.released_year?.trim()
  const developer = game.developer?.trim()
  const categories = getLocalizedCategoryLabels(game.categories, locale).slice(0, 3)

  if (locale === 'zh-CN') {
    const release = year ? `${year} 年发行` : '经典复古游戏'
    const platformText = platform ? `，登陆 ${platform} 平台` : ''
    const developerText = developer ? `，由 ${developer} 开发` : ''
    const categoryText = categories.length > 0 ? `。游戏类型包括${categories.join('、')}` : ''
    return `${name} 是一款${release}的作品${platformText}${developerText}${categoryText}。`
  }

  if (locale === 'ja') {
    const release = year ? `${year}年に発売された` : 'クラシックな'
    const platformText = platform ? `${platform}向けの` : ''
    const developerText = developer ? `、${developer}が開発した` : ''
    const categoryText = categories.length > 0 ? ` ジャンルは${categories.join('、')}です。` : ''
    return `${name} は${release}${platformText}作品で${developerText}ゲームです。${categoryText}`
  }

  const release = year ? `Released in ${year}` : 'A classic retro title'
  const platformText = platform ? ` for ${platform}` : ''
  const developerText = developer ? ` and developed by ${developer}` : ''
  const categoryText = categories.length > 0 ? ` It is part of the ${categories.join(', ')} genres.` : ''
  return `${release}${platformText}${developerText}, ${name} is built around its original console experience.${categoryText}`
}

function getBrowserPlayText(game: PublicGame, locale: Locale) {
  const name = game.name?.trim() || getFallbackName(locale)

  if (locale === 'zh-CN') {
    return `本页面可直接在浏览器中启动 ${name}，无需单独下载游戏客户端。开始前可阅读下方玩法指南，并根据设备调整键盘或手柄设置。`
  }

  if (locale === 'ja') {
    return `このページでは ${name} をブラウザーから直接起動でき、ゲームクライアントのダウンロードは不要です。開始前に下の遊び方を読み、端末に合わせてキー設定を調整できます。`
  }

  return `You can launch ${name} directly in your browser without downloading a separate game client. Read the guide below before playing, then adjust the keyboard or controller settings for your device.`
}

function getPlayerTip(name: string, players: number | undefined, locale: Locale) {
  if ((players ?? 1) > 1) {
    if (locale === 'zh-CN') {
      return `${name} 支持多人游玩；开始前请确认每位玩家的控制器和按键没有冲突。`
    }

    if (locale === 'ja') {
      return `${name} は複数人プレイに対応しています。開始前に各プレイヤーのコントローラーとキー設定が重複していないか確認してください。`
    }

    return `${name} supports multiplayer, so confirm that each player's controller and key mapping do not conflict before starting.`
  }

  if (locale === 'zh-CN') {
    return '先熟悉移动、攻击和暂停等基础操作，再开始完整关卡，可以减少误操作。'
  }

  if (locale === 'ja') {
    return '本編を始める前に、移動、攻撃、ポーズなどの基本操作を確認すると誤操作を減らせます。'
  }

  return 'Practice movement, action, and pause controls before a full run to reduce accidental inputs.'
}

function groupSentences(value: string) {
  const sentences = value.match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/g)?.map(normalizeText).filter(Boolean) ?? []

  if (sentences.length < 2) {
    return value ? [value] : []
  }

  const paragraphs: Array<string> = []
  for (let index = 0; index < sentences.length; index += 2) {
    paragraphs.push(sentences.slice(index, index + 2).join(' '))
  }

  return paragraphs
}

function normalizeText(value: string | undefined) {
  return value?.replace(/\s+/g, ' ').trim() || ''
}

function uniqueTexts(values: Array<string>) {
  return [...new Set(values.map(normalizeText).filter(Boolean))]
}

function getFallbackName(locale: Locale) {
  if (locale === 'zh-CN') {
    return '这款游戏'
  }

  if (locale === 'ja') {
    return 'このゲーム'
  }

  return 'this game'
}
