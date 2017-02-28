import React, { PropTypes } from 'react';
import {
  Text,
  StyleSheet,
  Alert,
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
  isLessOrEqualThan,
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
      odometerReading: this.lastReading,
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
          onPress={this.handleDatePressed}
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
          title='SAVE'
          color={COLOR.WHITE}
          backgroundColor={COLOR.TRANSPARENT}
        />
        <DatePicker
          isVisible={this.state.showDatePicker}
          onConfirm={this.handleDatePickerConfirm}
          onCancel={this.handleDatePickerCancel}
          maximumDate={new Date()}
          minimumDate={this.car.leaseStartDate}
          title='Odometer reading date'/>
      </LinearGradientBackground>
    );
  }

  handleSavePress = () => {
    try {
      validator.validate(this.state.odometerReading, 'Reading', isNotEmpty, isInteger);
    } catch (err) {
      Alert.alert('Error', err.message, [{text: 'OK'}]);
      return;
    }

    let sameDayIndex;
    let sameDayReading = this.car.readings.find((reading, index) => {
      if (moment(reading.date).isSame(moment(this.state.readingDate), 'day')) {
        sameDayIndex = index;
        return true;
      }
    });
    let previousDayReadingValue = sameDayIndex === 0 ? this.car.startingMiles : this.car.readings[sameDayIndex - 1].value;
    let nextDayReadingValue = sameDayIndex === this.car.readings.length - 1 ? MAX.ODOMETER_READING : this.car.readings[sameDayIndex + 1].value;
    try {
      validator.validate(
        this.state.odometerReading, 
        'Reading', 
        isLessOrEqualThan(nextDayReadingValue), 
        isLargerOrEqualThan(previousDayReadingValue)
      );
    } catch (err) {
      Alert.alert('Error', err.message, [{text: 'OK'}]);
    }

    let reading = {
      id: Number(uuid()),
      value: Number(this.state.odometerReading),
      date: this.state.readingDate
    };

    if (sameDayReading) {
      // TODO: update the reading
      Alert.alert('Error', 'You already have a odometer reading on this date. Do you want to update it?', [{text: 'OK'}]);
    } else {
      this.realm.write(() => {
        this.car.readings.push(reading);
      });

      this.props.navigator.pop();
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
