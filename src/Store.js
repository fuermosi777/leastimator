import { Cursor } from 'react-cursor';
import React, { Component } from 'react';
import App from './App';

const TEST_STATE = {
  selectedCar: null,
  cars: [{
    carIconName: 'convertible',
    id: 1485727313282,
    leaseStartDate: '01/26/2016',
    lengthOfLease: '36',
    milesAllowed: '30000',
    nickname: 'My car',
  }, {
    carIconName: 'minibus',
    id: 1485727313283,
    leaseStartDate: '01/26/2016',
    lengthOfLease: '36',
    milesAllowed: '30000',
    nickname: 'My MINI',
  }]
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCar: null,
      cars: [],
    };
    this.state = TEST_STATE;
  }

  render() {
    var cur = Cursor.build(this);
    return <App cur={cur}/>;
  }
}