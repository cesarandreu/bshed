export default function noop () {
  return noopMiddleware
}

export function noopMiddleware (ctx, next) {
  return next()
}
