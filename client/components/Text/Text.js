/**
 * Text components
 * @flow
 */
import React, { PropTypes } from 'react'
import textClassNames from './Text.css'
import cn from 'classnames'

/**
 * Text
 */
export default Text
export function Text ({ className, ...props }) {
  return (
    <p
      className={cn(className, textClassNames.text)}
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
export function Subhead ({ className, ...props }) {
  return (
    <h6
      className={cn(className, textClassNames.subhead)}
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
export function Title ({ className, ...props }) {
  return (
    <h5
      className={cn(className, textClassNames.title)}
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
export function Headline ({ className, ...props }) {
  return (
    <h4
      className={cn(className, textClassNames.headline)}
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
export function Display ({ variation, className, ...props }) {
  switch (variation) {
    case 1:
      return <h3 className={cn(textClassNames.display1, className)} {...props}/>
    case 2:
      return <h2 className={cn(textClassNames.display2, className)} {...props}/>
    default:
      return <h1 className={cn(textClassNames.display3, className)} {...props}/>
  }
}
Display.propTypes = {
  variation: PropTypes.oneOf([1, 2, 3]).isRequired,
  className: PropTypes.string
}
Display.defaultProps = {
  variation: 1
}
