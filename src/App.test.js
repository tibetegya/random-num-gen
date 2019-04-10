import React from 'react';
import { shallow, mount, render } from 'enzyme';

import App from './App';

describe('App component test', () => {
  const wrapper = mount(<App/>)
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})