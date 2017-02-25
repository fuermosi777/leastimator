import moment from 'moment';

export default {
  validate(value, valueName, ...rules) {
    try {
      for (let rule of rules) {
        rule(value);
      }
    } catch(err) {
      throw new Error(`${valueName} ${err.message}`);
    }
  }
};

export function isNotEmpty(value) {
  if (!value) {
    throw new Error('is empty');
  }
}

export function isString(value) {
  if (typeof value !== 'string') {
    throw new Error('is not a string');
  }
}

export function isInteger(value) {
  if (!Number.isInteger(value)) {
    throw new Error('is not a number');
  }
}

export function isDate(value) {
  if (!(value instanceof Date)) {
    throw new Error('is not a date');
  }
}

export function isLengthLessOrEqualThan(limit) {
  return value => {
    if (value.length > limit) {
      throw new Error('is too long');
    }
  };
}

export function isLessOrEqualThan(limit) {
  return value => {
    if (value > limit) {
      throw new Error('is too large');
    }
  };
}

export function isPastDate(value) {
  let today = moment();

  if (value > today) {
    throw new Error('is not a past date');
  }
}