require('./BikeImage.less')

const cn = require('classnames')
const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const BikeImage = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  propTypes: {
    height: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    size: React.PropTypes.number
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
