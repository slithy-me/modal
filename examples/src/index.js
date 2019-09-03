import React, { useContext } from 'react'
import { render } from 'react-dom'
import { Modal, ModalContext, ModalProvider } from '../../src'

const ModalOne = (props) => {
  const afterOpen = () => console.log('Fired after open.')
	const beforeClose = () => console.log('Fired before close.')
	const afterClose = () => console.log('Fired after close.')
	const onCancel = () => console.log('Modal canceled')
	const onSubmit = () => console.log('Modal submitted')

  return (
    <Modal
      actions={[
        'cancel',
        'submit',
      ]}
      afterClose={afterClose}
      afterOpen={afterOpen}
      beforeClose={beforeClose}
      closeOnOutsideClick
      onCancel={onCancel}
      onCancelLabel="Cancel"
      onSubmit={onSubmit}
      onSubmitLabel="Submit"
      title="Standalone Modal"
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id ipsum ac eros sagittis tincidunt. Vivamus et placerat nisl. Cras viverra a velit ornare finibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer egestas eros eu porta porta. Nullam elementum viverra risus ut pulvinar. Etiam porttitor scelerisque facilisis.</p>
      <p>Curabitur finibus bibendum dapibus. Pellentesque non purus non mauris scelerisque tempor ac et lacus. Vestibulum porttitor mi sit amet condimentum ornare. Vestibulum vitae est augue. Sed placerat eleifend ex, nec ultrices mi mollis eu. Ut rutrum tincidunt odio, id dignissim dolor venenatis id. Vestibulum sit amet fringilla nisi. In eu risus fermentum tellus tincidunt viverra sit amet ac dolor. Aliquam sed felis imperdiet, dictum nibh in, cursus massa. Curabitur in elit ac erat porta pellentesque iaculis id tellus. Morbi pretium est elit, ut commodo tellus tincidunt quis.</p>
    </Modal>
  )
}

const View = () => {
  const { openModal } = useContext(ModalContext)

	const handleClick = (e) => {
    return openModal(<ModalOne />)
  }

  return (
    <>
      <button onClick={handleClick}>Open Modal #1</button>
    </>
  )
}

const App = () => (
  <ModalProvider>
    <View />
  </ModalProvider>
)

render(<App />, document.getElementById('root'))
