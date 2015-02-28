var api = {
  name: 'bshed-api',
  endpoint: '/api'
}

module.exports = function apiConfig (env) {
  api.env = env
  return api
}
