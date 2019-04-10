import React from 'react';
import '../assets/styles/navbar.scss';
import Logo from '../assets/images/logo-small.svg'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="title">
        <span>PhoneMake</span>
        <img src={Logo} alt="logo" className="logo"/>
      </div>
      <ul>
        <li>
          <p>audit numbers</p>
        </li>
        <li>
          <button>Generate new numbers</button>
        </li>
      </ul>
    </nav>
  )
}
export default Navbar;
