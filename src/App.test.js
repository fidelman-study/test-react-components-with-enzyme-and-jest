import React from 'react'
import App from './App'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<App/>', () => {
  const wrapper = shallow(<App/>)
  it('should contain p element', () => {
    expect(wrapper.find('p').exists()).toBe(true)
  })
})