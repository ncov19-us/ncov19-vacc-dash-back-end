const router = require('express').Router();
const db = require('../data/model.js');
const { pagination } = require('../utils/helpers.js');

const mapRouter = require('../map/map-router.js');

router.use('/map', mapRouter);

router.get('/', (req, res) => {
  res.status(418).json({ message: 'API Router works' });
});

router.get('/totals', async (req, res) => {
  const { countries } = req.query;

  try {
    let vaccines = [0, 0, 0, 0, 0];
    let treatments = [0, 0, 0, 0, 0];
    let alternatives = [0, 0, 0, 0, 0];

    for (let i = 0; i < 5; i++) {
      // Make a database count request for each of these,
      vaccines[i] = await db.getCountPhase('vaccines', countries, i);
      treatments[i] = await db.getCountPhase('treatments', countries, i);
      alternatives[i] = await db.getCountPhase('alternatives', countries, i);
    }

    const totals = {
      countries: countries || 'world',
      vaccines: vaccines.map((obj) => obj.num),
      treatments: treatments.map((obj) => obj.num),
      alternatives: alternatives.map((obj) => obj.num),
    };

    res.status(200).json(totals);
  } catch ({ message }) {
    res.status(500).json({ error: 'Failed to get totals.', message });
  }
});

// GET /api/trials
//   Required queries: type=[vaccines|treatments|alternatives]
//   Optional queries: countries=[country_name]
//   Optional pagination: page=x & limit=y
router.get('/trials', (req, res) => {
  const { type, countries } = req.query;
  const page = parseInt(req.query.page, 10);
  const limit = parseInt(req.query.limit, 10);

  if (type !== 'vaccines' && type !== 'treatments' && type !== 'alternatives') {
    res.status(400).json({ message: 'No valid trial type specified.' });
  }

  db.findBy(type, countries)
    .then((info) => {
      const results = {};

      if (limit > 0 && page > 0) {
        // Apply pagination. Find start and end indices.
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        // Create a "previous" object, if available
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit,
          };
        }
        // Create a "next" object, if available
        if (endIndex < info.length) {
          results.next = {
            page: page + 1,
            limit,
          };
        }
        // Extract the requested section of the results
        results.results = info.slice(startIndex, endIndex);
      } else {
        // No pagination. Send all the results.
        results.results = info;
      }
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});
*/

router.get('/trials', pagination, async (req, res) => {
  const { type, countries, page } = req.query;

  try {
    if (type === undefined) {
      console.log('page is', req.page, 'offset is', req.skip);
      console.log('count is', req.count);

      const vaccines = await db.findBy('vaccines', countries);
      res.status(200).json({ results: vaccines });
    } else if (
      type !== 'vaccines' &&
      type !== 'treatments' &&
      type !== 'alternatives'
    ) {
      res.status(400).json({ message: 'No valid trial type specified.' });
    } else {
      db.findBy(type, countries)
        .then((info) => {
          res.status(200).json(info);
        })
    }
  } catch ({ message }) {
    res.status(500).json({ error: 'Failed to get trials.', message });
  }
});

module.exports = router;
