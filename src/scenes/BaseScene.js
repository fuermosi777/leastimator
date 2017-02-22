import React, { Component } from 'react';
import CarSchema from '../models/Car';
import ReadingSchema from '../models/Reading';
import Realm from 'realm';

export default class BaseScene extends Component {
  constructor(props) {
    super(props);
    this.realm = new Realm({schema: [CarSchema, ReadingSchema]});
  }
}