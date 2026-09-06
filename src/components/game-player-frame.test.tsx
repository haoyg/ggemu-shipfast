import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { GamePlayerFrame } from './game-player-frame'
import { trackEvent } from '#/lib/analytics'

vi.mock('#/lib/analytics', () => ({ trackEvent: vi.fn() }))
const props = { src: 'https://ggemu.com/en/game/test', title: 'Test game', gameId: 'test', locale: 'en', className: 'h-full' }

afterEach(() => { cleanup(); vi.useRealTimers(); vi.clearAllMocks(); vi.unstubAllGlobals() })

describe('GamePlayerFrame', () => {
  it('offers retry after timeout and recovers when the next frame loads', () => {
    vi.useFakeTimers()
    render(<GamePlayerFrame {...props} />)
    const original = screen.getByTitle('Test game')
    act(() => vi.advanceTimersByTime(20_000))
    expect(screen.getByRole('status').textContent).toContain('longer than expected')
    expect(trackEvent).toHaveBeenCalledWith('player_load_timeout', { game_id: 'test' })
    fireEvent.click(screen.getByText('Reload player'))
    expect(screen.getByTitle('Test game')).not.toBe(original)
    const retriedFrame = screen.getByTitle('Test game') as HTMLIFrameElement
    fireEvent.load(retriedFrame)
    act(() => window.dispatchEvent(new MessageEvent('message', {
      source: retriedFrame.contentWindow,
      data: { type: 'player-ready' },
    })))
    expect(screen.getByRole('status').textContent).toContain('Game player loaded')
    expect(screen.getByText('When Play Now appears: 1. Select Play Now. 2. Select Start inside the game player.')).not.toBeNull()
    expect(vi.mocked(trackEvent).mock.calls.filter(([name]) => name === 'player_load_timeout')).toHaveLength(1)
    expect(trackEvent).toHaveBeenCalledWith('player_frame_loaded', { game_id: 'test' })
  })

  it('marks the game ready only after the embedded player sends a ready message', () => {
    render(<GamePlayerFrame {...props} />)
    const iframe = screen.getByTitle('Test game') as HTMLIFrameElement
    fireEvent.load(iframe)
    expect(screen.getByRole('status').textContent).toContain('waiting for the game to start')
    act(() => window.dispatchEvent(new MessageEvent('message', {
      source: iframe.contentWindow,
      data: { type: 'player-ready' },
    })))
    expect(screen.getByRole('status').textContent).toContain('Game player loaded')
  })

  it('keeps recovery controls after a frame load and shows localized timeout guidance', () => {
    vi.useFakeTimers()
    render(<GamePlayerFrame {...props} locale="zh-CN" />)
    act(() => vi.advanceTimersByTime(20_000))
    expect(screen.getByRole('status').textContent).toContain('加载时间较长')
    expect(screen.getByText('浏览其他游戏').getAttribute('href')).toBe('/zh-CN')
    fireEvent.load(screen.getByTitle('Test game'))
    expect(screen.getByText('重新加载播放器')).not.toBeNull()
    expect(screen.getByText('出现“立即游玩”后：1. 选择“立即游玩”。2. 在游戏内选择“开始”。')).not.toBeNull()
  })

  it('allows the embedded player to request screen wake lock', () => {
    render(<GamePlayerFrame {...props} allow="autoplay; gamepad" />)
    expect(screen.getByTitle('Test game').getAttribute('allow')).toContain('screen-wake-lock')
  })

  it('does not start loading or the timeout before a lazy player becomes visible', () => {
    vi.useFakeTimers()
    let intersect: (entries: { isIntersecting: boolean }[]) => void = () => {}
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: typeof intersect) { intersect = callback }
      observe() {}
      disconnect() {}
    })
    render(<GamePlayerFrame {...props} lazy />)
    act(() => vi.advanceTimersByTime(30_000))
    expect(screen.queryByTitle('Test game')).toBeNull()
    expect(trackEvent).not.toHaveBeenCalled()
    act(() => intersect([{ isIntersecting: true }]))
    expect(screen.getByTitle('Test game')).not.toBeNull()
  })

  it('clears timers when navigating away', () => {
    vi.useFakeTimers()
    const { unmount } = render(<GamePlayerFrame {...props} />)
    unmount()
    act(() => vi.advanceTimersByTime(30_000))
    expect(trackEvent).not.toHaveBeenCalledWith('player_load_timeout', expect.anything())
  })
})
