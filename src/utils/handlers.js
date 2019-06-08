export const signInHandler = (e, {
  companyName,
  setCompanyName,
  setIsSignedIn,
  setModalOpen
}) => {
  const { target: { name, value } } = e;
  e.preventDefault();
  switch (name) {
    case 'companyName':
    setCompanyName(value);
      break;
    case 'signIn':
      localStorage.setItem('companyName', companyName)
      setIsSignedIn(true);
      setModalOpen(false);
      break;
    default:
  };

}

export const optionsHandler = (e, {
  optionsOpen,
  dispatch,
  setOptionsOpen,
  setIsSignedIn
}) => {
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


export const modalHandler = (e, {
  setModalOpen,
  setGenAmmount,
  setOptionsOpen
}) => {
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

export const paginateHandler = (e, {
  numbers,
  setPage,
  PrevPage,
  page
}) => {
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

export const generateHandler = (e, {
  setGenAmmount,
  genAmmount,
  setModalOpen,
  setShowOverview,
  setLoading,
  generate,
  dispatch,
}) => {
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