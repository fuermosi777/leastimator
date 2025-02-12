import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Alert,
  Platform,
  DatePickerAndroid,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import LinearGradientBackground from '../components/LinearGradientBackground';
import {COLOR, INPUT_GROUP_TYPE, DEFAULT, MAX} from '../constants';
import SelectCarIcon from '../components/SelectCarIcon';
import {SelectCarIconRoute} from '../routes';
import InputGroup from '../components/InputGroup';
import DatePicker from '../components/DatePicker';
import moment from 'moment';
import BaseScene from './BaseScene';
import BlockButton from '../components/BlockButton';
import Gap from '../components/Gap';
import { uuid, capitalize } from '../tool';
import validator, {isNotEmpty, isInteger, isString, isDate, isLengthLessOrEqualThan, isLessOrEqualThan, isPastDate} from '../utils/validator';
import { MILEAGE_UNIT, CURRENCY_UNIT } from '../constants';

export default class AddCarScene extends BaseScene {

  isEditing = false;

  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false,
      selectedCarIconName: DEFAULT.CAR_ICON_NAME,
      nickname: '',
      startingMiles: '',
      milesAllowed: '',
      lengthOfLease: '',
      leaseStartDate: new Date(),
      fee: '',
    };
    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;
  }

  render() {
    let maximumDate = new Date();
    let minimumDate = moment(this.state.leaseStartDate).subtract(this.state.lengthOfLease || MAX.LENGTH_OF_LEASE, 'M').toDate();

    return (
      <LinearGradientBackground 
        style={styles.container}>
        <KeyboardAwareScrollView 
        >
          <SelectCarIcon
            carIconName={this.state.selectedCarIconName}
            onIconPress={() => {this.props.navigator.push(Object.assign(SelectCarIconRoute(), {
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
          {this.state.mileageUnit ? 
          <InputGroup 
            value={this.state.startingMiles} 
            label={`Starting ${capitalize(MILEAGE_UNIT[this.state.mileageUnit].plural)}`}
            placeholder='20'
            type={INPUT_GROUP_TYPE.INTEGER}
            onChangeText={this.handleInputTextChange.bind(this, 'startingMiles')}
          /> : null}
          {this.state.mileageUnit ? 
          <InputGroup 
            value={this.state.milesAllowed} 
            label={`${capitalize(MILEAGE_UNIT[this.state.mileageUnit].plural)} Allowed`}
            placeholder='30000'
            type={INPUT_GROUP_TYPE.INTEGER}
            onChangeText={this.handleInputTextChange.bind(this, 'milesAllowed')}
          /> : null}
          <InputGroup 
            value={this.state.lengthOfLease} 
            label='Length of Lease'
            placeholder='36'
            type={INPUT_GROUP_TYPE.INTEGER}
            onChangeText={this.handleInputTextChange.bind(this, 'lengthOfLease')}
          />
          <InputGroup 
            value={moment(this.state.leaseStartDate).format('MM/DD/YYYY')}
            label='Lease Start Date'
            type={INPUT_GROUP_TYPE.DATE}
            onPress={Platform.OS === 'ios' ? this.handleDatePressed : this.handleDateAndroidPressed.bind(this, minimumDate, maximumDate)}
          />
          {this.state.mileageUnit && this.state.currencySymbol ? 
          <InputGroup 
            value={this.state.fee}
            label={`${capitalize(MILEAGE_UNIT[this.state.mileageUnit].plural)} Over Fee (${CURRENCY_UNIT[this.state.currencySymbol]})`}
            placeholder='0.25'
            type={INPUT_GROUP_TYPE.FLOAT}
            onChangeText={this.handleInputTextChange.bind(this, 'fee')}
          /> : null}
          <Gap height={40}/>
          <BlockButton
            onPress={this.handleSavePress}
            title={this.isEditing ? 'UPDATE' : 'SAVE'}
            color={COLOR.WHITE}
            backgroundColor={COLOR.TRANSPARENT}
          />
          {this.isEditing ? 
          <BlockButton
            onPress={this.handleDeletePress}
            title='DELETE'
            color={COLOR.WARNING}
            backgroundColor={COLOR.TRANSPARENT}
          />
          : null}
        </KeyboardAwareScrollView>
        {Platform.OS === 'ios' ? 
          <DatePicker
            isVisible={this.state.showDatePicker}
            onConfirm={this.handleDatePickerConfirm}
            onCancel={this.handleDatePickerCancel}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            title='Pick a lease start date'/>
        : null}
      </LinearGradientBackground>
    );
  }

  handleDatePickerConfirm = (date) => {
    this.setState({leaseStartDate: date, showDatePicker: false});
  }

  handleDatePickerCancel = () => {
    this.setState({showDatePicker: false});
  }

  handleDatePickerChange = (date) => {
    this.setState({leaseStartDate: date});
  }

  handleDateAndroidPressed = async(minimumDate, maximumDate) => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: minimumDate,
        minDate: minimumDate,
        maxDate: maximumDate
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        let date = new Date(year, month, day);
        this.setState({leaseStartDate: date});
      }
    } catch({code, message}) {
      // console.warn(`Cannot open date picker in Android '${stateKey}': `, message);
    }
  }

  handleDatePressed = () => {
    this.setState({showDatePicker: true});
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

  handleSavePress = () => {
    let car = {
      carIconName: String(this.state.selectedCarIconName),
      nickname: String(this.state.nickname),
      startingMiles: Number(this.state.startingMiles),
      milesAllowed: Number(this.state.milesAllowed),
      lengthOfLease: Number(this.state.lengthOfLease),
      leaseStartDate: this.state.leaseStartDate,
      fee: Number(this.state.fee)
    };

    try {
      validator.validate(car.nickname, 'Nickname', isNotEmpty, isString, isLengthLessOrEqualThan(20));
      validator.validate(car.startingMiles, `Starting ${capitalize(MILEAGE_UNIT[this.state.mileageUnit].plural)}`, isNotEmpty, isInteger, isLessOrEqualThan(100000));
      validator.validate(car.milesAllowed, `${capitalize(MILEAGE_UNIT[this.state.mileageUnit].plural)} Allowed`, isNotEmpty, isInteger, isLessOrEqualThan(100000));
      validator.validate(car.lengthOfLease, 'Length of lease', isNotEmpty, isInteger, isLessOrEqualThan(MAX.LENGTH_OF_LEASE));
      validator.validate(car.leaseStartDate, 'Lease start date', isNotEmpty, isDate, isPastDate);
      validator.validate(car.fee, `${capitalize(MILEAGE_UNIT[this.state.mileageUnit].plural)} Over Fee`, isNotEmpty);
    } catch (err) {
      Alert.alert('Error', err.message, [{text: 'OK'}]);
      return;
    }

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
    paddingTop: 64,
    flex: 1
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
