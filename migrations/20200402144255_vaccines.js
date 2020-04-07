exports.up = function (knex) {
  return knex.schema.createTable('vaccines', (tbl) => {
    tbl.increments();
    tbl.string('countries');
    tbl.string('country_codes');
    tbl.string('data_reference');
    tbl.string('data_source');
    tbl.string('enrollment_date');
    tbl.string('intervention');
    tbl.string('intervention_type');
    tbl.string('phase').notNullable();
    tbl.integer('phase_num');
    tbl.string('recruitment_status');
    tbl.string('registration_date');
    tbl.string('registry');
    tbl.string('results_link');
    tbl.string('sponsors').notNullable();
    tbl.string('start_date');
    tbl.string('title').notNullable();
    // tbl.string('drug'); Doesn't exist
    tbl.string('trial_id').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('vaccines');
};
