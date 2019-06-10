import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Home from '../Home';

describe('Home component test', () => {
  const mockFn = jest.fn();
  afterEach(() => {
    mockFn.mockClear()
  })

  it('should match snapshot', () => {
    const wrapper = mount(<Home
      history={{
        push: mockFn,
      }}
    />);
    expect(wrapper).toMatchSnapshot();
  })

  it('should call handleModal method when a button is clicked', () => {
    const wrapper = shallow(<Home
      history={{
        push: mockFn,
      }}
    />);
    const button = wrapper.find('button.get-started').simulate('click', {
      preventDefault: mockFn,
      target: {
        name:'openModal'
      }
    });
    expect(mockFn).toHaveBeenCalled();
  })
  it('should call handleModal method when a button is clicked', () => {
    const signInMockFn = jest.fn();
    const wrapper = shallow(<Home
      history={{
        push: mockFn,
      }}
    />);
    wrapper.find('button.get-started').simulate('click', {
      preventDefault: mockFn,
      target: { name: 'openModal' }
    });
    wrapper.find('input#company-name').simulate('change', {
      preventDefault: mockFn,
      target: { name: 'companyName', value: 'dummy name' }
    });
    wrapper.find('button.sign-in').simulate('click', {
      preventDefault: signInMockFn,
      target: { name: 'signIn' }
    });
    expect(signInMockFn).toHaveBeenCalled();
  })
  it('should redirect to dashboard', () => {
    localStorage.setItem('companyName', 'dummy')
    const historyMock = jest.fn()
    const wrapper = mount(<Home
      history={{
        push: historyMock,
      }}
    />);
    expect(historyMock).toHaveBeenCalled();
  })
})