const stathat = require('../util/stathat');
const Keen = require('keen-js');

const client = new Keen({
  projectId: process.env.KEEN_PROJECT_ID,
  writeKey: process.env.KEEN_WRITE_KEY,
});

module.exports.write = (data) => {
  client.recordEvent(data.event.name || 'unknown name', data, (err, res) => {
    if (err) {
      console.error(err);
      stathat.count('keen request failed');
    }
  });
};
