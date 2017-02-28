import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import {COLOR, LIST_ITEM_BORDER_TYPE} from '../constants';
import Divider from './Divider';

export default class ListItem extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={this.props.onPress}>
          {this.props.border === LIST_ITEM_BORDER_TYPE.TOP ? 
          <Divider/>
          : null}
          <View style={styles.item}>
            {this.props.icon ? 
            <View style={styles.circle}>
              <Image source={this.props.icon} style={styles.icon}/>
            </View>
             : null}
            <Text style={styles.text}>{this.props.text}</Text>
          </View>
          {this.props.border === LIST_ITEM_BORDER_TYPE.BOTTOM ? 
          <Divider/>
          : null}
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
    color: COLOR.WHITE,
    fontSize: 18,
    fontWeight: '300',
  }
});

ListItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  border: PropTypes.oneOf([LIST_ITEM_BORDER_TYPE.TOP, LIST_ITEM_BORDER_TYPE.BOTTOM]),
  icon: PropTypes.number,
};
