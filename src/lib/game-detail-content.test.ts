import { describe, expect, it } from 'vitest'
import {
  getGameDescriptionParagraphs,
  getGameHowToPlayParagraphs,
  getGameSidebarContent,
} from '#/lib/game-detail-content'

const contra = {
  name: 'Contra',
  description:
    'A classic run-and-gun action game where players control commandos Bill Rizer and Lance Bean.',
  how_to_play:
    'Move through each stage and avoid enemy fire. Use your weapon to clear a safe path. Collect upgrades when they appear. Save progress from the emulator menu.',
  developer: 'Konami',
  released_year: '1988',
  platform: 'NES',
  categories: ['Action', 'Shooter'],
  players: 2,
}

describe('game detail visible content', () => {
  it('keeps the database description and adds useful context', () => {
    const paragraphs = getGameDescriptionParagraphs(contra, 'en')

    expect(paragraphs).toHaveLength(3)
    expect(paragraphs[0]).toBe(contra.description)
    expect(paragraphs.join(' ')).toContain('Konami')
    expect(paragraphs.join(' ')).toContain('1988')
  })

  it('keeps the complete database guide while splitting it into readable paragraphs', () => {
    const paragraphs = getGameHowToPlayParagraphs(contra, 'en')

    expect(paragraphs.length).toBeGreaterThan(1)
    expect(paragraphs.join(' ')).toContain('Move through each stage')
    expect(paragraphs.join(' ')).toContain('Save progress from the emulator menu')
  })

  it('builds background and practical sidebar tips from known game facts', () => {
    const content = getGameSidebarContent(contra, 'en')

    expect(content.background).toContain('Contra')
    expect(content.tips).toHaveLength(3)
    expect(content.tips.join(' ')).toContain('multiplayer')
  })
})
