import app from '../app'
import React from 'react'
import debug from 'debug'
import fetch from 'node-fetch'
import Html from '../components/Html'
import { Router } from 'react-router'
import serialize from 'serialize-javascript'
import routes from '../components/routes.jsx'
import Location from 'react-router/lib/Location'
import { createElementWithContext } from 'fluxible-addons-react'
import navigateAction from '../actions/navigateAction'

const log = debug('bshed:client:renderer')
export default function renderer ({ scripts=[], styles=[] }={}) {
  return function * rendererMiddleware () {
    const rootUrl = `${this.protocol}://${this.host}`
    const cookie = this.get('cookie')

    log('creating context')
    const context = app.createContext({ fetch, rootUrl, cookie })

    log('running router')
    const location = new Location(this.url, this.query)
    const state = yield runRouter({ location })

    // console.log('routerState', JSON.stringify(state))
    // console.log('state', Object.keys(state))
    log('running navigateAction')
    yield context.executeAction(navigateAction, { location, state })

    log('generating state')
    const appState = `window.BSHED=${serialize(app.dehydrate(context))}`

    log('generating markup')
    const markup = React.renderToString(createElementWithContext(context, state))

    log('generating html')
    const html = React.renderToStaticMarkup(
      <Html
        state={appState}
        markup={markup}
        styles={styles}
        scripts={scripts}
      />
    )

    log('sending response')
    this.status = 200
    this.type = 'html'
    this.body = `<!DOCTYPE html>${html}`
  }
}

function runRouter ({ location }) {
  return new Promise((resolve, reject) => {
    Router.run(routes, location, (error, state) => {
      error ? reject(error) : resolve(state)
    })
  })
}

