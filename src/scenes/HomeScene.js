import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {AddCarRoute, CarRoute} from '../routes';
import {COLOR} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import CarListItem from '../components/CarListItem';

export default class HomeScene extends Component {
  render() {
    let {cur} = this.props;
    let showFirstScreen = this.props.cur.value().cars.length === 0;
    if (showFirstScreen) {
      return (
        <LinearGradient 
          colors={[COLOR.LESSBLACK, COLOR.BLACK]} 
          style={styles.containerHello}>
          <Image style={styles.outline} source={require('../images/outline.png')}/>
          <Text style={styles.text}>Add your first car</Text>
          <View style={styles.plusButton}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.handlePlusPress}>
              <Image source={require('../images/plus.png')} style={styles.plus}/>
            </TouchableHighlight>
          </View>
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient 
          colors={[COLOR.LESSBLACK, COLOR.BLACK]} 
          style={styles.containerList}>
          <ScrollView style={styles.scrollView}>
          {cur.value().cars.map((car, key) => {
            return (
              <CarListItem 
                car={car}
                onPress={this.handlePressCarListItem.bind(this, car)}
                key={key}
              />
            );
          })}
          </ScrollView>
        </LinearGradient>
      );
    }
  }

  handlePressCarListItem(car) {
    this.props.cur.refine('selectedCar').set(car);
    this.props.navigator.push(CarRoute);
  }

  handlePlusPress = () => {
    this.props.navigator.push(AddCarRoute);
  }
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  containerHello: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerList: {
    paddingTop: 64,
    flex: 1,
  },
  scrollView: {
    paddingTop: 16,
  },
  outline: {
    marginBottom: 40,
    width: windowWidth / 2,
    resizeMode: 'contain',
  },
  text: {
    position: 'absolute',
    color: COLOR.WHITE,
    fontSize: 22,
    fontWeight: '300',
    left: 0,
    right: 0,
    bottom: 60,
    textAlign: 'center',
  },
  plusButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  plus: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    marginBottom: 40,
  }
});

HomeScene.propTypes = {
  cur: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};