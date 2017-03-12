import React, { Component,
 PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  LinearGradient,
  Surface,
  Shape,
  Path,
  Line
} from 'ReactNativeART';
import moment from 'moment';

export default class MileageChart extends Component {
  static propTypes = {
    milesAllowed: PropTypes.number.isRequired,
    readings: PropTypes.array.isRequired,
    startingMiles: PropTypes.number.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
  }

  render() {
    let {milesAllowed, startingMiles, readings, startDate, endDate} = this.props;

    // make months
    let months = [];
    let date = startDate;
    while (!moment(date).isSame(endDate)) {
      months.push(date);
      date = moment(date).add(1, 'M').toDate();
    }
    // filter readings
    // add starting as the first one
    let filteredReadings = [{
      date: startDate,
      value: startingMiles
    }];
    let readingIndex = 0;

    while (readingIndex <= readings.length - 1) {
      let reading = readings[readingIndex];
      let filteredReadingTop = filteredReadings.pop();

      if (!moment(reading.date).isSame(moment(filteredReadingTop.date), 'month')) {
        filteredReadings.push(filteredReadingTop);
      }
      filteredReadings.push(reading);

      readingIndex++;
    }

    // get points
    let monthIndex = 0;
    let filteredReadingIndex = 0;
    let points = [];
    let height = 200;
    let maxValue = filteredReadings[filteredReadings.length - 1].value;

    while (filteredReadingIndex <= filteredReadings.length - 1) {
      let filteredReading = filteredReadings[filteredReadingIndex];

      while (
        !moment(months[monthIndex]).isSame(moment(filteredReading.date), 'month') && 
        monthIndex <= months.length - 1
      ) {
        monthIndex++;
      }
      points.push({
        x: 100 * monthIndex,
        y: height - filteredReading.value / maxValue * height
      });
      filteredReadingIndex++;
    }

    
    let width = months.length * 100;

    // draw chart
    let i = 0;
    let linePath = Path()
      .moveTo(0, points[i].y)
      .lineTo(points[i].x, points[i].y);
    let path = Path()
      .moveTo(0, height)
      .lineTo(0, points[i].y)
      .lineTo(points[i].x, points[i].y);
    if (filteredReadings.length === 2) {
      path = path
        .lineTo(points[i + 1].x, points[i + 1].y)
        .lineTo(points[i + 1].x, height);
    } else {
      for (i = 1; i < points.length - 2; i++) {
        const p = points[i];
        const q = points[i + 1];
        const xc = (p.x + q.x) / 2;
        const yc = (p.y + q.y) / 2;
        path = path.curveTo(p.x, p.y, xc, yc);
        linePath = linePath.curveTo(p.x, p.y, xc, yc);
      }
    
      path = path.curveTo(
        points[i].x,
        points[i].y,
        points[i + 1].x,
        points[i + 1].y
      ).lineTo(points[i + 1].x, height)
      .lineTo(width, height)
      .close();

      linePath = linePath.curveTo(
        points[i].x,
        points[i].y,
        points[i + 1].x,
        points[i + 1].y
      );

    }

    var linearGradient = new LinearGradient({
      '0': 'rgba(255, 255, 255, 0.3)', // blue in 1% position
      '1': 'rgba(255, 255, 255, 0)' // opacity white in 100% position
    },
      '0', '0', '0', `400`
    );

    return (
      <ScrollView 
        horizontal={true}
        style={styles.container}>
        <Surface width={width} height={height}>
          <Shape fill={linearGradient} d={path}/>
          <Shape stroke='white' d={linePath}/>
        </Surface>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
