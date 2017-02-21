import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';

export default class SettingScene extends Component {
  render() {
    return (
      <LinearGradientBackground>
      </LinearGradientBackground>
    );
  }
}

SettingScene.propTypes = {
  navigator: PropTypes.object.isRequired,
};