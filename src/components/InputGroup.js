import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import {COLOR, INPUT_GROUP_TYPE} from '../constants';

export default class T extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    value: '',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <TextInput
          style={styles.input}
          value={this.state.value}
          placeholder={this.props.placeholder}
          placeholderTextColor={COLOR.SECONDARY}
          keyboardType={this.props.type === INPUT_GROUP_TYPE.INTEGER ? 'numeric' : 'default'}
          keyboardAppearance="dark"
          onChangeText={this.handleChangeText}
          returnKeyType="done"
          dataDetectorTypes="none"
          spellCheck={false}
          autoComplete={false}
          onKeyPress={this.handleKeyPress}
        />
      </View>
    );
  }

  handleChangeText = (text) => {
    if (!this.isValidate(text)) {
      text = text.slice(0, -1);
    }
    this.setState({value: text});
  }

  handleKeyPress = (e) => {
    // var key = e.nativeEvent.key;
  }

  isValidate(value) {
    if (this.props.type === INPUT_GROUP_TYPE.INTEGER) {
      return /^\d+$/.test(value);
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
});