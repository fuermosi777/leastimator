import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {COLOR} from '../constants';
import {EditCarRoute} from '../routes';
import BaseScene from './BaseScene';

const CIRCULAR_PROGRESS_LINECAP = 'round';

export default class CarScene extends BaseScene {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.car = this.realm.objects('Car').filtered(`id = ${props.carId}`).length;
  }

  componentWillMount() {
    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;
    this.props.route.onRightButtonPressed = this.handleRightButtonPressed;
  }

  render() {
    return (     
      <LinearGradientBackground
        style={styles.container}>
        <ScrollView>
          <Text style={styles.title}></Text>
          <AnimatedCircularProgress
            size={140}
            width={6}
            fill={75}
            tintColor={COLOR.PRIMARY_BLUE}
            backgroundColor={COLOR.SECONDARY}
            linecap={CIRCULAR_PROGRESS_LINECAP}
            rotation={0} />
        </ScrollView>
      </LinearGradientBackground>
    );
  }

  handleLeftButtonPressed = () => {
    this.props.navigator.pop();
  }

  handleRightButtonPressed = () => {
    this.props.navigator.push(Object.assign(EditCarRoute, {
      passProps: {
        carId: this.props.carId
      }
    }));
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    alignItems: 'center',
    flex: 1
  },
  title: {
    color: COLOR.PRIMARY,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 20,
  }
});

CarScene.propTypes = {
  route: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  carId: PropTypes.number.isRequired
};
