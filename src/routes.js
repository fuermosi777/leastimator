import HomeScene from './scenes/HomeScene';
import SettingScene from './scenes/SettingScene';
import AddCarScene from './scenes/AddCarScene';
import SelectCarIconScene from './scenes/SelectCarIconScene';
import CarScene from './scenes/CarScene';
import EditCarScene from './scenes/EditCarScene';
import AddOdometerReadingScene from './scenes/AddOdometerReadingScene';
import EditOdometerReadingScene from './scenes/EditOdometerReadingScene';
import ReadingListScene from './scenes/ReadingListScene';

const burgerImage = require('./images/burger.png');
const leftArrowImage = require('./images/left_arrow.png');
const closeImage = require('./images/close.png');
const cogImage = require('./images/cog.png');

export function HomeRoute() {
  return {
    component: HomeScene,
    title: 'Leastimator',
    leftButton: {
      image: burgerImage,
      width: 26,
      height: 17
    }
  };
}

export function SettingRoute() {
  return {
    component: SettingScene,
    title: 'Settings',
    leftButton: {
      image: leftArrowImage,
      width: 12,
      height: 20
    }
  };
}

export function AddCarRoute() {
  return {
    component: AddCarScene,
    title: 'Add a car',
    leftButton: {
      image: leftArrowImage,
      width: 12,
      height: 20
    }
  };
}

export function SelectCarIconRoute() {
  return {
    component: SelectCarIconScene,
    title: 'Select car image',
    type: 'Modal',
    leftButton: {
      image: closeImage,
      width: 20,
      height: 20
    }
  };
}

export function CarRoute() {
  return {
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
}

export function EditCarRoute() {
  return {
    component: EditCarScene,
    title: 'Edit',
    type: 'Modal',
    leftButton: {
      image: closeImage,
      width: 20,
      height: 20
    }
  };
}

export function AddOdometerReadingRoute() {
  return {
    component: AddOdometerReadingScene,
    title: 'Add reading',
    type: 'Modal',
    leftButton: {
      image: closeImage,
      width: 20,
      height: 20
    }
  };
}

export function EditOdometerReadingRoute() {
  return {
    component: EditOdometerReadingScene,
    title: 'Edit reading',
    type: 'Modal',
    leftButton: {
      image: closeImage,
      width: 20,
      height: 20
    }
  };
}

export function ReadingListRoute() {
  return {
    component: ReadingListScene,
    title: 'History readings',
    leftButton: {
      image: leftArrowImage,
      width: 12,
      height: 20
    }
  };
}
