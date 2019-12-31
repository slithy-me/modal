# @slithy/modal

Context-based modals in React, using React Hooks.

## Install w/ Dependencies

```shell
npm install @slithy/modal @slithy/portal react-spring
```

***

## Setup

Wrap your application or component tree in the `ModalProvider` component.

```javascript
...
import { ModalProvider } from '@slithy/modal'

const App = () => (
  <ModalProvider>
    {/*
      ... your application ...
    */}
  </ModalProvider>
)
```

***

## Basic Usage

Import the `Modal` and `useModal` components.

```javascript
import { Modal, useModal } from '@slithy/modal'
```

Create a component containing your modal definition. Be sure to spread props into the `Modal` component, as below.

```javascript
const SimpleModal = (props) => {
  return (
    <Modal {...props}>
      <p>Hello, World. I am in a modal!</p>
    </Modal>
  )
}
```

In your view, use `useModal`, then create an event handler to use `openModal`.

```javascript
import React from 'react'

const ExampleView = () => {
  const { openModal } = useModal()
  const handleOpeningModal = () => openModal(<SimpleModal />)
  return (
    <div>
      <p>Click this here button!</p>
      <button
        onClick={handleOpeningModal}
        type="button"
      >
        Open Modal
      </button>
    </div>
  )
}
```

***

## API : ModalProvider

A provider component for the modal's context, it should wrap your App, or the component tree in which you will use modals.

### solo
_boolean_, false

An optional prop. If true, allows only one modal to be open. If a new modal is opened, the current modal will be closed programmatically.

```javascript
<ModalProvider solo> ... </ModalProvider>
```

### transitions
_object_
An optional prop, allows you to redefine the react-spring transitions, using _from_, _enter_ and _leave_.

Default:
```javascript
<ModalProvider transitions={{
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
}}>
  ...
```

***

## API : useModal

Used via the `useModal` hook.

```javascript
const { openModal, closeModal, closeAllModals } = useModal()
```

### openModal
_method_

A required method, use in an event handler to open a modal.

```javascript
const handleOpeningModal = () => openModal(<SimpleModal />)
```

Optionally, you may provide a unique `id` as a separate argument. If omitted, the modal context will assign an id.

### closeModal
_method_
An optional method, can be used to close a modal. Accepts an `id` argument.

### closeAllModals
_method_
And optional method, can be used to close all modals.

***

## API : Modal

The component that wraps whatever content you wish to appear in your modal. Always destructure props into the component, as below.

```javascript
import { Modal } from '@slithy/modal'

const MyModal = (props) => (
  <Modal title="My Modal" {...props}>
    <div> ... Content ... </div>
  </Modal>
)
```

Here come the props, all optional.

### actions
_array_

Accepts an array of JSX elements, and two special strings, `'cancel'` and `'submit'`.

If present, will create a modal footer containing the defined UI elements, left-to-right. The special strings will render as default modal buttons.

```javascript
<Modal actions={['cancel', 'submit']}> ... </Modal>
```

### backgroundStyle
_object_
A style object, applied to the `.modal-background` element, the semi-opaque overlay.

### cardStyle
_object_
A style object, applied to the `.modal-card` element.

### className
_string_
Apply a custom className to your modal.

### closeButtonOutside
_boolean_
By default, the close button appears in the top-right corner of the modal card. If present, this prop moves the close button to the top-right corner of the viewport.

### closeOnOutsideClick
_boolean_
If present, clicking the background overlay will close the modal.

### onCancel
_func_
A callback function, executed when the Cancel button is clicked. See the `actions` prop for enabling the button.

After executing, the modal will close.

### onCancelLabel
_string_
The label for the Cancel button, "Cancel" by default. See the `actions` prop for enabling the button.

### onSubmit
_func_
A callback function, executed when the Submit button is clicked. See the `actions` prop for enabling the button.

After executing, the modal will close. To prevent closing, `return false`.

### onSubmitLabel
_string_
The label for the Submit button, "Submit" by default. See the `actions` prop for enabling the button.

### title
_string_
Text to display as title in the modal header.

***

Additionally, there are two read-only props passed into each modal by the context. These are as follows:

### enqueuedToClose
_boolean_
Emitted as `true` to the modal when using `closeAllModals` or `closeModal` with the modal's `id`. When true, the modal will close, firing the `beforeClose` and `afterClose` event callbacks, described below.

### id
_string_
A unique id, assigned to the modal by the context.

***

## API : Modal Events

The modal also accepts a handful of events props, accepting callbacks that execute at defined moments in the modal's lifecycle.

There is no `beforeOpen` method. For such an effect, execute your code in your event handler, before the `openModal` method.

### afterOpen
Fires immediately after the modal is opened.

### beforeClose

On cancel or submit, fires before the closeModal method.

### afterClose

On cancel or submit, fires after the closeModal method.

***

## Keyboard Handlers

When modals are open, pressing the `Esc` key will close the active modal. This is the same as pressing the X button to close the modal, and will trigger the `beforeClose` and `afterClose` methods.

***

## Examples

### the Simplest Modal

This is as bare-bones as it gets.

```javascript
const SimpleModal = (props) => (
  <Modal {...props}>
    <p>Hello, World. I am in a modal!</p>
  </Modal>
)
```

### the Everything Modal

This modal uses every prop, and it opens and closes other modals.

```javascript
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
    return openModal(<NewModal parentId={props.id} />)
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
        <p>This modal logs events to the browser console. Open your dev tools to observe.</p>
        <button onClick={handleOpenNewModal} type="button">Open New Modal</button>
      </div>
    </Modal>
  )
}
```

### A Custom, Reusable Modal

By wrapping the `Modal` in a custom component, and passing through props, it's easy to create a custom variation for your own modals.

#### style.scss

```css
.component-modal {
  &.oreo {
    .modal-card {
      .modal-header {
        background-color: #565656;
        color: #fff;
      }

      .modal-main {
        margin: 12px 0;
      }

      .modal-footer {
        background-color: #565656;
        margin-bottom: 0;

        .modal-button--cancel {
          color: #fff;
        }
      }

      .modal-button--close {
        color: #fff;
      }
    }
  }
}

```

#### OreoModal.js

```javascript
import React from 'react'
import { Modal } from '@slithy/modal'
import './OreoModal.scss'

const OreoModal = ({ children, ...props }) => (
  <Modal className="oreo" {...props}>
    {children}
  </Modal>
)

export default OreoModal
```

***
