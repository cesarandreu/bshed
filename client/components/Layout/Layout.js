/**
 * Layout
 * @flow
 */
import type { ReactElement } from 'react'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import cn from './Layout.css'

export function LayoutHeader ({ children }: Object): ReactElement {
  return (
    <header className={cn.header}>
      <div className={cn.headerRow}>
        {children}
      </div>
    </header>
  )
}
LayoutHeader.propTypes = {
  children: PropTypes.node.isRequired
}

export function LayoutContent ({ children }: Object): ReactElement {
  return (
    <main className={cn.content}>
      {children}
    </main>
  )
}
LayoutContent.propTypes = {
  children: PropTypes.node.isRequired
}

export function Layout ({ children }: Object): ReactElement {
  return (
    <div className={cn.container}>
      <div className={cn.layout}>
        {children}
      </div>
    </div>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export function LayoutTitle ({ title }: Object): ReactElement {
  return (
    <Link
      to='/'
      title='home'
      className={cn.title}
    >
      {title}
    </Link>
  )
}
LayoutTitle.propTypes = {
  title: PropTypes.string.isRequired
}
