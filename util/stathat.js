const tophat = require('tophat');
const STATHAT_KEY = process.env.STATHAT_KEY;
const stats = STATHAT_KEY ? new tophat(STATHAT_KEY) : null;

module.exports.count = (name) => {
  if (stats) {
    stats.count(`puck - ${name}`);
  }
};
