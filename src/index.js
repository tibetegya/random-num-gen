import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import Routes from './Routes';

const element = document.createElement('div')
element.id = 'root'
document.body.appendChild(element)

ReactDOM.render(<Routes />, document.getElementById('root'));
