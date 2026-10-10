import { getGameEditorial } from './game-editorial'
import type { Locale, PublicGame } from '#/lib/ggemu'
import {
  getGameDetailFaqs,
  getGameDetailHowToPlay,
  getGameDetailSummary,
  getLocalizedCategoryLabels,
  getLocalizedPlatformLabel,
} from '#/lib/i18n'

export function getGameFaqs(game: PublicGame, locale: Locale) {
  const editorial = getGameEditorial(game, locale)
  return editorial?.faq ?? getGameDetailFaqs(game, locale)
}

export function getGameDescriptionParagraphs(game: PublicGame, locale: Locale) {
  const editorial = getGameEditorial(game, locale)
  if (editorial) return [editorial.summary, ...editorial.description]
  const description = normalizeText(game.description) || getGameDetailSummary(game, locale)

  return uniqueTexts([
    description,
    getGameBackgroundText(game, locale),
    getBrowserPlayText(game, locale),
  ])
}

export function getGameHowToPlayParagraphs(game: PublicGame, locale: Locale) {
  const editorial = getGameEditorial(game, locale)
  if (editorial) return editorial.howToPlay
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

export function getBrowserPlayGuide(locale: Locale, game?: PublicGame) {
  const editorial = game && getGameEditorial(game, locale)
  if (editorial) {
    return {
      title: 'Browser controls and troubleshooting',
      paragraphs: [
        ...editorial.tips,
        'If the player stalls, try Reload player or the separate game page. Reloading may lose unsaved progress; saving and controller options depend on the loaded game.',
      ],
    }
  }
  if (locale === 'ko') return { title: '브라우저 조작과 문제 해결', paragraphs: [
    '키가 반응하지 않으면 게임 화면을 먼저 클릭하고 플레이어의 키 설정을 확인하세요.',
    '스마트폰에서는 터치 버튼이 있는지 확인하세요. 버튼이 작으면 가로 화면이나 전체 화면을 사용해 보세요. 게임패드를 연결한 후 게임에 포커스를 두고 버튼을 눌러 인식 여부를 확인하세요.',
    '검은 화면이나 로딩이 계속되면 잠시 기다리세요. 저장하지 않은 진행 상황은 다시 불러올 때 사라질 수 있으므로 재시작 전에 저장 기능을 확인하세요.',
  ] }
  if (locale === 'zh-TW') {
    return {
      title: '瀏覽器操作與故障排查',
      paragraphs: [
        '鍵盤沒有反應時，先點擊遊戲畫面再操作，並在播放器的控制設置中查看實際按鍵。頁面滾動不代表遊戲已經收到方向鍵輸入。',
        '手機上先查看播放器是否提供觸屏按鈕；畫面或按鈕太小時可以嘗試橫屏或全屏。連接手柄後，在遊戲畫面內按一個按鈕，並檢查播放器是否識別到設備。',
        '黑屏或一直加載時，先等待片刻。詳情頁內的播放器或獨立播放頁提供“重新加載播放器”和返回遊戲目錄的入口。重載會重新啟動播放器，未保存的進度可能丟失；沒有存檔選項時，不要依賴刷新來保存進度。',
      ],
    }
  }

  if (locale === 'zh-CN') {
    return {
      title: '浏览器操作与故障排查',
      paragraphs: [
        '键盘没有反应时，先点击游戏画面再操作，并在播放器的控制设置中查看实际按键。页面滚动不代表游戏已经收到方向键输入。',
        '手机上先查看播放器是否提供触屏按钮；画面或按钮太小时可以尝试横屏或全屏。连接手柄后，在游戏画面内按一个按钮，并检查播放器是否识别到设备。',
        '黑屏或一直加载时，先等待片刻。详情页内的播放器或独立播放页提供“重新加载播放器”和返回游戏目录的入口。重载会重新启动播放器，未保存的进度可能丢失；没有存档选项时，不要依赖刷新来保存进度。',
      ],
    }
  }
  if (locale === 'ja') {
    return {
      title: 'ブラウザーでの操作とトラブル対処',
      paragraphs: [
        'キーが反応しない場合はゲーム画面をクリックし、プレーヤーの操作設定でキー割り当てを確認してください。矢印キーでページがスクロールする場合、ゲームに入力が届いていない可能性があります。',
        'スマートフォンではタッチ操作ボタンの有無を確認してください。表示が小さい場合は横向きや全画面表示を試せます。ゲームパッドを接続したらゲーム画面でボタンを押し、認識されているか確認してください。',
        '黒い画面や読み込みが続く場合は少し待ってください。埋め込みプレーヤーやプレイページには再読み込みとゲーム一覧へのリンクがあります。再読み込みすると未保存の進行状況が失われる場合があります。セーブ機能がなければ、再読み込みで保存されるとは考えないでください。',
      ],
    }
  }
  return {
    title: 'Browser controls and troubleshooting',
    paragraphs: [
      'If the keyboard does not respond, click the game screen first and check the actual key mappings in the player controls. Arrow keys scrolling the page can mean the game does not have input focus.',
      'On a phone, check whether the player provides touch buttons. Try landscape or fullscreen if the controls are too small. After connecting a gamepad, press a button with the game focused and check whether the player recognizes it.',
      'For a black screen or a stalled load, wait briefly before using Reload player or Browse games in the embedded player or play page. Reloading restarts the player and may lose unsaved progress. If no save option is available, do not rely on refreshing to preserve progress.',
    ],
  }
}

export function getGameSidebarContent(game: PublicGame, locale: Locale) {
  const editorial = getGameEditorial(game, locale)
  if (editorial) {
    return { backgroundTitle: 'About this version', background: editorial.description[0], tipsTitle: 'Play tips', tips: editorial.tips }
  }
  const name = game.name?.trim() || getFallbackName(locale)
  const playerTip = getPlayerTip(name, game.players, locale)

  if (locale === 'ko') return { backgroundTitle: '게임 정보', background: `${name}의 플랫폼과 출시 정보는 게임 상세 정보를 확인하세요.`, tipsTitle: '플레이 팁', tips: ['게임 화면에 포커스를 둔 후 조작하세요.', '재시작 전에 진행 상황을 저장하세요. 지원 기능은 플레이어에 따라 다릅니다.'] }
  if (locale === 'zh-TW') {
    return {
      backgroundTitle: '遊戲背景',
      background: getGameBackgroundText(game, locale),
      tipsTitle: '遊玩技巧',
      tips: [
        `開始 ${name} 前，先查看模擬器中的按鍵映射，並按自己的鍵盤或手柄習慣調整操作。`,
        playerTip,
        '如果播放器提供存檔或導出功能，先嚐試保存並恢復一次；不要假定關閉標籤頁後進度仍會保留。',
      ],
    }
  }

  if (locale === 'zh-CN') {
    return {
      backgroundTitle: '游戏背景',
      background: getGameBackgroundText(game, locale),
      tipsTitle: '游玩技巧',
      tips: [
        `开始 ${name} 前，先查看模拟器中的按键映射，并按自己的键盘或手柄习惯调整操作。`,
        playerTip,
        '如果播放器提供存档或导出功能，先尝试保存并恢复一次；不要假定关闭标签页后进度仍会保留。',
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
        'プレーヤーにセーブやエクスポート機能がある場合は、保存と読み込みを一度試してください。タブを閉じても進行状況が残るとは限りません。',
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
      'If the player offers save or export controls, test saving and restoring first. Do not assume progress survives closing the tab.',
    ],
  }
}

function getGameBackgroundText(game: PublicGame, locale: Locale) {
  const name = game.name?.trim() || getFallbackName(locale)
  const platform = getLocalizedPlatformLabel(game.platform, locale)
  const year = game.released_year?.trim()
  const developer = game.developer?.trim()
  const categories = getLocalizedCategoryLabels(game.categories, locale).slice(0, 3)

  if (locale === 'ko') return `${name}${platform ? ` · ${platform}` : ''}${year ? ` · ${year}` : ''}${developer ? ` · ${developer}` : ''}${categories.length ? ` · ${categories.join(', ')}` : ''}`
  if (locale === 'zh-TW') {
    const release = year ? `${year} 年發行` : '經典復古遊戲'
    const platformText = platform ? `，登陸 ${platform} 平臺` : ''
    const developerText = developer ? `，由 ${developer} 開發` : ''
    const categoryText = categories.length > 0 ? `。遊戲類型包括${categories.join('、')}` : ''
    return `${name} 是一款${release}的作品${platformText}${developerText}${categoryText}。`
  }

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

  if (locale === 'ko') return `${name}을 브라우저에서 시작할 수 있습니다. 실제 조작과 저장 옵션은 플레이어 메뉴에서 확인하세요.`
  if (locale === 'zh-TW') {
    return `本頁面可直接在瀏覽器中啟動 ${name}，無需單獨下載遊戲客戶端。開始前可閱讀下方玩法指南，並根據設備調整鍵盤或手柄設置。`
  }

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
    if (locale === 'zh-TW') {
      return `${name} 的原作資料標註為 ${players} 人遊戲；瀏覽器版本能否多人遊玩、是否輪流操作，以播放器實際提供的選項為準。`
    }

  if (locale === 'zh-CN') {
      return `${name} 的原作资料标注为 ${players} 人游戏；浏览器版本能否多人游玩、是否轮流操作，以播放器实际提供的选项为准。`
    }

    if (locale === 'ja') {
      return `${name} の元の作品は ${players} 人用と記載されています。ブラウザー版の複数人プレイや交代プレイは、プレーヤーの対応状況を確認してください。`
    }

    return `${name} lists ${players} players in its original game data. Check whether this browser player offers multiplayer and whether play is simultaneous or turn-based.`
  }

  if (locale === 'zh-TW') {
    return '先熟悉移動、攻擊和暫停等基礎操作，再開始完整關卡，可以減少誤操作。'
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
  if (locale === 'zh-TW') {
    return '這款遊戲'
  }

  if (locale === 'zh-CN') {
    return '这款游戏'
  }

  if (locale === 'ja') {
    return 'このゲーム'
  }

  return 'this game'
}
