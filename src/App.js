import React, { Component } from 'react';
import TodoList from './TodoList'

export default class App extends Component {
  state = { on: false, title: '', active: true };

  componentDidMount() {
    this.setState({ title: 'Hi' })
  }

  handleString(_str) {
    return true
  }

  render() {
    return (
      <div className={this.state.active ? 'blue' : 'red'}>
        <h1>{this.state.title}</h1>
        <input
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <p>{this.state.on ? 'Yes' : 'No'}</p>
        <button type="button" onClick={() => this.setState({ on: true })}>
          Click
        </button>
        <TodoList/>
      </div>
    );
  }
}

export const Link = ({ address, hide }) =>
  hide ? null : <a href={address}>Click</a>;
