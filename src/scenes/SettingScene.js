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
  cur: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};