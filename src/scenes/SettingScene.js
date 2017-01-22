import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';

export default class HomeScene extends Component {
  render() {
    return (
      <View>
      </View>
    );
  }
}

HomeScene.propTypes = {
  cur: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};