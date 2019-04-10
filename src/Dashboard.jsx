import React from 'react';
import './assets/styles/dashboard.scss';
import emptyImg from './assets/images/empty-state.svg'
import Navbar from './components/Navbar';
import BoxHead from './components/BoxHead';
import Paginator from './components/Paginator';
import yellowLine from './assets/images/yellow-line.svg';
import greenCircle from './assets/images/green-circle.svg';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.paginateNumbers = this.paginateNumbers.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
    this.state = {
      numbers: {},
      showOverview: false
    }
  };

  paginateNumbers(nums) {
    // const { location: { state: { data } } } = this.props;
    const data = {
      max: '0993884838',
      min: '0312332332',
      generated_numbers: [ '0939493123']
    }
    const pages = nums.length / 25;
    let fetchedNumbers = {}
    for(let i = 0; i < pages; i++ ){
      const beginIndex = 25 * i;
      const endIndex = 25 * (i+1);
      fetchedNumbers = {
        ...fetchedNumbers,
        [i]: data.generated_numbers.slice(beginIndex, endIndex)
      }
    };

    console.log('fetchedNumbers', fetchedNumbers);
    this.setState({
      numbers: fetchedNumbers
    });
  }
  handleGenerate() {
    this.setState({ showOverview: true })
  }

  componentDidMount() {
    // const { location: { state: { data } } } = this.props;
    const data = {
      max: '0993884838',
      min: '0312332332',
      generated_numbers: [ '0939493123']
    }
    this.paginateNumbers(data.generated_numbers);
  };

  render (){
    // const { location: { state: { data } } } = this.props;
    const data = {
      max: '0993884838',
      min: '0312332332',
      generated_numbers: [ '0939493123']
    }
    const { numbers, showOverview } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <div className="wrapper" id="dashboard">
          <img src={yellowLine} alt="line" className="bg" id="yellow-ln"/>
          <img src={greenCircle} alt="line" className="bg" id="green-cir"/>
          <div className="centered">
          {!showOverview ? (
            <div className="empty-state">
              <img src={emptyImg} alt="empty state"/>
              <p>There are no generated Numbers</p>
              <p>press button below to generate</p>
              <button onClick={this.handleGenerate}>Generate new numbers</button>
            </div>
          ): (
            <>
              <div className="overview">
                <BoxHead
                  id="purple-bg"
                  title="Total generated numbers"
                  content={data.generated_numbers.length}
                />
                <BoxHead
                  id="green-bg"
                  title="Max generated number"
                  content={data.max}
                />
                <BoxHead
                  id="orange-bg"
                  title="Min generated number"
                  content={data.min}
                />
              </div>
              <div className="generated">
                <div className="title">Generated numbers</div>
                <div className="tiles">
                  {Object.keys(numbers).length > 0 && numbers['0'].map(number => (<div key={number} className="tile">{number}</div>))}
                </div>
              </div>
              <Paginator
                pageNumber={1}
              />
            </>
          )}
          </div>
        </div>
      </React.Fragment>
    )
  }

}
export default Dashboard;
