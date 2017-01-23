import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';

export default class SettingScene extends Component {
  render() {
    return (
      <View>
      </View>
    );
  }
}

SettingScene.propTypes = {
  cur: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};