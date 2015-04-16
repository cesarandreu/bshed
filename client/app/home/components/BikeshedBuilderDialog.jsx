var React = require('react/addons'),
  PureRenderMixin = React.addons.PureRenderMixin,
  Dialog = require('../../../components/dialog/Dialog.jsx'),
  TextField = require('../../../components/inputs/TextField.jsx'),
  DialogPart = require('../../../components/dialog/DialogPart.jsx'),
  FlatButton = require('../../../components/buttons/FlatButton.jsx'),
  RaisedButton = require('../../../components/buttons/RaisedButton.jsx')

var BikeshedBuilderDialog = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    form: React.PropTypes.object.isRequired,
    dialog: React.PropTypes.object.isRequired,
    addFiles: React.PropTypes.func.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    onFormChange: React.PropTypes.func.isRequired
  },

  render () {
    var {form, dialog, closeDialog} = this.props
    var fileInputProps = {
      type: 'file',
      multiple: true,
      ref: 'fileInput',
      style: {display: 'none'},
      onChange: this._addFiles,
      accept: 'image/jpeg,image/png'
    }

    if (!dialog.get('isOpen'))
      return null

    return (
      <Dialog className='bikeshed-builder-dialog' onClose={closeDialog}>
        <DialogPart type='header'>
          Build your bikeshed
        </DialogPart>
        <DialogPart type='body'>
          <RaisedButton label='add bikes' secondary={true} onClick={this._clickFileInput}/>
          <TextField {...form.get('name').toJS()} onChange={this._inputChange}/>
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
