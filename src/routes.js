import HomeScene from './scenes/HomeScene';
import SettingScene from './scenes/SettingScene';
import AddCarScene from './scenes/AddCarScene';
import SelectCarIconScene from './scenes/SelectCarIconScene';
import CarScene from './scenes/CarScene';
import EditCarScene from './scenes/EditCarScene';
import AddOdometerReadingScene from './scenes/AddOdometerReadingScene';

const burgerImage = require('./images/burger.png');
const leftArrowImage = require('./images/left_arrow.png');
const closeImage = require('./images/close.png');
const cogImage = require('./images/cog.png');

export const HomeRoute = {
  component: HomeScene,
  title: 'Leastimator',
  leftButton: {
    image: burgerImage,
    width: 26,
    height: 17
  }
};

export const SettingRoute = {
  component: SettingScene,
  title: 'Settings',
  leftButton: {
    image: leftArrowImage,
    width: 12,
    height: 20
  }
};

export const AddCarRoute = {
  component: AddCarScene,
  title: 'Add a car',
  leftButton: {
    image: leftArrowImage,
    width: 12,
    height: 20
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
  }
};

export const CarRoute = {
  component: CarScene,
  title: '',
  leftButton: {
    image: leftArrowImage,
    width: 12,
    height: 20
  },
  rightButton: {
    image: cogImage,
    width: 20,
    height: 20
  }
};

export const EditCarRoute = {
  component: EditCarScene,
  title: 'Edit',
  type: 'Modal',
  leftButton: {
    image: closeImage,
    width: 20,
    height: 20
  }
};

export const AddOdometerReadingRoute = {
  component: AddOdometerReadingScene,
  title: 'Add a reading',
  type: 'Modal',
  leftButton: {
    image: closeImage,
    width: 20,
    height: 20
  }
};
