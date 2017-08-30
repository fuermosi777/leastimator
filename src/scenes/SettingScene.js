import React, { PropTypes } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Linking,
} from 'react-native';
import BaseScene from './BaseScene';
import LinearGradientBackground from '../components/LinearGradientBackground';
import ListSwitchItem from '../components/ListSwitchItem';
import ListItem from '../components/ListItem';
import Divider from '../components/Divider';
import { 
  STORAGE_KEY,
  METRIC,
  IMPERIAL,
  USD,
  GBP,
  EURO,
  CNY,
  MILEAGE_UNIT,
  CURRENCY_UNIT,
  OFF,
  RATE_US_URL,
} from '../constants';
import SwitchItem from '../class/SwitchItem';

const mileageUnitSwitchItems = [
  new SwitchItem(METRIC, MILEAGE_UNIT[METRIC].name),
  new SwitchItem(IMPERIAL, MILEAGE_UNIT[IMPERIAL].name)
];

const currencyUnitSwitchItems = [
  new SwitchItem(USD, CURRENCY_UNIT[USD]),
  new SwitchItem(GBP, CURRENCY_UNIT[GBP]),
  new SwitchItem(EURO, CURRENCY_UNIT[EURO]),
  new SwitchItem(CNY, CURRENCY_UNIT[CNY])
];

export default class SettingScene extends BaseScene {
  constructor(props) {
    super(props);
    this.state = {
      mileageUnit: IMPERIAL,
      currencySymbol: USD,
      notification: OFF
    };
  }

  render() {
    return (
      <LinearGradientBackground style={styles.container}>
        <ListSwitchItem 
          text='Mileage Unit'
          switchItems={mileageUnitSwitchItems}
          onSwitchChange={this.handleMileageUnitChange.bind(this)}
          selectedItemName={this.state.mileageUnit}
        />
        <Divider/>
        <ListSwitchItem 
          text='Currency Symbol'
          switchItems={currencyUnitSwitchItems}
          onSwitchChange={this.handleCurrencySymbolChange.bind(this)}
          selectedItemName={this.state.currencySymbol}
        />
        <Divider/>
        <ListItem
          onPress={this.handleReviewPressed}
          text='Rate Leastimator'
        />
        <Divider/>
        <ListItem
          onPress={this.handleSupportPressed}
          text='Support'
        />
        <Divider/>
      </LinearGradientBackground>
    );
  }

  handleReviewPressed = () => {
    Linking.openURL(RATE_US_URL).catch((/* err */) => {});
  }

  handleSupportPressed = () => {
    Linking.openURL('mailto:liuhao1990@gmail.com?subject=Need%20Help').catch((/* err */) => {});
  }

  handleLeftButtonPressed = () => {
    this.props.navigator.pop();
  }

  async handleMileageUnitChange(name) {
    await this.setStateAsync({mileageUnit: name});
    await AsyncStorage.setItem(STORAGE_KEY.SETTINGS, JSON.stringify(this.state));
  }

  async handleCurrencySymbolChange(name) {
    await this.setStateAsync({currencySymbol: name});
    await AsyncStorage.setItem(STORAGE_KEY.SETTINGS, JSON.stringify(this.state));
  }
}

SettingScene.propTypes = {
  navigator: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 64 + 20,
    flex: 1
  },
});
