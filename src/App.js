import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  StatusBar,
} from 'react-native';
import Nav from './components/Nav';
import {COLOR} from './constants';
import LinearGradient from 'react-native-linear-gradient';

export default class App extends Component {
  render() {
    return (
      <LinearGradient 
        colors={[COLOR.LESSBLACK, COLOR.BLACK]} 
        style={styles.baseView}>
        <StatusBar
          barStyle="light-content"
        />
        <Nav cur={this.props.cur}/>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  baseView: {
    flex: 1,
  }
});

App.propTypes = {
  cur: PropTypes.object.isRequired,
};