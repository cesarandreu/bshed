require('./RegularPage.less')
const React = require('react/addons')
const PureRenderMixin = React.addons.PureRenderMixin

const RegularPage = React.createClass({
  mixins: [
    PureRenderMixin
  ],

  render () {
    return (
      <div className='regular-page'>
        {this.props.children}
      </div>
    )
  }
})

module.exports = RegularPage
