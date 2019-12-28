import { Modal } from './Modal.js'
import { ModalContext } from './ModalContext.js'
import { ModalProvider } from './ModalProvider.js'
import { useContext } from 'react'

export {
  Modal,
  ModalContext,
  ModalProvider,
}

export const useModal = () => useContext(ModalContext)
