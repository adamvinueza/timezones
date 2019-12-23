const express = require('express');
const router = express.Router();

// Handles calls to get the specified time in the specified time zone.
router.get('/', (req, res) => {
  const params = parseConvertQuery(req);
  res.send(params.date.toISOString());
});

// Parses the request's query string and extracts the TZ name and datetime.
const parseConvertQuery = req => {
  return {
    date: new Date(Date.now()), 
    tz: "America/Los Angeles"
  };
};

module.exports = router;
