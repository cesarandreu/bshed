require('./bike-item.less')

const BIKE_ITEM_SIZE = 160
const cn = require('classnames')
const React = require('react/addons')
const Immutable = require('immutable')
const PureRenderMixin = React.addons.PureRenderMixin
const ActionMixin = require('../../../lib/ActionMixin')
const IconButton = require('../../general/Buttons/IconButton')
const BikeshedBuilderActions = require('../../../actions/BikeshedBuilderActions')

const BikeItem = React.createClass({
  mixins: [
    ActionMixin,
    PureRenderMixin
  ],

  propTypes: {
    bike: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    const {bike} = this.props
    const width = bike.getIn(['size', 'width'])
    const height = bike.getIn(['size', 'height'])
    const imageClassName = cn('bike-item-image-container', {
      small: width < BIKE_ITEM_SIZE || height < BIKE_ITEM_SIZE,
      square: width === height,
      longer: height > width,
      wider: width > height
    })

    return (
      <div className='bike-item'>
        <IconButton
          onClick={this._remove}
          className='bike-item-clear'
          icon='md-clear'
        />
        <div
          className={imageClassName}
          onClick={this._preview}
        >
          <img
            className='bike-item-image'
            alt={bike.get('name')}
            src={bike.get('url')}
          />
        </div>
      </div>
    )
  },

  _remove () {
    this.executeAction(
      BikeshedBuilderActions.remove,
      this.props.bike.get('name')
    )
  },

  _preview () {
    this.executeAction(
      BikeshedBuilderActions.preview,
      this.props.bike.get('name')
    )
  }
})

module.exports = BikeItem
