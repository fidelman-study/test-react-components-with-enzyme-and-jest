import React, { Component } from 'react';

export default class App extends Component {
  state = { on: false, title: '' }
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <input value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />
        <p>
          {this.state.on ? 'Yes' : 'No'}
        </p>
        <button type="button" onClick={() => this.setState({ on: true })}>Click</button>
      </div>
    );
  }
}

export const Link = ({ address, hide }) =>
  hide ? null : <a href={address}>Click</a>;
