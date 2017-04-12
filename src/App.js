import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  StatusBar,
  AsyncStorage,
  Alert,
} from 'react-native';
import Nav from './components/Nav';
import {COLOR} from './constants';
import LinearGradient from 'react-native-linear-gradient';
import { STORAGE_KEY, IMPERIAL, USD, OFF } from './constants';

const defaultSettings = {
  mileageUnit: IMPERIAL,
  currencySymbol: USD,
  notification: OFF
};

export default class App extends Component {

  async componentWillMount() {
    await this.initSettings();
  }

  async initSettings() {
    let settings;

    try {
      settings = await AsyncStorage.getItem(STORAGE_KEY.SETTINGS);
      if (settings !== null) {
        settings = JSON.parse(settings);
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
      Alert.alert('Error', 'There is some proble retrieving user settings');
    }
  }

  render() {
    return (
      <LinearGradient 
        colors={[COLOR.LESSBLACK, COLOR.BLACK]} 
        style={styles.baseView}>
        <StatusBar
          barStyle="light-content"
        />
        <Nav/>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  baseView: {
    flex: 1,
  }
});
