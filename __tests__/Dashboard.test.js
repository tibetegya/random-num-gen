import React from 'react';
import { shallow, mount, render } from 'enzyme';
import localforage from 'localforage'
import Dashboard from '../src/Dashboard';

describe('Dashboard component test', () => {
  beforeEach(() => {
    localStorage.setItem('companyName', 'dummy')
    localforage.setItem('data', {
      dummy: {
        numbers: [ '012920302' ]
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
})