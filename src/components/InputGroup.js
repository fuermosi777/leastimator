import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import {COLOR, INPUT_GROUP_TYPE} from '../constants';
import moment from 'moment';

export default class T extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
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

  // checkValidate(value) {
  //   if (this.props.type === INPUT_GROUP_TYPE.INTEGER) {
  //     if (!/^\d+$/.test(value)) {
  //       throw new Error('Only integer is allowed');
  //     }
  //   }
  //   if (this.props.type === INPUT_GROUP_TYPE.DATE) {
  //     let formatOK = /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/.test(value);
  //     if (!formatOK) {
  //       throw new Error('The date format should be MM/DD/YYYY');
  //     }
  //     var date = moment(value, 'MM/DD/YYYY');
  //     var today = moment();
  //     if (today < date) {
  //       throw new Error('Only past date is allowed');
  //     }
  //   }
  // }

  // handleSubmit = () => {
  //   let value = this.state.value;
  //   if (!value) {
  //     Alert.alert('Error', 'Please enter information', [{text: 'OK'}]);
  //   }
  //   try {
  //     this.checkValidate(value);
  //   } catch (err) {
  //     Alert.alert('Error', err.message, [{text: 'OK'}]);
  //     return;
  //   }
  // }

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