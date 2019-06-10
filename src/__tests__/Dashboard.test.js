import React from 'react';
import { shallow, mount, render } from 'enzyme';
import localforage from 'localforage'
import Dashboard from '../Dashboard';
import { generate } from '../utils/helpers'

describe('Dashboard component test', () => {

  beforeEach(async () => {
    localStorage.setItem('companyName', 'dummy')
  })
  it('should match snapshot', () => {
    const wrapper = mount(<Dashboard
      history={{
        push: jest.fn()
      }}
    />)
    expect(wrapper).toMatchSnapshot();
  })
  it('should redirect to home if there is no company data', () => {
    localStorage.clear()
    localforage.clear()
    const historyMock = jest.fn()
    mount(<Dashboard
      history={{
        push: historyMock
      }}
    />)
    expect(historyMock).toHaveBeenCalled();
  })

  it('should redirect to home if there is no company data', () => {
    const btnMock = jest.fn()
    const wrapper = mount(<Dashboard
      history={{
        push: jest.fn()
      }}
    />)
    wrapper.find('button.options').simulate('click', {
      preventDefault: btnMock,
      target: { name: 'options' }
    });
    expect(btnMock).toHaveBeenCalled();
  })
  it('should return null when data is not present in indexDB', () => {
    localStorage.clear()
    localforage.clear()
    localStorage.setItem('companyName', 'dummy')
    localforage.setItem('invalid_key', {})
    
    const wrapper = mount(<Dashboard
      history={{
        push: jest.fn()
      }}
    />)
    expect(wrapper.state().showOverview).toBeFalsy();
  })
  it('should logout', () => {
    const btnMock = jest.fn()
    const redirectMock = jest.fn()
    const wrapper = mount(<Dashboard
      history={{
        push: redirectMock
      }}
    />)
    wrapper.find('button.logout-btn').simulate('click', {
      preventDefault: btnMock,
      target: { name: 'logout' }
    });
    expect(wrapper.state().isSignedIn).toBeFalsy();
  })
  it('should generate numbers', () => {
    const btnMock = jest.fn()
    const redirectMock = jest.fn()
    const wrapper = mount(<Dashboard
      history={{
        push: redirectMock
      }}
    />)
    wrapper.find('input.generate-input').simulate('change', {
      preventDefault: btnMock,
      target: { name: 'generateInput', value: '100' }
    });
    wrapper.find('button.generate').simulate('click', {
      preventDefault: btnMock,
      target: { name: 'generateBtn' }
    });
    expect(wrapper.state().genAmmount).toEqual(100);
  })
  it('page should remain 1', () => {
    const btnMock = jest.fn()
    const redirectMock = jest.fn()
    const wrapper = shallow(<Dashboard
      history={{
        push: redirectMock
      }}
    />)
    wrapper.instance().handlePaginate({
      preventDefault: btnMock,
      target: { name: 'paginatorInput', value: '7' }
    });
    expect(wrapper.state().page).toEqual('1')
    wrapper.instance().handlePaginate({
      preventDefault: btnMock,
      target: { name: 'previous' }
    });
    expect(wrapper.state().page).toEqual('1')
    wrapper.instance().handlePaginate({
      preventDefault: btnMock,
      target: { name: 'next' }
    });
    expect(wrapper.state().page).toEqual('1')
    wrapper.instance().handlePaginate({
      preventDefault: btnMock,
      target: { name: 'other' }
    });
    expect(wrapper.state().page).toEqual('1')
  })

  it('should open and close modal', () => {
    const btnMock = jest.fn()
    const redirectMock = jest.fn()
    const wrapper = shallow(<Dashboard
      history={{
        push: redirectMock
      }}
    />)
    wrapper.instance().handleModal({
      preventDefault: btnMock,
      target: { name: 'openModal' }
    });
    expect(wrapper.state().modalOpen).toEqual(true)
    wrapper.instance().handleModal({
      preventDefault: btnMock,
      target: { name: 'closeModal' }
    });
    expect(wrapper.state().modalOpen).toEqual(false)
    wrapper.instance().handleModal({
      preventDefault: btnMock,
      target: { name: 'other' }
    });
    expect(wrapper.state().modalOpen).toEqual(false)
  })
  it('should generate numbers', async () => {
    let wrapper;
    const btnMock = jest.fn()
    const inputMock = jest.fn()
    const redirectMock = jest.fn()
    await localforage.setItem('data', {
      dummy: {
        numbers: [ '0000000002', '0000000003', '0000000001' ]
      } 
    }).then( async data => {
      wrapper = await mount(<Dashboard
        history={{
          push: redirectMock
        }}
      />)

    })
    wrapper.find('input.generate-input').simulate('change', {
      preventDefault: inputMock,
      target: { name: 'generateInput', value: '100' }
    });

    await wrapper.find('button.generate').last().simulate('click', {
      preventDefault: btnMock,
      target: { name: 'generateBtn' }
    });
    expect(wrapper.state().genAmmount).toEqual(100)
  })
  it('should warn user upon entering very large number', async () => {
    let wrapper;
    const inputMock = jest.fn()
    const redirectMock = jest.fn()
    await localforage.setItem('data', {
      dummy: {
        numbers: [ '0000000002', '0000000003', '0000000001' ]
      } 
    }).then( async data => {
      wrapper = await mount(<Dashboard
        history={{
          push: redirectMock
        }}
      />)

    })
    wrapper.find('input.generate-input').simulate('change', {
      preventDefault: inputMock,
      target: { name: 'generateInput', value: '100000' }
    });
    expect(wrapper.state().warning).toEqual(true)
  })
  it('should sort ascending numbers', async () => {
    let wrapper;
    const btnMock = jest.fn()
    const redirectMock = jest.fn()
    const ascending = [ '0000000001', '0000000002', '0000000003' ]
    await localforage.setItem('data', {
      dummy: {
        numbers: [ '0000000002', '0000000003', '0000000001' ]
      } 
    }).then( async data => {
      wrapper = await mount(<Dashboard
        history={{
          push: redirectMock
        }}
      />)

    })
    wrapper.find('button.options').simulate('click', {
      preventDefault: btnMock,
      target: { name: 'options' }
    });
    wrapper.find('button.ascending').simulate('click', {
      preventDefault: btnMock,
      target: { name: 'ascending' }
    });
    expect(wrapper.state().numbers['1']).toEqual(ascending)
  })
  it('should sort descending numbers', async () => {
    let wrapper;
    const btnMock = jest.fn()
    const redirectMock = jest.fn()
    const descending = [ '0000000003', '0000000002', '0000000001' ]
    await localforage.setItem('data', {
      dummy: {
        numbers: [ '0000000002', '0000000003', '0000000001' ]
      } 
    }).then( async data => {
      wrapper = await mount(<Dashboard
        history={{
          push: redirectMock
        }}
      />)

    })
    wrapper.find('button.options').simulate('click', {
      preventDefault: btnMock,
      target: { name: 'options' }
    });
    wrapper.find('button.descending').simulate('click', {
      preventDefault: btnMock,
      target: { name: 'descending' }
    });
    expect(wrapper.state().numbers['1']).toEqual(descending)
  })

  it('should click download button', async () => {
    let wrapper;
    const redirectMock = jest.fn()
    const btnMock = jest.fn()
    await localforage.setItem('data', {
      dummy: {
        numbers: [ '0000000002', '0000000003', '0000000001' ]
      } 
    }).then( async data => {
      wrapper = await mount(<Dashboard
        history={{
          push: redirectMock
        }}
      />)

    })

    wrapper.find('button.options').simulate('click', {
      preventDefault: btnMock,
      target: { name: 'options' }
    });
    expect(wrapper.state().optionsOpen).toEqual(true)
    wrapper.find('button.download').simulate('click', {
      preventDefault: btnMock,
      target: { name: 'download' }
    });
    wrapper.find('button.download').simulate('click', {
      preventDefault: btnMock,
      target: { name: 'other' }
    });
    expect(wrapper.state().optionsOpen).toEqual(false)
  })
})
