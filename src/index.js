import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import Portal from '@slithy/portal'
import { useTransition, animated } from 'react-spring'
import './style.scss'

const CloseButton = ({ onClick }) => (
  <button className="modal-button--close" onClick={onClick} type="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" fill="currentColor" /></svg>
  </button>
)

const Modal = ({ children, className, ...props }) => {
  const { closeModal } = useContext(ModalContext)
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
    if (children) {
      const originalOverflow = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => document.body.style.overflow = originalOverflow
    }
  }, [children])

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
        ['component-modal', className].filter(el => el != null).join(' ')
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

const ModalContext = createContext()

const ModalProvider = ({ children, solo = false, modalTransitions = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
} }) => {
  const [modals, setModals] = useState([])
  const [enqueuedToClose, setEnqueuedToClose] = useState([])
  const closeModal = (id) => {
    const index = modals.findIndex(modal => modal[0] === id)
    if (index > -1) {
      modals.splice(index, 1)
    }
    return setModals([...modals])
  }
  const closeAllModals = () => setEnqueuedToClose(modals.map(modal => modal[0]))
  const createRandomId = () => '_' + Math.random().toString(36).substr(2, 9)
  const openModal = (nextModal, id) => {
    if (solo) {
      closeAllModals()
    }
    setModals([...modals, [id || createRandomId(), nextModal]])
  }
  const transitions = useTransition(modals, modal => modal[0], {
    from:  modalTransitions.from,
    enter: modalTransitions.enter,
    leave: { ...modalTransitions.leave, cursor: 'default', pointerEvents: 'none' },
  })

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      {children}
      {transitions.map(({ item, key, props }, index) => {
        const modal = React.cloneElement(item[1], {
          enqueuedToClose: enqueuedToClose.find(id => id === item[0]),
          id: item[0],
        })
        return (
          <Portal id="modals" key={key}>
            <animated.div style={props}>
              {modal}
            </animated.div>
          </Portal>
        )
      })}
    </ModalContext.Provider>
  )
}

export { Modal, ModalContext, ModalProvider }
