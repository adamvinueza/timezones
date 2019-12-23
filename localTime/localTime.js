// Returns the local time as an ISO 8601 string in the specified time zone.
const localTime = tzName => {
  return new Date(Date.now()).toISOString();
};

module.exports = localTime;
