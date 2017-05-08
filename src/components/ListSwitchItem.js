import React, { Component, PropTypes } from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { COLOR } from '../constants';
import SwitchItem from '../class/SwitchItem';

export default class ListSwitchItem extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    onSwitchChange: PropTypes.func.isRequired,
    switchItems: PropTypes.arrayOf(PropTypes.instanceOf(SwitchItem)).isRequired,
    selectedItemName: PropTypes.string.isRequired,
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
            if (item.name === this.props.selectedItemName) {
              viewStyles.push(styles.selectedItem);
            }

            return (
              <TouchableHighlight
                key={key}
                underlayColor="transparent"
                onPress={this.onSelect.bind(this, item.name)}
              >
                <View style={viewStyles}>
                    <Text style={styles.itemText}>
                      {item.label}
                    </Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      </View>  
    );
  }

  onSelect(name) {
    this.props.onSwitchChange(name);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: COLOR.PRIMARY,
  },
  switch: {
    flexDirection: 'row'
  },
  item: Platform.OS === 'iOS' ? {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLOR.SECONDARY,
  } : {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  selectedItem: {
    backgroundColor: COLOR.SECONDARY
  },
  firstItem: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  lastItem: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderRightWidth: 1,
  },
  itemText: {
    fontSize: 14,
    color: COLOR.PRIMARY
  }
});
