import React from 'react';
import '../assets/styles/navbar.scss';
import Logo from '../assets/images/logo-small.svg'

const Navbar = ({ isOpen, handleModal, handleOptions, showOverview, csvData }) => {
  const dropClass = isOpen ? 'open': '';
  return (
    <nav className="navbar">
      <div className="title">
        <span>PhoneMake</span>
        <img src={Logo} alt="logo" className="logo" />
      </div>
        <ul>
          <li>
            <button className="options" name="options" onClick={handleOptions}>Options</button>
            <div className={`dropdown ${dropClass}`}>
              <ul>
              {showOverview && (
                <>
                <li><button className="ascending" name="ascending" onClick={handleOptions}>Ascending Order</button></li>
                <li><button className="descending" name="descending" onClick={handleOptions}>Descending Order</button></li>
                <li>
                  <a
                  href={csvData}
                  download="Phone_Numbers.csv"
                  >
                    <button>Download Numbers</button>
                  </a>
                </li>
                </>
              )}
                <li><button name="logout" onClick={handleOptions}>Logout</button></li>
              </ul>
            </div>
          </li>
          {showOverview && (
            <li>
              <button
                className="generate"
                name="openModal"
                onClick={handleModal}
              >
                Generate new numbers
              </button>
            </li>
          )}
        </ul>
    </nav>
  )
}
export default Navbar;
