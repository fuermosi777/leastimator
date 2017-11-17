import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class BlockButton extends Component {
  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
        <TouchableOpacity
          onPress={this.props.onPress}
        >
          <Text style={[styles.title, {color: this.props.color}]}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

BlockButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '300',
  }
});