import React from 'react';
import '../assets/styles/loader.scss';

const Loader = () => (
  <React.Fragment>
    <div className="load-state">
      <div className="loader"/>
      <p>Generating Phone Numbers</p>
    </div>
  </React.Fragment>
);

export default Loader;
