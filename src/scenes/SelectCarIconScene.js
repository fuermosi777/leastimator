import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';
import BaseScene from './BaseScene';
import {COLOR, CAR_ICON} from '../constants';

export default class SelectCarIconScene extends BaseScene {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: Object.keys(CAR_ICON)
    };

    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;
  }

  render() {
    return (     
      <LinearGradientBackground 
        style={styles.container}>
        <FlatList 
          numColumns={3}
          keyExtractor={item => item}
          contentContainerStyle={styles.listView}
          data={this.state.dataSource}
          renderItem={this.renderItem}>
        </FlatList>
      </LinearGradientBackground>
    );
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.circle}>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={this.handleCarIconPress.bind(this, item)}
        >
          <Image style={styles.icon} source={CAR_ICON[item].icon}/>
        </TouchableOpacity>
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
    height: 80,
    resizeMode: 'contain',
  }
});