const express = require('express');
const router = express.Router();
const localTime = require('./localTime');
const parseTzQuery = require('./parseTzQuery');

// Handles calls to get the local time.
router.get('/', (req, res) => {
  const tz = parseTzQuery(req);
  res.send(localTime(tz))
});

module.exports = router;
