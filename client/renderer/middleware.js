const renderer = require('./renderer')
const log = require('debug')('bshed:client:middleware')

module.exports = function clientRenderer ({assets}={}) {
  return function * clientRendererMiddleware () {
    try {
      log('starting renderer')
      const result = yield renderer({
        url: this.url,
        assets: assets,
        cookie: this.get('cookie'),
        rootUrl: `${this.protocol}://${this.host}`
      })

      log('assigning renderer result')
      Object.assign(this, result)
    } catch (err) {
      console.error(err)
      this.throw(500)
    }
  }
}
