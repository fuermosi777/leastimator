import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  ListView,
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';
import ListItem from '../components/ListItem';
import BaseScene from './BaseScene';
import {LIST_ITEM_BORDER_TYPE} from '../constants';

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
    this.state = {
      dataSource: ds.cloneWithRows(this.car.readings)
    };
  }

  render() {
    return (
      <LinearGradientBackground
        style={styles.container}>
        <ListView 
          initialListSize={12}
          contentContainerStyle={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}>
        </ListView>
      </LinearGradientBackground>
    );
  }

  renderRow = (rowData, sectionID, rowID, highlightRow) => {
    console.log(rowData);
    return (
      <ListItem 
        text={rowData.value}
        border={LIST_ITEM_BORDER_TYPE.BOTTOM}
        onPress={this.handleReadingPressed.bind(this, rowData.id)}/>
    );
  }

  handleLeftButtonPressed = () => {
    this.props.navigator.pop();
  }

  handleReadingPressed = (readingId) => {
    console.log(readingId);
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