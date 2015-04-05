var React = require('react/addons'),
  {PureRenderMixin} = React.addons.PureRenderMixin,
  TextField = require('../../components/inputs/TextField.jsx')

var BikeshedBuilderForm = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    form: React.PropTypes.object.isRequired,
    onFormChange: React.PropTypes.func.isRequired
  },

  render: function () {
    var {form} = this.props

    return (
      <div className='bikeshed-builder-form'>
        <TextField name='name' {...form.name} onChange={this._onChange}/>
      </div>
    )
  },

  _onChange: function (e) {
    this.props.onFormChange({
      value: e.target.value,
      name: e.target.name
    })
  }

})

module.exports = BikeshedBuilderForm
