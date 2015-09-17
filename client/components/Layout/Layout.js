/**
 * Layout
 * @flow
 */
import shouldPureComponentUpdate from 'react-pure-render/function'
import layoutClassNames from './Layout.css'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export function LayoutHeader ({ children, ...props }) {
  return (
    <header className={layoutClassNames.header} {...props}>
      <div className={layoutClassNames.headerRow}>
        {children}
      </div>
    </header>
  )
}
Object.assign(LayoutHeader, {
  shouldComponentUpdate: shouldPureComponentUpdate,
  propTypes: {
    children: PropTypes.node.isRequired
  }
})

export function LayoutContent ({ children, ...props }) {
  return (
    <main className={layoutClassNames.content} {...props}>
      {children}
    </main>
  )
}
Object.assign(LayoutContent, {
  shouldComponentUpdate: shouldPureComponentUpdate,
  propTypes: {
    children: PropTypes.node.isRequired
  }
})

export function Layout ({ children, ...props }) {
  return (
    <div className={layoutClassNames.container} {...props}>
      <div className={layoutClassNames.layout}>
        {children}
      </div>
    </div>
  )
}
Object.assign(Layout, {
  shouldComponentUpdate: shouldPureComponentUpdate,
  propTypes: {
    children: PropTypes.node.isRequired
  }
})

export function LayoutTitle ({ title }) {
  return (
    <Link
      to='/'
      title='home'
      className={layoutClassNames.title}
    >
      {title}
    </Link>
  )
}
Object.assign({
  shouldComponentUpdate: shouldPureComponentUpdate,
  propTypes: {
    title: PropTypes.string.isRequired
  }
})
