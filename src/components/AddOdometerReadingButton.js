import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {COLOR} from '../constants';

export default class AddOdometerReadingButton extends Component {
  render() {
    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.DIVIDER,
    justifyContent: 'center',
  }
});

AddOdometerReadingButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};
