/**
 * Text components
 * @flow
 */
import type { ReactElement } from 'react'
import React, { PropTypes } from 'react'
import cn from './Text.css'

/**
 * Blockquote
 */
export function Blockquote ({ className = '', ...props }: Object): ReactElement {
  return (
    <blockquote
      className={`${cn.blockquote} ${className}`}
      {...props}
    />
  )
}
Blockquote.propTypes = {
  className: PropTypes.string
}

/**
 * Text
 */
export function Text ({ className = '', ...props }: Object): ReactElement {
  return (
    <p
      className={`${cn.text} ${className}`}
      {...props}
    />
  )
}
Text.propTypes = {
  className: PropTypes.string
}

/**
 * Subhead
 */
export function Subhead ({ className = '', ...props }: Object): ReactElement {
  return (
    <h6
      className={`${cn.subhead} ${className}`}
      {...props}
    />
  )
}
Subhead.propTypes = {
  className: PropTypes.string
}

/**
 * Title
 */
export function Title ({ className = '', ...props }: Object): ReactElement {
  return (
    <h5
      className={`${cn.title} ${className}`}
      {...props}
    />
  )
}
Title.propTypes = {
  className: PropTypes.string
}

/**
 * Headline
 */
export function Headline ({ className = '', ...props }: Object): ReactElement {
  return (
    <h4
      className={`${cn.headline} ${className}`}
      {...props}
    />
  )
}
Headline.propTypes = {
  className: PropTypes.string
}

/**
 * Display
 */
export function Display ({ variation = 1, className = '', ...props }: Object): ReactElement {
  const classNames = `${cn[`display${variation}`]} ${className}`
  switch (variation) {
    case 1:
      return <h3 className={classNames} {...props}/>
    case 2:
      return <h2 className={classNames} {...props}/>
    case 3:
      return <h1 className={classNames} {...props}/>
  }
}
Display.propTypes = {
  className: PropTypes.string,
  variation: PropTypes.oneOf([1, 2, 3])
}
