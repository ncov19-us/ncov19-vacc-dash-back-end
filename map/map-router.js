const router = require('express').Router();

const db = require('../data/db-config.js');

router.get('/', async (req, res) => {
  try {
    const vaccines = await db('vaccines').select(
      'countries',
      'country_codes as id'
    );

    const treatments = await db('treatments').select(
      'countries',
      'country_codes as id'
    );

    const alternatives = await db('alternatives').select(
      'countries',
      'country_codes as id'
    );

    let mapValues = new Map();

    vaccines.forEach((trial) => {
      if (mapValues.has(trial.id)) {
        const entry = mapValues.get(trial.id);

        mapValues.set(trial.id, { ...entry, value: entry.value + 1 });
      } else if (trial.id !== null && trial.id.length === 3) {
        // currently: do not count if country is null or multiple
        mapValues.set(trial.id, {
          value: 1,
          country: trial.country,
          id: trial.id,
        });
      }
    });

    treatments.forEach((trial) => {
      if (mapValues.has(trial.id)) {
        const entry = mapValues.get(trial.id);

        mapValues.set(trial.id, { ...entry, value: entry.value + 1 });
      } else if (trial.id !== null && trial.id.length === 3) {
        // currently: do not count if country is null or multiple
        mapValues.set(trial.id, {
          value: 1,
          country: trial.country,
          id: trial.id,
        });
      }
    });

    alternatives.forEach((trial) => {
      if (mapValues.has(trial.id)) {
        const entry = mapValues.get(trial.id);

        mapValues.set(trial.id, { ...entry, value: entry.value + 1 });
      } else if (trial.id !== null && trial.id.length === 3) {
        // currently: do not count if country is null or multiple
        mapValues.set(trial.id, {
          value: 1,
          country: trial.country,
          id: trial.id,
        });
      }
    });

    // Map.keys() returns an Iterator object which can be converted to an Array
    res.status(200).json(Array.from(mapValues.values()));
  } catch ({ message }) {
    res.status(500).json({ error: 'Failed to get trials.', message });
  }
});

module.exports = router;
