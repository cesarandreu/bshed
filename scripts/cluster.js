var cluster = require('cluster'),
  numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) cluster.fork()

  cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died')
  })
} else {
  require('babel/register')({
    ignore: /public|node_modules/
  })
  require('../server.js').init()
}
