var cookies = require('cookies-js')

module.exports = function RequestPlugin ({fetch}={}) {
  return {
    name: 'RequestPlugin',
    plugContext
  }

  function plugContext ({host='', csrf='', cookie=''}={}) {
    return {
      plugActionContext
    }

    function plugActionContext (actionContext) {
      actionContext.fetch = (url, options={}) => {
        options.headers = options.headers || {}
        options.headers['x-xsrf-token'] = csrf || cookies.get('XSRF-TOKEN')
        if (cookie) options.headers['cookie'] = cookie
        return fetch(host + url, options)
      }
    }
  }
}
