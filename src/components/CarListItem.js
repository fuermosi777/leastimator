import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import {COLOR, CAR_ICON} from '../constants';

export default class CarListItem extends Component {
  render() {
    let {car} = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.props.onPress}
        >
          <View style={styles.item}>
            <View style={styles.circle}>
              <Image style={styles.icon} source={CAR_ICON[car.carIconName].icon}/>
            </View>
            <Text style={styles.text}>{car.nickname}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 105,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.DIVIDER,
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
    width: 60,
    resizeMode: 'contain',
  },
  text: {
    color: COLOR.WHITE,
    fontSize: 20,
    fontWeight: '300',
  }
});

CarListItem.propTypes = {
  car: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};