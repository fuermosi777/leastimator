import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import { COLOR } from '../constants';
import Divider from './Divider';

export default class ListItem extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={this.props.onPress}>
          <View style={styles.item}>
            {this.props.icon ? 
            <View style={styles.circle}>
              <Image source={this.props.icon} style={styles.icon}/>
            </View>
             : null}
            <Text style={styles.text}>{this.props.text}</Text>
            {this.props.subText ? 
            <Text style={styles.subText}>{this.props.subText}</Text>
            : null}
            {this.props.rightText ? 
            <View style={styles.right}>
              <Text style={styles.rightText}>{this.props.rightText}</Text>
            </View>
            : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    height: 44,
  },
  circle: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    width: 20,
    resizeMode: 'contain',
  },
  text: {
    color: COLOR.PRIMARY,
    fontSize: 18,
    fontWeight: '300',
  },
  subText: {
    fontWeight: '300',
    fontSize: 18,
    color: COLOR.PRIMARY,
    marginLeft: 5,
  },
  right: {
    position: 'absolute',
    justifyContent: 'center',
    right: 0,
    top: 0,
    height: 44,
    paddingRight: 15,
  },
  rightText: {
    fontWeight: '300',
    fontSize: 18,
    color: COLOR.SECONDARY,
  }
});

ListItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.number,
  subText: PropTypes.string,
  rightText: PropTypes.string,
};
