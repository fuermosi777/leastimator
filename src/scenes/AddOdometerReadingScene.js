import React, { PropTypes } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import BaseScene from './BaseScene';
import LinearGradientBackground from '../components/LinearGradientBackground';

export default class AddOdometerReadingScene extends BaseScene {
  
  constructor(props) {
    super(props);
    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;
  }

  render() {
    return (
      <LinearGradientBackground
        style={styles.container}>
        <Text>123</Text>
      </LinearGradientBackground>
    );
  }

  handleLeftButtonPressed = () => {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AddOdometerReadingScene.propTypes = {
  route: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  carId: PropTypes.number.isRequired,
};
