/* eslint-disable no-use-before-define */
const db = require('./db-config');

module.exports = {
  findBy,
  getCount,
  getCountPhase,
};

function findBy(table, countries) {
  if (table) {
    if (countries) {
      return db(table).where({ countries });
    }
    return db(table);
  }

  // array of Promises
  let tables = [db('vaccines'), db('treatments'), db('alternatives')];

  if (table === undefined && countries) {
    tables = tables.map((table) => table.where({ countries }));
  }

  return Promise.all(tables).then((res) => {
    const [vaccines, treatments, alternatives] = res;

    return vaccines.concat(treatments).concat(alternatives);
  });
}

function getCount(table, countries) {
  if (table) {
    if (countries) {
      return db(table).where({ countries }).count('*').first();
    }
    return db(table).count('*').first();
  }
  return 0;
}

function getCountPhase(table, countries, phase) {
  if (table) {
    if (countries) {
      if (phase === 0) {
        return db(table)
          .where({ countries: countries })
          .whereNull('phase_num')
          .count('* as num')
          .first();
      }
      return db(table)
        .where({ countries: countries, phase_num: phase })
        .count('* as num')
        .first();
    }
    if (phase === 0) {
      return db(table).whereNull('phase_num').count('* as num').first();
    }
    return db(table).where({ phase_num: phase }).count('* as num').first();
  }
  return 0;
}
