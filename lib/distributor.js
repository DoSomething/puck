const isValid = require('./validator');
const db = require('./db');
const keen = require('./keen');
const stathat = require('../util/stathat');

module.exports.distribute = (data) => {
  if (! isValid(data)) {
    stathat.count('invalid event detected');
    return;
  }

  stathat.count('event distributed');
  db.write(data);
  keen.write(data);
  // TODO: Blink
};
