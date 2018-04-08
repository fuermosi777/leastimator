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
import { COLOR } from '../constants';
import { EditCarRoute, AddOdometerReadingRoute, ReadingListRoute } from '../routes';
import BaseScene from './BaseScene';
import moment from 'moment';
import { findMaxBy, capitalize } from '../tool';
import { MILEAGE_UNIT, CURRENCY_UNIT, DEFAULT_WIDGET_READING } from '../constants';

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
    this.state = {};
  }

  componentWillUnmount() {
    this.realm.removeListener('change', this.updateCar.bind(this, this.props.carId));
  }

  getMonths(startDate, endDate) {
    let months = [];
    let date = startDate;
    while (!moment(date).isSame(endDate, 'month')) {
      months.push(date);
      date = moment(date).add(1, 'M').toDate();
    }
    months.push(date);
    return months;
  }

  getFilteredReadings(months, startDate, startingMiles, readings) {
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

  getLeaseMonthsPassed(leaseStartDate) {
    let diff = moment(leaseStartDate).diff(moment(new Date()), 'months');
    return Math.abs(diff);
  }

  getLeaseDaysPassed(leaseStartDate) {
    let diff = moment(leaseStartDate).diff(moment(new Date()), 'days');
    return Math.abs(diff);
  }

  getLeaseMonthLeft(leaseEndDate) {
    let diff = moment(leaseEndDate).diff(moment(new Date()), 'months');
    return diff < 0 ? 0 : diff;
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
    // initialize stuff
    let months = this.getMonths(this.leaseStartDate, this.leaseEndDate);
    let filteredReadings = this.getFilteredReadings(months, this.leaseStartDate, this.startingMiles, this.readings);
    let currentMileage = findMaxBy(filteredReadings, 'value').value;
    let unusedMileage = this.milesAllowed - currentMileage;
    unusedMileage = unusedMileage > 0 ? unusedMileage : 0;
    let dailyAllowance = Math.floor(this.milesAllowed / this.lengthOfLease / 30);
    let monthlyAllowance = Math.floor(this.milesAllowed / this.lengthOfLease);

    // get predicted mileage
    let estimatedMileage;
    if (filteredReadings.length === 1) { // if only one reading, no estimation, use the starting mile
      estimatedMileage = this.startingMiles;
    } else {
      let latestReading = filteredReadings[filteredReadings.length - 1];
      let dailyMileageSoFar = Math.abs((latestReading.value - this.startingMiles) / moment(this.leaseStartDate).diff(moment(latestReading.date), 'days'));
      estimatedMileage = Math.floor(this.startingMiles + this.lengthOfLease / 12 * 365 * dailyMileageSoFar);
    }

    let estimatedMileageCirclePercentage = Math.floor(estimatedMileage / (this.milesAllowed + this.startingMiles) * 100);
    estimatedMileageCirclePercentage = estimatedMileageCirclePercentage < 100 ? estimatedMileageCirclePercentage : 100;

    let excessMileage = estimatedMileage - this.milesAllowed - this.startingMiles;
    excessMileage = excessMileage > 0 ? excessMileage : 0;
    let excessCharge = Math.floor(excessMileage * this.fee);
    let leaseMonthLeft = this.getLeaseMonthLeft(this.leaseEndDate);
    let leaseDayPassed = this.getLeaseDaysPassed(this.leaseStartDate);
    let leaseMonthPassed = this.getLeaseMonthsPassed(this.leaseStartDate);

    let progressTintColor = excessMileage > this.startingMiles ? COLOR.WARNING : COLOR.PRIMARY_BLUE;

    let dailyMileage = this.getDailyMileage(this.lengthOfLease, this.milesAllowed);
    let odometerShouldRead = this.getOdometerShouldRead(dailyMileage, this.leaseStartDate, this.milesAllowed, this.startingMiles);
    let driveUpToMileage = this.getDriveUpToMileage(odometerShouldRead, currentMileage);

    let {mileageUnit} = this.state;

    return (
      <LinearGradientBackground
        style={styles.container}>
        <ScrollView>
          {mileageUnit ?
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
                (fill) => (
                  <View style={styles.circleCenter}>
                    <Text style={styles.circleSubText}>{this.state.defaultReadingWidget === DEFAULT_WIDGET_READING.PREDICTED ? 'Predicted' : 'Should Read'}</Text>
                    <Text style={styles.circleMainText}>{this.state.defaultReadingWidget === DEFAULT_WIDGET_READING.PREDICTED ? estimatedMileage.toString() : odometerShouldRead.toString()}</Text>
                    <Text style={styles.circleSubText}>{capitalize(MILEAGE_UNIT[mileageUnit].plural)}</Text>
                  </View>
                )
              }
            </AnimatedCircularProgress>
          </View> : null}

          <Gap height={20}/>

          <ListItem
            onPress={this.handleAddOdometerReadingPressed}
            text='Add Odometer Reading'
            icon={require('../images/add.png')}
          />

          <Divider/>

          <ListItem
            onPress={this.handleAddOdometerReadingPressed}
            text='Fuel Up'
            icon={require('../images/gas.png')}
          />

          <Divider/>

          <ListItem
            onPress={this.handleHistoryReadingPressed}
            text='History Readings'
            icon={require('../images/burger.png')}
          />

          <Divider/>

          {mileageUnit ?
          <View style={styles.paneRow}>
            <InfoPane label='Current Mileage' value={currentMileage} label2='Unused Mileage' value2={unusedMileage} unit={MILEAGE_UNIT[mileageUnit].symbol}/>
            <InfoPane label='Should Read' value={odometerShouldRead} unit={MILEAGE_UNIT[mileageUnit].symbol}/>
          </View> : null}

          <Divider/>

          {mileageUnit ?
          <View style={styles.paneRow}>
            <InfoPane label='Daily Behavior' label2='Daily Allowance' value={currentMileage / leaseDayPassed | 0} value2={dailyAllowance} unit={MILEAGE_UNIT[mileageUnit].symbol}/>
            <InfoPane label='Monthly Behavior' label2='Monthly Allowance' value={currentMileage / leaseMonthPassed | 0} value2={monthlyAllowance} unit={MILEAGE_UNIT[mileageUnit].symbol}/>
          </View> : null}

          <Divider/>

          {mileageUnit && this.state.currencySymbol ?
          <View style={styles.paneRow}>
            <InfoPane label='Excess Mileage' value={excessMileage} unit={MILEAGE_UNIT[mileageUnit].symbol}/>
            <InfoPane label='Excess Charge' value={excessCharge} unit={CURRENCY_UNIT[this.state.currencySymbol]}/>
          </View> : null}

          <Divider/>

          {mileageUnit ?
          <MileageChart
            mileageSymbol={MILEAGE_UNIT[mileageUnit].symbol}
            months={months}
            filteredReadings={filteredReadings}
          /> : null}

          <Divider/>

          {mileageUnit ?
          <LongTextListItem
            title='What should my odometer read?'
            content={`Your odometer should currently read less than ${odometerShouldRead} ${MILEAGE_UNIT[mileageUnit].plural}`}
          /> : null}

          <Divider/>

          {mileageUnit ?
          <LongTextListItem
            title='How long can I drive today?'
            content={`Your can drive up to ${driveUpToMileage} ${MILEAGE_UNIT[mileageUnit].plural} today and still be on track`}
          /> : null}

          <Divider/>

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
    this.props.navigator.push(Object.assign(EditCarRoute(), {
      passProps: {
        carId: this.props.carId
      }
    }));
  }

  handleAddOdometerReadingPressed = () => {
    this.props.navigator.push(Object.assign(AddOdometerReadingRoute(), {
      passProps: {
        carId: this.props.carId
      }
    }));
  }

  handleHistoryReadingPressed = () => {
    this.props.navigator.push(Object.assign(ReadingListRoute(), {
      passProps: {
        carId: this.props.carId
      }
    }));
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64 + 20,
    flex: 1,
    position: 'relative'
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
