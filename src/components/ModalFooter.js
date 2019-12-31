import React from 'react'

export const ModalFooter = ({
	actions,
	handleClose,
	onCancel,
	onCancelLabel,
	onSubmit,
	onSubmitLabel,
}) => {

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    handleClose()
  }

	const handleSubmit = async () => {
    let result = true
    try {
      if (onSubmit) {
        result = await onSubmit()
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

	return (
		<div className="modal-footer">
			{actions.map((action) => {
				if (action === 'cancel') {
					return (
						<button
							className="modal-button--cancel"
							key="modal-button--cancel"
							onClick={handleCancel}
							type="button"
						>
							{onCancelLabel || 'Cancel'}
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
							{onSubmitLabel || 'Submit'}
						</button>
					)
				} else {
					return action
				}
			})}
		</div>
	)
}
