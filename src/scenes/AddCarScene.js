import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
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
          <InputGroup label="Nickname" placeholder="My car" type={INPUT_GROUP_TYPE.TEXT}/>
          <InputGroup label="Starting Miles" placeholder="20" type={INPUT_GROUP_TYPE.INTEGER}/>
          <InputGroup label="Miles Allowed" placeholder="30000" type={INPUT_GROUP_TYPE.INTEGER}/>
          <InputGroup label="Length of Lease" placeholder="36" type={INPUT_GROUP_TYPE.INTEGER}/>
          <InputGroup 
            label="Lease Start Date" 
            type={INPUT_GROUP_TYPE.DATE}
            placeholder={todayDate()}
          />
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }

  handleCarIconNameSelected = (selectedCarIconName) => {
    this.setState({selectedCarIconName});
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AddCarScene.propTypes = {
  cur: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};