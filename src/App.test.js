import React from 'react'
import App, { Link } from './App'
import { TodoList } from './TodoList'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<App/> shallow rendering', () => {
  it('should contain p element', () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.find('p').exists()).toBe(true)
  })

  it('on button click changes p text', () => {
    const wrapper = shallow(<App/>)
    const button = wrapper.find('button')
    expect(wrapper.find('p').text()).toBe('No')

    button.simulate('click')
    expect(wrapper.find('p').text()).toBe('Yes')
  })

  it('should change title when change input', () => {
    const wrapper = shallow(<App/>, { disableLifecycleMethods: true })
    const input = wrapper.find('input')
    const value = 'Hello'
    expect(wrapper.find('h1').text()).toBe('')
    input.simulate('change', { target: { value } })
    expect(wrapper.find('h1').text()).toBe(value)
  })

  it('should update className with new state', () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.find('.blue').length).toBe(1)
    expect(wrapper.find('.red').length).toBe(0)
    wrapper.setState({ active: false })
    expect(wrapper.find('.blue').length).toBe(0)
    expect(wrapper.find('.red').length).toBe(1)
  })

  it('should call cdm', () => {
    jest.spyOn(App.prototype, 'componentDidMount')
    const wrapper = shallow(<App/>)
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
    expect(wrapper.find('h1').text()).toBe('Hi')
  })

  it('handleStrings function returns correctly', () => {
    const wrapper = shallow(<App/>)
    const trueReturn = wrapper.instance().handleString('Hello World')
    expect(trueReturn).toBe(true)
  })
})

describe('<TodoList />', () => {
   it('should call addTodo Redux action create with button click', () => {
     const props = {
       addTodo: jest.fn(),
       todos: [],
     }

     const wrapper = shallow(<TodoList {...props} />)
     wrapper.find('input').simulate('change', { currentTarget: { value: 'Buy Groceries' } })
     wrapper.find('.todo--button').simulate('click')
     expect(props.addTodo).toHaveBeenCalledWith({ text: 'Buy Groceries' })
   })

   it('should removeTodo Redux AC on li click', () => {
      const props = {
        removeTodo: jest.fn(),
        todos: [{ text: 'hi' }, { text: 'hello' }],  
      }

      const wrapper = shallow(<TodoList {...props} />)
      wrapper.find('li').at(0).simulate('click')
      expect(props.removeTodo).toHaveBeenCalledWith(0)
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