import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
} from 'react-native';
import { COLOR } from '../constants';

export default class AddCarListItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.props.onPress}
        >
          <View style={styles.item}>
            <View style={styles.circle}>
              <Image style={styles.icon} source={require('../images/add.png')}/>
            </View>
          </View>
        </TouchableHighlight>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 105,
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    borderColor: COLOR.SECONDARY,
    borderWidth: 1,
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  icon: {
    width: 20,
    resizeMode: 'contain',
  }
});

AddCarListItem.propTypes = {
  onPress: PropTypes.func.isRequired,
};
