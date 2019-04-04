const db = require('./db');
const blink = require('./blink');
const stathat = require('../util/stathat');

module.exports.distribute = (data) => {
  stathat.count('event distributed');
  db.write(data);
  blink.write(data);
};
