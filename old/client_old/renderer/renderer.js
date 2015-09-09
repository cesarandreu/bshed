import app from '../app'
import React from 'react'
import debug from 'debug'
import Html from './Html'
import fetch from 'node-fetch'
// import Helmet from 'react-helmet'
import serialize from 'serialize-javascript'
import { FluxibleComponent } from 'fluxible/addons'
import NavigateActions from '../actions/NavigateActions'

const log = debug('bshed:client:renderer')
export default function renderer ({scripts=[], styles=[]}={}) {
  return function * rendererMiddleware () {
    const rootUrl = `${this.protocol}://${this.host}`
    const cookie = this.get('cookie')
    const url = this.url

    log('creating context')
    const context = app.createContext({ fetch, rootUrl, url, cookie })

    log('running router')
    const { Root, state } = yield runRouter(context)

    log('executing navigate action')
    yield context.executeAction(NavigateActions.router, state)

    log('running render')
    const html = render({ context, Root, scripts, styles })

    log('sending response')
    this.status = 200
    this.type = 'html'
    this.body = `<!DOCTYPE html>${html}`
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
function render ({ context, Root, styles, scripts }={}) {
  log('generating component context')
  const componentContext = context.getComponentContext()

  log('generating state')
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
      <Html
        scripts={scripts}
        styles={styles}
        markup={markup}
        BSHED={BSHED}
      />
    </FluxibleComponent>
  )

  return html
}
