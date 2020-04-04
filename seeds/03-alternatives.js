exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('alternatives')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('alternatives').insert([
        {
          id: 1,
          sponsors: 'nanjing university',
          country: 'china',
          drug: 'vitamin c',
          phase_number: 0,
          phase_name: 'Pre-clinical',
          type: 'vaccine',
          serial: 'chk004a93lj',
        },
        {
          id: 2,
          sponsors: 'ucla medical center',
          country: 'united states',
          drug: 'sodium panthenol',
          phase_number: 2,
          phase_name: 'Phase 2',
          type: 'vaccine',
          serial: 'chk004a93lj',
        },
        {
          id: 3,
          sponsors: 'Lambda Med School',
          country: 'china, united states, ireland',
          drug: 'Truth Serum',
          phase_number: 5,
          phase_name: 'Complete',
          type: 'vaccine',
          serial: 'chk004a93lj',
        },
      ]);
    });
};
