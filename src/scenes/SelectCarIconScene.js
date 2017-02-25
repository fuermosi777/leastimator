import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  ListView,
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';
import BaseScene from './BaseScene';
import {COLOR, CAR_ICON} from '../constants';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class SelectCarIconScene extends BaseScene {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(CAR_ICON)
    };

    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;
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
    return (
      <View style={styles.circle}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.handleCarIconPress.bind(this, rowID)}
        >
          <Image style={styles.icon} source={rowData.icon}/>
        </TouchableHighlight>
      </View>
    );
  }

  handleCarIconPress = (rowID) => {
    this.props.onCarIconPress(rowID);
    this.props.navigator.pop();
  }

  handleLeftButtonPressed = () => {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 64,
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  circle: {
    borderColor: COLOR.SECONDARY,
    borderWidth: 1,
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  icon: {
    width: 80,
    resizeMode: 'contain',
  }
});