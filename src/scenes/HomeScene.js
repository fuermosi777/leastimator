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
import CarListItem from '../components/CarListItem';
import LinearGradientBackground from '../components/LinearGradientBackground';
import Realm from 'realm';
import CarSchema from '../models/Car';
import ReadingSchema from '../models/Reading';
import {SettingRoute} from '../routes';

export default class HomeScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.db = new Realm({schema: [CarSchema, ReadingSchema]});
  }

  componentWillMount() {
    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;
  }

  render() {
    let cars = this.db.objects('Car');
    let showFirstScreen = cars.length === 0;

    if (showFirstScreen) {
      return (
        <LinearGradientBackground
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
        </LinearGradientBackground>
      );
    } else {
      return (
        <LinearGradientBackground
          style={styles.containerList}>
          <ScrollView style={styles.scrollView}>
          {cars.map((car, key) => {
            return (
              <CarListItem 
                car={car}
                onPress={this.handlePressCarListItem.bind(this, car)}
                key={key}
              />
            );
          })}
          </ScrollView>
        </LinearGradientBackground>
      );
    }
  }

  handleLeftButtonPressed = () => {
    this.props.navigator.push(SettingRoute);
  }

  handlePressCarListItem(car) {
    this.props.navigator.push(Object.assign(CarRoute, {
      passProps: {
        carId: car.id
      }
    }));
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
  navigator: PropTypes.object.isRequired,
};