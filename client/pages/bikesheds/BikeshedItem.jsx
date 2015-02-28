var React = require('react')

var BikeshedItem = React.createClass({
  statics: {
    navigationData: function () {
      return {}
    }
  },
  propTypes: {
    bikeshed: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      body: React.PropTypes.string.isRequired,
      size: React.PropTypes.number.isRequired,
      status: React.PropTypes.string.isRequired
    })
  },
  render: function () {
    var {name, body, size, status} = this.props.bikeshed
    return (
      <div className='bikeshed-item'>
        <div className='bikeshed-item-status'>{status}</div>
        <div className='bikeshed-item-name'>{name}</div>
        <div className='bikeshed-item-body'>{body}</div>
        <div className='bikeshed-item-size'>{size}</div>
      </div>
    )
  }
})

module.exports = BikeshedItem
