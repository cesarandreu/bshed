// import React from 'react'
// import { Router } from 'react-router'
// import BrowserHistory from 'react-router/lib/BrowserHistory'
// import MemoryHistory from 'react-router/lib/MemoryHistory'

// /**
//  * RouterPlugin
//  */
// module.exports = function RouterPlugin ({ routes }) {
//   return {
//     name: 'RouterPlugin',
//     plugContext
//   }

//   function plugContext ({ url }={}, context) {
//     const history = context._history = url
//       ? new BrowserHistory()
//       : new MemoryHistory([url])

//     context.getRouter = function getRouter () {
//       return (
//         <Router
//           history={history}
//         />
//       )
//     }

//     // const router = context.router = Router.create({
//     //   location: url || HistoryLocation,
//     //   routes: app.getComponent()
//     // })

//     // return {
//     //   plugActionContext
//     // }

//     // function plugActionContext (actionContext) {
//     //   actionContext.router = router
//     // }
//   }
// }
