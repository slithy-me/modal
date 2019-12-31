import React, { useEffect, useRef } from 'react'
import { CloseButton } from './components/CloseButton'
import { ModalFooter } from './components/ModalFooter'
import { ModalHeader } from './components/ModalHeader'
import { useModal } from '.'
import './style.scss'

export const Modal = ({
	actions,
	afterClose,
	afterOpen,
	backgroundStyle,
	beforeClose,
	cardStyle,
	children,
	className,
	closeButtonOutside,
	closeOnOutsideClick,
	enqueuedToClose,
	id,
	title,
	...props
}) => {
	const { closeModal } = useModal()
  const thisModal = useRef()

  const handleClose = () => {
    if (beforeClose) {
      beforeClose()
    }
    closeModal(id)
    if (afterClose) {
      afterClose()
    }
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    if (afterOpen) {
      afterOpen()
    }
  }, [])

  useEffect(() => {
    if (enqueuedToClose) {
      handleClose()
    }
  }, [enqueuedToClose])

  if (!children) {
    return null
  }

	return (
    <div
      className={
        ['slithy-modal', className].filter(el => el != null).join(' ')
      }
      ref={thisModal}
    >
      <div className="modal-background" style={backgroundStyle}>
        <div
          className={
            ['modal-exit', closeOnOutsideClick ? 'closeOnOutsideClick' : undefined].filter(el => el != null).join(' ')
          }
          onClick={closeOnOutsideClick ? handleClose : undefined}
        />
        <div className="modal-card" style={cardStyle}>
					<div className="modal-card-interior">
          {title && (
						<ModalHeader title={title} />
          )}

					{children}

          {actions && (
						<ModalFooter
							actions={actions}
							handleClose={handleClose}
							{...props}
						/>
          )}

					</div>
          {!closeButtonOutside && (
						<CloseButton onClick={handleClose} />
					)}
        </div>
        {closeButtonOutside && (
					<CloseButton onClick={handleClose} />
				)}
      </div>
    </div>
  )
}
