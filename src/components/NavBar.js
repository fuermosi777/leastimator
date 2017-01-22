import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';
import {COLOR} from '../constants';

export default class NavBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.leftButtonType ? 
        <TouchableHighlight onPress={this.props.onLeftButtonTouched}>
          <Image
            source={require(`../images/${this.props.leftButtonType}.png`)}
          />
        </TouchableHighlight>
        : 
        <View style={styles.placeholder}></View>
        }
        <Text style={styles.title}>{this.props.title}</Text>
        {this.props.rightButtonType ? 
        <TouchableHighlight onPress={this.props.onRightButtonTouched}>
          <Image
            source={require(`../images/${this.props.leftButtonType}.png`)}
          />
        </TouchableHighlight>
        : 
        <View style={styles.placeholder}></View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: COLOR.WHITE,
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'center',
  },
  placeholder: {
    flex: 1,
  }
});

NavBar.propTypes = {
  title: PropTypes.string,
  leftButtonType: PropTypes.string,
  rightButtonType: PropTypes.string,
  onLeftButtonTouched: PropTypes.func,
  onRightButtonTouched: PropTypes.func,
};