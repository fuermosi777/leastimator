import React, { 
  Component, 
  PropTypes,  
} from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
} from 'react-native';
import {HomeRoute} from '../routes';
import {COLOR} from '../constants';

const routeMapper = props => ({
  LeftButton(route, navigator, index, navState) {
    if (route.leftButton) {
      return (
        <View style={styles.leftButton}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => { route.onLeftButtonPress(navigator); }}>
            <Image 
              source={route.leftButton.image} 
              style={{width: route.leftButton.width, height: route.leftButton.height}}/>
          </TouchableHighlight>
        </View>
      );
    } else { 
      return null;
    }
  },
  RightButton(route, navigator, index, navState) {
    if (route.rightButton) {
      return (
        <View style={styles.rightButton}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => { route.onRightButtonPress(navigator); }}>
            <Image 
              source={route.rightButton.image} 
              style={{width: route.rightButton.width, height: route.rightButton.height}}/>
          </TouchableHighlight>
        </View>
      );
    } else { 
      return null;
    }
  },
  Title(route, navigator, index, navState) {
    return (
      <Text style={styles.title}>
        {(props.cur.value().cars.length !== 0 && route.secondTitle)
          ? route.secondTitle
          : route.title}
      </Text>
    );
  }
});

export default class Nav extends Component {
  render() {
    return (
      <Navigator
        initialRoute={HomeRoute}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.container}
            routeMapper={routeMapper(this.props)}
          />
        }
      />
    );
  }

  renderScene = (route, navigator) => {
    return <route.component cur={this.props.cur} navigator={navigator} {...route.passProps} />;
  }

  configureScene = (route) => {
    if(route.type === 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    height: 52,
  },
  title: {
    flex: 1,
    color: COLOR.WHITE,
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'center',
  },
  leftButton: {
    marginTop: 5,
    marginLeft: 10,
    height: 56,
    alignItems: 'center',
  },
  placeholder: {
    flex: 1,
  }
});

Nav.propTypes = {
  cur: PropTypes.object.isRequired,
};