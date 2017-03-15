import React, { Component,
 PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  LinearGradient,
  Surface,
  Shape,
  Path
} from 'ReactNativeART';
import moment from 'moment';
import {COLOR} from '../constants';
import {findMaxBy} from '../tool';

const ITEM_WIDTH = 60;

export default class MileageChart extends Component {

  static propTypes = {
    months: PropTypes.array.isRequired,
    filteredReadings: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.showChart = true;
  }

  render() {
    let {months, filteredReadings} = this.props;

    // get points
    let monthIndex = 0;
    let filteredReadingIndex = 0;
    let points = [];
    let height = 180;
    let maxValue = findMaxBy(filteredReadings, 'value').value;
    let pointRadius = 4;
    let offset = 0.8;

    while (filteredReadingIndex <= filteredReadings.length - 1) {
      let filteredReading = filteredReadings[filteredReadingIndex];

      while (
        !moment(months[monthIndex]).isSame(moment(filteredReading.date), 'month') && 
        monthIndex <= months.length - 1
      ) {
        monthIndex++;
      }
      points.push({
        x: ITEM_WIDTH * monthIndex,
        y: height - filteredReading.value / maxValue * height * offset
      });
      filteredReadingIndex++;
    }
    
    let width = months.length * ITEM_WIDTH;
    let shapePath;
    let linePath;
    let edgePath;
    let pointPath;

    // draw chart

    if (filteredReadings.length === 1) {
      this.showChart = false;
    } else {
      let i = 0;
      linePath = Path()
        .moveTo(0, points[i].y)
        .lineTo(points[i].x, points[i].y);
      shapePath = Path()
        .moveTo(0, height)
        .lineTo(0, points[i].y)
        .lineTo(points[i].x, points[i].y);

      if (filteredReadings.length === 2) {
        linePath = linePath
          .lineTo(points[i + 1].x, points[i + 1].y);
        shapePath = shapePath
          .lineTo(points[i + 1].x, points[i + 1].y)
          .lineTo(points[i + 1].x, height);
      } else {
        for (i = 1; i < points.length - 2; i++) {
          const p = points[i];
          const q = points[i + 1];
          const xc = (p.x + q.x) / 2;
          const yc = (p.y + q.y) / 2;
          shapePath = shapePath.curveTo(p.x, p.y, xc, yc);
          linePath = linePath.curveTo(p.x, p.y, xc, yc);
        }
      
        shapePath = shapePath.curveTo(
          points[i].x,
          points[i].y,
          points[i + 1].x,
          points[i + 1].y
        )
        .lineTo(points[i + 1].x, points[i + 1].y)
        .lineTo(points[i + 1].x, height)
        .close();

        linePath = linePath.curveTo(
          points[i].x,
          points[i].y,
          points[i + 1].x,
          points[i + 1].y
        );
      }
      edgePath = Path()
        .moveTo(points[i + 1].x, points[i + 1].y)
        .lineTo(points[i + 1].x + 1, points[i + 1].y)
        .lineTo(points[i + 1].x + 1, 0)
        .lineTo(points[i + 1].x, height)
        .close();

      pointPath = Path()
        .moveTo(points[i + 1].x, points[i + 1].y - pointRadius)
        .arcTo(points[i + 1].x, points[i + 1].y + pointRadius, pointRadius, pointRadius)
        .arcTo(points[i + 1].x, points[i + 1].y - pointRadius, pointRadius, pointRadius)
        .close();
    }

    let shapeGradient = new LinearGradient({
      '0': 'rgba(126, 206, 249, 0.50)',
      '1': 'rgba(126, 206, 249, 0.00)'
    },
      `${width / 2}`, '0', `${width / 2}`, `${height}`
    );

    let edgeGradient = new LinearGradient({
      '0': 'rgba(126, 206, 249, 1.00)',
      '1': 'rgba(126, 206, 249, 0.00)'
    },
      `${width / 2}`, '0', `${width / 2}`, `${height}`
    );

    return (
      <ScrollView 
        horizontal={true}
        style={styles.container}>
        <View style={styles.scrollContent}>
          <View style={styles.monthBanner}>
            {months.map((month, key) => {
              return (
                <View key={key} style={styles.monthLabel}>
                  <Text style={styles.monthText}>{moment(month).format('MMM').toUpperCase()}</Text>
                </View>
              );
            })}
          </View>
          {this.showChart ? 
            <Surface width={width} height={height}>
              <Shape fill={shapeGradient} d={shapePath}/>
              <Shape stroke={COLOR.PRIMARY_BLUE} strokeWidth={1.5} d={linePath}/>
              <Shape fill={edgeGradient} d={edgePath}/>
              <Shape fill={COLOR.PRIMARY_BLUE} d={pointPath}/>
            </Surface>
          : 
            null
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    flex: 1,
    flexDirection: 'column'
  },
  monthBanner: {
    flex: 1,
    flexDirection: 'row'
  },
  monthLabel: {
    width: ITEM_WIDTH,
    paddingTop: 15,
    paddingBottom: 20,
  },
  monthText: {
    marginLeft: -15,
    color: COLOR.SECONDARY,
    fontSize: 16,
    fontWeight: '300'
  }
});
