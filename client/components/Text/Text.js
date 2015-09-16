/**
 * Text components
 * @flow
 */
import shouldPureComponentUpdate from 'react-pure-render/function'
import React, { PropTypes } from 'react'
import textClassNames from './Text.css'
import cn from 'classnames'

/**
 * Blockquote
 */
export function Blockquote ({ className, ...props }) {
  return (
    <blockquote
      className={cn(className, textClassNames.blockquote)}
      {...props}
    />
  )
}
Object.assign(Blockquote, {
  shouldComponentUpdate: shouldPureComponentUpdate,
  propTypes: {
    className: PropTypes.string
  }
})

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
Object.assign(Text, {
  shouldComponentUpdate: shouldPureComponentUpdate,
  propTypes: {
    className: PropTypes.string
  }
})

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
Object.assign(Subhead, {
  shouldComponentUpdate: shouldPureComponentUpdate,
  propTypes: {
    className: PropTypes.string
  }
})

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
Object.assign(Title, {
  shouldComponentUpdate: shouldPureComponentUpdate,
  propTypes: {
    className: PropTypes.string
  }
})

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
Object.assign(Headline, {
  shouldComponentUpdate: shouldPureComponentUpdate,
  propTypes: {
    className: PropTypes.string
  }
})

/**
 * Display
 */
export function Display ({ variation, className, ...props }) {
  switch (variation) {
    case 1:
      return <h3 className={cn(className, textClassNames.display1)} {...props}/>
    case 2:
      return <h2 className={cn(className, textClassNames.display2)} {...props}/>
    default:
      return <h1 className={cn(className, textClassNames.display3)} {...props}/>
  }
}
Object.assign(Headline, {
  shouldComponentUpdate: shouldPureComponentUpdate,
  propTypes: {
    variation: PropTypes.oneOf([1, 2, 3]).isRequired,
    className: PropTypes.string
  },
  defaultProps: {
    variation: 1
  }
})
