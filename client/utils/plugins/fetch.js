var cookies = require('cookies-js')

module.exports = function FetchPlugin ({fetch}={}) {
  return {
    name: 'FetchPlugin',
    plugContext
  }

  function plugContext ({host='', csrf='', cookie='', protocol=''}={}) {
    var base = protocol && host ? `${protocol}://${host}` : ''

    return {
      plugActionContext
    }

    function plugActionContext (actionContext) {
      actionContext.fetch = (path, options={}) => {
        options.headers = options.headers || {}

        // Set x-xsrf-token if skipCsrf is falsy and header isn't set
        if (!options.skipCsrf && !options.headers['x-xsrf-token'])
          options.headers['x-xsrf-token'] = csrf || cookies.get('XSRF-TOKEN')

        // Set cookie if skipCookie is falsy, header isn't set, and cookie is truthy
        if (!options.skipCookie && !options.headers['cookie'] && cookie)
          options.headers['cookie'] = cookie

        // Preprend base to path if skipBase is falsy
        if (!options.skipBase)
          path = base + path

        return fetch(path, options)
      }
    }
  }
}
