import routington from 'routington'
import compose from 'koa-compose'
import invariant from 'invariant'

const METHODS = [
  'GET',
  'HEAD',
  'OPTIONS',
  'POST'
]

export default class Router {
  addRoute ({ methods, path, middleware }) {
    methods.forEach(method => this.define(method, path, middleware))
    return this
  }

  constructor () {
    this.trie = routington()
  }

  middleware () {
    const trie = this.trie
    return async function routerMiddleware (ctx, next) {
      const match = trie.match(ctx.path)

      // If no routes match, go to the next middleware
      if (!match || !match.node) {
        return next()
      }

      // Take node and param, make sure param is always an object
      const { node, param = {} } = match

      // If no HEAD middleware, default to GET
      const method = ctx.method === 'HEAD' && !node.HEAD
        ? 'GET'
        : ctx.method

      // OPTIONS support
      if (method === 'OPTIONS') {
        ctx.status = 204
        ctx.set('Allow', node.allowedMethods)
        return
      }

      // If no middleware is returned it's a 405 error
      const middleware = node[`_${method}`]
      if (!middleware) {
        ctx.status = 405
        ctx.set('Allow', node.allowedMethods)
        return
      }

      ctx.params = ctx.request.params = param
      return middleware(ctx, next)
    }
  }

  define (type, path, middleware) {
    if (!Array.isArray(middleware)) {
      middleware = [middleware]
    }

    invariant(
      METHODS.includes(type),
      `Invalid method "${type}"`
    )
    invariant(
      typeof path === 'string',
      `Expected path string, received ${typeof path}`
    )
    invariant(
      path[0] === '/',
      `Path must start with a "/", received "${path}"`
    )
    const [ node ] = this.trie.define(path)

    // Track implemented methods for 501
    // this.implementsMethod[type] = true
    // if (type === 'GET') {
    //   this.implementsMethod.HEAD = true
    // }

    // Track the middleware list
    node[type] = [
      ...(node[type] || []),
      ...middleware
    ].filter(Boolean)
    invariant(
      node[type].length,
      `Failed to define "${type} ${path}", must provide middleware`
    )

    // Build the composed middleware
    node[`_${type}`] = compose(node[type])

    // Update node method list
    // Used for OPTIONS and 405 responses
    node.methods = METHODS.filter(method => node[method])
    if (node.methods.includes('GET') && !node.methods.includes('HEAD')) {
      node.methods.push('HEAD')
    }
    if (!node.methods.includes('OPTIONS')) {
      node.methods.push('OPTIONS')
    }
    node.allowedMethods = node.methods.join(', ')

    return this
  }
}
