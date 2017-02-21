import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
import {COLOR, CAR_ICON} from '../constants';

export default class SelectCarIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.circle}>
          <TouchableHighlight 
            onPress={this.handleIconPress}
            underlayColor="transparent">
            <Image style={styles.icon} source={CAR_ICON[this.props.carIconName].icon}/>
          </TouchableHighlight>
        </View>
        <Text style={styles.text}>Select car image</Text>
      </View>
    );
  }

  handleIconPress = () => {
    this.props.onIconPress();
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    height: 160,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderColor: COLOR.SECONDARY,
    borderWidth: 1,
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    resizeMode: 'contain',
  },
  text: {
    color: COLOR.SECONDARY,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  }
});
