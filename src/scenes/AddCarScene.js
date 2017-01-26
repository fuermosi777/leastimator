import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR, INPUT_GROUP_TYPE} from '../constants';
import SelectCarIcon from '../components/SelectCarIcon';
import {SelectCarIconRoute} from '../routes';
import InputGroup from '../components/InputGroup';
import {todayDate} from '../tool';

const DEFAULT_CAR_ICON_NAME = 'convertible';

export default class AddCarScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCarIconName: DEFAULT_CAR_ICON_NAME,
      showDatePicker: false,
      inputs: [{
        name: 'nickname',
        value: '',
        label: 'Nickname',
        placeholder: 'My car',
        type: INPUT_GROUP_TYPE.TEXT,
      }, {
        name: 'startingMiles',
        value: '',
        label: 'Starting Miles',
        placeholder: '20',
        type: INPUT_GROUP_TYPE.INTEGER,
      }, {
        name: 'milesAllowed',
        value: '',
        label: 'Miles Allowed',
        placeholder: '30000',
        type: INPUT_GROUP_TYPE.INTEGER,
      }, {
        name: 'lengthOfLease',
        value: '',
        label: 'Length of Lease',
        placeholder: '36',
        type: INPUT_GROUP_TYPE.INTEGER,
      }, {
        name: 'leaseStartDate',
        value: '',
        label: 'Lease Start Date',
        placeholder: todayDate(),
        type: INPUT_GROUP_TYPE.DATE,
      }]
    };
  }

  render() {
    return (
      <LinearGradient 
        colors={[COLOR.LESSBLACK, COLOR.BLACK]} 
        style={styles.container}>
        <KeyboardAvoidingView behavior="position"
        >
          <SelectCarIcon
            carIconName={this.state.selectedCarIconName}
            onIconPress={() => {this.props.navigator.push(Object.assign(SelectCarIconRoute, {
              passProps: {
                onCarIconPress: this.handleCarIconNameSelected,
              }
            }));}}
          />
          {this.state.inputs.map((item, key) => {
            return (
              <InputGroup 
                key={key}
                value={item.value} 
                label={item.label}
                placeholder={item.placeholder} 
                type={item.type}
                onChangeText={this.handleInputTextChange.bind(this, key)}
              />
            );
          })}
        </KeyboardAvoidingView>
        <View style={styles.save}>
          <TouchableHighlight
            onPress={this.handleSavePress}
          >
            <Text style={styles.text}>SAVE</Text>
          </TouchableHighlight>
        </View>
      </LinearGradient>
    );
  }

  handleCarIconNameSelected = (selectedCarIconName) => {
    this.setState({selectedCarIconName});
  }

  handleInputTextChange = (key, text) => {
    let state = this.state;
    state.inputs[key].value = text;
  }

  handleSavePress = () => {
    // TODO
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  save: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60,
  },
  text: {
    textAlign: 'center',
    color: COLOR.WHITE,
    fontSize: 16,
    fontWeight: '300',
  }
});

AddCarScene.propTypes = {
  cur: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};