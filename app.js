const keypunch = require('keypunch');
const sticky = require('sticky-session');
const stathat = require('./util/stathat');
const isValid = require('./lib/validator');
const uuidv4 = require('uuid/v4');

const app = require('express')();

app.all('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true')
  next();
});

const http = require('http').Server(app);
const io = require('socket.io')(http);

keypunch.info('Starting up...');

const { distribute } = require('./lib/distributor');

io.on('connection', (socket) => {
  keypunch.log(`Socket id ${socket.id} connected`);
  stathat.count('client connection');

  socket.on('analytics', (data) => {
    keypunch.log(`Socket ${socket.id} sent an event`);
    stathat.count('event delivered');

    if (! isValid(data)) {
      stathat.count('invalid event detected');
      return;
    }

    // Append socket ip address.
    data.user.ip = socket.request.connection.remoteAddress;

    // Append random uuid.
    data.meta.id = uuidv4();

    distribute(typeof data === 'string' ? JSON.parse(data) : data);
  });
});

// Send a ping every 10 seconds to all clients,
// prevents an HTTP timeout error on Heroku.
setInterval(() => io.emit('ping', 'ping'), 10 * 1000);

const port = process.env.PORT;
http.listen(port, () => {
  keypunch.info(`Listening on port ${port}`);
});
