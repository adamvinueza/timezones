// Parses the request's query string and extracts the TZ name.
const parseTzQuery = req => {
  return req.query.tz;
};

module.exports = parseTzQuery;
