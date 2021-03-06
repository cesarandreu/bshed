/**
 * Ensure session.userId is set on every request
 * Create the user if they're don't have an id yet
 * Adds userId to request and req
 * Adds currentUser to ctx
 */
import debug from 'debug'
const log = debug('server:user')

export default function setUser () {
  return async function setUserMiddleware (ctx, next) {
    const { User } = ctx.models
    if (!ctx.session.userId) {
      log('creating new user')
      const user = await User.forge().save()
      ctx.session.userId = user.get('id')
    }

    log(`User ID: "${ctx.session.userId}"`)
    const userId = ctx.request.userId = ctx.req.userId = ctx.session.userId
    ctx.currentUser = await User.forge({ id: userId }).fetch()
    return next()
  }
}
