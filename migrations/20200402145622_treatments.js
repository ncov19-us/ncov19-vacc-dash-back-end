exports.up = function (knex) {
  return knex.schema.createTable('treatments', (tbl) => {
    tbl.increments();
    tbl.string('sponsors').notNullable();
    tbl.string('country').notNullable();
    tbl.string('drug');
    tbl.integer('phase_number').notNullable();
    tbl.string('phase_name').notNullable();
    tbl.string('type').notNullable();
    tbl.string('serial');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('treatments');
};
