import 'normalize.css'
import './style.scss'

import React, { useContext, useState } from 'react'
import { render } from 'react-dom'
import { ModalContext, ModalProvider } from '../../src'

import StackedModals from './StackedModals'

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
        {/* <View /> */}
      </main>
    </ModalProvider>
  )
}

render(<App />, document.getElementById('root'))

// const BasicModal = (props) => {
//   const afterOpen = () => console.log('Fired after open.')
// 	const beforeClose = () => console.log('Fired before close.')
// 	const afterClose = () => console.log('Fired after close.')
// 	const onCancel = () => console.log('Modal canceled')
// 	const onSubmit = () => console.log('Modal submitted')

//   return (
//     <Modal
//       actions={[
//         'cancel',
//         'submit',
//       ]}
//       afterClose={afterClose}
//       afterOpen={afterOpen}
//       beforeClose={beforeClose}
//       closeOnOutsideClick
//       onCancel={onCancel}
//       onCancelLabel="Cancel"
//       onSubmit={onSubmit}
//       onSubmitLabel="Submit"
//       title="Basic Modal w/ Callback Events"
//       {...props}
//     >
//       <p>This modal logs its callback events. Open the browser's console to view the events as they fire.</p>
//     </Modal>
//   )
// }

// const ChildModal = (props) => {
//   const { closeModal, closeAllModals } = useContext(ModalContext)
//   return (
//   <Modal
//     actions={[
//       <button onClick={() => closeModal(props.parent)} key="closeParent">Close Parent</button>,
//       <button onClick={closeAllModals} key="closeAll">Close All</button>,
//       'cancel',
//       'submit',
//     ]}
//     closeOnOutsideClick
//     title="Child Modal"
//     {...props}
//     >
//     <p>This modal is nested in a parent ({props.parent}).</p>
//   </Modal>
// )}

// const ParentModal = (props) => {
//   const { openModal, closeModal, closeAllModals } = useContext(ModalContext)
//   const afterOpen = () => console.log('Fired after open.')
// 	const beforeClose = () => console.log('Fired before close.')
// 	const afterClose = () => console.log('Fired after close.')
// 	const onCancel = () => console.log('Modal canceled')
// 	const onSubmit = () => console.log('Modal submitted')

//   return (
//     <Modal
//       actions={[
//         'cancel',
//         <button onClick={closeAllModals} key="closeAllModals">Close All</button>,
//         <button onClick={() => openModal(<ChildModal parent={props.id}/>)} key="ChildModal">Child Modal</button>,
//         'submit',
//       ]}
//       afterClose={afterClose}
//       afterOpen={afterOpen}
//       beforeClose={beforeClose}
//       closeOnOutsideClick
//       onCancel={onCancel}
//       onCancelLabel="Cancel"
//       onSubmit={onSubmit}
//       onSubmitLabel="Submit"
//       title="Parent Modal"
//       {...props}
//     >
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacus erat, hendrerit eget neque vel, scelerisque mattis dolor. Nunc tristique tortor nunc, non tincidunt massa imperdiet vitae. Praesent non orci urna. Proin eget nisl tellus. Praesent dignissim convallis maximus. Praesent lacinia tellus magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam turpis augue, vehicula et arcu in, ullamcorper dapibus neque.</p>
//     </Modal>
//   )
// }

// const View = () => {
//   const { openModal } = useContext(ModalContext)

// 	const handleBasicModal = (e) => {
//     return openModal(<BasicModal />)
//   }

// 	const handleParentModal = (e) => {
//     return openModal(<ParentModal />)
//   }

//   return (
//     <>
//       <button onClick={handleBasicModal}>Basic Modal w/ Callback Events</button>
//       <button onClick={handleParentModal}>Parent Modal</button>
//     </>
//   )
// }
