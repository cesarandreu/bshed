var React = require('react'),
  LabeledActionButton = require('../../components/buttons/LabeledActionButton.jsx')

var AddBikeButton = React.createClass({

  render: function () {
    var buttonProps = {
      onTouchTap: this.clickInput,
      className: 'add-bike-button',
      icon: 'md-cloud-upload',
      label: 'Add bike'
    }
    var inputProps = {
      onChange: this.props.fileReceived,
      ref: 'fileInput',
      type: 'file',
      multiple: true,
      accept: 'image/*'
    }

    return (
      <LabeledActionButton {...buttonProps}>
        <input {...inputProps}/>
      </LabeledActionButton>
    )
  },

  clickInput: function (e) {
    this.refs.fileInput.getDOMNode().click()
    e.preventDefault()
  }
})

module.exports = AddBikeButton
