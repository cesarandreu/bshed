const _ = require('lodash')
const cookies = require('cookies-js')
const invariant = require('invariant')
const log = require('debug')('bshed:client:request')

/**
 * RequestPlugin
 * Adds executeRequest(fn, params) to action context
 * @param {Object} config
 * @param {Fetch} config.fetch Fetch
 */
module.exports = function RequestPlugin (options={}) {
  invariant(options.fetch, 'RequestPlugin requires fetch')
  return {
    name: 'RequestPlugin',
    plugContext
  }

  function plugContext (contextOptions={}) {
    const request = _.defaults(contextOptions, {
      fetch: options.fetch,
      rootUrl: '',
      cookie: ''
    })

    return {
      plugActionContext
    }

    function plugActionContext (actionContext) {
      actionContext.request = request
      actionContext.executeRequest = executeRequestFactory(request)
    }
  }
}

/**
 * Factory for creating executeRequest
 * @param {Object} config
 * @param {Fetch} config.fetch Fetch
 * @return {Function} executeRequest Request creator
 */
function executeRequestFactory ({fetch, rootUrl, cookie}) {
  /**
   * Execute a request with payload
   * @param {Function} request Request to execute
   * @param {Object} payload Request payload
   * @returns {Promise}
   */
  return function executeRequest (request, payload={}) {
    invariant(typeof request === 'function', 'executeRequest requires a function')
    log(`Executing request ${request.displayName || request.name} with payload`, payload)

    return new Promise((resolve, reject) => {
      request(requestCreator, payload).then(resolve, reject)
    })
  }

  function requestCreator (url, options={}) {
    if (url.charAt(0) === '/') {
      url = `${rootUrl}${url}`
    }

    options.credentials = 'include'

    if (cookie)
      _.set(options, 'headers.cookie', cookie)

    if (shouldSetXsrfToken(options))
      _.set(options, 'headers.x-xsrf-token', cookies.get('XSRF-TOKEN'))

    return fetch(url, options)
      .then(status)
      .then(parseJsonBody)
  }
}

/**
 * Check if X-XSRF-TOKEN header should be set
 * @param {Object} options Request creator options
 * @returns {boolean} if it should be set
 */
function shouldSetXsrfToken (options) {
  const method = (options.method || 'GET').toUpperCase()
  return !_.includes(['GET', 'HEAD', 'OPTIONS'], method)
}

/**
 * Call response.json and add parsedBody
 * @param {Response} response Fetch response
 * @return {Promise}
 */
function parseJsonBody (res) {
  return res.json().then(parsedBody => {
    res.parsedBody = parsedBody
    return res
  })
}

/**
 * Resolve when status code is 2XX, otherwise reject
 * @param {Response} response Fetch response
 * @return {Promise}
 */
function status (res) {
  return res.status >= 200 && res.status < 300
    ? Promise.resolve(res)
    : Promise.reject(res)
}
