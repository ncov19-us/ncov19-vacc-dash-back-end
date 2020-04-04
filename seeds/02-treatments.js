const fs = require('fs');

exports.seed = function (knex) {
  const rawdata = fs.readFileSync('./vaccines.json');
  const trials = JSON.parse(rawdata);

  return knex('treatments')
    .del()
    .then(function () {
      return knex('treatments').insert(trials);
    });
};
