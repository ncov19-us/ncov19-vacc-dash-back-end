const db = require('../data/db-config.js');

// middleware

const pagination = async (req, res, next) => {
  const limit = 20;

  req.page = req.query.page > 0 && req.query.page || 1;

  req.skip = (req.page * limit) - limit;

  const rows = await db('vaccines').count('* as count').first();
  req.count = rows.count;

  next();
};

module.exports = { pagination };