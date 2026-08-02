import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function AccessibleModal({
  children,
  closeLabel,
  labelledBy,
  modalBoxClassName = '',
  onClose,
}: {
  children: ReactNode
  closeLabel: string
  labelledBy: string
  modalBoxClassName?: string
  onClose: () => void
}) {
  const modalBoxRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const modalBox = modalBoxRef.current

    document.body.style.overflow = 'hidden'
    const firstFocusableElement = getFocusableElements(modalBox)[0]

    if (firstFocusableElement) {
      firstFocusableElement.focus()
    } else {
      modalBox?.focus()
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = getFocusableElements(modalBox)

      if (focusableElements.length === 0) {
        event.preventDefault()
        modalBox?.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements.at(-1)

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement?.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus()
      }
    }
  }, [])

  return (
    <div
      aria-labelledby={labelledBy}
      aria-modal="true"
      className="modal modal-open"
      role="dialog"
    >
      <div
        className={`modal-box ${modalBoxClassName}`}
        ref={modalBoxRef}
        tabIndex={-1}
      >
        {children}
      </div>
      <button
        aria-label={closeLabel}
        className="modal-backdrop"
        onClick={onClose}
        type="button"
      />
    </div>
  )
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return []
  }

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
    .filter((element) => !element.hasAttribute('hidden'))
}
