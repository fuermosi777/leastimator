import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {AddCarRoute} from '../routes';
import {COLOR} from '../constants';
import LinearGradient from 'react-native-linear-gradient';

export default class HomeScene extends Component {
  render() {
    return (
      <LinearGradient 
        colors={[COLOR.LESSBLACK, COLOR.BLACK]} 
        style={styles.container}>
        <Image style={styles.outline} source={require('../images/outline.png')}/>
        <Text style={styles.text}>Add your first car</Text>
        <View style={styles.plusButton}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={this.handlePlusPress}
          >
            <Image source={require('../images/plus.png')} style={styles.plus}/>
          </TouchableHighlight>
        </View>
      </LinearGradient>
    );
  }

  handlePlusPress = () => {
    this.props.navigator.push(AddCarRoute);
  }

}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    marginBottom: 40,
    width: windowWidth / 2,
    resizeMode: 'contain',
  },
  text: {
    position: 'absolute',
    color: COLOR.WHITE,
    fontSize: 22,
    fontWeight: '300',
    left: 0,
    right: 0,
    bottom: 60,
    textAlign: 'center',
  },
  plusButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  plus: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    marginBottom: 40,
  }
});

HomeScene.propTypes = {
  cur: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};