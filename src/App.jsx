import React from 'react';
import './assets/styles/app.scss'
import yellowLine from './assets/images/yellow-line.svg';
import greenLine from './assets/images/green-line.svg';
import purpleCircle from './assets/images/purple-circle.svg';
import phoneMake from './assets/images/phonemake.png';
import { postUser, genNumbers } from './utils/helpers'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = { filled: '', company_name: '' }
    this.handleGetStarted = this.handleGetStarted.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount (){
    if(localStorage.getItem('user')){

    }
  }
  handleChange({ target: { name, value } }){
    const filled = value.length > 0 ? 'filled': '';
    const company_name = value.trim();
    this.setState({ filled, company_name })
    console.log(value)
  }

  handleGetStarted (){
    postUser(this.state.company_name)
    .then(data => {
      localStorage.setItem('company_name', data.user.name);
      document.cookie = `company_name=${data.user.name}`
      genNumbers()
      .then(data => {
        this.props.history.push({
          pathname: '/dashboard',
          state: { data }
        });
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log('error....', err))
  }
  render() {
    return (
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
        {/* <input
          className={this.state.filled}
          type="text"
          name="company_name"
          id="company-name"
          placeholder="Enter company name"
          onChange={this.handleChange}
        /> */}
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
        {/* <button
          className="get-started"
          onClick={this.handleGetStarted}
        >
        Get Started
        </button> */}
      </div>
    );
  };
}

export default App;
