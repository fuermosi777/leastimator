import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import LinearGradientBackground from '../components/LinearGradientBackground';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {COLOR} from '../constants';
import Realm from 'realm';
import CarSchema from '../models/Car';
import ReadingSchema from '../models/Reading';

const CIRCULAR_PROGRESS_LINECAP = 'round';

export default class CarScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.db = new Realm({schema: [CarSchema, ReadingSchema]});
    this.car = this.db.objects('Car').filtered(`id = ${props.carId}`).length;
    console.log(this.car);
  }

  render() {
    return (     
      <LinearGradientBackground
        style={styles.container}>
        <ScrollView>
          <Text style={styles.title}></Text>
          <AnimatedCircularProgress
            size={140}
            width={6}
            fill={75}
            tintColor={COLOR.PRIMARY_BLUE}
            backgroundColor={COLOR.SECONDARY}
            linecap={CIRCULAR_PROGRESS_LINECAP}
            rotation={0} />
        </ScrollView>
      </LinearGradientBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    alignItems: 'center',
    flex: 1
  },
  title: {
    color: COLOR.PRIMARY,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 20,
  }
});