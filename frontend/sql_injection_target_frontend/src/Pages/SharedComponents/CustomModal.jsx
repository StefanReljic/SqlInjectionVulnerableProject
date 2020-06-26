import React from 'react';
import Modal from 'react-modal';
import { customModal } from './styles/custom_modal';

export default function CustomModal(props) {
  const style = {
    content: { ...customModal.content, height: props.modalHeight }
  };
  return (
    <Modal isOpen={props.isOpen} style={style} ariaHideApp={false}>
      {props.component}
    </Modal>
  );
}
