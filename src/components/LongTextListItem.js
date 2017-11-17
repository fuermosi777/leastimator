import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { COLOR } from '../constants';

export default class LongTextListItem extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.content}>{this.props.content}</Text>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  title: {
    color: COLOR.SECONDARY,
    fontSize: 16,
    marginBottom: 5,
  },
  content: {
    color: COLOR.PRIMARY,
    fontSize: 18,
  }
});