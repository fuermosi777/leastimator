import { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';
import CarSchema from '../models/Car';
import ReadingSchema from '../models/Reading';
import Realm from 'realm';
import { STORAGE_KEY } from '../constants';

export default class BaseScene extends Component {
  constructor(props) {
    super(props);
    this.realm = new Realm({
      schema: [CarSchema, ReadingSchema],
      schemaVersion: 1
    });
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async componentWillMount() {
    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;

    let settings = await AsyncStorage.getItem(STORAGE_KEY.SETTINGS);
    settings = JSON.parse(settings);

    this.setState({
      mileageUnit: settings.mileageUnit,
      currencySymbol: settings.currencySymbol
    });
  }
}