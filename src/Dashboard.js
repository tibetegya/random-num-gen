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
import reducer from './utils/reducers';
import { generate, getData } from './utils/helpers';

const Dashboard = (props) => {
  const [state, dispatch] = useReducer(reducer,{ data: {}, numbers: {}, csv: '' });
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [showOverview, setShowOverview] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [genAmmount, setGenAmmount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('1');

  useEffect(() => {
    setLoading(true);
    getData().then(retrievedData => {
      if(retrievedData){
        dispatch({type: 'set_data', payload: retrievedData})
        setShowOverview(true);
        setLoading(false);
      }
      setLoading(false);
    })
  }, [])

  useEffect(() => {
    if(!localStorage.getItem('companyName')){
      props.history.push('/');
    }
  }, [props, isSignedIn])

  const handleOptions = (e) => {
    const { target: { name } } = e;
    e.preventDefault();
    switch (name) {
      case 'options':
        setOptionsOpen(!optionsOpen);
        break;
      case 'ascending':
        dispatch({
          type: 'ascending_sort',
          payload: state.data.numbers
        })
        setOptionsOpen(false);
        break;
      case 'descending':
        dispatch({
          type: 'descending_sort',
          payload: state.data.numbers
        })
        setOptionsOpen(false);
        break;
      case 'download':
        setOptionsOpen(false);
        break;
      case 'logout':
        localStorage.removeItem('companyName')
        setIsSignedIn(false);
        break;
      default:
    };

  }

  const handleModal = (e) => {
    const { target: { name } } = e;
    e.preventDefault();
    switch (name) {
      case 'closeModal':
        setModalOpen(false);
        setGenAmmount(10);
        break;
      case 'openModal':
        setOptionsOpen(false);
        setModalOpen(true);
        break;
      default:
    };
  };

  const handleGenerate = (e) => {
    const { target: { name, value } } = e;

    if(name === 'generateInput' && value !== '') {
      setGenAmmount(parseInt(value.trim(), 10));
    }
    if(name === 'generateBtn') {
      setModalOpen(false);
      setShowOverview(true);
      setLoading(true);
      generate(genAmmount).then(newData => {
        dispatch({type: 'set_data', payload: newData})
        setLoading(false);
      })
    }
  }
  const handlePaginate = (e) => {
    e.preventDefault();
    const { target: { name, value } } = e;
    switch(name) {
      case 'paginatorInput':
      if (value !== ''
      && value !== '0'
      && parseInt(value, 10) <= Object.keys(numbers).length) setPage(value);
        break;
      case 'previous':
        if(page !== '1'){
          const PrevPage = String(parseInt(page, 10) - 1)
          setPage(PrevPage);
        }
        break;
      case 'next':
      if(page !== String(Object.keys(numbers).length)){
        const PrevPage = String(parseInt(page, 10) + 1)
        setPage(PrevPage);
      }
      break;
      default:
    }
  }
  const {data, numbers, csv} = state;
  return (
    <React.Fragment>
      <Navbar
        isOpen={optionsOpen}
        handleOptions={handleOptions}
        handleModal={handleModal}
        showOverview={showOverview}
        csvData={csv}
      />
      <div className="wrapper" id="dashboard">
        <img src={yellowLine} alt="line" className="bg" id="yellow-ln"/>
        <img src={greenCircle} alt="line" className="bg" id="green-cir"/>
        <div className="centered">
        {loading ? 
          (<Loader/>) :
          !showOverview ? (
          <EmptyState handleModal={handleModal}/>
        ) : (
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
              handlePaginate={handlePaginate}
            />
          </React.Fragment>
        )}
        </div>
      </div>
      <GenerateModal
        handleAction={handleGenerate}
        handleModal={handleModal}
        isOpen={modalOpen}
      />
    </React.Fragment>
  )
}

export default Dashboard;
