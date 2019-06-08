import reducer from '../../src/utils/reducers'

describe('reducers tests', () => {
  const initialState = { data: {}, numbers: [], csv: '' };
  it('should set numbers', () => {
    const action = {
      type: 'set_numbers',
      payload: [ '0012934' ]
    }
    const newState = reducer(initialState, action)
    expect(newState.numbers).toEqual(action.payload)
  })

  it('should sort numbers in ascending order', () => {
    const unsorted = [ '0000000003', '0000000001', '0000000002' ]
    const sorted = [ '0000000001', '0000000002', '0000000003' ]
    const action = {
      type: 'ascending_sort',
      payload: unsorted
    }
    const newState = reducer(initialState, action)
    expect(newState.numbers[1]).toEqual(sorted)
  })
  it('should sort numbers in descending order', () => {
    const unsorted = [ '0000000003', '0000000001', '0000000002' ]
    const reverse = [ '0000000003', '0000000002', '0000000001' ]
    const action = {
      type: 'descending_sort',
      payload: unsorted
    }
    const newState = reducer(initialState, action)
    expect(newState.numbers[1]).toEqual(reverse)
  })
})