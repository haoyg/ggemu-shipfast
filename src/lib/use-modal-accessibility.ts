import type { RefObject } from 'react'
import { useEffect, useRef } from 'react'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function useModalAccessibility({
  containerRef,
  initialFocusRef,
  isOpen = true,
  onClose,
}: {
  containerRef: RefObject<HTMLElement | null>
  initialFocusRef?: RefObject<HTMLElement | null>
  isOpen?: boolean
  onClose: () => void
}) {
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const container = containerRef.current
    const firstFocusableElement = getFocusableElements(container)[0]

    document.body.style.overflow = 'hidden'

    if (initialFocusRef?.current) {
      initialFocusRef.current.focus()
    } else if (firstFocusableElement) {
      firstFocusableElement.focus()
    } else {
      container?.focus()
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

      const focusableElements = getFocusableElements(container)

      if (focusableElements.length === 0) {
        event.preventDefault()
        container?.focus()
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
  }, [containerRef, initialFocusRef, isOpen])
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return []
  }

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
    .filter((element) => !element.hasAttribute('hidden'))
}
