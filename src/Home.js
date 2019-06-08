import React, { useState, useEffect, useReducer } from 'react';
import './assets/styles/app.scss'
import yellowLine from './assets/images/yellow-line.svg';
import greenLine from './assets/images/green-line.svg';
import purpleCircle from './assets/images/purple-circle.svg';
import phoneMake from './assets/images/phonemake.png';
import Modal from './components/Modal';
import { signInHandler, modalHandler } from './utils/handlers'

const Home = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    if(localStorage.getItem('companyName')){
      props.history.push('/dashboard');
    }
  }, [isSignedIn, props]);

  const handleSignIn = (e) => signInHandler(e, {
    companyName,
    setCompanyName,
    setIsSignedIn,
    setModalOpen,
  })

  const handleModal = (e) => modalHandler(e, {
    setModalOpen,
  })

  return (
    <React.Fragment>
      <div className="wrapper" id="home app">
      <img src={yellowLine} alt="line" className="bg" id="yellow-ln" />
      <img src={greenLine} alt="line" className="bg" id="green-ln" />
      <img src={purpleCircle} alt="line" className="bg" id="purple-cir" />
      <img src={phoneMake} alt="logo" className="logo"/>
      <div className="title">PhoneMake</div>
      <p className="description">
        PhoneMake is a service that powers telecom companies by <br/>
        generating unique phone numbers<br/><br/>
        Enter a company below in order to <br/>
        generate a collection of phone numbers<br/>
        </p>
        <button
          name="openModal"
          className="get-started btn"
          onClick={handleModal}
        >
        Get Started
        </button>
        <Modal
          handleModal={handleModal}
          isOpen={modalOpen}
          title="Get Started"
        >
          <h4>Create an account to get started</h4>
          <input
            type="text"
            name="companyName"
            id="company-name"
            placeholder="Enter company name"
            onChange={handleSignIn}
          />
          <button
            name="signIn"
            className="sign-in btn"
            onClick={handleSignIn}
          >
          Enter
          </button>
        </Modal>
      </div>
    </React.Fragment>
  );
};


export default Home;
