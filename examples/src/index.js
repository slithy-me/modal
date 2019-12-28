import 'normalize.css'
import './style.scss'

import React, { useState } from 'react'
import { render } from 'react-dom'
import { Modal, ModalProvider, useModal } from '../../src'

import LongModal from './LongModal'
import OreoModal from './OreoModal'
import StackedModals from './StackedModals'

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
  <Modal
    title={props.parentId ? `Child of ${props.parentId}` : null}
    {...props}
  >
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut sem et dolor maximus cursus. Praesent erat lectus, dignissim eu dapibus id, porttitor in purus. Etiam facilisis, sapien nec suscipit pretium, dui sem mollis mauris, nec dapibus augue erat nec odio. Quisque ex nisl, feugiat sit amet elit eget, fermentum aliquet elit. Cras porta gravida facilisis. Vestibulum eu magna fermentum, facilisis risus lacinia, pretium massa. Nunc rutrum gravida turpis, dignissim iaculis ligula bibendum ut. Curabitur ullamcorper ipsum magna, eu tempus nisl tincidunt sit amet. Etiam ut blandit felis, at blandit ex. Aenean ut ultricies quam, ut placerat mauris.</p>
  </Modal>
)

const EverythingModal = (props) => {
  const { openModal, closeModal, closeAllModals } = useModal()

  const afterOpen = () => console.log(`${props.id} : fired afterOpen`)
  const beforeClose = () => console.log(`${props.id} : fired beforeClose`)
  const afterClose = () => console.log(`${props.id} : fired afterClose`)
  const onCancel = () => console.log(`${props.id} : canceled`)
  const onSubmit = () => console.log(`${props.id} : submitted`)

  const handleOpenNewModal = () => {
    // "beforeOpen"
    console.log('Opening a new modal!')

    // open a new, "child" modal;
    // passing the id of the parent, so that we can closeModal(props.parentId) if we want to close the parent programatically.
    return openModal(<SimpleModal parentId={props.id} />)
  }

  return (
    <Modal
      actions={[
        'cancel',
        props.parentId ? <button key="closeParent" onClick={() => closeModal(props.parentId)}>Close Parent</button> : null,
        <button key="closeAll" onClick={closeAllModals}>Close All</button>,
        'submit',
      ]}
      backgroundStyle={{
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
      }}
      cardStyle={{
        fontSize: '0.625rem',
        marginRight: 0,
        verticalAlign: 'top',
        width: 640,
      }}
      afterClose={afterClose}
      afterOpen={afterOpen}
      beforeClose={beforeClose}
      className="everything-modal"
      closeButtonOutside
      closeOnOutsideClick
      onCancel={onCancel}
      onCancelLabel="Close"
      onSubmit={onSubmit}
      onSubmitLabel="OK"
      title="The Everything Modal!"
      {...props}
    >
      <div>
        <p>For better or worse, this modal incorporates every available prop and method, and logs events to the browser console as they happen. Hot, modal action in real-time! Open the console to witness that party; it's the knees!</p>
        <button onClick={handleOpenNewModal} type="button">Open New Modal</button>
      </div>
    </Modal>
  )
}

const Examples = () => {
  const { openModal } = useModal()

  const openOreoModal = () => openModal(
    <OreoModalExample />
  )

  const openSimpleModal = () => openModal(
    <SimpleModal />
  )

  const openEverythingModal = () => openModal(
    <EverythingModal />
  )

  const openLongModal = () => openModal(
    <LongModal />
  )

  return (
    <div className="examples">
      <h2>Examples</h2>
      <button onClick={openSimpleModal} type="button">Simple Modal</button>
      <button onClick={openEverythingModal} type="button">Everything Modal</button>
      <button onClick={openLongModal} type="button">Long Modal</button>

      <h2>Customization Demos</h2>
      <button onClick={openOreoModal} type="button">Oreo Modal</button>
    </div>
  )
}

const App = () => {
  const [solo, setSolo] = useState(false)

  return (
    <ModalProvider solo={solo}>
      <div id="layout-container">
        <main>
          <header>
            <h1>@slithy/modal</h1>
            <div className="description">
              <p>Context-based modals in React, using React Hooks.</p>
            </div>
          </header>

          <hr />

            <label>
              <input checked={!solo} type="checkbox" onChange={() => setSolo(!solo)} />
              <span>Allow Modal Stacking</span>
            </label>
            <p>@slithy/modal allows multiple modals to stack, e.g. a modal opens another modal. To disallow this, set the "solo" property on the context. For these examples, use the toggle above to allow or disallow modal stacking.</p>
            <pre>
              &lt;ModalContext solo&gt; ... &lt;/ModalContext&gt;
            </pre>
            <StackedModals />

          <hr />

          <Examples />

        </main>
      </div>
    </ModalProvider>
  )
}

render(<App />, document.getElementById('root'))
