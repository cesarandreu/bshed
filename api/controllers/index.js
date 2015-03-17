var fs = require('fs'),
  path = require('path'),
  assert = require('assert'),
  compose = require('koa-compose'),
  log = require('debug')('bshed:api:controllers')

function controllers ({helpers}) {
  assert(helpers, 'controllers require helpers')

  log('middleware start')
  var middleware = Object.keys(controllers)
  .map(function (name) {
    log(`initializing ${name}`, name)
    return controllers[name]({helpers})
  })
  log('middleware end')
  return compose(middleware)
}

// Load controllers
log('load start')
fs.readdirSync(__dirname)
.filter(function (file) {
  return file.indexOf('.') !== 0 && file !== 'index.js'
})
.forEach(function (file) {
  var name = file.split('_controller').shift()
  var controllerPath = path.join(__dirname, file)
  controllers[name] = require(controllerPath)
  log(`${name} loaded from ${controllerPath}`)
})
log('load end')

module.exports = controllers
