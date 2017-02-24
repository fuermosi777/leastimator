import React, { Component, PropTypes } from 'react';
import { 
  DatePickerIOS, 
  Text, 
  TouchableOpacity, 
  View,
  StyleSheet,
} from 'react-native';
import AnimatedModal from 'react-native-animated-modal';

export default class DatePicker extends Component {
  static propTypes = {
    cancelTextIOS: PropTypes.string,
    confirmTextIOS: PropTypes.string,
    customCancelButtonIOS: PropTypes.node,
    customConfirmButtonIOS: PropTypes.node,
    customTitleContainerIOS: PropTypes.node,
    datePickerContainerStyleIOS: View.propTypes.style,
    date: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string,
    isVisible: PropTypes.bool,
  };

  static defaultProps = {
    cancelTextIOS: 'Cancel',
    confirmTextIOS: 'Confirm',
    date: new Date(),
    mode: 'date',
    title: 'Pick a date',
    isVisible: false,
  };

  state = {
    date: this.props.date,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.setState({
        date: nextProps.date,
      });
    }
  }

  _handleConfirm = () => this.props.onConfirm(this.state.date);

  _handleDateChange = date => this.setState({ date });

  render() {
    const {
      onCancel,
      isVisible,
      mode,
      title,
      confirmTextIOS,
      cancelTextIOS,
      customCancelButtonIOS,
      customConfirmButtonIOS,
      customTitleContainerIOS,
      datePickerContainerStyleIOS,
      ...otherProps
    } = this.props;

    const titleContainer = (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
    const confirmButton = (
      <View style={styles.confirmButton}>
        <Text style={styles.confirmText}>{confirmTextIOS}</Text>
      </View>
    );
    const cancelButton = (
      <View style={styles.cancelButton}>
        <Text style={styles.cancelText}>{cancelTextIOS}</Text>
      </View>
    );
    return (
      <AnimatedModal isVisible={isVisible} style={styles.contentContainer}>
        <View style={[styles.datepickerContainer, datePickerContainerStyleIOS]}>
          {customTitleContainerIOS || titleContainer}
          <DatePickerIOS
            date={this.state.date}
            mode={mode}
            onDateChange={this._handleDateChange}
            {...otherProps}
          />
          <TouchableOpacity onPress={this._handleConfirm}>
            {customConfirmButtonIOS || confirmButton}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          {customCancelButtonIOS || cancelButton}
        </TouchableOpacity>
      </AnimatedModal>
    );
  }
}

const BORDER_RADIUS = 14;
const BACKGROUND_COLOR = 'white';
const BORDER_COLOR = '#d5d5d5';
const TITLE_FONT_SIZE = 18;
const TITLE_COLOR = 'black';
const BUTTON_FONT_WEIGHT = 'normal';
const BUTTON_FONT_COLOR = '#007ff9';
const BUTTON_FONT_SIZE = 24;

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
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: BUTTON_FONT_WEIGHT,
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
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
});