import React, { useEffect, useState } from 'react'
import { ModalContext } from '.'
import Portal from '@slithy/portal'
import { useTransition, animated } from 'react-spring'

export const ModalProvider = ({
  children,
  solo = false,
  modalTransitions = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  }
}) => {
  const [modals, setModals] = useState([])
  const [enqueuedToClose, setEnqueuedToClose] = useState([])

  useEffect(() => {
    if (modals.length > 0) {
      const originalOverflow = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => document.body.style.overflow = originalOverflow
    }
  }, [modals.length > 0])

  const closeModal = id => {
    if (id) {
      const index = modals.findIndex(modal => modal[0] === id)
      if (index > -1) {
        modals.splice(index, 1)
      }
    } else {
      modals.splice(-1)
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
    from: modalTransitions.from,
    enter: modalTransitions.enter,
    leave: { ...modalTransitions.leave, cursor: 'default', pointerEvents: 'none' },
  })

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      {children}
      {transitions.map(({ item, key, props }) => {
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
