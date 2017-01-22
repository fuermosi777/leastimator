import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Store from './src/Store';

export default class leastimator extends Component {
  render() {
    return (
      <Store/>
    );
  }
}

AppRegistry.registerComponent('leastimator', () => leastimator);
