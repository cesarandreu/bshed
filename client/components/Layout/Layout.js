// import React, { Component, PropTypes } from 'react'
import layoutClassNames from './Layout.css'
import React, { PropTypes } from 'react'
// import Relay from 'react-relay'
// import cn from 'classnames'

// export class LayoutHeader extends Component {
//   static propTypes = {
//     children: PropTypes.node.isRequired
//   }

//   render () {
//     const { children, ... props } = this.props
//     return (
//       <header className={layoutClassNames.layoutHeader} {...props}>
//         <div className={layoutClassNames.layoutHeaderRow}>
//           {children}
//         </div>
//       </header>
//     )
//   }
// }

// export class LayoutContent extends Component {
//   static propTypes = {
//     children: PropTypes.node.isRequired
//   }

//   render () {
//     const { children } = this.props
//     return (
//       <main className={layoutClassNames.layoutContent}>
//         {children}
//       </main>
//     )
//   }
// }

// export class Layout extends Component {
//   static propTypes = {
//     children: PropTypes.node.isRequired,
//     viewer: PropTypes.object.isRequired
//   }
//   render () {
//     const { children } = this.props
//     return (
//       <div className={layoutClassNames.layoutContainer}>
//         <div className={layoutClassNames.layout}>
//           {children}
//         </div>
//       </div>
//     )
//   }
// }

export function LayoutHeader ({ children, ...props }) {
  return (
    <header className={layoutClassNames.layoutHeader} {...props}>
      <div className={layoutClassNames.layoutHeaderRow}>
        {children}
      </div>
    </header>
  )
}
LayoutHeader.propTypes = {
  children: PropTypes.node.isRequired
}

export function LayoutContent ({ children, ...props }) {
  return (
    <main className={layoutClassNames.layoutContent} {...props}>
      {children}
    </main>
  )
}
LayoutContent.propTypes = {
  children: PropTypes.node.isRequired
}

export function Layout ({ children, ...props }) {
  return (
    <div className={layoutClassNames.layoutContainer} {...props}>
      <div className={layoutClassNames.layout}>
        {children}
      </div>
    </div>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired
}

// export class ApplicationLayout extends Component {
//   static propTypes = {
//     children: PropTypes.node.isRequired
//   }

//   render () {
//     return (
//       <Layout>
//         <LayoutHeader>
//         </LayoutHeader>
//         <LayoutContent>
//         </LayoutContent>
//       </Layout>
//     )
//   }
// }

// export default Relay.createContainer(Layout, {
//   fragments: {
//     viewer: () => Relay.QL`
//       fragment on Viewer {
//         isRegistered,
//       }
//     `
//   }
// })
