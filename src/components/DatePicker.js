import React, { Component, PropTypes } from 'react';
import { 
  DatePickerIOS, 
  Text, 
  TouchableOpacity, 
  View,
  StyleSheet,
} from 'react-native';
import AnimatedModal from 'react-native-modal';
import {COLOR} from '../constants';

export default class DatePicker extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    isVisible: PropTypes.bool,
    maximumDate: PropTypes.instanceOf(Date),
    minimumDate: PropTypes.instanceOf(Date),
  };

  static defaultProps = {
    date: new Date(),
    mode: 'date',
    isVisible: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  handleDateChange = (date) => {
    this.setState({date: date});
  }

  render() {
    const {
      onCancel,
      isVisible,
      mode,
      title,
    } = this.props;

    const titleContainer = (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
    const confirmButton = (
      <View style={styles.confirmButton}>
        <Text style={styles.confirmText}>Confirm</Text>
      </View>
    );
    const cancelButton = (
      <View style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel</Text>
      </View>
    );
    return (
      <AnimatedModal isVisible={isVisible} style={styles.contentContainer}>
        <View style={styles.datepickerContainer}>
          {titleContainer}
          <DatePickerIOS
            date={this.state.date}
            mode={mode}
            maximumDate={this.props.maximumDate}
            minimumDate={this.props.minimumDate}
            onDateChange={this.handleDateChange}
          />
          <TouchableOpacity onPress={() => this.props.onConfirm(this.state.date)}>
            {confirmButton}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          {cancelButton}
        </TouchableOpacity>
      </AnimatedModal>
    );
  }
}

const BORDER_RADIUS = 10;
const BACKGROUND_COLOR = COLOR.WHITE;
const BORDER_COLOR = '#D5D5D5';
const TITLE_FONT_SIZE = 18;
const TITLE_COLOR = COLOR.BLACK;
const BUTTON_FONT_SIZE = 22;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-end',
  },
  datepickerContainer: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS,
    marginBottom: 20,
  },
  titleContainer: {
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 12,
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    color: TITLE_COLOR,
    fontSize: TITLE_FONT_SIZE,
  },
  confirmButton: {
    borderColor: BORDER_COLOR,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent',
  },
  confirmText: {
    textAlign: 'center',
    color: COLOR.PRIMARY_BLUE,
    fontSize: BUTTON_FONT_SIZE,
    backgroundColor: 'transparent',
    padding: 10,
  },
  cancelButton: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS,
  },
  cancelText: {
    padding: 10,
    textAlign: 'center',
    color: COLOR.WARNING,
    fontSize: BUTTON_FONT_SIZE,
    backgroundColor: 'transparent',
  },
});