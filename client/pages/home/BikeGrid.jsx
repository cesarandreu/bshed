var React = require('react'),
  {FluxibleMixin} = require('fluxible'),
  classnames = require('classnames'),
  BikeshedBuilderAction = require('../../actions/BikeshedBuilder'),
  IconButton = require('../../components/buttons/IconButton.jsx')

var BikeGrid = React.createClass({
  mixins: [FluxibleMixin],
  getInitialState: function () {
    return {
      dragging: false
    }
  },

  render: function () {
    var {bikes} = this.props
    var items = bikes.map((bike, key) => {
      return (
        <div className='bike-item' key={key}>
          <div className='bike-item-image'>
            <img src={bike.url}/>
          </div>
          <div className='bike-item-info'>
            <div className='bike-item-name'>{bike.name}</div>
            <IconButton className='bike-item-action' icon='md-info'/>

          </div>

        </div>
      )
    })

    var bikeGridProps = {
      className: classnames('bike-grid', {'dragging': this.state.dragging}),
      onDragEnd: this.onDragEnd,
      onDragLeave: this.onDragLeave,
      onDragEnter: this.onDragEnter,
      onDrop: this.onDrop
    }

    var wrapperClasses = classnames('bike-grid-wrapper', {'empty': !bikes.length})

    return (
      <div {...bikeGridProps}>
        <div className={wrapperClasses}>
          {items}
        </div>
      </div>
    )
  },

  onDragEnd: function (e) {
    console.log('onDragEnd')
    this.setState({dragging: false})
    // e.stopPropagation()
    e.preventDefault()
  },

  onDragEnter: function (e) {
    console.log('onDragEnter')
    this.setState({dragging: true})
    // e.stopPropagation()
    e.preventDefault()
  },

  onDragOver: function (e) {
    console.log('onDragOver')
    this.setState({dragging: true})
    // e.stopPropagation()
    e.preventDefault()
  },

  onDragLeave: function (e) {
    console.log('onDragLeave')
    this.setState({dragging: false})
    // e.stopPropagation()
    e.preventDefault()
  },

  onDrop: function (e) {
    console.log('onDrop')
    this.setState({dragging: false})
    // e.stopPropagation()
    e.preventDefault()
    this.executeAction(BikeshedBuilderAction.addFiles, e.dataTransfer.files)
  }

})

module.exports = BikeGrid
