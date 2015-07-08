import './RegularView.less'

import React from 'react'
import ImmutableRenderMixin from 'react-immutable-render-mixin'

const RegularView = React.createClass({
  mixins: [
    ImmutableRenderMixin
  ],

  propTypes: {
    children: React.PropTypes.node.isRequired
  },

  render () {
    const { children } = this.props

    return (
      <div className='regular-view'>
        {children}
      </div>
    )
  }
})

export default RegularView
