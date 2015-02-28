var React = require('react'),
  classnames = require('classnames'),
  Icon = require('../../components/general/Icon.jsx')

var BuildBikeshedButton = React.createClass({
  render: function () {
    var inputProps = {
      type: 'file',
      multiple: true,
      accept: 'image/*',
      ref: 'buildBikeshedInput'
    }

    var buttonClasses = classnames('build-bikeshed-button', this.props.position)

    return (
      <button className={buttonClasses} onTouchTap={this.clickFileInput}>
        <Icon icon='md-cloud-upload' className='build-bikeshed-icon'/>
        {/*<div className='build-bikeshed-message'>
          Click here or drag & drop images to begin
        </div>*/}
        <input {...inputProps} onChange={this.props.fileReceived}/>
      </button>
    )
  },

  clickFileInput: function (e) {
    this.refs.buildBikeshedInput.getDOMNode().click()
    e.preventDefault()
  }

})

module.exports = BuildBikeshedButton
