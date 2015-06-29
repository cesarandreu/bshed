import app from '../app'
import React from 'react'
import debug from 'debug'
import fetch from 'node-fetch'
import Html from '../components/Html'
import serialize from 'serialize-javascript'
import { navigateAction } from 'fluxible-router'

const log = debug('bshed:client:renderer')
export default function renderer ({ scripts=[], styles=[] }={}) {
  return function * rendererMiddleware () {
    const rootUrl = `${this.protocol}://${this.host}`
    const context = app.createContext({ fetch, rootUrl })

    log('Executing navigate action')
    try {
      const url = this.url
      yield context.executeAction(navigateAction, { url })
    } catch (err) {
      log('Navigate error', err)
      if (err.status || err.statusCode) {
        this.throw(err.status || err.statusCode)
      }
      throw err
    }

    log('generating state')
    const state = `window.app=${serialize(app.dehydrate(context))}`

    log('generating markup')
    const markup = React.renderToString(context.createElement())

    log('generating html')
    const html = React.renderToStaticMarkup(
      <Html
        state={state}
        markup={markup}
        styles={styles}
        scripts={scripts}
      />
    )

    log('sending body')
    this.body = 200
    this.type = 'html'
    this.body = `<!DOCTYPE html>${html}`
  }
}
