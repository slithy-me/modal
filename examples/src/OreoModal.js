import React from 'react'
import { Modal } from '../../src'
import './OreoModal.scss'

const OreoModal = ({ children, ...props }) => (
  <Modal className="oreo" {...props}>
    {children}
  </Modal>
)

export default OreoModal
