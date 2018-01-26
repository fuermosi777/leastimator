import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {COLOR} from '../constants';

export default class InfoPane extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    label2: PropTypes.string,
    value2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    unit: PropTypes.string.isRequired,
  };

  static defaultProps = {
    label2: '',
    value2: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      showOrigin: true
    };
  }

  handlePress = () => {
    if (!this.props.label2 && !this.props.value2) return;
    this.setState({showOrigin: !this.state.showOrigin});
  }

  render() {
    const { showOrigin } = this.state;
    const { label, label2, value, value2} = this.props;
    const labelDisplay = showOrigin ? label : label2;
    const valueDisplay = showOrigin ? value : value2;
    return (
      <TouchableOpacity onPress={this.handlePress} style={styles.container}>
        <View>
          <Text style={styles.label}>{labelDisplay}</Text>
          <View style={styles.data}>
            <Text style={styles.value}>{String(valueDisplay)}</Text>
            <Text style={styles.unit}>{this.props.unit}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  label: {
    color: COLOR.SECONDARY,
    fontSize: 18,
    marginBottom: 15,
  },
  data: {
    flexDirection: 'row',
  },
  value: {
    color: COLOR.PRIMARY,
    fontSize: 22,
  },
  unit: {
    color: COLOR.SECONDARY,
    fontSize: 18,
    marginLeft: 5,
    marginTop: 5,
  }
});