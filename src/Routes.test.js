import React from 'react';
import { MemoryRouter } from 'react-router';
import { shallow, mount, render } from 'enzyme';

import Routes from './Routes';
import App from './App';
import Dashboard from './Dashboard';

describe('App component test', () => {
  it('should show app component for / route ', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries = {['/']} >
        <Routes/>
      </MemoryRouter>
      );
    expect(wrapper.find(App)).toHaveLength(1);
  })

  it('should show Dashboard component for /dashboard route when logged in', () => {
    localStorage.setItem('companyName', 'company1')
    const wrapper = mount(
      <MemoryRouter initialEntries = {['/', '/dashboard']} >
        <Routes/>
      </MemoryRouter>
      );
    expect(wrapper.find(Dashboard)).toHaveLength(1);
  })
})