const moment = require('moment-timezone');

// Returns the local time as an ISO 8601 string in the specified time zone.
const localTime = async tzName => {
  return new moment().format();
};
module.exports = localTime;
