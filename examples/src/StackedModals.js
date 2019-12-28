import './StackedModals.scss'

import React, { useContext, useState } from 'react'
import { Modal, ModalContext } from '../../src'

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const ParentModal = props => {
  const { openModal } = useContext(ModalContext)

  const onSubmit = () => {
    openModal(<RandomizedModal count={getRandomArbitrary(1, 5)} parent={props.id} />)
    return false
  }

  return (
    <Modal
      actions={[
        'cancel',
        'submit',
      ]}
      className="parent-modal"
      onCancelLabel="Close"
      onSubmit={onSubmit}
      onSubmitLabel="Next Modal"
      title={`Modal ID : ${props.id}`}
      {...props}
    >
      <p>If modal stacking is allowed, multiple modals will stack. If disallowed, opening the next modal will close the current modal.</p>

      <dl>
        <dt>Close</dt>
        <dd>Closes this modal.</dd>
        <dt>Close Parent</dt>
        <dd>Programmatically closes this modal's immediate parent. Does nothing if there is no parent, the parent has already been closed, or if the context is in solo mode.</dd>
        <dt>Close All</dt>
        <dd>Programmatically closes all modals.</dd>
        <dt>Next Modal</dt>
        <dd>Adds a new modal to the stack.</dd>
      </dl>
    </Modal>
  )
}

const RandomizedModal = props => {
  const { openModal, closeModal, closeAllModals } = useContext(ModalContext)
  const [modalWidth, setModalWidth] = useState(getRandomArbitrary(512, 768))

  const lipsum = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam condimentum sodales justo, quis efficitur mi tincidunt vestibulum. Quisque tristique neque eget dui accumsan volutpat. Proin quis iaculis felis. Proin eget enim aliquam, gravida ligula id, gravida turpis. Vivamus aliquam venenatis quam, ac sagittis dolor ultricies a. Curabitur cursus, lacus in cursus volutpat, ante ante elementum odio, eget sagittis justo elit sit amet tellus. Donec quis dapibus arcu. Proin odio risus, commodo et hendrerit quis, aliquam at ipsum. Nullam tempus nisl neque, facilisis ornare nunc facilisis vitae. Proin egestas sem id turpis tempus molestie. Quisque luctus, eros id lobortis elementum, leo lacus efficitur nunc, at facilisis ligula nulla nec risus.',
    'Donec a ligula enim. Praesent feugiat a ante a consequat. Nulla porttitor tempor purus rutrum luctus. Nullam scelerisque gravida ante, vel tempus massa tristique id. Etiam accumsan quis elit in hendrerit. In vitae enim efficitur, volutpat arcu in, condimentum quam. Suspendisse varius dolor dolor, nec pharetra augue congue gravida. Suspendisse feugiat placerat dui vitae volutpat. Sed eros nunc, mattis dignissim fermentum a, vulputate sed libero. Sed eget leo faucibus est aliquam interdum. Praesent imperdiet placerat purus, at cursus ante egestas eu. Morbi sit amet maximus turpis, in eleifend lectus. Morbi tempor lacus lacus, ut blandit dui vehicula in. Nullam quis bibendum sapien.',
    'Etiam gravida rutrum ante vel ornare. Donec vulputate finibus neque. Cras efficitur fringilla ullamcorper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non tincidunt mi. Nullam eu urna ultrices, eleifend elit in, lobortis orci. Sed sem orci, sagittis vitae justo ut, tempus pulvinar sapien. Donec hendrerit ex quis ligula tincidunt elementum. Vivamus at gravida purus, ut fringilla dui. Aliquam vitae tincidunt risus, eu rhoncus purus. Duis congue rhoncus tellus vel ultricies. Praesent ut pharetra erat.',
    'Praesent interdum efficitur risus pellentesque bibendum. Etiam aliquam, ante non consequat pulvinar, massa arcu tristique nisi, id viverra enim nisi eu ex. Fusce commodo purus et tortor cursus commodo nec nec ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis scelerisque condimentum lorem, in sagittis justo ornare id. Fusce finibus risus at dolor sagittis placerat. Aliquam tincidunt diam magna, et vehicula elit pellentesque vel. Fusce dapibus tellus id velit malesuada fermentum. Phasellus tristique, justo et eleifend condimentum, lectus mauris finibus nisi, non fringilla ligula odio eget eros. Maecenas sed magna pulvinar, laoreet magna ac, consectetur sapien. Ut gravida dignissim justo at posuere. Nam gravida ac lacus et facilisis. Nunc eget ante at dui vulputate finibus porttitor congue nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum enim et libero cursus tempus. In semper pellentesque nibh, varius accumsan dolor iaculis ut.',
    'Sed non bibendum risus. Nulla eleifend nulla magna, at imperdiet diam viverra dictum. Phasellus pharetra odio quis risus egestas mattis. Sed purus risus, molestie id magna a, ultrices egestas lorem. Curabitur diam orci, aliquet ut efficitur vitae, laoreet nec mauris. Phasellus ullamcorper, tortor a venenatis ornare, mi sapien porttitor sem, non mollis massa dui non nulla. Morbi imperdiet et purus sit amet dapibus.',
  ]

  const onSubmit = () => {
    openModal(<RandomizedModal count={getRandomArbitrary(1, 5)} parent={props.id} />)
    return false
  }

  return (
    <Modal
      actions={[
        'cancel',
        props.parent ? <button key="closeParent" onClick={() => closeModal(props.parent)}>Close Parent</button> : null,
        <button key="closeAll" onClick={closeAllModals}>Close All</button>,
        'submit',
      ]}
      cardStyle={{
        fontSize: '0.625rem',
        width: modalWidth,
      }}
      onCancelLabel="Close"
      onSubmit={onSubmit}
      onSubmitLabel="Next Modal"
      title={`Modal ID : ${props.id}`}
      {...props}
    >
      {lipsum.slice(0, props.count).map(p => (<p key={p}>{p}</p>))}
    </Modal>
  )
}

const StackedModals = (props) => {
  const { openModal } = useContext(ModalContext)

  const handleStackedModals = () => openModal(<ParentModal />)

  return (
    <button
      onClick={handleStackedModals}
    >
      Stacked Modals Demo
    </button>
  )
}

export default StackedModals
