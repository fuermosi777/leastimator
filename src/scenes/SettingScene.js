import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';
import ListSwitchItem from '../components/ListSwitchItem';
import Divider from '../components/Divider';

export default class SettingScene extends Component {
  constructor(props) {
    super(props);
  }
  
  async componentWillMount() {
    this.props.route.onLeftButtonPressed = this.handleLeftButtonPressed;
    try {
      let settings = await this.getSettings();
    } catch (err) {

    }
  }

  async getSettings() {
    let settings;

    try {
      settings = AsyncStorage.getItem('@settings');
    } catch (err) {
    }
  }

  render() {
    return (
      <LinearGradientBackground style={styles.container}>
        <ListSwitchItem 
          text='Mileage Unit'
          switchItems={['MI', 'KM']}
          onSwitchChange={() => {}}
          selectedItems={[]}
        />
        <Divider/>
      </LinearGradientBackground>
    );
  }

  handleLeftButtonPressed = () => {
    this.props.navigator.pop();
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
