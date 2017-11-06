const db = require('./db');
const keen = require('./keen');
const blink = require('./blink');
const stathat = require('../util/stathat');

module.exports.distribute = (data) => {
  stathat.count('event distributed');
  db.write(data);
  keen.write(data);
  blink.write(data);
};
