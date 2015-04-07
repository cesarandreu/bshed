var React = require('react/addons'),
  PureRenderMixin = React.addons.PureRenderMixin

var Dialog = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    return (
      <div className='dialog-wrapper'>
        <div className='dialog-overlay'></div>

        <div className='dialog-container'>
          <div className='dialog'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Dialog
