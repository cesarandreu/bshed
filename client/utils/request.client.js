var promises = require('./request.promisify'),
  superagent = require('superagent'),
  cookies = require('cookies-js'),
  methods = require('methods'),
  clientRequest = {}

methods.concat('del').forEach(method => {
  if (superagent[method])
    clientRequest[method] = (...args) => {
      return superagent[method].apply(superagent, args).use(xsrfToken).use(promises)
    }
})

module.exports = clientRequest

function xsrfToken (request) {
  return request.set('x-xsrf-token', cookies.get('XSRF-TOKEN'))
}
