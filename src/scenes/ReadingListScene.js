import React, { PropTypes } from 'react';
import {
  StyleSheet,
  ListView,
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';
import ListItem from '../components/ListItem';
import BaseScene from './BaseScene';
import { EditOdometerReadingRoute } from '../routes';
import { LIST_ITEM_BORDER_TYPE } from '../constants';
import moment from 'moment';
import { MILEAGE_UNIT } from '../constants';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ReadingListScene extends BaseScene {

  static propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    carId: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    this.car = this.realm.objectForPrimaryKey('Car', props.carId);
    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;
    this.dataSource = ds.cloneWithRows(this.car.readings.sorted('date'));
    this.realm.addListener('change', this.updateData);
    this.state = {};
  }

  componentWillUnmount() {
    this.realm.removeListener('change', this.updateData);
  }

  render() {
    return (
      <LinearGradientBackground
        style={styles.container}>
        {this.car.readings.length > 0 && this.state.mileageUnit ? 
        <ListView 
          initialListSize={12}
          contentContainerStyle={styles.listView}
          dataSource={this.dataSource}
          renderRow={this.renderRow}>
        </ListView>
        :
        null}
      </LinearGradientBackground>
    );
  }

  renderRow = (rowData, /* sectionID, */ /*rowID, */ /* highlightRow */) => {
    return (
      <ListItem 
        text={String(rowData.value)}
        subText={MILEAGE_UNIT[this.state.mileageUnit].symbol.toUpperCase()}
        rightText={moment(rowData.date).format('MMMM DD, YYYY')}
        border={LIST_ITEM_BORDER_TYPE.BOTTOM}
        onPress={this.handleReadingPressed.bind(this, rowData.id)}/>
    );
  }

  handleLeftButtonPressed = () => {
    this.props.navigator.pop();
  }

  handleReadingPressed = (readingId) => {
    this.props.navigator.push(Object.assign(EditOdometerReadingRoute, {
      passProps: {
        carId: this.props.carId,
        readingId
      }
    }));
  }

  updateData = () => {
    this.car = this.realm.objectForPrimaryKey('Car', this.props.carId);
    this.dataSource = ds.cloneWithRows(this.car.readings.sorted('date'));
  }

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64 + 20,
    flex: 1
  },
  listView: {
    flex: 1, 
  }
});