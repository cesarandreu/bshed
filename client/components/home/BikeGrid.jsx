var React = require('react/addons'),
  {FluxibleMixin} = require('fluxible'),
  cx = React.addons.classSet,
  BikeshedBuilderAction = require('../../actions/BikeshedBuilder'),
  Icon = require('../general/Icon.jsx');

var BikeGrid = React.createClass({
  mixins: [FluxibleMixin],
  getInitialState: function () {
    return {
      dragging: false
    }
  },

  render: function () {
    var {bikes} = this.props;

    var items;
    if (bikes.length) {
      items = (bikes.map((b, key) => {
        return (
          <div key={key}>
            <img src={b.url}/>
            <span>{b}</span>
          </div>
        )
      }));
    } else {

      items = (
        <button className='build-bikeshed-button' onTouchTap={this.clickFileInput}>
          <Icon icon='md-cloud-upload' className='build-bikeshed-icon'/>
          <div className='build-bikeshed-message'>
            Click here or drag & drop images to begin
          </div>
        </button>
      );
    }

    var bikeGridProps = {
      className: cx({
        'bike-grid': true,
        'dragging': this.state.dragging
      }),
      onDragLeave: this.onDragLeave,
      onDragEnter: this.onDragEnter,
      onDragOver: this.onDragOver,
      onDrop: this.onDrop
    };

    var wrapperClasses = cx({
      'bike-grid-wrapper': true,
      'empty': !bikes.length
    });

    var fileInputProps = {
      type: 'file',
      multiple: true,
      accept: 'image/*',
      style: {display: 'none'},
      ref: 'fileInput',
      onChange: this.changeFileInput
    }

    return (
      <div {...bikeGridProps}>
        <input {...fileInputProps}/>
        <div className={wrapperClasses}>
          {items}
        </div>
      </div>
    );
  },

  onDragEnter: function (e) {
    this.setState({dragging: true});
    e.stopPropagation();
    e.preventDefault();
  },

  onDragOver: function (e) {
    this.setState({dragging: true});
    e.stopPropagation();
    e.preventDefault();
  },

  onDragLeave: function (e) {
    this.setState({dragging: false});
    e.stopPropagation();
    e.preventDefault();
  },

  onDrop: function (e) {
    this.setState({dragging: false});
    e.stopPropagation();
    e.preventDefault();
    this.executeAction(BikeshedBuilderAction.addFiles, e.dataTransfer.files);
  },

  changeFileInput: function (e) {
    this.executeAction(BikeshedBuilderAction.addFiles, e.target.files);
  },

  clickFileInput: function (e) {
    this.refs.fileInput.getDOMNode().click();
    e.preventDefault();
  }

});

module.exports = BikeGrid;
