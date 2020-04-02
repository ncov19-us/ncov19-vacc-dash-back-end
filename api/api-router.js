const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(418).json({ message: 'API Router works' });
});

router.get('/totals', (req, res) => {
  const { country } = req.query;
  let vaccines = [0, 0, 0, 0];
  let treatments = [0, 0, 0, 0];
  let alternatives = [0, 0, 0, 0];

  for (let i = 0; i < 4; i++) {
    // Make a database count request for each of these,
    // Query { type: vaccine, phase: i, country: country }
    vaccines[i] = i; // FIXME
    treatments[i] = 2 * i; // FIXME
    alternatives[i] = 3 * i; // FIXME
  }

  res.status(200).json({
    country: country || 'world',
    vaccines,
    treatments,
    alternatives,
  });
});

router.get('/trials', (req, res) => {
  const { type, max, page } = req.query;
  res.status(200).json({
    message: `Checking for page ${page} of ${max} entries for type ${type}`,
    trials: [
      {
        id: 0,
        sponsors: 'nanjing university',
        country: 'china, united states, ireland',
        drug: 'vitamin c',
        phase: 'phase 4',
        type: 'vaccine',
        serial: 'chk004a93lj',
      },
      {
        id: 1,
        sponsors: 'nanjing university',
        country: 'china, united states, ireland',
        drug: 'vitamin c',
        phase: 'phase 4',
        type: 'vaccine',
        serial: 'chk004a93lj',
      },
      {
        id: 2,
        sponsors: 'nanjing university',
        country: 'china, united states, ireland',
        drug: 'vitamin c',
        phase: 'phase 4',
        type: 'vaccine',
        serial: 'chk004a93lj',
      },
      {
        id: 3,
        sponsors: 'nanjing university',
        country: 'china, united states, ireland',
        drug: 'vitamin c',
        phase: 'phase 4',
        type: 'vaccine',
        serial: 'chk004a93lj',
      },
      {
        id: 4,
        sponsors: 'nanjing university',
        country: 'china, united states, ireland',
        drug: 'vitamin c',
        phase: 'phase 4',
        type: 'vaccine',
        serial: 'chk004a93lj',
      },
    ],
  });
});

module.exports = router;
