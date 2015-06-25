require('./RegularPage.less')
import React from 'react'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const RegularPage = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    children: React.PropTypes.node.isRequired
  },

  render () {
    return (
      <div className='regular-page'>
        {this.props.children}
      </div>
    )
  }
})

module.exports = RegularPage
