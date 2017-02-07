import {uuid} from '../tool';

let Car = {};

export default Car;

Car.create = (properties) => {
  return {
    id: uuid(),
    carIconName: properties.carIconName,
    nickname: properties.nickname,
    startingMiles: properties.startingMiles,
    milesAllowed: properties.milesAllowed,
    lengthOfLease: properties.lengthOfLease,
    leaseStartDate: properties.leaseStartDate,
    readings: [],
  };
};