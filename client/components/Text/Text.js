import React, { Component, PropTypes } from 'react'
import textClassNames from './Text.css'
import cn from 'classnames'

export class Text extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  render () {
    const { className, ...props } = this.props
    return (
      <p
        className={cn(className, textClassNames.text)}
        {...props}
      />
    )
  }
}
export default Text

export class Subhead extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  render () {
    const { className, ...props } = this.props
    return (
      <h6
        className={cn(className, textClassNames.subhead)}
        {...props}
      />
    )
  }
}

export class Title extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  render () {
    const { className, ...props } = this.props
    return (
      <h5
        className={cn(className, textClassNames.title)}
        {...props}
      />
    )
  }
}

export class Headline extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  render () {
    const { className, ...props } = this.props
    return (
      <h4
        className={cn(className, textClassNames.headline)}
        {...props}
      />
    )
  }
}

export class Display extends Component {
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
          className={cn(textClassNames.display1, className)}
          {...props}
        />
      )
    } else if (variation === 2) {
      return (
        <h2
          className={cn(textClassNames.display2, className)}
          {...props}
        />
      )
    } else {
      return (
        <h1
          className={cn(textClassNames.display3, className)}
          {...props}
        />
      )
    }
  }
}
