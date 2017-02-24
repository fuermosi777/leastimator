import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class AddOdometerReadingButton extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={this.props.onPress}>
          <View>
            <Image source={require('../images/add.png')}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

AddOdometerReadingButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};
