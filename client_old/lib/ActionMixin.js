import React from 'react'
const invariant = require('invariant')

/**
 * ActionMixin
 * Adds executeAction to component
 */
const ActionMixin = {
  contextTypes: {
    executeAction: React.PropTypes.func.isRequired
  },

  executeAction (...args) {
    invariant(
      this.context.executeAction,
      'executeAction was called but was not found in the context'
    )
    return this.context.executeAction.apply(this.context, args)
  }
}

module.exports = ActionMixin
