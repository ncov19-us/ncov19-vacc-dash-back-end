const fs = require('fs');

exports.seed = function (knex) {
  const rawdata = fs.readFileSync('./vaccines.json');
  const trials = JSON.parse(rawdata);

  return knex('vaccines')
    .del()
    .then(function () {
      return knex('vaccines').insert(trials);
    });
};
