import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';

export default class Gap extends Component {
  render() {
    return (
      <View style={{
        height: this.props.height
      }}></View>  
    );
  }
}

Gap.propTypes = {
  height: PropTypes.number.isRequired,
};