import {
  Platform
} from 'react-native';

export const DEFAULT = {
  CAR_ICON_NAME: 'convertible',
  LENGTH_OF_LEASE: 36,
};

export const MAX = {
  LENGTH_OF_LEASE: 72,
  ODOMETER_READING: 1200000,
};

export const COLOR = {
  BLACK: '#000000',
  LESSBLACK: '#3D3A48',
  WHITE: '#FFFFFF',
  PRIMARY: '#FFFFFF',
  SECONDARY: '#67686F',
  DIVIDER: '#373541',
  PRIMARY_BLUE: '#7BCDFB',
  TRANSPARENT: 'transparent',
  WARNING: '#FD6264',
};

export const INPUT_GROUP_TYPE = {
  TEXT: 'text',
  INTEGER: 'integer',
  DATE: 'date',
  FLOAT: 'float',
};

export const CAR_ICON = {
  convertible: {
    icon: require('./images/car_icons/convertible.png'),
  },
  coupe: {
    icon: require('./images/car_icons/coupe.png'),
  },
  hatchback: {
    icon: require('./images/car_icons/hatchback.png'),
  },
  sedan: {
    icon: require('./images/car_icons/sedan.png'),
  },
  campervan: {
    icon: require('./images/car_icons/campervan.png'),
  },
  city: {
    icon: require('./images/car_icons/city.png'),
  },
  luxury: {
    icon: require('./images/car_icons/luxury.png'),
  },
  minibus: {
    icon: require('./images/car_icons/minibus.png'),
  },
  suv: {
    icon: require('./images/car_icons/suv.png'),
  },
  van: {
    icon: require('./images/car_icons/van.png'),
  },
  wagon: {
    icon: require('./images/car_icons/wagon.png'),
  },
  classic: {
    icon: require('./images/car_icons/classic.png'),
  },
  '2012-subaru-forester': {
    icon: require('./images/car_icons/2012-subaru-forester.png'),
  },
  '2015-ford-escape': {
    icon: require('./images/car_icons/2015-ford-escape.png'),
  },
  'kia-forte': {
    icon: require('./images/car_icons/kia-forte.png'),
  },
  'kia-optima': {
    icon: require('./images/car_icons/kia-optima.png'),
  },
  'acura-mdx': {
    icon: require('./images/car_icons/acura-mdx.png'),
  },
  'audi-a4': {
    icon: require('./images/car_icons/audi-a4.png'),
  },
  'audi-a5': {
    icon: require('./images/car_icons/audi-a5.png'),
  },
  'audi-q5': {
    icon: require('./images/car_icons/audi-q5.png'),
  },
  'audi-r8': {
    icon: require('./images/car_icons/audi-r8.png'),
  },
  'bike': {
    icon: require('./images/car_icons/bike.png'),
  },
  'bmw-3-series': {
    icon: require('./images/car_icons/bmw-3-series.png'),
  },
  'bmw-5-series': {
    icon: require('./images/car_icons/bmw-5-series.png'),
  },
  'bmw-i3': {
    icon: require('./images/car_icons/bmw-i3.png'),
  },
  'bmw-i8': {
    icon: require('./images/car_icons/bmw-i8.png'),
  },
  'bmw-x3': {
    icon: require('./images/car_icons/bmw-x3.png'),
  },
  'bmw-x5': {
    icon: require('./images/car_icons/bmw-x5.png'),
  },
  'chevrolet-cruze': {
    icon: require('./images/car_icons/chevrolet-cruze.png'),
  },
  'chevrolet-equinox': {
    icon: require('./images/car_icons/chevrolet-equinox.png'),
  },
  'chevrolet-malibu': {
    icon: require('./images/car_icons/chevrolet-malibu.png'),
  },
  'chevrolet-silverado': {
    icon: require('./images/car_icons/chevrolet-silverado.png'),
  },
  'chrysler-300': {
    icon: require('./images/car_icons/chrysler-300.png'),
  },
  'dodge-challenger': {
    icon: require('./images/car_icons/dodge-challenger.png'),
  },
  'dodge-charger': {
    icon: require('./images/car_icons/dodge-charger.png'),
  },
  'dodge-grand-caravan': {
    icon: require('./images/car_icons/dodge-grand-caravan.png'),
  },
  'f-type-jaguar': {
    icon: require('./images/car_icons/f-type-jaguar.png'),
  },
  'fiat-500': {
    icon: require('./images/car_icons/fiat-500.png'),
  },
  'ford-edge': {
    icon: require('./images/car_icons/ford-edge.png'),
  },
  'ford-explorer': {
    icon: require('./images/car_icons/ford-explorer.png'),
  },
  'ford-f-series': {
    icon: require('./images/car_icons/ford-f-series.png'),
  },
  'ford-focus': {
    icon: require('./images/car_icons/ford-focus.png'),
  },
  'ford-fusion': {
    icon: require('./images/car_icons/ford-fusion.png'),
  },
  'gmc-sierra': {
    icon: require('./images/car_icons/gmc-sierra.png'),
  },
  'honda-accord': {
    icon: require('./images/car_icons/honda-accord.png'),
  },
  'honda-cr-v': {
    icon: require('./images/car_icons/honda-cr-v.png'),
  },
  'hyundai-elantra': {
    icon: require('./images/car_icons/hyundai-elantra.png'),
  },
  'infiniti-q50': {
    icon: require('./images/car_icons/infiniti-q50.png'),
  },
  'infiniti-qx60': {
    icon: require('./images/car_icons/infiniti-qx60.png'),
  },
  'jeep-cherokee': {
    icon: require('./images/car_icons/jeep-cherokee.png'),
  },
  'jeep-compass': {
    icon: require('./images/car_icons/jeep-compass.png'),
  },
  'jeep-grand-cherokee': {
    icon: require('./images/car_icons/jeep-grand-cherokee.png'),
  },
  'jeep-renegade': {
    icon: require('./images/car_icons/jeep-renegade.png'),
  },
  'jeep-wrangler-2': {
    icon: require('./images/car_icons/jeep-wrangler-2.png'),
  },
  'jeep-wrangler': {
    icon: require('./images/car_icons/jeep-wrangler.png'),
  },
  'lexus-es': {
    icon: require('./images/car_icons/lexus-es.png'),
  },
  'lexus-is': {
    icon: require('./images/car_icons/lexus-is.png'),
  },
  'lexus-rx': {
    icon: require('./images/car_icons/lexus-rx.png'),
  },
  'mazda-3': {
    icon: require('./images/car_icons/mazda-3.png'),
  },
  'mazda-6': {
    icon: require('./images/car_icons/mazda-6.png'),
  },
  'mercedes-benz-c-class': {
    icon: require('./images/car_icons/mercedes-benz-c-class.png'),
  },
  'mercedes-benz-gle-class': {
    icon: require('./images/car_icons/mercedes-benz-gle-class.png'),
  },
  'mini-cooper': {
    icon: require('./images/car_icons/mini-cooper.png'),
  },
  'mini-countryman': {
    icon: require('./images/car_icons/mini-countryman.png'),
  },
  'mitsubishi-outlander': {
    icon: require('./images/car_icons/mitsubishi-outlander.png'),
  },
  'nissan-altima': {
    icon: require('./images/car_icons/nissan-altima.png'),
  },
  'nissan-rogue': {
    icon: require('./images/car_icons/nissan-rogue.png'),
  },
  'nissan-sentra': {
    icon: require('./images/car_icons/nissan-sentra.png'),
  },
  'ram-p-u': {
    icon: require('./images/car_icons/ram-p-u.png'),
  },
  'subaru-outback': {
    icon: require('./images/car_icons/subaru-outback.png'),
  },
  'tesla-model-s': {
    icon: require('./images/car_icons/tesla-model-s.png'),
  },
  'toyota-camry': {
    icon: require('./images/car_icons/toyota-camry.png'),
  },
  'toyota-corolla': {
    icon: require('./images/car_icons/toyota-corolla.png'),
  },
  'toyota-highlander': {
    icon: require('./images/car_icons/toyota-highlander.png'),
  },
  'toyota-prius': {
    icon: require('./images/car_icons/toyota-prius.png'),
  },
  'toyota-rav4': {
    icon: require('./images/car_icons/toyota-rav4.png'),
  },
  'toyota-tacoma': {
    icon: require('./images/car_icons/toyota-tacoma.png'),
  },
  'volkswagen-beetle': {
    icon: require('./images/car_icons/volkswagen-beetle.png'),
  },
  'volkswagen-golf': {
    icon: require('./images/car_icons/volkswagen-golf.png'),
  },
  'volkswagen-passat': {
    icon: require('./images/car_icons/volkswagen-passat.png'),
  }
};

export const STORAGE_KEY = {
  SETTINGS: '@Settings:key'
};

export const METRIC = 'metric';
export const IMPERIAL = 'imperial';

export const MILEAGE_UNIT = {
  [METRIC]: {
    name: 'KM',
    word: 'kilometer',
    plural: 'kilometers',
    symbol: 'km'
  },
  [IMPERIAL]: {
    name: 'MI',
    word: 'mile',
    plural: 'miles',
    symbol: 'mi'
  }
};

export const USD = 'usd';
export const GBP = 'gbp';
export const EURO = 'euro';
export const CNY = 'cny';

export const CURRENCY_UNIT = {
  [USD]: '$',
  [GBP]: '£',
  [EURO]: '€',
  [CNY]: '¥'
};

export const DEFAULT_WIDGET_READING = {
  PREDICTED: 'predicted',
  SHOULD_READ: 'should read'
};

export const OFF = 'off';
export const WEEKLY = 'weekly';
export const MONTHLY = 'monthly';

export const NOTIFICATION_TYPES = [OFF, WEEKLY, MONTHLY];

export const RATE_US_URL = Platform.OS === 'ios' ? 'itms-apps://itunes.apple.com/app/id1228501014' : 'https://play.google.com/store/apps/details?id=com.leastimator';
