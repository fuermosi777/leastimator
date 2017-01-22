import HomeScene from './scenes/HomeScene';
import SettingScene from './scenes/SettingScene';

const burgerImage = require('./images/burger.png');
const leftArrowImage = require('./images/left_arrow.png');

export const HomeRoute = {
  component: HomeScene,
  title: 'Leastimator',
  leftButton: {
    image: burgerImage,
    width: 26,
    height: 17
  },
  onLeftButtonPress: (navigator) => {
    navigator.push(SettingRoute);
  }
};

export const SettingRoute = {
  component: SettingScene,
  title: 'Settings',
  leftButton: {
    image: leftArrowImage,
    width: 12,
    height: 20
  },
  onLeftButtonPress: (navigator) => {
    navigator.pop();
  }
};