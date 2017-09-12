const isValid = require('./validator');
const { write } = require('./db');

module.exports.distribute = (data) => {
  if (! isValid(data)) {
    return;
  }

  console.log('fromDist', write);
  write(data);
  // TODO: Blink
  // TODO: Keen.io
};
