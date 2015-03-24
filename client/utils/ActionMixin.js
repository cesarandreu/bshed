var React = require('react')

var ActionMixin = {
  contextTypes: {
    executeAction: React.PropTypes.func.isRequired
  },

  executeAction: function executeAction (...args) {
    if (!this.context.executeAction)
      throw new Error('executeAction was called but was not found in the context')
    return this.context.executeAction.apply(this.context, args)
  }
}

module.exports = ActionMixin
