var React = require('react'),
  {FluxibleMixin} = require('fluxible'),
  LabeledActionButton = require('../../components/buttons/LabeledActionButton.jsx')

var AddBikeButton = React.createClass({
  mixins: [FluxibleMixin],
  render: function () {
    var buttonProps = {
      onTouchTap: this.clickInput,
      className: 'add-bike-button',
      icon: 'md-cloud-upload',
      label: 'Add bike'
    }
    var inputProps = {
      onChange: this.inputChange,
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
  },

  inputChange: function (e) {
    console.log('FILE RECEIVED', e)
  }
})

module.exports = AddBikeButton
