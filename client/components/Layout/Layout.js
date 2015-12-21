import React, { PropTypes } from 'react'
import { Title } from 'components/Text'
import styles from './Layout.css'

export function LayoutToolbar ({ children, title }) {
  return (
    <header
      role='toolbar'
      className={styles.toolbar}
    >
      <LayoutTitle>
        {title}
      </LayoutTitle>
      {children}
    </header>
  )
}

LayoutToolbar.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
}

export function LayoutContent ({ children }) {
  return (
    <main className={styles.content}>
      {children}
    </main>
  )
}

LayoutContent.propTypes = {
  children: PropTypes.node.isRequired
}

export function Layout ({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export function LayoutTitle ({ children }) {
  return (
    <div className={styles.title}>
      <Title>
        {children}
      </Title>
    </div>
  )
}

LayoutTitle.propTypes = {
  children: PropTypes.string.isRequired
}
