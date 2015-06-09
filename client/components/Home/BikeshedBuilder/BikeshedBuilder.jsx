require('./BikeshedBuilder.less')

const React = require('react/addons')
const Immutable = require('immutable')
const BikeItem = require('../BikeItem')
const Grid = require('../../general/Grid')
const Paper = require('../../general/Paper')
const TextField = require('../../general/TextField')
const ActionMixin = require('../../../lib/ActionMixin')
const BikeItemPlaceholder = require('../BikePlaceholder')
const RaisedButton = require('../../general/Buttons/RaisedButton')
const ImmutableRenderMixin = require('react-immutable-render-mixin')
const BikeshedBuilderActions = require('../../../actions/BikeshedBuilderActions')

const BikeshedBuilder = React.createClass({
  mixins: [
    ActionMixin,
    ImmutableRenderMixin
  ],

  propTypes: {
    form: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    bikes: React.PropTypes.instanceOf(Immutable.OrderedMap).isRequired
  },

  render () {
    const {form, bikes} = this.props
    return (
      <Paper zDepth={1} className='bikeshed-builder'>
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
      </Paper>
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
