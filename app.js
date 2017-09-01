const keypunch = require('keypunch');
const sticky = require('sticky-session');
const cluster = require('cluster');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const totalCPUs = require('os').cpus().length;
const port = process.env.PORT;

if (cluster.isMaster) {
  keypunch.addHeaderFunction(() => '[Leader]');
  keypunch.info(`Spinning up ${totalCPUs} processes...'`);

  for (let workerIndex = 0; workerIndex < totalCPUs; workerIndex++) {
    cluster.fork();
  }
} else if (cluster.isWorker){
  keypunch.addHeaderFunction(() => `[Worker #${cluster.worker.id}]`);
  keypunch.info('Starting up...');

  const db = require('./lib/db');

  io.on('connection', (socket) => {
    keypunch.log(`Socket id ${socket.id} connected`);

    socket.on('analytics', (data) => {
      keypunch.log(`Socket ${socket.id} sent an event`);
      db.write(data);
    });
  });

  const port = process.env.PORT;
  http.listen(port, () => {
    keypunch.info(`Listening on port ${port}`);
  });
}
