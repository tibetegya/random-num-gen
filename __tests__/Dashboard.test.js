import React from 'react';
import { shallow, mount, render } from 'enzyme';
import localforage from 'localforage'
import Dashboard from '../src/Dashboard';

describe('Dashboard component test', () => {
  beforeEach(async () => {
    localStorage.setItem('companyName', 'dummy')
    await localforage.setItem('data', {
      dummy: {
        numbers: [ '0000000002', '0000000003', '0000000001' ]
      } 
    })
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
  it('should generate numbers', async () => {
    const btnMock = jest.fn()
    const redirectMock = jest.fn()
    const wrapper = mount(<Dashboard
      history={{
        push: redirectMock
      }}
    />)
    await wrapper.find('input.generate-input').simulate('change', {
      preventDefault: btnMock,
      target: { name: 'generateInput', value: '100' }
    });
    await wrapper.find('button.generate').simulate('click', {
      preventDefault: btnMock,
      target: { name: 'generateBtn' }
    });
    expect(wrapper.state().genAmmount).toEqual(100);
  })
  it('should handle pagination', async () => {
    const btnMock = jest.fn()
    const redirectMock = jest.fn()
    const wrapper = shallow(<Dashboard
      history={{
        push: redirectMock
      }}
    />)
    wrapper.instance().handlePaginate({
      preventDefault: btnMock,
      target: { name: 'next' }
    });
    expect(wrapper.state().page).toEqual('2')
    wrapper.instance().handlePaginate({
      preventDefault: btnMock,
      target: { name: 'previous' }
    });
    expect(wrapper.state().page).toEqual('1')
  })
  it('page should remain 1', async () => {
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
  })
})