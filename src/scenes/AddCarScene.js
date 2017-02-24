import React, { PropTypes } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';
import {COLOR, INPUT_GROUP_TYPE} from '../constants';
import SelectCarIcon from '../components/SelectCarIcon';
import {SelectCarIconRoute} from '../routes';
import InputGroup from '../components/InputGroup';
import {todayDateText} from '../tool';
import moment from 'moment';
import BaseScene from './BaseScene';
import BlockButton from '../components/BlockButton';
import Gap from '../components/Gap';
import {uuid} from '../tool';

const DEFAULT_CAR_ICON_NAME = 'convertible';

export default class AddCarScene extends BaseScene {

  isEditing = false;

  constructor(props) {
    super(props);
    this.state = {};
    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;
  }

  componentWillMount() {
    let leaseStartDate = '';
    if (this.isEditing) {
      leaseStartDate = moment(this.car.leaseStartDate);
      leaseStartDate = leaseStartDate.format('MM/DD/YYYY');
    }
    
    this.setState({
      selectedCarIconName: this.isEditing ? this.car.carIconName : DEFAULT_CAR_ICON_NAME,
      nickname: this.isEditing ? this.car.nickname : '',
      startingMiles: this.isEditing ? String(this.car.startingMiles) : '',
      milesAllowed: this.isEditing ? String(this.car.milesAllowed) : '',
      lengthOfLease: this.isEditing ? String(this.car.lengthOfLease) : '',
      leaseStartDate: this.isEditing ? leaseStartDate : '',
    });
  }

  render() {
    return (
      <LinearGradientBackground 
        style={styles.container}>
        <KeyboardAvoidingView 
          behavior='position'
        >
          <SelectCarIcon
            carIconName={this.state.selectedCarIconName}
            onIconPress={() => {this.props.navigator.push(Object.assign(SelectCarIconRoute, {
              passProps: {
                onCarIconPress: this.handleCarIconNameSelected,
              }
            }));}}
          />
          <InputGroup 
            value={this.state.nickname} 
            label='Nickname'
            placeholder='My car'
            type={INPUT_GROUP_TYPE.TEXT}
            onChangeText={this.handleInputTextChange.bind(this, 'nickname')}
          />
          <InputGroup 
            value={this.state.startingMiles} 
            label='Starting Miles'
            placeholder='20'
            type={INPUT_GROUP_TYPE.INTEGER}
            onChangeText={this.handleInputTextChange.bind(this, 'startingMiles')}
          />
          <InputGroup 
            value={this.state.milesAllowed} 
            label='Miles Allowed'
            placeholder='30000'
            type={INPUT_GROUP_TYPE.INTEGER}
            onChangeText={this.handleInputTextChange.bind(this, 'milesAllowed')}
          />
          <InputGroup 
            value={this.state.lengthOfLease} 
            label='Length of Lease'
            placeholder='36'
            type={INPUT_GROUP_TYPE.INTEGER}
            onChangeText={this.handleInputTextChange.bind(this, 'lengthOfLease')}
          />
          <InputGroup 
            value={this.state.leaseStartDate} 
            label='Lease Start Date'
            placeholder={todayDateText()}
            type={INPUT_GROUP_TYPE.DATE}
            onChangeText={this.handleInputTextChange.bind(this, 'leaseStartDate')}
          />
        </KeyboardAvoidingView>
        <Gap height={40}/>
        <BlockButton
          onPress={this.handleSavePress}
          title='SAVE'
          color={COLOR.WHITE}
          backgroundColor={COLOR.TRANSPARENT}
        />
        {this.isEditing ? 
        <BlockButton
          onPress={this.handleDeletePress}
          title='DELETE'
          color={COLOR.WHITE}
          backgroundColor={COLOR.TRANSPARENT}
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
    this.setState({[key]: text});
  }

  validate(input) {

    // TODO
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

    var leaseStartDate = this.state.leaseStartDate;
    leaseStartDate = moment(leaseStartDate, 'MM/DD/YYYY').toDate();

    let car = {
      carIconName: String(this.state.selectedCarIconName),
      nickname: String(this.state.nickname),
      startingMiles: Number(this.state.startingMiles),
      milesAllowed: Number(this.state.milesAllowed),
      lengthOfLease: Number(this.state.lengthOfLease),
      leaseStartDate: leaseStartDate,
    };

    if (this.isEditing) {
      this.realm.write(() => {
        Object.keys(car).forEach(key => {
          this.car[key] = car[key];
        });      
      });
    } else {
      this.realm.write(() => {
        this.realm.create('Car', Object.assign(car, {
          id: Number(uuid())
        }));
      });
    }

    this.props.navigator.pop();    
  }

  handleDeletePress = () => {
    if (this.isEditing) {
      Alert.alert(
        'Delete',
        `Do you want to delete ${this.car.nickname}?`, [{
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        }, {
          text: 'Yes',
          onPress: () => {
            this.realm.write(() => {
              this.realm.delete(this.car);
            });
            this.props.navigator.popToTop();
          }
        }]
      );
    }
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
    fontSize: 18,
    fontWeight: '300',
  }
});

AddCarScene.propTypes = {
  route: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};
