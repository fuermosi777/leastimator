import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';
import ListItem from '../components/ListItem';
import InfoPane from '../components/InfoPane';
import Divider from '../components/Divider';
import MileageChart from '../components/MileageChart';
import LongTextListItem from '../components/LongTextListItem';
import Gap from '../components/Gap';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { COLOR, LIST_ITEM_BORDER_TYPE } from '../constants';
import { EditCarRoute, AddOdometerReadingRoute, ReadingListRoute } from '../routes';
import BaseScene from './BaseScene';
import moment from 'moment';
import {findMaxBy} from '../tool';
import regression from '../lib/regression.min';

const CIRCULAR_PROGRESS_LINECAP = 'round';

export default class CarScene extends BaseScene {

  static propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    carId: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    this.realm.addListener('change', this.updateCar.bind(this, props.carId));
    this.updateCar(props.carId);
    
    this.props.route.title = this.car.nickname;
    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;
    this.props.route.onRightButtonPressed = this.handleRightButtonPressed;
  }

  componentWillUnmount() {
    this.realm.removeListener('change', this.updateCar.bind(this, this.props.carId));
  }

  getMonths(startDate: Date, endDate: Date) {
    let months = [];
    let date = startDate;
    while (!moment(date).isSame(endDate)) {
      months.push(date);
      date = moment(date).add(1, 'M').toDate();
    }
    months.push(date);
    return months;
  }

  getFilteredReadings(months: Array, startDate, startingMiles, readings: Array) {
    let filteredReadings = [{
      date: startDate,
      value: startingMiles
    }];
    let readingIndex = 0;

    while (readingIndex <= readings.length - 1) {
      let reading = readings[readingIndex];
      let filteredReadingTop = filteredReadings.pop();

      if (!moment(reading.date).isSame(moment(filteredReadingTop.date), 'month')) {
        filteredReadings.push(filteredReadingTop);
      }
      filteredReadings.push(reading);

      readingIndex++;
    }

    return filteredReadings;
  }

  getRegressionPoints(readings, months) {
    let index = 0;
    let monthIndex = 0;
    let points = [];

    while (index <= readings.length - 1) {
      let reading = readings[index];

      while (
        !moment(months[monthIndex]).isSame(moment(reading.date), 'month') && 
        monthIndex <= months.length - 1
      ) {
        monthIndex++;
      }
      points.push([
        monthIndex + 1,
        reading.value - this.startingMiles
      ]);
      index++;
    }
    return points;
  }

  getLeaseMonthLeft(leaseEndDate) {
    let diff = moment(leaseEndDate).diff(moment(new Date()), 'months');
    return diff < 0 ? 0 : diff;
  }

  getPredictedMileage(regressionMileage, currentMileage) {
    return Math.max(regressionMileage, currentMileage);
  }

  getDailyMileage(lengthOfLease, milesAllowed) {
    return Math.floor(milesAllowed / (lengthOfLease / 12) / 365);
  }

  getOdometerShouldRead(dailyMileage, leaseStartDate, milesAllowed, startingMiles) {
    // How many days the Lease has started yet
    let leaseStartedLength = Math.abs(moment(leaseStartDate).diff(moment(new Date()), 'days'));
    return startingMiles + Math.min(milesAllowed, Math.floor(dailyMileage * leaseStartedLength));
  }

  getDriveUpToMileage(odometerShouldRead, currentMileage) {
    let res = odometerShouldRead - currentMileage;
    return res > 0 ? res : 0;
  }

  render() {
    let months = this.getMonths(this.leaseStartDate, this.leaseEndDate);
    let filteredReadings = this.getFilteredReadings(months, this.leaseStartDate, this.startingMiles, this.readings);
    let currentMileage = findMaxBy(filteredReadings, 'value').value;
    let monthlyAllowance = Math.floor(this.milesAllowed / this.lengthOfLease);
    let points = this.getRegressionPoints(filteredReadings, months);
    var regressionResult = regression('linearThroughOrigin', points);
    let k = regressionResult.equation[0];
    let estimatedMileage = this.getPredictedMileage(Math.floor(k * this.lengthOfLease) + this.startingMiles, currentMileage);
    let estimatedMileageCirclePercentage = Math.floor(k * this.lengthOfLease / this.milesAllowed * 100);
    estimatedMileageCirclePercentage = estimatedMileageCirclePercentage < 100 ? estimatedMileageCirclePercentage : 100;
    let excessMileage = estimatedMileage - this.milesAllowed - this.startingMiles;
    excessMileage = excessMileage > 0 ? excessMileage : 0;
    let excessCharge = excessMileage * this.fee;
    let leaseMonthLeft = this.getLeaseMonthLeft(this.leaseEndDate);

    let progressTintColor = excessMileage > this.startingMiles ? COLOR.WARNING : COLOR.PRIMARY_BLUE;

    let dailyMileage = this.getDailyMileage(this.lengthOfLease, this.milesAllowed);
    let odometerShouldRead = this.getOdometerShouldRead(dailyMileage, this.leaseStartDate, this.milesAllowed, this.startingMiles);
    let driveUpToMileage = this.getDriveUpToMileage(odometerShouldRead, currentMileage);

    return (     
      <LinearGradientBackground
        style={styles.container}>
        <ScrollView
        >
          <View style={styles.progress}>
            <AnimatedCircularProgress
              size={160}
              width={6}
              fill={estimatedMileageCirclePercentage}
              tintColor={progressTintColor}
              backgroundColor={COLOR.SECONDARY}
              linecap={CIRCULAR_PROGRESS_LINECAP}
              rotation={0}>
              {
                () => (
                  <View style={styles.circleCenter}>
                    <Text style={styles.circleSubText}>Predicted</Text>
                    <Text style={styles.circleMainText}>{estimatedMileage}</Text>
                    <Text style={styles.circleSubText}>Miles</Text>
                  </View>
                )
              }
            </AnimatedCircularProgress>
          </View>
          <Gap height={20}/>
          <ListItem
            onPress={this.handleAddOdometerReadingPressed}
            text='Add Odometer Reading'
            icon={require('../images/add.png')}
            border={LIST_ITEM_BORDER_TYPE.BOTTOM}
          />
          <ListItem
            onPress={this.handleHistoryReadingPressed}
            text='History Readings'
            icon={require('../images/burger.png')}
            border={LIST_ITEM_BORDER_TYPE.BOTTOM}
          />
          <View style={styles.paneRow}>
            <InfoPane label='Mileage' value={currentMileage} unit='Mi'/>
            <InfoPane label='Monthly Allowance' value={monthlyAllowance} unit='Mi'/>
          </View>
          <Divider/>
          <View style={styles.paneRow}>
            <InfoPane label='Excess Mileage' value={excessMileage} unit='Mi'/>
            <InfoPane label='Excess Charge' value={excessCharge} unit='$'/>
          </View>
          <Divider/>
          <MileageChart
            months={months}
            filteredReadings={filteredReadings}
          />
          <Divider/>
          <LongTextListItem
            title='What should my odometer read?'
            content={`Your odometer should currently read less than ${odometerShouldRead} miles`}
          />
          <Divider/>
          <LongTextListItem
            title='How long can I drive today?'
            content={`Your can drive up to ${driveUpToMileage} miles today and still be on track`}
          />
          <LongTextListItem
            title='How long is my lease left?'
            content={`You have ${leaseMonthLeft} months left. Keep up the work!`}
          />
        </ScrollView>
      </LinearGradientBackground>
    );
  }

  updateCar = carId => {
    this.car = this.realm.objectForPrimaryKey('Car', carId);
    if (!this.car) {
      return;
    }
    this.startingMiles = this.car.startingMiles;
    this.leaseStartDate = this.car.leaseStartDate;
    this.lengthOfLease = this.car.lengthOfLease;
    this.milesAllowed = this.car.milesAllowed;
    this.leaseEndDate = moment(this.car.leaseStartDate).add(this.car.lengthOfLease, 'M').toDate();
    this.fee = this.car.fee;
    this.readings = this.car.readings.sorted('date').map(reading => {
      return {
        date: reading.date, value: reading.value
      };
    });
  }

  handleLeftButtonPressed = () => {
    this.props.navigator.pop();
  }

  handleRightButtonPressed = () => {
    this.props.navigator.push(Object.assign(EditCarRoute, {
      passProps: {
        carId: this.props.carId
      }
    }));
  }

  handleAddOdometerReadingPressed = () => {
    this.props.navigator.push(Object.assign(AddOdometerReadingRoute, {
      passProps: {
        carId: this.props.carId
      }
    }));
  }

  handleHistoryReadingPressed = () => {
    this.props.navigator.push(Object.assign(ReadingListRoute, {
      passProps: {
        carId: this.props.carId
      }
    }));
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64 + 20,
    flex: 1
  },
  progress: {
    alignItems: 'center'
  },
  circleCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 160,
    height: 160,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleMainText: {
    color: COLOR.PRIMARY,
    fontSize: 24,
    marginTop: 5,
    marginBottom: 5
  },
  circleSubText: {
    color: COLOR.SECONDARY,
    fontWeight: '300',
    fontSize: 16,
  },
  paneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
