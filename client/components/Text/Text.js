/**
 * Text components
 * @flow
 */
import React, { PropTypes } from 'react'
import textClassNames from './Text.css'
import type ReactElement from 'react'
import cn from 'classnames'

/**
 * Blockquote
 */
export function Blockquote ({ className, ...props }: Object): ReactElement {
  return (
    <blockquote
      className={cn(className, textClassNames.blockquote)}
      {...props}
    />
  )
}
Object.assign(Blockquote, {
  propTypes: {
    className: PropTypes.string
  }
})

/**
 * Text
 */
export function Text ({ className, ...props }: Object): ReactElement {
  return (
    <p
      className={cn(className, textClassNames.text)}
      {...props}
    />
  )
}
Object.assign(Text, {
  propTypes: {
    className: PropTypes.string
  }
})

/**
 * Subhead
 */
export function Subhead ({ className, ...props }: Object): ReactElement {
  return (
    <h6
      className={cn(className, textClassNames.subhead)}
      {...props}
    />
  )
}
Object.assign(Subhead, {
  propTypes: {
    className: PropTypes.string
  }
})

/**
 * Title
 */
export function Title ({ className, ...props }: Object): ReactElement {
  return (
    <h5
      className={cn(className, textClassNames.title)}
      {...props}
    />
  )
}
Object.assign(Title, {
  propTypes: {
    className: PropTypes.string
  }
})

/**
 * Headline
 */
export function Headline ({ className, ...props }: Object): ReactElement {
  return (
    <h4
      className={cn(className, textClassNames.headline)}
      {...props}
    />
  )
}
Object.assign(Headline, {
  propTypes: {
    className: PropTypes.string
  }
})

/**
 * Display
 */
export function Display ({ variation, className, ...props }: Object): ReactElement {
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
  propTypes: {
    variation: PropTypes.oneOf([1, 2, 3]).isRequired,
    className: PropTypes.string
  },
  defaultProps: {
    variation: 1
  }
})
