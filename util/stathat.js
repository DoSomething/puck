const stathat = require('stathat');
const STATHAT_KEY = process.env.STATHAT_KEY;

module.exports.count = (name) => {
  if (STATHAT_KEY) {
    stathat.trackEZCount(STATHAT_KEY, `puck - ${name}`, 1, () => {});
  }
};
