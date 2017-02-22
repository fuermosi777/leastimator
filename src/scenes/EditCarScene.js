import React, { PropTypes } from 'react';
import {
  View
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';
import AddCarScene from './AddCarScene';

export default class EditCarScene extends AddCarScene {
  
  constructor(props) {
    super(props);

    this.car = this.realm.objectForPrimaryKey('Car', props.carId);  
    props.route.title = `Edit ${this.car.nickname}`;
  }

}

EditCarScene.propTypes = {
  route: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  carId: PropTypes.number.isRequired
};