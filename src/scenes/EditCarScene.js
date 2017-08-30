import React, { PropTypes } from 'react';
import {
  View
} from 'react-native';
import AddCarScene from './AddCarScene';

export default class EditCarScene extends AddCarScene {
  
  constructor(props) {
    super(props);

    this.car = this.realm.objectForPrimaryKey('Car', props.carId);  
    props.route.title = `Edit ${this.car.nickname}`;
    
    this.isEditing = true;
    this.state = Object.assign(this.state, {
      selectedCarIconName: this.car.carIconName,
      nickname: String(this.car.nickname),
      startingMiles: String(this.car.startingMiles),
      milesAllowed: String(this.car.milesAllowed),
      lengthOfLease: String(this.car.lengthOfLease),
      leaseStartDate: this.car.leaseStartDate,
      fee: String(this.car.fee.toFixed(2)),
    });
  }

}

EditCarScene.propTypes = {
  route: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  carId: PropTypes.number.isRequired
};