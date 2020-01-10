const moment = require('moment-timezone');
const validator = require('../validator');

// Returns the local time as an ISO 8601 string in the specified time zone.
const localTime = async tzName => {
  const time = moment();
  // Return UTC if no time zone is specified.
  if (!tzName) {
    return time.utc().format();
  }
  if (validator.validate(tzName)) {
    return time.tz(tzName).format()
  }
  return validator.getErrorMessage(tzName);
};

module.exports = localTime;
