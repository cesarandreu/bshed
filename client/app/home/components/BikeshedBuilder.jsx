var React = require('react/addons'),
  BikeItem = require('./BikeItem'),
  PureRenderMixin = React.addons.PureRenderMixin,
  Grid = require('../../../components/grid/Grid'),
  BikeItemPlaceholder = require('./BikeItemPlaceholder'),
  TextField = require('../../../components/inputs/TextField'),
  FlatButton = require('../../../components/buttons/FlatButton'),
  RaisedButton = require('../../../components/buttons/RaisedButton')

var BikeshedBuilder = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    form: React.PropTypes.object.isRequired,
    bikes: React.PropTypes.object.isRequired,
    addFiles: React.PropTypes.func.isRequired,
    onBikeClear: React.PropTypes.func.isRequired,
    onFormChange: React.PropTypes.func.isRequired
  },

  render () {
    var {form, bikes, onBikeClear} = this.props
    var fileInputProps = {
      type: 'file',
      multiple: true,
      ref: 'fileInput',
      style: {display: 'none'},
      onChange: this._addFiles,
      accept: 'image/jpeg,image/png'
    }
    var saveButton = {
      label: 'save',
      secondary: true,
      disabled: bikes.count() < 2,
      onClick: this._clickFileInput,
      className: 'bikeshed-builder-save-button'
    }
    var titleInputProps = {
      className: 'bikeshed-builder-title-input',
      onChange: this._inputChange,
      ...form.get('title').toJS()
    }

    return (
      <div className='bikeshed-builder'>
        <div className='bikeshed-builder-content'>
          <TextField {...titleInputProps}/>
          <Grid>
            {bikes.map((bike, key) =>
              <BikeItem
                onBikeClear={onBikeClear}
                bike={bike}
                key={key}/>
            ).toArray()}
            <BikeItemPlaceholder bikes={bikes} onClick={this._clickFileInput}/>
          </Grid>
        </div>
        <div className='bikeshed-builder-actions'>
          <RaisedButton {...saveButton}/>
        </div>
        <input {...fileInputProps}/>
      </div>
    )
  },

  _addFiles: function (e) {
    this.props.addFiles(e.target.files)
  },

  _clickFileInput: function (e) {
    this.refs.fileInput.getDOMNode().click()
    e.preventDefault()
  },

  _inputChange: function (e) {
    this.props.onFormChange({
      value: e.target.value,
      name: e.target.name
    })
  }
})

module.exports = BikeshedBuilder
