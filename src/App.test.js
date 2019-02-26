import React from 'react'
import App, { Link } from './App'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<App/>', () => {
  it('should contain p element', () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.find('p').exists()).toBe(true)
  })
})

describe('<Link/>', () => {
  it('a tag node render href correctly', () => {
    const address = 'www.google.com'
    const wrapper = shallow(<Link address={address}/>)
    expect(wrapper.props().href).toBe(address)
  })

  it('should return null with true hide prop', () => {
    const wrapper = shallow(<Link hide={false}/>)
    expect(wrapper.find('a').length).toBe(1)
    wrapper.setProps({ hide: true })
    expect(wrapper.get(0)).toBeNull()
  })

})