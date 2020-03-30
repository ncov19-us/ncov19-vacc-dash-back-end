const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(418).json({ message: 'router works' });
});

module.exports = router;