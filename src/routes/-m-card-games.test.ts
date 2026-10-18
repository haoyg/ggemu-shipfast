import { describe, expect, it } from 'vitest'
import { filterMCardGames, getCardGamePlayerLabel, mCardGames } from '../lib/m-card-games'
import { buildMCardGamesHead } from './en.card-games-that-start-with-m'

describe('M card game directory', () => {
  it('has distinct anchored entries in alphabetical order with a rules source for each', () => {
    expect(mCardGames).toHaveLength(40)
    expect(new Set(mCardGames.map(game => game.id)).size).toBe(mCardGames.length)
    expect(mCardGames.every(game => game.name.startsWith('M') && game.deck && new URL(game.rulesUrl).protocol === 'https:')).toBe(true)
    expect(mCardGames.map(game => game.name)).toEqual(mCardGames.map(game => game.name).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })))
  })

  it('finds aliases and accented names without duplicating them as new games', () => {
    expect(filterMCardGames(' mtg ').map(game => game.name)).toEqual(['Magic: The Gathering'])
    expect(filterMCardGames('Marias').map(game => game.name)).toEqual(['Mariáš'])
    expect(filterMCardGames('Mandrasso').map(game => game.name)).toEqual(['Madrasso'])
    expect(filterMCardGames('Concentration').map(game => game.name)).toEqual(['Memory'])
  })

  it('combines query and category, and keeps tile games out of the card list', () => {
    expect(filterMCardGames('', 'Solitaire').map(game => game.name)).toEqual(['Miss Milligan', 'Monte Carlo'])
    expect(filterMCardGames('Mao', 'Solitaire')).toEqual([])
    expect(mCardGames.some(game => ['Mahjong', 'Mexican Train', 'Murdoku'].includes(game.name))).toBe(false)
  })

  it('finds solo games and combines deck, group size, type and search filters', () => {
    expect(filterMCardGames('', 'All', { players: 1 }).map(game => game.name)).toEqual(['Marvel Champions: The Card Game', 'Memory', 'Miss Milligan', 'Monte Carlo'])
    expect(filterMCardGames('', 'All', { players: 1, deckType: 'standard' }).map(game => game.name)).toEqual(['Memory', 'Miss Milligan', 'Monte Carlo'])
    expect(filterMCardGames('mille', 'Published', { players: 6, deckType: 'dedicated' }).map(game => game.name)).toEqual(['Mille Bornes'])
    expect(filterMCardGames('', 'Digital', { players: 1 })).toEqual([])
    expect(filterMCardGames('', 'All', { players: 2 }).some(game => game.name === 'Mau-Mau')).toBe(false)
    expect(filterMCardGames('Mighty', 'All', { players: 4 })).toEqual([])
    expect(filterMCardGames('Mighty', 'All', { players: 5 })).toHaveLength(1)
    expect(filterMCardGames('munchkin', 'All', { players: 2 })).toEqual([])
  })

  it('keeps unspecified counts visible without filters and labels single-player games clearly', () => {
    const mau = filterMCardGames('Mau-Mau')[0]
    expect(getCardGamePlayerLabel(mau)).toBe('See rules')
    expect(mau.playerNote).toContain('not specified')
    expect(getCardGamePlayerLabel(filterMCardGames('Monte Carlo')[0])).toBe('1 (solo)')
    expect(getCardGamePlayerLabel(filterMCardGames('Mamma Mia!')[0])).toBe('2–5')
    expect(mCardGames.every(game => game.deckType && game.players.every(count => Number.isInteger(count) && count > 0))).toBe(true)
  })

  it('uses an English canonical and describes the actual full list in structured data', () => {
    const head = buildMCardGamesHead('https://pokopie.com')
    expect(head.links).toEqual([{ rel: 'canonical', href: 'https://pokopie.com/en/card-games-that-start-with-m' }])
    const graph = JSON.parse(head.scripts[0].children)['@graph']
    const list = graph.find((item: { '@type': string }) => item['@type'] === 'ItemList')
    expect(list.numberOfItems).toBe(mCardGames.length)
    expect(list.itemListElement.map((item: { name: string }) => item.name)).toEqual(mCardGames.map(game => game.name))
    expect(graph.find((item: { '@type': string }) => item['@type'] === 'FAQPage').mainEntity).toHaveLength(6)
  })
})
