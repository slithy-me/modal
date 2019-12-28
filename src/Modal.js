import React, { useEffect, useRef } from 'react'
import { useModal } from '.'
import './style.scss'

const CloseButton = ({ onClick }) => (
  <button className="modal-button--close" onClick={onClick} type="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" fill="currentColor" /></svg>
  </button>
)

export const Modal = ({ children, className, ...props }) => {
  const { closeModal } = useModal()
  const thisModal = useRef()

  const handleClose = () => {
    if (props.beforeClose) {
      props.beforeClose()
    }
    closeModal(props.id)
    if (props.afterClose) {
      props.afterClose()
    }
  }

  const handleCancel = () => {
    if (props.onCancel) {
      props.onCancel()
    }
    handleClose()
  }

  const handleSubmit = async () => {
    let result = true
    try {
      if (props.onSubmit) {
        result = await props.onSubmit()
      }
    }
    catch (error) {
      console.error(error)
    }
    finally {
      if (result !== false) {
        handleClose()
      }
    }
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleCancel()
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    if (props.afterOpen) {
      props.afterOpen()
    }
  }, [])

  useEffect(() => {
    if (props.enqueuedToClose) {
      handleClose()
    }
  }, [props.enqueuedToClose])

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
      <div className="modal-background" style={props.backgroundStyle}>
        <div
          className={
            ['modal-exit', props.closeOnOutsideClick ? 'closeOnOutsideClick' : undefined].filter(el => el != null).join(' ')
          }
          onClick={props.closeOnOutsideClick ? handleClose : undefined}
        />
        <div className="modal-card" style={props.cardStyle}>
          {props.title && (
            <div className="modal-header">
              {props.title}
            </div>
          )}

          <div className="modal-main">
            {children}
          </div>

          {props.actions && (
            <div className="modal-footer">
              {props.actions.map((action) => {
                if (action === 'cancel') {
                  return (
                    <button
                      className="modal-button--cancel"
                      key="modal-button--cancel"
                      onClick={handleCancel}
                      type="button"
                    >
                      {props.onCancelLabel || 'Cancel'}
                    </button>
                  )
                } else
                if (action === 'submit') {
                  return (
                    <button
                      className="modal-button--submit"
                      key="modal-button--submit"
                      onClick={handleSubmit}
                      type="button"
                    >
                      {props.onSubmitLabel || 'Submit'}
                    </button>
                  )
                } else {
                  return action
                }
              })}
            </div>
          )}

          {!props.closeButtonOutside && <CloseButton onClick={handleClose} />}
        </div>
        {props.closeButtonOutside && <CloseButton onClick={handleClose} />}
      </div>
    </div>
  )
}
