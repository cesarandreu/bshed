var React = require('react/addons'),
  BikeItem = require('./BikeItem'),
  PureRenderMixin = React.addons.PureRenderMixin,
  Grid = require('../../../components/grid/Grid'),
  Dialog = require('../../../components/dialog/Dialog'),
  TextField = require('../../../components/inputs/TextField'),
  DialogPart = require('../../../components/dialog/DialogPart'),
  FlatButton = require('../../../components/buttons/FlatButton'),
  RaisedButton = require('../../../components/buttons/RaisedButton')

var BikeshedBuilderDialog = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    form: React.PropTypes.object.isRequired,
    bikes: React.PropTypes.object.isRequired,
    dialog: React.PropTypes.object.isRequired,
    addFiles: React.PropTypes.func.isRequired,
    onBikeClear: React.PropTypes.func.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    onFormChange: React.PropTypes.func.isRequired
  },

  render () {
    var {form, bikes, dialog, closeDialog, onBikeClear} = this.props
    var fileInputProps = {
      type: 'file',
      multiple: true,
      ref: 'fileInput',
      style: {display: 'none'},
      onChange: this._addFiles,
      accept: 'image/jpeg,image/png'
    }
    var titleInputProps = {
      className: 'bikeshed-builder-dialog-title-input',
      onChange: this._inputChange,
      ...form.get('title').toJS()
    }

    if (!dialog.get('isOpen'))
      return null

    return (
      <Dialog className='bikeshed-builder-dialog' onClose={closeDialog}>
        <DialogPart type='header'>
          Build your bikeshed
        </DialogPart>
        <DialogPart type='body'>
          <TextField {...titleInputProps}/>
          <Grid>
            {bikes.map((bike, key) =>
              <BikeItem
                onBikeClear={onBikeClear}
                bike={bike}
                key={key}/>
            ).toArray()}
          </Grid>
          <RaisedButton label='add bikes' secondary={true} onClick={this._clickFileInput}/>
        </DialogPart>
        <DialogPart type='footer'>
          <FlatButton label='discard' secondary={true}/>
          <FlatButton label='save' secondary={true} disabled={true}/>
        </DialogPart>

        <input {...fileInputProps}/>
      </Dialog>
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

module.exports = BikeshedBuilderDialog
