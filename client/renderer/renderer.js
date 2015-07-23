// import app from '../app'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
// import debug from 'debug'
// import fetch from 'node-fetch'
import Html from '../components/Html'
// import { Router } from 'react-router'
// import routes from '../components/routes'
// import { ClientError } from '../lib/errors'
// import serialize from 'serialize-javascript'
// import Location from 'react-router/lib/Location'
// import navigateAction from '../actions/navigateAction'

// const log = debug('bshed:client:renderer')
export default function renderer ({ scripts=[], styles=[] }={}) {
  return function * rendererMiddleware () {

    const html = renderToStaticMarkup(
      <Html
        styles={styles}
        scripts={scripts}
      />
    )

    this.status = 200
    this.type = 'html'
    this.body = `<!DOCTYPE html>${html}`

    // const rootUrl = `${this.protocol}://${this.host}`
    // const cookie = this.get('cookie')

    // log('creating context')
    // const context = app.createContext({ fetch, rootUrl, cookie })

    // log('running router')
    // const location = new Location(this.url, this.query)
    // const { state, transition } = yield runRouter({ location })
    // console.log('transition', transition, state)

    // log('running navigateAction')
    // yield context.executeAction(navigateAction, { location, ...state })

    // log('generating state')
    // const appState = `window.BSHED=${serialize(app.dehydrate(context))}`

    // log('generating markup')
    // const markup = React.renderToString(createElementWithContext(context, state))

    // log('generating html')
    // const html = React.renderToStaticMarkup(
    //   <Html
    //     state={appState}
    //     markup={markup}
    //     styles={styles}
    //     scripts={scripts}
    //   />
    // )

    // log('sending response')
    // this.status = 200
    // this.type = 'html'
    // this.body = `<!DOCTYPE html>${html}`
  }
}

// function runRouter ({ location }) {
//   return new Promise((resolve, reject) => {
//     Router.run(routes, location, (error, state, transition) => {
//       error ? reject(error) : resolve({state, transition})
//     })
//   })
// }

