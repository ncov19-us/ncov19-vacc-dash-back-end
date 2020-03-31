const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const server = express();
const apiRouter = require('./api-router.js');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', apiRouter);

server.get('/', (req, res) => {
  res.json({ message: "ncov19 vaccine dashboard backend is live" });
});

module.exports = server;