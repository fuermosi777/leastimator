import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { COLOR } from '../constants';

export default class ListSwitchItem extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    onSwitchChange: PropTypes.func.isRequired,
    switchItems: PropTypes.array.isRequired,
    selectedItems: PropTypes.array.isRequired,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
        <View style={styles.switch}>
          {this.props.switchItems.map((item, key) => {
            // Make the styles
            let viewStyles = [styles.item];

            if (key === 0) {
              viewStyles.push(styles.firstItem);
            }
            if (key === this.props.switchItems.length - 1) {
              viewStyles.push(styles.lastItem);
            }
            return (
              <View key={key} style={viewStyles}>
                <Text style={styles.itemText}>
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
  },
  text: {
    color: COLOR.PRIMARY,
  },
  switch: {
    flexDirection: 'row'
  },
  item: {
    padding: 5,
    borderWidth: 1,
    borderColor: COLOR.SECONDARY,
  },
  selectedItem: {

  },
  firstItem: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  lastItem: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  itemText: {
    color: COLOR.PRIMARY
  }
});
