import React from 'react';
import '../assets/styles/modal.scss';
import Modal from './Modal';

const GenerateModal = ({ handleAction, handleModal, isOpen }) => (
  <Modal
    handleModal={handleModal}
    isOpen={isOpen}
    title="Generate Phone Numbers"
  >
    <p> Enter number of Phone numbers to generate </p>
    <div className="gen-input">
      <span>You must enter number of phone numbers to generate</span>
      <input
        type="number"
        name="generateInput"
        id="generateInput"
        onChange={handleAction}
        defaultValue="10"
        placeholder="10"
      />
      <button
        name="generateBtn"
        className="generate"
        onClick={handleAction}
      >
        Generate new numbers
      </button>
    </div>
  </Modal>
);

export default GenerateModal;
