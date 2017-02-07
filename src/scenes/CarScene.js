import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../constants';

export default class CarScene extends Component {
  render() {
    return (     
      <LinearGradient 
        colors={[COLOR.LESSBLACK, COLOR.BLACK]} 
        style={styles.container}>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  
});