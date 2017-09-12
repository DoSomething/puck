const isValid = require('./validator');
const db = require('./db');
const keen = require('./keen');

module.exports.distribute = (data) => {
  if (! isValid(data)) {
    return;
  }

  db.write(data);
  keen.write(data);
  // TODO: Blink
};
