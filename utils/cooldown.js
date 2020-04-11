const today = `APRIL 10`;
const yesterday = `APRIL 9`;

// format the dates with moment

async function cooldown(req, res, next) {
  if (today === yesterday) {
    console.log('its still the name day try again tomorrow');
    next();
  } else {
    axios.get();
    // update today to be yesterday
  }
}

module.exports = { cooldown };
