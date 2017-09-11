const isValid = require('./validator');
const db = require('./db');

module.exports = (data) => {
  if (! isValid(data)) {
    return;
  }

  db(data);
  // TODO: Blink
  // TODO: Keen.io
}
