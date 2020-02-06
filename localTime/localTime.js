const moment = require('moment-timezone');

// Returns the local time as an ISO 8601 string in the specified time zone.
const localTime = async tzName => {
  if (!tzName) {
    return new moment().utc().format();
  }
  return new moment().tz(tzName).format();
};
module.exports = localTime;
