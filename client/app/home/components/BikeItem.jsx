const BIKE_ITEM_SIZE = 160
var cn = require('classnames')
var React = require('react/addons')
var PureRenderMixin = React.addons.PureRenderMixin
var IconButton = require('../../../components/buttons/IconButton')

var BikeItem = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    onBikeClear: React.PropTypes.func.isRequired,
    bike: React.PropTypes.object.isRequired
  },

  render: function () {
    var {bike} = this.props
    var {width, height} = bike.get('size')
    var imageClass = cn('bike-item-image', {
      small: width < BIKE_ITEM_SIZE || height < BIKE_ITEM_SIZE,
      square: width === height,
      longer: height > width,
      wider: width > height
    })

    return (
      <div className='bike-item'>
        <IconButton className='bike-item-clear' icon='md-clear' onClick={this._onBikeClear}/>
        <div className={cn('bike-item-image', imageClass)}>
          <img src={bike.get('url')} alt={bike.get('file').name}/>
        </div>
      </div>
    )
  },

  _onBikeClear: function () {
    this.props.onBikeClear(this.props.bike.get('name'))
  },

  _onBikeClick: function () {
    this.props.onBikeClick(this.props.bike.get('name'))
  }

})

module.exports = BikeItem
