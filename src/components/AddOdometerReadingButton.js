import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import {COLOR} from '../constants';

export default class AddOdometerReadingButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.onPress}>
          <View style={styles.item}>
            <View style={styles.circle}>
              <Image source={require('../images/add.png')} style={styles.icon}/>
            </View>
            <Text style={styles.text}>Add Odometer Reading</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  icon: {
    width: 20,
    resizeMode: 'contain',
  },
  text: {
    color: COLOR.WHITE,
    fontSize: 18,
    fontWeight: '300',
  }
});

AddOdometerReadingButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};
