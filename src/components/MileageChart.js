import React, { Component,
 PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Surface,
  Shape,
  Path
} from 'ReactNativeART';

export default class MileageChart extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    readings: PropTypes.object.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
  }

  render() {
    let {width, height, readings, startDate, endDate} = this.props;
    console.log(readings);
    // let i = 0;
    // let path = Path()
    //   .moveTo(0, height)
    //   .lineTo(0, points[i].y)
    //   .lineTo(points[i].x, points[i].y);
    // for(i = 1; i < points.length - 2; i++) {
    //   const p = points[i];
    //   const q = points[i + 1];
    //   const xc = (p.x + q.x) / 2;
    //   const yc = (p.y + q.y) / 2;
    //   path = path.curveTo(p.x, p.y, xc, yc);
    // }
    // path = path.curveTo(
    //   points[i].x,
    //   points[i].y,
    //   points[i + 1].x,
    //   points[i + 1].y
    // ).lineTo(width, points[i + 1].y);
    // const d = path.lineTo(width, height).close();

    return (
      <ScrollView 
        horizontal={true}
        style={styles.container}>
        {/*<Surface width={width} height={height}>
          <Shape fill='rgba(255,255,255,0.5)' d={d}/>
        </Surface>*/}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
