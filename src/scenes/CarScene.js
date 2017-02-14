import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';
import {COLOR} from '../constants';

export default class CarScene extends Component {
  render() {
    return (     
      <LinearGradientBackground
        style={styles.container}>
      </LinearGradientBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});