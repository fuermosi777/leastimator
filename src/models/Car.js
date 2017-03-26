const CarSchema = {
  name: 'Car',
  primaryKey: 'id',
  properties: {
    id: 'int',
    carIconName: 'string',
    nickname: 'string',
    startingMiles: 'int',
    milesAllowed: 'int',
    lengthOfLease: 'int',
    leaseStartDate: 'date',
    readings: {
      type: 'list',
      objectType: 'Reading'
    },
    fee: 'float'
  }
};

export default CarSchema;
