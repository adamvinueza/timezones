const express = require('express');
const localTime = require('./localTime/route');
const convertTime = require('./convertTime/converter');
const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  res.send('Hello, World!');
});

app.use('/local-time', localTime);
app.use('/convert-time', convertTime);

const server = app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

module.exports = server;
