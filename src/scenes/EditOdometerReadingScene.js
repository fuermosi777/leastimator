import PropTypes from 'prop-types';
import AddOdometerReadingScene from './AddOdometerReadingScene';

export default class EditOdometerReadingScene extends AddOdometerReadingScene {
  
  constructor(props) {
    super(props);

    this.reading = this.realm.objectForPrimaryKey('Reading', props.readingId);  
    this.isEditing = true;
    this.state = Object.assign(this.state, {
      readingDate: this.reading.date,
      odometerReading: String(this.reading.value),
    });
  }

}

EditOdometerReadingScene.propTypes = {
  route: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  readingId: PropTypes.number.isRequired,
  carId: PropTypes.number.isRequired,
};