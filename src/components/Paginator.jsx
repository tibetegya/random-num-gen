import React from 'react';
import '../assets/styles/paginator.scss'

const Paginator = ({ pageNumber, handlePaginate }) => {
  return (
  <div className="paginator">
  <div className="left">
    <input
      type="number"
      name="paginatorInput"
      id="paginatorInput"
      defaultValue={pageNumber}
    />
    Page {pageNumber}
  </div>
  <div className="right">
    <button type="button">Previous</button>
    <button type="button">Next</button>
  </div>
  </div>)
}
export default Paginator;
