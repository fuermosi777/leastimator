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
import { ifIphoneX } from '../utils/iphonex';

const routeMapper = props => ({
  LeftButton(route, navigator, index, navState) {
    if (route.leftButton) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={route.onLeftButtonPressed}>
          <View style={styles.leftButton}>
            <Image 
              source={route.leftButton.image} 
              style={{width: route.leftButton.width, height: route.leftButton.height}}/>
            </View>
        </TouchableHighlight>
      );
    } else { 
      return null;
    }
  },
  RightButton(route, navigator, index, navState) {
    if (route.rightButton) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={route.onRightButtonPressed}>
          <View style={styles.rightButton}>
            <Image 
              source={route.rightButton.image} 
              style={{width: route.rightButton.width, height: route.rightButton.height}}/>
          </View>
        </TouchableHighlight>
      );
    } else { 
      return null;
    }
  },
  Title(route, navigator, index, navState) {
    return (
      <Text style={styles.title}>
        {route.title}
      </Text>
    );
  }
});

export default class Nav extends Component {
  render() {
    return (
      <Navigator
        initialRoute={HomeRoute()}
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
    return <route.component navigator={navigator} route={route} {...route.passProps} />;
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
    height: 52,
    ...ifIphoneX({
      marginTop: 22,
    }, {
      marginTop: 12,
    })
  },
  title: {
    flex: 1,
    color: COLOR.WHITE,
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'center',
  },
  leftButton: {
    marginLeft: 10,
    width: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightButton: {
    marginRight: 10,
    width: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholder: {
    flex: 1,
  }
});

Nav.propTypes = {
};