var React = require('react'),
  LabeledActionButton = require('../../../components/buttons/LabeledActionButton')

var BikeshedBuilderButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },
  render: function () {
    return (
      <LabeledActionButton
        className='bikeshed-builder-button'
        label='Build bikeshed'
        position='left'
        icon='md-add'
        {...this.props} />
    )
  }
})

module.exports = BikeshedBuilderButton
