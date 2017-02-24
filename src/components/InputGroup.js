import React, { Component, PropTypes } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLOR, INPUT_GROUP_TYPE} from '../constants';

export default class InputGroup extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.oneOf([INPUT_GROUP_TYPE.DATE, INPUT_GROUP_TYPE.INTEGER, INPUT_GROUP_TYPE.TEXT]),
    onChangeText: PropTypes.func,
    onPress: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        {this.props.type === INPUT_GROUP_TYPE.DATE ? 
          <TouchableOpacity onPress={this.props.onPress}>
            <Text style={styles.date}>{this.props.value || this.props.placeholder}</Text>
          </TouchableOpacity>
        :
          <TextInput
            style={styles.input}
            value={this.props.value}
            placeholder={this.props.placeholder}
            placeholderTextColor={COLOR.SECONDARY}
            keyboardType={this.props.type === INPUT_GROUP_TYPE.INTEGER ? 'numeric' : 'default'}
            keyboardAppearance="dark"
            onChangeText={this.handleChangeText}
            returnKeyType="done"
            dataDetectorTypes="none"
            spellCheck={false}
            autoComplete={false}
          />
        }
      </View>
    );
  }

  handleChangeText = (text) => {
    if (!this.isAllowed(text)) {
      text = text.slice(0, -1);
    }
    this.props.onChangeText(text);
    this.setState({value: text});
  }

  isAllowed(value) {
    if (this.props.type === INPUT_GROUP_TYPE.INTEGER) {
      return /^\d+$/.test(value);
    }
    if (this.props.type === INPUT_GROUP_TYPE.TEXT) {
      return true;
    }
    if (this.props.type === INPUT_GROUP_TYPE.DATE) {
      return /^[0-9\/]+$/.test(value);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.DIVIDER,
    alignItems: 'center',
    height: 50,
  },
  label: {
    color: COLOR.WHITE,
    fontSize: 16,
    fontWeight: '300',
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginRight: 10,
    color: COLOR.WHITE,
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '300',
  },
  date: {
    marginRight: 10,
    color: COLOR.SECONDARY,
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '300',
  },
});