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
export function Blockquote ({ className, ...props }: Object): ReactElement {
  return (
    <blockquote
      className={`${cn.blockquote} ${className}`}
      {...props}
    />
  )
}
Object.assign(Blockquote, {
  propTypes: {
    className: PropTypes.string
  },
  defaultProps: {
    className: ''
  }
})

/**
 * Text
 */
export function Text ({ className, ...props }: Object): ReactElement {
  return (
    <p
      className={`${cn.text} ${className}`}
      {...props}
    />
  )
}
Object.assign(Text, {
  propTypes: {
    className: PropTypes.string
  },
  defaultProps: {
    className: ''
  }
})

/**
 * Subhead
 */
export function Subhead ({ className, ...props }: Object): ReactElement {
  return (
    <h6
      className={`${cn.subhead} ${className}`}
      {...props}
    />
  )
}
Object.assign(Subhead, {
  propTypes: {
    className: PropTypes.string
  },
  defaultProps: {
    className: ''
  }
})

/**
 * Title
 */
export function Title ({ className, ...props }: Object): ReactElement {
  return (
    <h5
      className={`${cn.title} ${className}`}
      {...props}
    />
  )
}
Object.assign(Title, {
  propTypes: {
    className: PropTypes.string
  },
  defaultProps: {
    className: ''
  }
})

/**
 * Headline
 */
export function Headline ({ className, ...props }: Object): ReactElement {
  return (
    <h4
      className={`${cn.headline} ${className}`}
      {...props}
    />
  )
}
Object.assign(Headline, {
  propTypes: {
    className: PropTypes.string
  },
  defaultProps: {
    className: ''
  }
})

/**
 * Display
 */
export function Display ({ variation, className, ...props }: Object): ReactElement {
  const variationName = `display${variation}`
  const classNames = `${cn[variationName]} ${className}`
  switch (variation) {
    case 1:
      return <h3 className={classNames} {...props}/>
    case 2:
      return <h2 className={classNames} {...props}/>
    default:
      return <h1 className={classNames} {...props}/>
  }
}
Object.assign(Headline, {
  propTypes: {
    variation: PropTypes.oneOf([1, 2, 3]).isRequired,
    className: PropTypes.string
  },
  defaultProps: {
    variation: 1,
    className: ''
  }
})
