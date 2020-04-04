/* eslint-disable no-use-before-define */
const db = require('./db-config');

module.exports = {
  findBy,
  getCount,
};

function findBy(table, countries) {
  if (table) {
    if (countries) {
      return db(table).where({ countries });
    }
    return db(table);
  }
  return [];
}

// FIXME: Knex counting doesn't work.
function getCount(table, country) {
  if (table) {
    if (country) {
      // return db(table).where({ country }).count('id');
      return 6;
    }
    // return db(table).select('id').count();
    return 12;
  }
  return 0;
}
