var co = require('co'),
  React = require('react'),
  serialize = require('serialize-javascript'),
  log = require('debug')('bshed:client:renderer')

var Html = React.createFactory(require('../components/Html.jsx')),
  navigate = require('../actions/navigate'),
  app = require('../app')

module.exports = co.wrap(renderer)

function* renderer (options) {
  var {url, request, assets} = options

  log(`creating context with url ${url}`)
  var context = app.createContext({request, url})

  log('running router')
  var {Handler, state} = yield runRouter(context)

  try {
    log('executing navigate action')
    yield context.executeAction(navigate, state)
  } catch (err) {
    console.error('Error executing navigate action', err)
    throw err
  }

  return yield render({context, Handler, assets})
}

function runRouter (context) {
  return function runRouterThunk (callback) {
    context.getComponentContext().router.run((Handler, state) => {
      callback(null, {Handler, state})
    })
  }
}

function render ({context, Handler, assets}={}) {
  return function renderThunk (callback) {
    log('using component context')
    React.withContext(context.getComponentContext(), () => {

      log('generating BSHED')
      var BSHED = `window.BSHED=${serialize(app.dehydrate(context))}`

      log('generating markup')
      var markup = React.renderToString(React.createElement(Handler))

      log('generating html')
      var html = React.renderToStaticMarkup(Html({markup, assets, BSHED}))

      log('renderer finished')
      callback(null, {body: html, type: 'html', status: 200})
    })
  }
}
