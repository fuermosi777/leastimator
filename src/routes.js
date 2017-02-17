import HomeScene from './scenes/HomeScene';
import SettingScene from './scenes/SettingScene';
import AddCarScene from './scenes/AddCarScene';
import SelectCarIconScene from './scenes/SelectCarIconScene';
import CarScene from './scenes/CarScene';

const burgerImage = require('./images/burger.png');
const leftArrowImage = require('./images/left_arrow.png');
const closeImage = require('./images/close.png');

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

export const AddCarRoute = {
  component: AddCarScene,
  title: 'Add a car',
  leftButton: {
    image: leftArrowImage,
    width: 12,
    height: 20
  },
  onLeftButtonPress: (navigator) => {
    navigator.pop();
  }
};

export const SelectCarIconRoute = {
  component: SelectCarIconScene,
  title: 'Select car image',
  type: 'Modal',
  leftButton: {
    image: closeImage,
    width: 20,
    height: 20
  },
  onLeftButtonPress: (navigator) => {
    navigator.pop();
  },
};

export const CarRoute = {
  component: CarScene,
  title: '',
  leftButton: {
    image: leftArrowImage,
    width: 12,
    height: 20
  },
  onLeftButtonPress: (navigator) => {
    navigator.pop();
  },
};