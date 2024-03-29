import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  modalClass,
  modalDisabled,
  stopProp
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e) => {
    if(stopProp){
      e.stopPropagation()
    }
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  const disableBtn = () => {
    if (modalDisabled) {
      return modalDisabled()
    } else {
      return false
    }

  }

  return (
    <button onClick={onClick} className={modalClass} disabled={disableBtn()}>{buttonText}</button>
  );
}

export default OpenModalButton;
