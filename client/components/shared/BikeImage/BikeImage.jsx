require('./BikeImage.less')

import React, { PropTypes } from 'react'
import ImmutableRenderMixin from 'react-immutable-render-mixin'
import cn from 'classnames'

const BikeImage = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.number
  },

  getDefaultProps () {
    return {
      size: 212
    }
  },

  render () {
    const {className, size, height, width, name, url, ...props} = this.props
    const imageClassName = cn('bike-image-container', className, {
      small: width < size || height < size,
      square: width === height,
      longer: height > width,
      wider: width > height
    })

    return (
      <div
        style={{height: size, width: size}}
        className={imageClassName}
        {...props}
      >
        <img
          className='bike-image'
          alt={name}
          src={url}
        />
      </div>
    )
  }
})

module.exports = BikeImage
