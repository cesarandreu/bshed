/**
 * Middleware to set XSRF-TOKEN cookie on every response
 */
export default function setCsrfToken () {
  return async function setCsrfTokenMiddleware (ctx, next) {
    await next()
    ctx.cookies.set('XSRF-TOKEN', ctx.csrf, {
      httpOnly: false
    })
  }
}
