const express = require('express');
const router = express.Router();
const localTime = require('./localTime');
const parseTzQuery = require('./parseTzQuery');

// Handles calls to get the local time.
router.get('/', async (req, res) => {
  const tz = parseTzQuery(req);
  const local = await localTime(tz);
  res.send(local);
});

module.exports = router;
