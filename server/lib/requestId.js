import uuid from 'node-uuid'
import debug from 'debug'
const log = debug('server:request')

/**
 * Adds a uuid to each request
 */
export default function requestId () {
  return function requestIdMiddleware (ctx, next) {
    ctx.request.requestId = ctx.req.requestId = uuid.v4()
    log(`Request ID: "${ctx.request.requestId}"`)
    return next()
  }
}
