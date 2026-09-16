import { describe, expect, it } from 'vitest'

import { isTextSuitableForLocale, localizePublicGame } from './game-localization'

describe('localizePublicGame', () => {
  it('uses a reviewed English title override across the game object', () => {
    const game = localizePublicGame({
      url_slug: 'pokemon-emerald-gba-2004',
      name: '宝可梦绿宝石',
      description: 'An enhanced version of Pokémon Ruby and Sapphire.',
      how_to_play: 'Explore Hoenn and collect eight Gym Badges.',
      keywords: '宝可梦, Pokémon Emerald',
    }, 'en')

    expect(game.name).toBe('Pokémon Emerald')
    expect(game.description).toContain('Pokémon Ruby')
    expect(game.how_to_play).toContain('Explore Hoenn')
    expect(game.keywords).toBeUndefined()
  })

  it.each([
    ['chinese-paladin-dos-1995', 'The Legend of Sword and Fairy'],
    ['san-guo-qun-ying-zhuan-2-html5-1998', 'Heroes of the Three Kingdoms 2'],
    ['sanguosha-html5-2011', 'Sanguosha'],
    ['romance-of-the-three-kingdoms-iv-dos-1994', 'Romance of the Three Kingdoms IV: Wall of Fire'],
    ['the-legend-of-sword-and-saber-arcade-2003', 'The Gladiator'],
    ['ra2web-html5-2026', 'RA2WEB'],
    ['rich-man-3-dos-1996', 'Richman 3'],
    ['richman-2-dos-1993', 'Richman 2'],
    ['mahjong-academy-arcade-1989', 'Mahjong Academy'],
    ['1942-cn-nes-1985', '1942 — Chinese Version'],
    ['1943-the-battle-of-midway-cn-nes-1988', '1943: The Battle of Midway — Chinese Version'],
    ['double-dragon-ii-revenge-nes-1989', 'Double Dragon II: The Revenge — Chinese Version'],
    [
      'saint-seiya-ougon-densetsu-kanketsu-hen-cn-nes-1988',
      'Saint Seiya: Ougon Densetsu Kanketsu Hen — Chinese Version',
    ],
    ['satomi-hakkenden-cn-nes-1989', 'Satomi Hakkenden — Chinese Version'],
  ])('uses the reviewed catalog title for %s', (url_slug, expectedName) => {
    expect(localizePublicGame({ url_slug, name: '原始名称' }, 'en').name).toBe(expectedName)
  })

  it('drops source copy that does not match the requested locale', () => {
    const source = {
      url_slug: 'example-game',
      name: 'Example Game',
      description: 'This description is written in English for the source catalog.',
      how_to_play: 'Use the arrow keys to move and press A to confirm your choice.',
    }

    expect(localizePublicGame(source, 'zh-CN')).toMatchObject({
      description: undefined,
      how_to_play: undefined,
    })
    expect(localizePublicGame(source, 'ja')).toMatchObject({
      description: undefined,
      how_to_play: undefined,
    })
  })

  it('keeps matching Chinese, Japanese, and English source copy', () => {
    expect(isTextSuitableForLocale('这是一段用于介绍经典游戏的中文内容。', 'zh-CN')).toBe(true)
    expect(isTextSuitableForLocale('このゲームはブラウザーで遊べます。', 'ja')).toBe(true)
    expect(isTextSuitableForLocale('Play this classic game directly in your browser.', 'en')).toBe(true)
  })

  it('allows an English sentence to mention a short native title', () => {
    expect(isTextSuitableForLocale('Taiko Web is based on the Japanese title 太鼓ウェブ and runs in a browser.', 'en')).toBe(true)
  })
})
