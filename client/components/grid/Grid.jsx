var React = require('react/addons'),
  classnames = require('classnames')

var Grid = React.createClass({
  getInitialState: function () {
    return {
      dragging: false
    }
  },

  render: function () {

    var gridClasses = classnames('grid', {dragging: this.state.dragging}, this.props.className)

    return (
      <div className={gridClasses}>
        {this.props.items}
      </div>
    )
  },

  onDragEnter: function (e) {
    console.log('e', e)
    this.setState({dragging: true})
    e.stopPropagation()
    e.preventDefault()
  },

  onDragOver: function (e) {

    this.setState({dragging: true})
    e.stopPropagation()
    e.preventDefault()
  },

  onDragLeave: function (e) {
    this.setState({dragging: false})
    e.stopPropagation()
    e.preventDefault()
  },

  onDrop: function (e) {
    this.setState({dragging: false})
    e.stopPropagation()
    e.preventDefault()
    // this.executeAction(BikeshedBuilderAction.addFiles, e.dataTransfer.files)
  }



})

module.exports = Grid
