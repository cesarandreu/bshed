require('./BikeshedBuilder.less')

import React from 'react'
import Immutable from 'immutable'
const BikeItem = require('../BikeItem')
const Grid = require('../../general/Grid')
const Paper = require('../../general/Paper')
const TextField = require('../../general/TextField')
const ActionMixin = require('../../../lib/ActionMixin')
const BikeItemPlaceholder = require('../BikePlaceholder')
const RaisedButton = require('../../general/Buttons/RaisedButton')
import ImmutableRenderMixin from 'react-immutable-render-mixin'
const BikeshedBuilderActions = require('../../../actions/BikeshedBuilderActions')

const BikeshedBuilder = React.createClass({
  mixins: [
    ActionMixin,
    ImmutableRenderMixin
  ],

  propTypes: {
    form: React.PropTypes.instanceOf(Immutable.Map).isRequired
  },

  render () {
    const {form} = this.props
    const images = form.get('images')
    const imageCount = images.count()

    return (
      <Paper zDepth={1} className='bikeshed-builder'>
        <div className='bikeshed-builder-content'>
          <TextField
            name='description'
            onChange={this._formChange}
            label='Bikeshed description'
            value={form.get('description')}
            className='bikeshed-builder-description-input'
          />

          <Grid>
            {images.map((image, key) =>
              <BikeItem
                bike={image}
                key={key}
              />
            ).toArray()}

            <BikeItemPlaceholder
              onClick={this._clickFileInput}
              itemCount={imageCount}
            />
          </Grid>
        </div>
        <div className='bikeshed-builder-actions'>
          <RaisedButton
            label='save'
            secondary={true}
            onClick={this._submit}
            disabled={imageCount < 2}
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