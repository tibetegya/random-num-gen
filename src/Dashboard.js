import React, { useState, useEffect, useReducer } from 'react';
import './assets/styles/dashboard.scss';
import Navbar from './components/Navbar';
import yellowLine from './assets/images/yellow-line.svg';
import greenCircle from './assets/images/green-circle.svg';
import Loader from './components/Loader';
import EmptyState from './components/EmptyState';
import Overview from './components/Overview';
import Paginator from './components/Paginator';
import GenerateModal from './components/GenerateModal';
import { getData } from './utils/helpers';
import {
  setData,
  handleOptions,
  handleModal,
  handlePaginate,
  handleGenerate
} from './utils/handlers'
class Dashboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      showOverview: false,
      isSignedIn: true,
      optionsOpen:  false,
      modalOpen: false,
      data: {},
      numbers: {},
      csv: '',
      page: '1',
      genAmmount: 10
    }
    this.setData = setData.bind(this)
    this.handlePaginate = handlePaginate.bind(this)
    this.handleGenerate = handleGenerate.bind(this)
    this.handleModal = handleModal.bind(this)
    this.handleOptions = handleOptions.bind(this)
  }
  componentDidMount () {
    if(!localStorage.getItem('companyName')){
      this.setState({ isSignedIn: false })
      this.props.history.push('/');
    } else {
      this.setState({ loading: true })
      getData().then(retrievedData => {
        if(retrievedData){
        this.setData(retrievedData)
        this.setState({ showOverview: true })
        }
        this.setState({ loading: false })
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.isSignedIn !== prevState.isSignedIn) {
      this.props.history.push('/');
    }
  }

  render () {
    const { optionsOpen, showOverview, csv, loading, data, numbers, page, modalOpen } = this.state
    return (
      <React.Fragment>
        <Navbar
          isOpen={optionsOpen}
          handleOptions={this.handleOptions}
          handleModal={this.handleModal}
          showOverview={showOverview}
          csvData={csv}
        />
        <div className="wrapper" id="dashboard">
          <img src={yellowLine} alt="line" className="bg" id="yellow-ln"/>
          <img src={greenCircle} alt="line" className="bg" id="green-cir"/>
          <div className="centered">
          {loading ?
            <Loader/> :
              !showOverview ?
                <EmptyState handleModal={this.handleModal}/>
                :
              <React.Fragment>
                <Overview
                  total={data.numbers.length}
                  min={data.max}
                  max={data.min}
                />
                <div className="generated">
                  <div className="title">Generated numbers</div>
                  <div className="tiles">
                    {Object.keys(numbers).length > 0 && numbers[page].map(number => (<div key={number} className="tile">{number}</div>))}
                  </div>
                </div>
                <Paginator
                  pageNumber={page}
                  totalPages={Object.keys(numbers).length}
                  handlePaginate={this.handlePaginate}
                />
              </React.Fragment>
          }
          </div>
        </div>
        <GenerateModal
          handleAction={this.handleGenerate}
          handleModal={this.handleModal}
          isOpen={modalOpen}
        />
    </React.Fragment>
    )
  }
}

export default Dashboard;
