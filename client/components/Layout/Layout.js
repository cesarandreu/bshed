/**
 * Layout
 * @flow
 */
import layoutClassNames from './Layout.css'
import type { ReactElement } from 'react'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export function LayoutHeader ({ children, ...props }: Object): ReactElement {
  return (
    <header className={layoutClassNames.header} {...props}>
      <div className={layoutClassNames.headerRow}>
        {children}
      </div>
    </header>
  )
}
Object.assign(LayoutHeader, {
  propTypes: {
    children: PropTypes.node.isRequired
  }
})

export function LayoutContent ({ children, ...props }: Object): ReactElement {
  return (
    <main className={layoutClassNames.content} {...props}>
      {children}
    </main>
  )
}
Object.assign(LayoutContent, {
  propTypes: {
    children: PropTypes.node.isRequired
  }
})

export function Layout ({ children, ...props }: Object): ReactElement {
  return (
    <div className={layoutClassNames.container} {...props}>
      <div className={layoutClassNames.layout}>
        {children}
      </div>
    </div>
  )
}
Object.assign(Layout, {
  propTypes: {
    children: PropTypes.node.isRequired
  }
})

export function LayoutTitle ({ title }: Object): ReactElement {
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
  propTypes: {
    title: PropTypes.string.isRequired
  }
})
