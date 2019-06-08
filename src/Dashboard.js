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
import {
  optionsHandler,
  modalHandler,
  paginateHandler,
  generateHandler
} from './utils/handlers'

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

  const handleOptions = (e) => optionsHandler(e, {
    state,
    optionsOpen,
    dispatch,
    setOptionsOpen,
    setIsSignedIn
  })

  const handleModal = (e) => modalHandler(e, {
    setModalOpen,
    setGenAmmount,
    setOptionsOpen
  })
  const handleGenerate = (e) => generateHandler(e, {
    setGenAmmount,
    genAmmount,
    setModalOpen,
    setShowOverview,
    setLoading,
    generate,
    dispatch,
  })

  const handlePaginate = (e) => paginateHandler(e, {
    numbers,
    setPage,
    PrevPage,
    page
  })

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
