const buildHeaders = require('./build-headers')

module.exports = {
  buildUserHeaders,
  buildHeaders
}

function buildUserHeaders (opts) {
  const _buildHeaders = buildHeaders(opts)
  return function (user) {
    return _buildHeaders({
      user: {
        id: user.id
      }
    })
  }
}
