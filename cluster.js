import cluster from 'cluster';
import os from 'os';

const CPUS = os.cpus();
if (cluster.isMaster) {
  CPUS.forEach(() => cluster.fork());
  cluster.on('listening', (works) => {
    console.log(`Cluster ${works.process.pid} connected`);
  });

  cluster.on('disconnect', (works) => {
    console.log(`Cluster ${works.process.pid} disconnected`);
  });

  cluster.on('exit', (works) => {
    console.log(`Cluster ${works.process.pid} exited`);
    cluster.fork();
  });
} else {
  require('./index.js');
}
