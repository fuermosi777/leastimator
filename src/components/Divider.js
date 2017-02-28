import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {COLOR} from '../constants';

export default class Divider extends Component {
  render() {
    return (
      <View style={styles.container}></View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: COLOR.DIVIDER
  }
});