const router = require('express').Router();

const db = require('../data/db-config.js');

router.get('/', async (req, res) => {
  try {
    const vaccines = await db('vaccines').select(
      'countries as id',
      'country_codes'
    );

    const treatments = await db('treatments').select(
      'countries as id',
      'country_codes'
    );

    const alternatives = await db('alternatives').select(
      'countries as id',
      'country_codes'
    );

    let mapValues = new Map();

    vaccines.forEach((trial) => {
      trial.id.split(',').forEach((country) => {
        if (mapValues.has(country)) {
          const entry = mapValues.get(country);

          mapValues.set(country, { ...entry, value: entry.value + 1 });
        } else {
          mapValues.set(country, {
            value: 1,
            id: country,
            country_codes: trial.country_codes
          });
        }
      });
    });

    treatments.forEach((trial) => {
      trial.id.split(',').forEach((country) => {
        if (mapValues.has(country)) {
          const entry = mapValues.get(country);

          mapValues.set(country, { ...entry, value: entry.value + 1 });
        } else {
          mapValues.set(country, {
            value: 1,
            id: country,
            country_codes: trial.country_codes
          });
        }
      });
    });

    alternatives.forEach((trial) => {
      trial.id.split(',').forEach((country) => {
        if (mapValues.has(country)) {
          const entry = mapValues.get(country);

          mapValues.set(country, { ...entry, value: entry.value + 1 });
        } else {
          mapValues.set(country, {
            value: 1,
            id: country,
            country_codes: trial.country_codes
          });
        }
      });
    });

    mapValues.delete('no country given');

    const capitalize = word => {
      let words = word.split(' ');
      words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      words = words.join(' ');
      return words;
    };

    // Map.keys() returns an Iterator object which can be converted to an Array
    let data = Array.from(mapValues.values());
    
    data = data.map((country) => {
      country.id = capitalize(country.id);
      return country;
    });


    res.status(200).json(data);
  } catch ({ message }) {
    res.status(500).json({ error: 'Failed to get trials.', message });
  }
});

module.exports = router;
