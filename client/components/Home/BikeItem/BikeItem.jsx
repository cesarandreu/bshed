require('./BikeItem.less')

const React = require('react/addons')
const Immutable = require('immutable')
const GridItem = require('../../general/GridItem')
const BikeImage = require('../../shared/BikeImage')
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
    return (
      <GridItem>
        <div className='bike-item-wrapper'>
          <BikeImage
            onClick={this._preview}
            className='bike-item-image'
            height={bike.getIn(['size', 'height'])}
            width={bike.getIn(['size', 'width'])}
            name={bike.get('name')}
            url={bike.get('url')}
          />
          <IconButton
            onClick={this._remove}
            className='bike-item-clear'
            icon='md-clear'
          />
        </div>
      </GridItem>
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
