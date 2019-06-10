import React from 'react';
import '../assets/styles/paginator.scss'

const Paginator = ({ pageNumber, handlePaginate, totalPages }) => (
  <div className="paginator">
    <div className="left">
      <input
        type="number"
        name="paginatorInput"
        id="paginatorInput"
        onChange={handlePaginate}
        value={pageNumber}
      />
      Page {pageNumber} of {totalPages} pages
    </div>
    <div className="right">
      <button className="prev-btn" name="previous" type="button" onClick={handlePaginate}>Previous</button>
      <button className="next-btn" name="next" type="button" onClick={handlePaginate}>Next</button>
    </div>
  </div>
);

export default Paginator;
