import React from 'react'
const fetch = require('node-fetch')
const serialize = require('serialize-javascript')
const log = require('debug')('bshed:client:renderer')
const {FluxibleComponent} = require('fluxible/addons')

const NavigateActions = require('../actions/NavigateActions')
const Html = require('./Html')
const app = require('../app')

module.exports = async function renderer ({rootUrl, url, cookie, assets}={}) {
  log(`creating context with url ${url}`)
  const context = app.createContext({
    rootUrl,
    cookie,
    fetch,
    url
  })

  log('running router')
  const {Root, state} = await runRouter(context)

  log('executing navigate action')
  await context.executeAction(NavigateActions.router, state)

  log('running render')
  const result = render({context, Root, assets})

  return {
    body: result,
    type: 'html',
    status: 200
  }
}

/**
 * Run router
 * @param {Object} context Application context
 * @returns {Promise} Promise of resulting Handler and state
 */
function runRouter (context) {
  return new Promise(resolve => {
    context.router.run((Root, state) => {
      resolve({
        Root,
        state
      })
    })
  })
}

/**
 * Render app
 * @returns {Object} Resulting body, type, and status
 */
function render ({context, Root, assets}={}) {
  log('generating component context')
  const componentContext = context.getComponentContext()

  log('generating BSHED')
  const BSHED = `window.BSHED=${serialize(app.dehydrate(context))}`

  log('generating markup')
  const markup = React.renderToString(
    <FluxibleComponent context={componentContext}>
      <Root/>
    </FluxibleComponent>
  )

  log('generating html')
  const html = React.renderToStaticMarkup(
    <FluxibleComponent context={componentContext}>
      <Html markup={markup} assets={assets} BSHED={BSHED}/>
    </FluxibleComponent>
  )

  return `<!DOCTYPE html>${html}`
}
