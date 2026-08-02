import type { ReactNode } from 'react'
import { useRef } from 'react'

import { useModalAccessibility } from '#/lib/use-modal-accessibility'

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

  useModalAccessibility({ containerRef: modalBoxRef, onClose })

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
