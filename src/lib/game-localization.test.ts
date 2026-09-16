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
    ['1942-cn-nes-1985', '1942 — Chinese Translation'],
    ['1943-the-battle-of-midway-cn-nes-1988', '1943: The Battle of Midway — Chinese Translation'],
    ['double-dragon-ii-revenge-nes-1989', 'Double Dragon II: The Revenge — Chinese Translation'],
    [
      'saint-seiya-ougon-densetsu-kanketsu-hen-cn-nes-1988',
      'Saint Seiya: Ougon Densetsu Kanketsu Hen — Chinese Translation',
    ],
    ['satomi-hakkenden-cn-nes-1989', 'Satomi Hakkenden — Chinese Translation'],
    ['pokemon-ruby-gba-2002', 'Pokémon Ruby'],
    ['fire-emblem-the-blazing-blade-gba-2003', 'Fire Emblem: The Blazing Blade'],
    ['professor-layton-and-the-curious-village-nds-2007', 'Professor Layton and the Curious Village'],
    ['mario-and-luigi-superstar-saga-gba-2003', 'Mario & Luigi: Superstar Saga'],
    ['pokemon-mystery-dungeon-red-rescue-team-game-boy-advance-2005', 'Pokémon Mystery Dungeon: Red Rescue Team'],
    ['pokemon-leafgreen-game-boy-advance-2004', 'Pokémon LeafGreen'],
    ['pokemon-firered-game-boy-advance-2004', 'Pokémon FireRed'],
    ['maplestory-ds-nds-2010', 'MapleStory DS'],
    ['naruto-shippuden-ultimate-impact-psp-2011', 'Naruto Shippuden: Ultimate Ninja Impact'],
    ['initial-d-another-stage-cn-gba-2002', 'Initial D: Another Stage — Chinese Translation'],
    ['theme-hospital-dos-1997', 'Theme Hospital'],
    ['dad-n-me-flash-2005', "Dad 'n Me"],
    ['ghost-chaser-densei-snes-1994', 'Ghost Chaser Densei'],
    ['chobits-atashi-dake-no-hito-game-boy-advance-2002', 'Chobits: Atashi Dake no Hito'],
    ['xuan-yuan-sword-dos-1990', 'Xuan-Yuan Sword'],
    ['xuan-yuan-sword-ii-dos-1994', 'Xuan-Yuan Sword II'],
    ['jin-yong-qun-xia-zhuan-dos-1996', 'Heroes of Jin Yong'],
    ['jin-yong-heroes-2-enhanced-flash-2006', 'Heroes of Jin Yong 2 — Enhanced Edition'],
    ['jin-yong-heroes-3-flash-2009', 'Heroes of Jin Yong 3'],
    ['flame-dragon-knights-seal-of-the-evil-god-dos-1994', 'Flame Dragon Knights: Seal of the Evil God'],
    ['flame-dragon-knight-2-dos-1995', 'Flame Dragon Knights II: Legend of the Golden Castle'],
    ['yan-loong-story-flash-2008', 'Yan Loong Legend'],
    ['yanlong-chuanshuo-2-shuang-long-flash-2009', 'Yan Loong Legend 2: The Double Dragon'],
    ['yanlong-chuanshuo-2-erdu-chongji-flash-2009', 'Yan Loong Legend 2: 2nd Impact'],
    ['yanlong-chuanshuo-3-shuang-yan-flash-2009', 'Yan Loong Legend 3: Double Swallow'],
    ['yanlong-chuanshuo-3-chifeng-flash-2010', 'Yan Loong Legend 3: Phoenix'],
    ['xian-jian-qi-xia-zhuan-gba-2001', 'The Legend of Sword and Fairy — GBA Port'],
    ['naruto-rpg-gba-2003', 'Naruto RPG — Chinese Translation V3'],
    ['chinese-mahjong-html5', 'Chinese Standard Mahjong'],
    ['taiwan-mahjong-16-tile-html5', 'Taiwanese Mahjong — 16 Tiles'],
    ['hong-kong-mahjong-html5', 'Hong Kong Mahjong'],
    ['sichuan-mahjong-html5', 'Sichuan Mahjong: Xue Zhan Dao Di'],
    ['doudizhu-html5-2013', 'Dou Dizhu'],
    ['doudizhu-gcoin-html5-2013', 'Dou Dizhu — GCoin Edition'],
    ['1944-cn-nes-1988', '1944 — Unofficial 1943 ROM Hack'],
    ['labrador-and-his-friends-nintendo-ds-2009', 'Nintendogs: Labrador & Friends — Chinese Translation'],
    ['pokemon-team-rocket-game-boy-advance-2000', 'Pokémon Team Rocket — Unofficial ROM Hack'],
    ['light-and-darkness-crystal-conflict-nes-2003', 'Final Fantasy IV: The Conflict of Light and Dark Crystals — Unlicensed Demake'],
    ['saiyuki-tang-sanzang-nes-1996', 'Zui You Ji: Tang Sanzang — Unlicensed'],
  ])('uses the reviewed catalog title for %s', (url_slug, expectedName) => {
    expect(localizePublicGame({ url_slug, name: '原始名称' }, 'en').name).toBe(expectedName)
  })

  it('corrects reviewed catalog metadata and removes unsupported release years', () => {
    expect(localizePublicGame({
      url_slug: 'labrador-and-his-friends-nintendo-ds-2009',
      name: '拉布拉多犬和它的朋友们',
      developer: 'UBISOFT',
      released_year: '2009',
    }, 'en')).toMatchObject({
      developer: 'Nintendo',
      released_year: '2005',
    })

    expect(localizePublicGame({
      url_slug: 'pokemon-team-rocket-game-boy-advance-2000',
      name: '口袋妖怪火箭队',
      developer: 'GAME FREAK',
      released_year: '2000',
    }, 'en')).toMatchObject({
      developer: 'Unknown (unofficial ROM hack)',
      released_year: undefined,
    })

    expect(localizePublicGame({
      url_slug: 'light-and-darkness-crystal-conflict-nes-2003',
      name: '光与暗·水晶纷争',
      developer: 'WAIXING TECHNOLOGY',
      released_year: '2003',
    }, 'en')).toMatchObject({
      developer: 'Nanjing (unlicensed)',
      released_year: undefined,
    })

    expect(localizePublicGame({ url_slug: 'chinese-paladin-dos-1995' }, 'en')).toMatchObject({
      developer: 'Softstar Entertainment',
      released_year: '1995',
    })
    expect(localizePublicGame({ url_slug: 'xuan-yuan-sword-ii-dos-1994' }, 'en')).toMatchObject({
      developer: 'DOMO Studio / Softstar Entertainment',
      released_year: '1994',
    })
    expect(localizePublicGame({ url_slug: 'flame-dragon-knight-2-dos-1995' }, 'en')).toMatchObject({
      developer: 'Han Tang International Information',
      released_year: '1995',
    })
    expect(localizePublicGame({ url_slug: 'maplestory-ds-nds-2010' }, 'en')).toMatchObject({
      developer: 'Nexon / Nintendo',
      released_year: '2010',
    })
    expect(localizePublicGame({ url_slug: 'naruto-shippuden-ultimate-impact-psp-2011' }, 'en')).toMatchObject({
      developer: 'CyberConnect2',
      released_year: '2011',
    })
    expect(localizePublicGame({ url_slug: 'double-dragon-ii-revenge-nes-1989' }, 'en')).toMatchObject({
      developer: 'Technōs Japan',
      released_year: '1989',
    })
    expect(localizePublicGame({ url_slug: 'satomi-hakkenden-cn-nes-1989' }, 'en')).toMatchObject({
      developer: 'Alpha Denshi',
      released_year: '1989',
    })
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
