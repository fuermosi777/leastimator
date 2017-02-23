import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';
import {COLOR, INPUT_GROUP_TYPE} from '../constants';
import SelectCarIcon from '../components/SelectCarIcon';
import {SelectCarIconRoute} from '../routes';
import InputGroup from '../components/InputGroup';
import {todayDate} from '../tool';
import Car from '../models/Car';
import moment from 'moment';
import BaseScene from './BaseScene';
import BlockButton from '../components/BlockButton';
import Gap from '../components/Gap';

const DEFAULT_CAR_ICON_NAME = 'convertible';

export default class AddCarScene extends BaseScene {
  constructor(props) {
    super(props);
    this.state = {
      selectedCarIconName: DEFAULT_CAR_ICON_NAME,
      inputs: [{
        name: 'nickname',
        value: '',
        label: 'Nickname',
        placeholder: 'My car',
        type: INPUT_GROUP_TYPE.TEXT,
      }, {
        name: 'startingMiles',
        value: '',
        label: 'Starting Miles',
        placeholder: '20',
        type: INPUT_GROUP_TYPE.INTEGER,
      }, {
        name: 'milesAllowed',
        value: '',
        label: 'Miles Allowed',
        placeholder: '30000',
        type: INPUT_GROUP_TYPE.INTEGER,
      }, {
        name: 'lengthOfLease',
        value: '',
        label: 'Length of Lease',
        placeholder: '36',
        type: INPUT_GROUP_TYPE.INTEGER,
      }, {
        name: 'leaseStartDate',
        value: '',
        label: 'Lease Start Date',
        placeholder: todayDate(),
        type: INPUT_GROUP_TYPE.DATE,
      }]
    };
    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;
  }

  componentWillMount() {
    
  }

  render() {
    return (
      <LinearGradientBackground 
        style={styles.container}>
        <KeyboardAvoidingView behavior="position"
        >
          <SelectCarIcon
            carIconName={this.state.selectedCarIconName}
            onIconPress={() => {this.props.navigator.push(Object.assign(SelectCarIconRoute, {
              passProps: {
                onCarIconPress: this.handleCarIconNameSelected,
              }
            }));}}
          />
          {this.state.inputs.map((item, key) => {
            return (
              <InputGroup 
                key={key}
                value={item.value} 
                label={item.label}
                placeholder={item.placeholder} 
                type={item.type}
                onChangeText={this.handleInputTextChange.bind(this, key)}
              />
            );
          })}
        </KeyboardAvoidingView>
        <Gap height={40}/>
        <BlockButton
          onPress={this.handleSavePress}
          title='SAVE'
          color={COLOR.WHITE}
          backgroundColor='transparent'
        />
        {this.isEditing ? 
        <BlockButton
          onPress={this.handleDeletePress}
          title='DELETE'
          color={COLOR.WHITE}
          backgroundColor='transparent'
        />
        : null}
      </LinearGradientBackground>
    );
  }

  handleLeftButtonPressed = () => {
    this.props.navigator.pop();
  }

  handleCarIconNameSelected = (selectedCarIconName) => {
    this.setState({selectedCarIconName});
  }

  handleInputTextChange = (key, text) => {
    let state = this.state;
    state.inputs[key].value = text;
    this.setState(state);
  }

  getInputValue(inputName) {
    let inputs = this.state.inputs;
    return inputs.filter(input => input.name === inputName)[0].value;
  }

  validate(input) {
    if (!input.value) {
      throw new Error('Please fill all fields');
    }
    if (input.type === INPUT_GROUP_TYPE.TEXT) {
      if (input.value.length > 20) {
        throw new Error(`The ${input.label} is too long`);
      }
    }
    if (input.type === INPUT_GROUP_TYPE.INTEGER) {
      if (input.value.length > 5) {
        throw new Error(`The number of ${input.label} is too large`);
      }
      if (!/^\d+$/.test(input.value)) {
        throw new Error('Only integer is allowed');
      }
    }
    if (input.type === INPUT_GROUP_TYPE.DATE) {
      let formatOK = /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/.test(input.value);
      if (!formatOK) {
        throw new Error('The date format should be MM/DD/YYYY');
      }
      var date = moment(input.value, 'MM/DD/YYYY');
      var today = moment();
      if (today < date) {
        throw new Error('Only past date is allowed');
      }
    }
  }

  handleSavePress = () => {
    let inputs = this.state.inputs;

    try {
      for (let input of inputs) {
        this.validate(input);
      }
    } catch (err) {
      Alert.alert('Error', err.message, [{text: 'OK'}]);
      return;
    }

    var leaseStartDate = this.getInputValue('leaseStartDate');
    leaseStartDate = moment(leaseStartDate, 'MM/DD/YYYY');
    leaseStartDate = leaseStartDate.format('MM/DD/YYYY');

    var car = Car.create({
      carIconName: this.state.selectedCarIconName,
      nickname: this.getInputValue('nickname'),
      startingMiles: this.getInputValue('startingMiles'),
      milesAllowed: this.getInputValue('milesAllowed'),
      lengthOfLease: this.getInputValue('lengthOfLease'),
      leaseStartDate: leaseStartDate,
    });

    this.props.navigator.pop();    
  }

  handleDeletePress = () => {
    // TODO
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  save: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60,
  },
  text: {
    textAlign: 'center',
    color: COLOR.WHITE,
    fontSize: 16,
    fontWeight: '300',
  }
});

AddCarScene.propTypes = {
  route: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};
