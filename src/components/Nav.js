import { StackNavigator } from 'react-navigation';

import HomeScene from '../scenes/HomeScene';
import SettingScene from '../scenes/SettingScene';
import AddCarScene from '../scenes/AddCarScene';
import SelectCarIconScene from '../scenes/SelectCarIconScene';
import CarScene from '../scenes/CarScene';
import EditCarScene from '../scenes/EditCarScene';
import AddOdometerReadingScene from '../scenes/AddOdometerReadingScene';
import EditOdometerReadingScene from '../scenes/EditOdometerReadingScene';
import ReadingListScene from '../scenes/ReadingListScene';

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScene
  },
  Setting: {
    screen: SettingScene
  },
  AddCar: {
    screen: AddCarScene
  },
  SelectCarIcon: {
    screen: SelectCarIconScene
  },
  Car: {
    screen: CarScene
  },
  EditCar: {
    screen: EditCarScene
  },
  AddOdometerReading: {
    screen: AddOdometerReadingScene
  },
  EditOdometerReading: {
    screen: EditOdometerReadingScene
  },
  ReadingList: {
    screen: ReadingListScene
  }
}, {
  headerMode: 'float'
});

export default RootNavigator;
