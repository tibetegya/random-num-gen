import React from 'react';
import { shallow, mount, render } from 'enzyme';

import App from './App';

describe('App component test', () => {
  const mockFn = jest.fn();
  afterEach(() => {
    mockFn.mockClear()
  })

  it('should match snapshot', () => {
    const wrapper = mount(<App
      history={{
        push: mockFn,
      }}
    />);
    expect(wrapper).toMatchSnapshot();
  })

  it.only('should call handleModal method when a button is clicked', () => {
    const wrapper = shallow(<App
      history={{
        push: mockFn,
      }}
    />);
    // console.log('>>>>>>', wrapper.instance())
    const button = wrapper.find('button.get-started').simulate('click', {
      preventDefault: mockFn,
      target: {
        name:'username'
      }
    });
    expect(mockFn).toHaveBeenCalled();
  })
})