export const DEFAULT = {
  CAR_ICON_NAME: 'convertible',
  LENGTH_OF_LEASE: 36,
};

export const MAX = {
  LENGTH_OF_LEASE: 48,
  ODOMETER_READING: 1000000,
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

export const OFF = 'off';
export const WEEKLY = 'weekly';
export const MONTHLY = 'monthly';

export const NOTIFICATION_TYPES = [OFF, WEEKLY, MONTHLY];

export const RATE_US_URL = 'itms-apps://itunes.apple.com/app/id1228501014';
