var React = require('react')
var serialize = require('serialize-javascript')
var log = require('debug')('bshed:client:renderer')
var {FluxibleComponent} = require('fluxible/addons')

var NavigateAction = require('../app/application/actions/NavigateAction')
var Html = require('./Html')
var app = require('../app')

module.exports = renderer
function* renderer (options) {
  var {url, host, protocol, cookie, assets} = options

  log(`creating context with url ${url}`)
  var context = app.createContext({
    protocol,
    cookie,
    host,
    url
  })

  log('running router')
  var {Handler, state} = yield runRouter(context)

  try {
    log('executing navigate action')
    yield context.executeAction(NavigateAction, state)
  } catch (err) {
    console.error('Error executing navigate action', err)
    throw err
  }

  return render({context, Handler, assets})
}

function runRouter (context) {
  return new Promise(resolve => {
    context.getActionContext().router.run((Handler, state) => {
      resolve({Handler, state})
    })
  })
}

function render ({context, Handler, assets}={}) {
  log('generating component context')
  var componentContext = context.getComponentContext()

  log('generating BSHED')
  var BSHED = `window.BSHED=${serialize(app.dehydrate(context))}`

  log('generating markup')
  var markup = React.renderToString(
    <FluxibleComponent context={componentContext}>
      <Handler/>
    </FluxibleComponent>
  )

  log('generating html')
  var html = React.renderToStaticMarkup(
    <FluxibleComponent context={componentContext}>
      <Html markup={markup} assets={assets} BSHED={BSHED} context={componentContext}/>
    </FluxibleComponent>
  )

  log('render finished')
  return {body: `<!DOCTYPE html>${html}`, type: 'html', status: 200}
}
