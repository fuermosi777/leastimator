import 'react-native';
import React from 'react';
import HomeScene from '../../src/scenes/HomeScene.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let navigator = {
  push(route) {
    
  }
};

it('renders correctly', () => {
  const tree = renderer.create(
    <HomeScene navigator={navigator}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
