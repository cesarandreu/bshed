import debug from 'debug'
import cookies from 'cookies-js'
import invariant from 'invariant'
import defaults from 'lodash/object/defaults'

const log = debug('bshed:client:request')

/**
 * RequestPlugin
 * Adds executeRequest(fn, params) to action context
 */
export default function RequestPlugin () {
  return {
    name: 'RequestPlugin',
    plugContext
  }

  function plugContext (contextOptions={}) {
    const request = defaults(contextOptions, {
      fetch: global.fetch,
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
  // node-fetch exposes Headers on the fetch object
  // whatwg-fetch polyfills Headers on the window
  const Headers = fetch.Headers || global.Headers

  /**
   * Execute a request with payload
   * @param {Function} request Request to execute
   * @param {Object} payload Request payload
   * @returns {Promise}
   */
  return function executeRequest (fn, payload={}) {
    invariant(typeof fn === 'function', 'executeRequest requires a function')
    log(`Executing request ${fn.displayName || fn.name} with payload`, payload)

    return new Promise((resolve, reject) => {
      fn(requestCreator, payload).then(resolve, reject)
    })
  }

  function requestCreator (url='', options={}) {
    if (url.charAt(0) === '/') {
      url = `${rootUrl}${url}`
    }

    defaults(options, { credentials: 'include' })

    options.headers = new Headers(options.headers || {})
    if (!options.headers.has('cookie') && cookie) {
      options.headers.set('cookie', cookie)
    }
    if (!options.headers.has('x-xsrf-token') && shouldSetXsrfToken(options.method)) {
      options.headers.set('x-xsrf-token', cookies.get('XSRF-TOKEN'))
    }

    return fetch(url, options)
      // .then(status)
      // .then(parseJsonBody)
  }
}

/**
 * Check if X-XSRF-TOKEN header should be set
 * @param {Object} options Request creator options
 * @returns {boolean} if it should be set
 */
function shouldSetXsrfToken (method='GET') {
  return ['GET', 'HEAD', 'OPTIONS'].indexOf(method.toUpperCase()) === -1
}

/**
 * Call response.json and add parsedBody
 * @param {Response} response Fetch response
 * @return {Promise}
 */
// function parseJsonBody (res) {
//   return res.json().then(parsedBody => {
//     res.parsedBody = parsedBody
//     return res
//   })
// }

/**
 * Resolve when status code is 2XX, otherwise reject
 * @param {Response} response Fetch response
 * @return {Promise}
 */
// function status (res) {
//   return res.status >= 200 && res.status < 300
//     ? Promise.resolve(res)
//     : Promise.reject(res)
// }
