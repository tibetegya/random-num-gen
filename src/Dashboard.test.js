import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Dashboard from './Dashboard';

describe('Dashboard component test', () => {
  const mockPush = () => jest.fn();
  const wrapper = mount(
    <Dashboard
      history={{
        push: mockPush,
      }}
    />
  )
  
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})