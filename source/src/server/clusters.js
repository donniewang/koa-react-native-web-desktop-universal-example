import cluster from 'cluster';
import os from 'os';

const CPUS = os.cpus();

if (cluster.isMaster) {

    CPUS.forEach(() => cluster.fork());

    cluster.on('listening', (worker) => {
        console.debug('Cluster %d connected', worker.process.pid);
    });

    cluster.on('disconnect', (worker) => {
        console.debug('Cluster %d disconnected', worker.process.pid);
    });

    cluster.on('exit', (worker) => {
        console.debug('Cluster %d is dead', worker.process.pid);
        cluster.fork();
    });
} else {
    require('./server');
}