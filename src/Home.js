import React from 'react';
import './assets/styles/app.scss'
import yellowLine from './assets/images/yellow-line.svg';
import greenLine from './assets/images/green-line.svg';
import purpleCircle from './assets/images/purple-circle.svg';
import phoneMake from './assets/images/phonemake.png';
import Modal from './components/Modal';
import { handleSignIn, handleModal } from './utils/handlers'
class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      companyName: '',
      isSignedIn: false,
      modalOpen: false,
    }
    this.handleModal = handleModal.bind(this)
    this.handleSignIn = handleSignIn.bind(this)
  }
  componentDidMount () {
    if(localStorage.getItem('companyName')){
      this.setState({ isSignedIn: true })
      this.props.history.push('/dashboard');
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.isSignedIn !== prevState.isSignedIn) {
      this.props.history.push('/dashboard');
    }
  }
  render () {
    const { modalOpen } = this.state
    return (
      <React.Fragment>
        <div className="wrapper" id="app">
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
            onClick={this.handleModal}
          >
          Get Started
          </button>
          <Modal
            handleModal={this.handleModal}
            isOpen={modalOpen}
            title="Get Started"
          >
            <h4>Create an account to get started</h4>
            <input
              type="text"
              name="companyName"
              id="company-name"
              placeholder="Enter company name"
              onChange={this.handleSignIn}
            />
            <button
              name="signIn"
              className="sign-in btn"
              onClick={this.handleSignIn}
            >
            Enter
            </button>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}


export default Home;
