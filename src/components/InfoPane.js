import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {COLOR} from '../constants';

export default class InfoPane extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <View style={styles.data}>
          <Text style={styles.value}>{String(this.props.value)}</Text>
          <Text style={styles.unit}>{this.props.unit}</Text>
        </View>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  label: {
    color: COLOR.SECONDARY
  },
  data: {
    flexDirection: 'row',
  },
  value: {
    color: COLOR.PRIMARY
  },
  unit: {
    color: COLOR.SECONDARY
  }
});