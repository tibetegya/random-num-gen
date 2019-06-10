import React from 'react';
import emptyImg from '../assets/images/empty-state.svg'

const EmptyState = ({ handleModal }) => (
  <div className="empty-state">
    <img src={emptyImg} alt="empty state"/>
    <p>There are no generated Numbers</p>
    <p>press button below to generate</p>
    <button className="empty-btn" name="openModal" onClick={handleModal}>Generate new numbers</button>
  </div>
);
export default EmptyState;
