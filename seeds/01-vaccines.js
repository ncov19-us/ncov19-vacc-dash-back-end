const treatmentData = require('./vaccines.json');

const chunkSize = 30;

exports.seed = function (knex) {
  return knex('vaccines')
    .del()
    .then(function () {
      // need to batch insert due to large amount of rows
      return knex.batchInsert('vaccines', treatmentData, chunkSize);
    });
};
