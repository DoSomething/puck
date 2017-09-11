const sizeof = require('object-sizeof');
const db = require('monk')(process.env.MONGODB_URI);

const events = db.get('events');
events.createIndex('meta.timestamp');

module.exports = (data) => {
  events.insert(data);
};
