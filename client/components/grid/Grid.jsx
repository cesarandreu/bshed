var React = require('react'),
  classnames = require('classnames')

var Grid = React.createClass({
  getInitialState: function () {
    return {
      dragging: false
    }
  },

  render: function () {
    return (
      <div className={classnames('grid', {dragging: this.state.dragging}, this.props.className)}>
        {this.props.children}
      </div>
    )
  },

  onDragEnter: function (e) {
    console.log('e', e)
    this.setState({dragging: true})
    // e.stopPropagation()
    e.preventDefault()
  },

  onDragOver: function (e) {

    this.setState({dragging: true})
    // e.stopPropagation()
    e.preventDefault()
  },

  onDragEnd: function (e) {
    console.log('onDragEnd')
    this.setState({dragging: false})
    // e.stopPropagation()
    e.preventDefault()
  },

  onDragLeave: function (e) {
    this.setState({dragging: false})
    // e.stopPropagation()
    e.preventDefault()
  },

  onDrop: function (e) {
    this.setState({dragging: false})
    // e.stopPropagation()
    e.preventDefault()
    // this.executeAction(BikeshedBuilderAction.addFiles, e.dataTransfer.files)
  }



})

module.exports = Grid
