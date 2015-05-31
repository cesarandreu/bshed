require('./bikeshed-builder.less')

const React = require('react/addons')
const BikeItem = require('./BikeItem')
const Immutable = require('immutable')
const Grid = require('../../general/Grid')
const TextField = require('../../general/TextField')
const ActionMixin = require('../../../lib/ActionMixin')
const PureRenderMixin = React.addons.PureRenderMixin
const BikeItemPlaceholder = require('./BikeItemPlaceholder')
const RaisedButton = require('../../general/Buttons/RaisedButton')
const BikeshedBuilderActions = require('../../../actions/BikeshedBuilderActions')

const BikeshedBuilder = React.createClass({
  mixins: [
    ActionMixin,
    PureRenderMixin
  ],

  propTypes: {
    form: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    bikes: React.PropTypes.instanceOf(Immutable.OrderedMap).isRequired
  },

  render () {
    const {form, bikes} = this.props
    return (
      <div className='bikeshed-builder'>
        <div className='bikeshed-builder-content'>
          <TextField
            name='description'
            onChange={this._formChange}
            label='Bikeshed description'
            error={form.getIn(['description', 'error'])}
            value={form.getIn(['description', 'value'])}
            className='bikeshed-builder-description-input'
          />

          <Grid>
            {bikes.map((bike, key) =>
              <BikeItem
                bike={bike}
                key={key}
              />
            ).toArray()}

            <BikeItemPlaceholder
              onClick={this._clickFileInput}
              bikeCount={bikes.count()}
            />
          </Grid>
        </div>
        <div className='bikeshed-builder-actions'>
          <RaisedButton
            label='save'
            secondary={true}
            onClick={this._submit}
            disabled={bikes.count() < 2}
            className='bikeshed-builder-save-button'
          />
        </div>

        <input
          type='file'
          multiple={true}
          ref='fileInput'
          style={{display: 'none'}}
          onChange={this._addFiles}
          accept='image/jpeg,image/png'
        />
      </div>
    )
  },

  _submit () {
    this.executeAction(BikeshedBuilderActions.submit)
  },

  _clickFileInput (e) {
    this.refs.fileInput.getDOMNode().click()
    e.preventDefault()
  },

  _addFiles (e) {
    this.executeAction(BikeshedBuilderActions.add, e.target.files)
  },

  _formChange (e) {
    this.executeAction(BikeshedBuilderActions.formChange, {
      value: e.target.value,
      name: e.target.name
    })
  }
})

module.exports = BikeshedBuilder
