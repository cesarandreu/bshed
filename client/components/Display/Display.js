import React, { Component, PropTypes } from 'react'
import displayClassNames from './Display.css'
import cn from 'classnames'

export default class Display extends Component {
  static propTypes = {
    variation: PropTypes.oneOf([1, 2, 3]).isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    variation: 1
  }

  render () {
    const { variation, className, ...props } = this.props

    if (variation === 1) {
      return (
        <h3
          className={cn(displayClassNames.display1, className)}
          {...props}
        />
      )
    } else if (variation === 2) {
      return (
        <h2
          className={cn(displayClassNames.display2, className)}
          {...props}
        />
      )
    } else {
      return (
        <h1
          className={cn(displayClassNames.display3, className)}
          {...props}
        />
      )
    }
  }
}
