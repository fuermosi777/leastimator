import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';
import ListItem from '../components/ListItem';
import InfoPane from '../components/InfoPane';
import Divider from '../components/Divider';
import Gap from '../components/Gap';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { COLOR, LIST_ITEM_BORDER_TYPE } from '../constants';
import { EditCarRoute, AddOdometerReadingRoute, ReadingListRoute } from '../routes';
import BaseScene from './BaseScene';

const CIRCULAR_PROGRESS_LINECAP = 'round';

export default class CarScene extends BaseScene {

  static propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    carId: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.car = this.realm.objectForPrimaryKey('Car', props.carId);
    this.props.route.title = this.car.nickname;
    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;
    this.props.route.onRightButtonPressed = this.handleRightButtonPressed;
  }

  render() {
    return (     
      <LinearGradientBackground
        style={styles.container}>
        <ScrollView
        >
          <View style={styles.progress}>
            <AnimatedCircularProgress
              size={160}
              width={6}
              fill={75}
              tintColor={COLOR.PRIMARY_BLUE}
              backgroundColor={COLOR.SECONDARY}
              linecap={CIRCULAR_PROGRESS_LINECAP}
              rotation={0}>
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
            <InfoPane label='Mileage' value={1231241} unit='MI'/>
            <InfoPane label='Monthly Allowance' value={234} unit='$'/>
          </View>
          <Divider/>
          <View style={styles.paneRow}>
            <InfoPane label='Excess Mileage' value={1231241} unit='MI'/>
            <InfoPane label='Excess Charge' value={234} unit='$'/>
          </View>
        </ScrollView>
      </LinearGradientBackground>
    );
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
  paneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
