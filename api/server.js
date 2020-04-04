const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const axios = require('axios');

const server = express();
const apiRouter = require('./api-router.js');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', apiRouter);

server.get('/', (req, res) => {
  res.json({ message: 'nCOV19 Vaccine Dashboard backend is live' });
});

// DEMO of polling an external API
// Logs output to console.
server.get('/axios', (req, res) => {
  axios
    .get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    .then((response) => {
      console.log(response.data.url);
      console.log(response.data.explanation);
    })
    .catch((error) => {
      console.log(error);
    });

  res.status(200).json({ message: 'ET phone home.' });
});

module.exports = server;
