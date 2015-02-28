var promises = require('./request.promisify'),
  supertest = require('supertest'),
  methods = require('methods')

module.exports = function serverRequest (server, headers) {
  var request = supertest(server), out = {}
  methods.concat('del').forEach((method) => {
    if (request[method]) {
      out[method] = (...args) => {
        return request[method].apply(request, args).set(headers).use(promises)
      }
    }
  })
  return out
}
