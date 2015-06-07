require('./BikeImage.less')

const GRID_ITEM_SIZE = 160
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
    url: React.PropTypes.string.isRequired
  },

  render () {
    const {className, height, width, name, url, ...props} = this.props
    const imageClassName = cn('bike-image-container', className, {
      small: width < GRID_ITEM_SIZE || height < GRID_ITEM_SIZE,
      square: width === height,
      longer: height > width,
      wider: width > height
    })

    return (
      <div
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
