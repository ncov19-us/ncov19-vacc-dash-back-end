const treatmentData = require('./treatments.json');

const chunkSize = 30;

exports.seed = function (knex) {
  return knex('treatments')
    .del()
    .then(function () {
      // need to batch insert due to large amount of rows
      return knex.batchInsert('treatments', treatmentData, chunkSize);
    });
};
