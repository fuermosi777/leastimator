import React, { Component } from 'react';
import PropTypes from 'prop-types';
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