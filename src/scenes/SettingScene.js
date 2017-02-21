import React, { Component, PropTypes } from 'react';
import {
  View,
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';

export default class SettingScene extends Component {
  componentWillMount() {
    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;
  }

  render() {
    return (
      <LinearGradientBackground>
      </LinearGradientBackground>
    );
  }

  handleLeftButtonPressed = () => {
    this.props.navigator.pop();
  }
}

SettingScene.propTypes = {
  navigator: PropTypes.object.isRequired,
};