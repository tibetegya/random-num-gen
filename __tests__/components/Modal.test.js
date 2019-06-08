import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import { shallow, mount, render } from 'enzyme';

import Modal from '../../src/components/Modal';

describe('Modal Components', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Modal />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot', () => {
    const wrapper = shallow(
    <Modal
      isOpen={true}
      title="modal title"
      handleModal={jest.fn()}
    />)
    expect(wrapper.html()).toContain('show')
  })

})