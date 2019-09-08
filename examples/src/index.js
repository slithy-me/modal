import 'normalize.css'
import './style.scss'

import React, { useContext, useState } from 'react'
import { render } from 'react-dom'
import { Modal, ModalContext, ModalProvider } from '../../src'

import StackedModals from './StackedModals'
import OreoModal from './OreoModal'

const OreoModalExample = (props) => (
  <OreoModal
    actions={[
      'cancel',
      'submit',
    ]}
    title="Oreo Modal"
    {...props}
  >
    <p>This is a customized implementation of the modal.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut sem et dolor maximus cursus. Praesent erat lectus, dignissim eu dapibus id, porttitor in purus. Etiam facilisis, sapien nec suscipit pretium, dui sem mollis mauris, nec dapibus augue erat nec odio. Quisque ex nisl, feugiat sit amet elit eget, fermentum aliquet elit. Cras porta gravida facilisis. Vestibulum eu magna fermentum, facilisis risus lacinia, pretium massa. Nunc rutrum gravida turpis, dignissim iaculis ligula bibendum ut. Curabitur ullamcorper ipsum magna, eu tempus nisl tincidunt sit amet. Etiam ut blandit felis, at blandit ex. Aenean ut ultricies quam, ut placerat mauris.</p>
  </OreoModal>
)

const SimpleModal = (props) => (
  <Modal {...props}>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut sem et dolor maximus cursus. Praesent erat lectus, dignissim eu dapibus id, porttitor in purus. Etiam facilisis, sapien nec suscipit pretium, dui sem mollis mauris, nec dapibus augue erat nec odio. Quisque ex nisl, feugiat sit amet elit eget, fermentum aliquet elit. Cras porta gravida facilisis. Vestibulum eu magna fermentum, facilisis risus lacinia, pretium massa. Nunc rutrum gravida turpis, dignissim iaculis ligula bibendum ut. Curabitur ullamcorper ipsum magna, eu tempus nisl tincidunt sit amet. Etiam ut blandit felis, at blandit ex. Aenean ut ultricies quam, ut placerat mauris.</p>
  </Modal>
)

const Examples = () => {
  const { openModal } = useContext(ModalContext)

  const openOreoModal = () => openModal(
    <OreoModalExample />
  )

  const openSimpleModal = () => openModal(
    <SimpleModal />
  )

  return (
    <div className="example-buttons">
      <h2>Examples:</h2>
      <button onClick={openSimpleModal} type="button">Simple Modal</button>
      <button onClick={openOreoModal} type="button">Oreo Modal</button>
    </div>
  )
}

const App = () => {
  const [solo, setSolo] = useState(false)

  return (
    <ModalProvider solo={solo}>
      <main>
        <h1>@slithy/modal</h1>
        <div className="description">
          <p>Context-based modals in React, using React Hooks.</p>
        </div>

        <hr />
        <div className="toggle-solo">
          <label>
            <input checked={!solo} type="checkbox" onChange={() => setSolo(!solo)} />
            <span>Allow Modal Stacking</span>
          </label>
          <p>@slithy/modal allows multiple modals to stack, e.g. a modal opens another modal. To disallow this, set the "solo" property on the context. For these examples, use the toggle above to allow or disallow modal stacking.</p>
          <pre>
            &lt;ModalContext solo&gt; ... &lt;/ModalContext&gt;
          </pre>
          <StackedModals />
        </div>
        <hr />
        <Examples />
      </main>
    </ModalProvider>
  )
}

render(<App />, document.getElementById('root'))
