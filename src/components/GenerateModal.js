import React from 'react';
import '../assets/styles/modal.scss';
import Modal from './Modal';

const GenerateModal = ({ handleAction, handleModal, total, isOpen, showWarning }) => {
  const disabled = 10000 - total === 0
  return (
    <Modal
      handleModal={handleModal}
      isOpen={isOpen}
      title="Generate Phone Numbers"
    >
      <p> Enter number of Phone numbers to generate. ({10000 - total}) numbers left</p>
      <div className="gen-input">
        <div className={`gen-span ${showWarning && 'warning'}`}>You must enter a number less than {10000 - total} </div>
        <input
          type="number"
          className="generate-input"
          name="generateInput"
          id="generateInput"
          onChange={handleAction}
          defaultValue="10"
          placeholder="10"
        />
        <button
          disabled={disabled}
          name="generateBtn"
          className={`generate ${disabled && 'disabled'}`}
          onClick={handleAction}
        >
          {disabled ? 'Number limit reached': 'Generate new numbers'}
        </button>
      </div>
    </Modal>
  )
};

export default GenerateModal;
