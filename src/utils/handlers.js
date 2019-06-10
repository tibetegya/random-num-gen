import { generate, paginateNumbers, randomSort, createCsv } from './helpers';

export const handleSignIn = function (e) {
  const { target: { name, value } } = e;
  e.preventDefault();
  switch (name) {
    case 'companyName':
    this.setState({ companyName: value })
      break;
    case 'signIn':
      localStorage.setItem('companyName', this.state.companyName)
      this.setState({ isSignedIn: true, modalOpen: false })
      break;
    default:
  };

}

export const handleOptions = function (e) {
  const { target: { name } } = e;
  e.preventDefault();
  switch (name) {
    case 'options':
      this.setState(state => ({
        optionsOpen: !state.optionsOpen
      }))
      break;
    case 'ascending':
      const derivedNumbers = paginateNumbers(randomSort(this.state.data.numbers))
      this.setState({
        numbers: derivedNumbers,
        optionsOpen: false
      })
      break;
    case 'descending':
      const reversedNumbers = paginateNumbers(randomSort(this.state.data.numbers).reverse())
      this.setState({
        numbers: reversedNumbers,
        optionsOpen: false
      })
      break;
    case 'download':
        this.setState({ optionsOpen: false })
      break;
    case 'logout':
      localStorage.removeItem('companyName')
      this.setState({ isSignedIn: false, optionsOpen: false })
      break;
    default:
  };

}


export const handleModal = function (e) {
  const { target: { name } } = e;
  e.preventDefault();
  switch (name) {
    case 'closeModal':
      this.setState({ modalOpen: false, genAmmount: 10 });
      break;
    case 'openModal':
      this.setState({ modalOpen: true, optionsOpen: false });
      break;
    default:
  };
};

export const handlePaginate = function (e) {
  const { numbers, page } = this.state
  e.preventDefault();
  const { target: { name, value } } = e;
  switch(name) {
    case 'paginatorInput':
    if (value !== ''
    && value !== '0'
    && parseInt(value, 10) <= Object.keys(numbers).length) this.setState({ page: value });
      break;
    case 'previous':
      if(page !== '1'){
        const PrevPage = String(parseInt(page, 10) - 1)
        this.setState({ page: PrevPage})
      }
      break;
    case 'next':
    if(page !== String(Object.keys(numbers).length) && Object.keys(numbers).length > 1){
      const nextPage = String(parseInt(page, 10) + 1)
      this.setState({ page: nextPage})
    }
    break;
    default:
  }
}

export const handleGenerate = function (e) {
  let { target: { name, value } } = e;
  const { genAmmount, data } = this.state
  const total = data.numbers ? data.numbers.length : 0
  let ammountValue;

  if(name === 'generateInput' && value !== '') {
    if(parseInt(value.trim(), 10) > (10000 - total)) {
      ammountValue = 0
      e.target.value = '0'
      this.setState({ warning: true });
      setTimeout(() => this.setState({ warning: false }), 4000)
    } else {
      ammountValue = parseInt(value.trim(), 10)
    }
    this.setState({ genAmmount: ammountValue });
  }
  if(name === 'generateBtn') {
    this.setState({
      modalOpen: false,
      showOverview: true,
      loading: true
    })
    generate(genAmmount).then(newData => {
      this.setState({
        modalOpen: false,
        showOverview: true,
        loading: true
      })
      this.setData(newData)
      this.setState({ loading: false })
    })
  }
}

export const setData = function (data) {
  const numberPages = paginateNumbers(data.numbers);
    const csv = createCsv(numberPages)
    this.setState({
      data,
      numbers: numberPages,
      csv
    })
}
