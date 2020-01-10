const tzNames = require('moment-timezone').tz.names();

const validate = tzName => {
  return tzNames.includes(tzName);
}

const getErrorMessage = tzName => {
  return `Invalid time zone: ${tzName}`;
};

module.exports = {
  validate,
  getErrorMessage
};
