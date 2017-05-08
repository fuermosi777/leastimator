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
    value: PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    placeholder: PropTypes.string,
    type: PropTypes.oneOf([INPUT_GROUP_TYPE.DATE, INPUT_GROUP_TYPE.INTEGER, INPUT_GROUP_TYPE.TEXT, INPUT_GROUP_TYPE.FLOAT]),
    onChangeText: PropTypes.func,
    onPress: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {value, type} = this.props;
    let keyboardType = (type === INPUT_GROUP_TYPE.INTEGER || type === INPUT_GROUP_TYPE.FLOAT) ? 'numeric' : 'default';

    value = value ? String(value) : '';

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        {this.props.type === INPUT_GROUP_TYPE.DATE ? 
          <View style={styles.dateContainer}>
            <TouchableOpacity onPress={this.props.onPress}>
              <Text style={styles.date}>{this.props.value || this.props.placeholder}</Text>
            </TouchableOpacity>
          </View>
        :
          <TextInput
            style={styles.input}
            value={value}
            placeholder={this.props.placeholder}
            placeholderTextColor={COLOR.SECONDARY}
            keyboardType={keyboardType}
            keyboardAppearance="dark"
            onChangeText={this.handleChangeText}
            returnKeyType="done"
            dataDetectorTypes="none"
            spellCheck={false}
            autoComplete={false}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            underlineColorAndroid='rgba(0,0,0,0)'
          />
        }
      </View>
    );
  }

  handleChangeText = (text) => {
    if (!this.isAllowed(text)) {
      text = text.slice(0, -1);
    }
    if (this.props.type === INPUT_GROUP_TYPE.INTEGER) {
      text = Number(text);
    }
    this.props.onChangeText(text);
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
    if (this.props.type === INPUT_GROUP_TYPE.FLOAT) {
      return /^[0-9.]+$/.test(value);
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
  dateContainer: {
    flex: 1,
  },
  date: {
    marginRight: 10,
    color: COLOR.WHITE,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '300',
  },
});