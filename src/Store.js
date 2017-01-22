import { Cursor } from 'react-cursor';
import React, { Component } from 'react';
import App from './App';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var cur = Cursor.build(this);
    return <App cur={cur}/>;
  }
}