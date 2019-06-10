import { generate } from '../../utils/helpers'
import localforage from 'localforage'

describe('helpers tests', () => {
  afterEach(() => {
    localStorage.clear()
    localforage.clear()
  })

  it('should generate numbers when there is data', async () => {
    localStorage.setItem('companyName', 'dummy')
    localforage.setItem('data', {
      dummy: {
        numbers: []
      } 
    })
    const data = await generate(10)
    expect(data.numbers.length).toEqual(10)
  })

  it('should generate numbers when there is no data', async () => {
    localStorage.setItem('companyName', 'dummy')
    localforage.setItem('data', {})
    const data = await generate(10)
    expect(data.numbers.length).toEqual(10)
  })

  it('should generate numbers when there are numbers', async () => {
    localStorage.setItem('companyName', 'dummy')
    localforage.setItem('data', {
      dummy: {
        numbers: ['0000032930']
      } 
    })
    const data = await generate(10)
    expect(data.numbers.length).toEqual(11)
  })
  it('should generate numbers when there ais no data', async () => {
    localStorage.setItem('companyName', 'dummy')
    const data = await generate(10)
    expect(data.numbers.length).toEqual(10)
  })
})