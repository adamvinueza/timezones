const express = require('express');
const router = express.Router();

// Handles calls to get the specified time in the specified time zone.
router.get('/', async (req, res) => {
  const params = parseConvertQuery(req);
  const result = await convert(params);
  res.send(result);
});

// Converts the specified date into one localized to the specified time zone.
const convert = async p => {
  return p.date.toISOString();
};

// Parses the request's query string and extracts the TZ name and datetime.
const parseConvertQuery = req => {
  return {
    date: new Date(Date.now()), 
    tz: "America/Los Angeles"
  };
};

module.exports = router;
