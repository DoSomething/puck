const db = require('monk')(process.env.MONGODB_URI || 'localhost');

const events = db.get('events');
events.createIndex('meta.timestamp');

module.exports.write = (data) => {
  events.insert(data);
};
