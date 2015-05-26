const cluster = require('cluster')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  times(numCPUs, function () {
    cluster.fork()
  })

  cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died')
  })
} else {
  require('babel/register')()
  require('../server.js').init()
}

function times (n, fn) {
  if (n) {
    fn(n)
    times(n - 1, fn)
  }
}
