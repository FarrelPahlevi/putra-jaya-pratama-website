import { useEffect, useRef, useState } from 'react'
import type { ComponentPropsWithRef, MouseEvent } from 'react'
import { keepDialogFocus } from '../utils/focus'

export function usePhotoLightbox(photoCount: number) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLAnchorElement>(null)
  const isOpen = activeIndex !== null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!isOpen || !dialog) return
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      triggerRef.current?.focus({ preventScroll: true })
    }
  }, [isOpen])

  const openPhoto = (index: number, event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    triggerRef.current = event.currentTarget
    setActiveIndex(index)
  }
  const closePhoto = () => setActiveIndex(null)
  const movePhoto = (offset: number) => {
    setActiveIndex(index => index === null ? null : (index + offset + photoCount) % photoCount)
  }
  const dialogProps: ComponentPropsWithRef<'dialog'> = {
    ref: dialogRef,
    onCancel: event => {
      event.preventDefault()
      closePhoto()
    },
    onClick: event => {
      if (event.target === event.currentTarget) closePhoto()
    },
    onKeyDown: event => {
      keepDialogFocus(event)
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      movePhoto(event.key === 'ArrowLeft' ? -1 : 1)
    },
  }

  return { activeIndex, dialogProps, openPhoto, closePhoto, movePhoto }
}
