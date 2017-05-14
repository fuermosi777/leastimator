import React, { PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Alert,
  DatePickerAndroid,
} from 'react-native';
import BaseScene from './BaseScene';
import LinearGradientBackground from '../components/LinearGradientBackground';
import InputGroup from '../components/InputGroup';
import Gap from '../components/Gap';
import DatePicker from '../components/DatePicker';
import BlockButton from '../components/BlockButton';
import moment from 'moment';
import {COLOR, INPUT_GROUP_TYPE, MAX} from '../constants';
import {uuid} from '../tool';
import validator, {
  isNotEmpty,
  isInteger,
  isLargerOrEqualThan,
} from '../utils/validator';

export default class AddOdometerReadingScene extends BaseScene {
  
  constructor(props) {
    super(props);
    this.car = this.realm.objectForPrimaryKey('Car', props.carId);

    if (this.car.readings.length === 0) {
      this.lastReading = this.car.startingMiles;
    } else {
      this.lastReading = this.car.readings.sorted('date')[this.car.readings.length - 1].value;
    }

    this.state = {
      showDatePicker: false,
      readingDate: new Date(),
      odometerReading: String(this.lastReading),
    };
    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;
  }

  render() {
    return (
      <LinearGradientBackground
        style={styles.container}>
        <Gap height={64}/>
        <InputGroup 
          value={moment(this.state.readingDate).format('MM/DD/YYYY')}
          label='Reading Date'
          type={INPUT_GROUP_TYPE.DATE}
          onPress={Platform.OS === 'ios' ? this.handleDatePressed : this.handleDateAndroidPressed.bind(this, this.state.readingDate)}
        />
        <InputGroup 
          value={this.state.odometerReading} 
          label='Odometer Reading'
          placeholder='20'
          type={INPUT_GROUP_TYPE.INTEGER}
          onChangeText={this.handleReadingInputTextChange}
        />
        <Gap height={40}/>
        <BlockButton
          onPress={this.handleSavePress}
          title={this.isEditing ? 'UPDATE' : 'SAVE'}
          color={COLOR.WHITE}
          backgroundColor={COLOR.TRANSPARENT}
        />
        {this.isEditing? 
        <BlockButton
          onPress={this.handleDeletePress}
          title='DELETE'
          color={COLOR.WARNING}
          backgroundColor={COLOR.TRANSPARENT}
        />
        : null}
        {Platform.OS === 'ios' ?
          <DatePicker
            isVisible={this.state.showDatePicker}
            onConfirm={this.handleDatePickerConfirm}
            onCancel={this.handleDatePickerCancel}
            maximumDate={new Date()}
            minimumDate={this.car.leaseStartDate}
            title='Odometer reading date'/>
        : null}
      </LinearGradientBackground>
    );
  }

  handleSavePress = () => {
    let {realm, state, props} = this;

    let odometerReading = Number(state.odometerReading);

    try {
      validator.validate(odometerReading, 'Reading', isNotEmpty, isInteger);
    } catch (err) {
      Alert.alert('Error', err.message, [{text: 'OK'}]);
      return;
    }

    let sameDayReading = this.car.readings.find(reading => {
      if (moment(reading.date).isSame(moment(state.readingDate), 'day')) {
        return true;
      }
    });

    try {
      validator.validate(
        odometerReading, 
        'Reading', 
        isLargerOrEqualThan(this.car.startingMiles)
      );
    } catch (err) {
      Alert.alert('Error', err.message, [{text: 'OK'}]);
      return;
    }

    let reading = {
      id: Number(uuid()),
      value: odometerReading,
      date: state.readingDate
    };

    if (this.isEditing && this.reading) {
      realm.write(() => {
        this.reading.date = state.readingDate;
        this.reading.value = odometerReading;
      });
      props.navigator.pop();
    } else if (sameDayReading) {
      Alert.alert('Warning', 'You already have a odometer reading on this date. Do you want to update it?', [{
        text: 'Cancel',
      }, {
        text: 'OK',
        onPress() {
          realm.write(() => {
            sameDayReading.date = state.readingDate;
            sameDayReading.value = odometerReading;
          });
          props.navigator.pop();
        }
      }]);
    } else {
      realm.write(() => {
        this.car.readings.push(reading);
      });

      props.navigator.pop();
    }
  }

  handleDeletePress = () => {
    let realm = this.realm;

    if (this.isEditing && this.reading) {
      Alert.alert(
        'Delete',
        `Do you want to delete this reading on ${moment(this.reading.date).format('MM/DD/YYYY')}?`, [{
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        }, {
          text: 'Yes',
          onPress: () => {
            realm.write(() => {
              realm.delete(this.reading);
            });
            this.props.navigator.pop();
          }
        }]
      );
    }
  }

  handleReadingInputTextChange = (text) => {
    this.setState({odometerReading: text});
  }

  handleDatePickerCancel = () => {
    this.setState({showDatePicker: false});
  }

  handleDatePickerConfirm = (date) => {
    this.setState({readingDate: date, showDatePicker: false});
  }

  handleDatePressed = () => {
    this.setState({showDatePicker: true});
  }

  handleDateAndroidPressed = async(readingDate) => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: readingDate,
        minDate: this.car.leaseStartDate,
        maxDate: new Date(),
        mode: 'default'});
      if (action !== DatePickerAndroid.dismissedAction) {
        let date = new Date(year, month, day);
        this.setState({readingDate: date});
      }
    } catch({code, message}) {
      // console.warn(`Cannot open date picker in Android '${stateKey}': `, message);
    }
  }

  handleLeftButtonPressed = () => {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AddOdometerReadingScene.propTypes = {
  route: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  carId: PropTypes.number.isRequired,
};
