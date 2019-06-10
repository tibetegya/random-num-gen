import React from 'react';
import '../assets/styles/navbar.scss';
import Logo from '../assets/images/logo-small.svg'
import { getName } from '../utils/helpers'

const Navbar = ({ isOpen, handleModal, handleOptions, showOverview, csvData }) => {
  const dropClass = isOpen ? 'open': '';
  const name = getName()
  return (
    <nav className="navbar">
      <div className="title">
        <span>PhoneMake</span>
        <img src={Logo} alt="logo" className="logo" />
      </div>
        <div className="right">
          <ul>
            <li>
              <button className="options" name="options" onClick={handleOptions}>Options</button>
              <div className={`dropdown ${dropClass}`}>
                <ul>
                {showOverview && (
                  <>
                  <li>
                    <button
                      className="generate"
                      id="generate-btn-nav"
                      name="openModal"
                      onClick={handleModal}
                    >
                      Generate new numbers
                    </button>
                  </li>
                  <li><button className="ascending" name="ascending" onClick={handleOptions}>Ascending Order</button></li>
                  <li><button className="descending" name="descending" onClick={handleOptions}>Descending Order</button></li>
                  <li>
                    <a
                    href={csvData}
                    download="Phone_Numbers.csv"
                    >
                      <button name="download" className="download" onClick={handleOptions}>Download Numbers</button>
                    </a>
                  </li>
                  </>
                )}
                  <li><button className="logout-btn" name="logout" onClick={handleOptions}>Logout</button></li>
                </ul>
              </div>
            </li>
          </ul>
          {name !== '' && (
            <>
              <div className="profile-letter">{name.split('')[0]}</div>
              <span>{name}</span>
            </>
          )}
        </div>
    </nav>
  )
}
export default Navbar;
