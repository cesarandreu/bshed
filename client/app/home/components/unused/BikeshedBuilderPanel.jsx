var React = require('react')

var BikeshedBuilderPanel = React.createClass({
  render: function () {
    return (
      <div className='bikeshed-builder-panel-container'>
        <div className='bikeshed-builder-panel'>
          {this.props.children}
        </div>
      </div>
    )
  }
})

module.exports = BikeshedBuilderPanel
