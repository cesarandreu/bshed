var React = require('react'),
  LabeledActionButton = require('../../../components/buttons/LabeledActionButton')

var AddBikeButton = React.createClass({
  propTypes: {
    inputChange: React.PropTypes.func.isRequired
  },
  render: function () {
    var buttonProps = {
      onClick: this.clickInput,
      className: 'add-bike-button',
      icon: 'md-add',
      label: 'Add bike',
      position: 'top'
    }
    var inputProps = {
      onChange: this.props.inputChange,
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
