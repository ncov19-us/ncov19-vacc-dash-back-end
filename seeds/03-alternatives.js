const treatmentData = require('./alternatives.json');

const chunkSize = 30;

exports.seed = function (knex) {
  return knex('alternatives')
    .del()
    .then(function () {
      return knex.batchInsert('alternatives', treatmentData, chunkSize);
    });
};
