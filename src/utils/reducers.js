import { paginateNumbers, randomSort, createCsv } from './helpers'

function reducer(state, action) {
  switch (action.type) {
    case 'set_data':
    const numberPages = paginateNumbers(action.payload.numbers);
      const csv = createCsv(numberPages)
      return {
        ...state,
        data: action.payload,
        numbers: numberPages,
        csv
      };
    case 'set_numbers':
      return  {
        ...state,
        numbers: action.payload
      };
    case 'ascending_sort':
    const sortedNumbers = randomSort(action.payload)
      return  {
        ...state,
        numbers: paginateNumbers(sortedNumbers)
      };
    case 'descending_sort':
      const reversedNumbers = randomSort(action.payload).reverse()
        return  {
          ...state,
          numbers: paginateNumbers(reversedNumbers)
        };
    default:
  }
}
export default reducer;
