import React from 'react';
import '../assets/styles/box-head.scss';
import circleTrans from '../assets/images/circle-trans.svg';

const BoxHead = ({ id, title, content}) => {
  return (
    <div className="box-head" id={id}>
      <img src={circleTrans} alt="logo" className="logo" />
      <div className="title">{title}</div>
      <p className="figure">{content}</p>
    </div>
  )
};

export default BoxHead;
