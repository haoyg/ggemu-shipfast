import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { AccessibleModal } from '#/components/accessible-modal'

afterEach(() => {
  cleanup()
})

describe('AccessibleModal', () => {
  it('exposes dialog semantics, closes on Escape, and restores focus', () => {
    const trigger = document.createElement('button')
    const onClose = vi.fn()

    document.body.append(trigger)
    trigger.focus()

    const { unmount } = render(
      <AccessibleModal closeLabel="Close" labelledBy="modal-title" onClose={onClose}>
        <h2 id="modal-title">Modal title</h2>
        <button type="button">Action</button>
      </AccessibleModal>,
    )

    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBe('true')
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Action' }))

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)

    unmount()
    expect(document.activeElement).toBe(trigger)
    trigger.remove()
  })

  it('keeps Tab focus inside the modal content', () => {
    render(
      <AccessibleModal closeLabel="Close" labelledBy="modal-title" onClose={() => {}}>
        <h2 id="modal-title">Modal title</h2>
        <button type="button">First</button>
        <button type="button">Last</button>
      </AccessibleModal>,
    )

    const first = screen.getByRole('button', { name: 'First' })
    const last = screen.getByRole('button', { name: 'Last' })

    last.focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(document.activeElement).toBe(first)

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(document.activeElement).toBe(last)
  })
})
