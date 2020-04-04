const router = require('express').Router();
const db = require('../data/model.js');

const mapRouter = require('../map/map-router.js');

router.use('/map', mapRouter);

router.get('/', (req, res) => {
  res.status(418).json({ message: 'API Router works' });
});

router.get('/totals', async (req, res) => {
  const { countries } = req.query;

  try {
    let vaccines = [0, 0, 0, 0, 0];
    let treatments = [ 0, 0, 0, 0, 0];
    let alternatives = [ 0, 0, 0, 0, 0];

    for (let i = 0; i < 5; i++) {
      // Make a database count request for each of these,
      vaccines[i] = await db.getCountPhase('vaccines', countries, i);
      treatments[i] = await db.getCountPhase('treatments', countries, i);
      alternatives[i] = await db.getCountPhase('alternatives', countries, i);
    }

    const totals = {
      countries: countries || 'world', 
      vaccines: vaccines.map(obj => obj.num),
      treatments: treatments.map(obj => obj.num),
      alternatives: alternatives.map(obj => obj.num),
    };

    res.status(200).json(totals);

  } catch ({ message }) {
    res.status(500).json({ error: 'Failed to get totals.', message });
  }
});

router.get('/trials', (req, res) => {
  const { type, countries, max, page } = req.query;

  if (type !== 'vaccines' && type !== 'treatments' && type !== 'alternatives') {
    res.status(400).json({ message: 'No valid trial type specified.' });
  }

  db.findBy(type, countries)
    .then((info) => {
      res.status(200).json(info);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
