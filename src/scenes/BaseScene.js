import { Component } from 'react';
import {
  AsyncStorage,
  Alert,
} from 'react-native';
import CarSchema from '../models/Car';
import ReadingSchema from '../models/Reading';
import Realm from 'realm';
import { STORAGE_KEY, IMPERIAL, USD, OFF } from '../constants';

const defaultSettings = {
  mileageUnit: IMPERIAL,
  currencySymbol: USD,
  notification: OFF
};

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

    let settings;

    try {
      settings = await AsyncStorage.getItem(STORAGE_KEY.SETTINGS);
      if (settings !== null) {
        settings = JSON.parse(settings);
        this.setState({
          mileageUnit: settings.mileageUnit,
          currencySymbol: settings.currencySymbol
        });
      } else {
        await this.setupSettings();
      }
    } catch (err) {
      await this.setupSettings();
    }
  }

  async setupSettings() {
    // Give the app a new set of settings (default)
    try {
      await AsyncStorage.setItem(STORAGE_KEY.SETTINGS, JSON.stringify(defaultSettings));
    } catch (err) {
      Alert.alert('Error', 'There is some problems retrieving user settings');
    }
  }
}