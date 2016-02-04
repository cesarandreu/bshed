import cn from 'classnames'
import React, { PropTypes } from 'react'
import { SecondaryText, Display1, Headline } from 'components/Text'
import styles from './Example.css'

export function Example ({ dark, children, className, description, light, title }) {
  return (
    <div
      className={cn(styles.example, {
        [styles.dark]: dark,
        [styles.light]: light
      })}
    >
      <div className={styles.info}>
        <Headline
          className={styles.headline}
          dark={light || (!dark && !light)}
          light={dark}
          secondary
        >
          {title}
        </Headline>
        {description && (
          <SecondaryText>
            {description}
          </SecondaryText>
        )}
      </div>
      <div className={cn(styles.body, className)}>
        {children}
      </div>
    </div>
  )
}

Example.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dark: PropTypes.bool,
  description: PropTypes.string,
  light: PropTypes.bool,
  title: PropTypes.string.isRequired
}

export function Examples ({ children, title }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Display1>
          {title}
        </Display1>
      </div>
      <div className={styles.wrapper}>
        {children}
      </div>
    </div>
  )
}

Examples.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
}
