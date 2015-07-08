/* @flow */
import React from 'react'
import invariant from 'invariant'

/**
 * ActionMixin
 * Adds executeAction to component
 */
const ActionMixin = {
  contextTypes: {
    executeAction: React.PropTypes.func.isRequired
  },

  executeAction (action: Function, payload: any): void {
    invariant(
      this.context.executeAction,
      `executeAction not found in the context`
    )
    this.context.executeAction(action, payload)
  }
}

export default ActionMixin
