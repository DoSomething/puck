const Keen = require('keen-js');

const client = new Keen({
  projectId: process.env.KEEN_PROJECT_ID,
  writeKey: process.env.KEEN_WRITE_KEY,
});

module.exports.write = (data) => {
  client.recordEvent(process.env.KEEN_COLLECTION, data, (err, res) => {
    // TODO: StatHat any failed responses
    console.log(err, res);
  });
};
