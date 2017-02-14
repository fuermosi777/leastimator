import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../constants';

export default class LinearGradientBackground extends Component {
  render() {
    return (
      <LinearGradient 
        colors={[COLOR.LESSBLACK, COLOR.BLACK]}
        style={this.props.style}>
        {this.props.children}
      </LinearGradient>
    );
  }
}