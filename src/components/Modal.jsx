import React from 'react';
import '../assets/styles/modal.scss';

const Modal = ({ title, handleModal, isOpen = false, children}) => {
  const modalClass = isOpen ? 'show': '';
  return (
    <div id="genModal" className={`modal ${modalClass}`}>
      <div className="modal-content">
        <button
          name="closeModal"
          className="close"
          onClick={handleModal}
        >
          &times;
        </button>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default Modal;
