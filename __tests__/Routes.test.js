import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount, render } from 'enzyme';
import localforage from 'localforage'

import Routes from '../src/Routes';

describe('Routes Components', () => {
  afterEach(() => {
    localStorage.clear()
    localforage.clear()
  })
  it('should show Home component', () => {
    const wrapper = shallow(<MemoryRouter initialEntries={['/']}>
      <Routes />
    </MemoryRouter>)
    expect(wrapper.html()).toContain('home')
  })

  it('should show redirect to Home if there is no company in storage', () => {
    const wrapper = shallow(<MemoryRouter initialEntries={['/dashboard']}>
      <Routes />
    </MemoryRouter>)
    expect(wrapper.html()).toContain('home')
  })

})