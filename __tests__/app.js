import 'react-native';
import React from 'react';
import App from '../src/app.js';
import {Cursor} from 'react-cursor';

const store = {
  state: {
    cars: []
  }
};

let cur = Cursor.build(store);

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <App cur={cur}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
