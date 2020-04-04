const fs = require('fs');

exports.seed = function (knex) {
  const rawdata = fs.readFileSync('./alternatives.json');
  const trials = JSON.parse(rawdata);

  return knex('alternatives')
    .del()
    .then(function () {
      return knex('alternatives').insert(trials);
    });
};
