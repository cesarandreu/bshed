var {testdom, cleanup} = require('../../../test/helper'),
  ActionButton = require('../ActionButton.jsx'),
  React = require('react/addons'),
  {assert} = require('chai'),
  {TestUtils} = React.addons,
  button

testdom('<html><body></body></html>')

describe('ActionButton', function () {
  afterEach(cleanup)

  it('works as expected', function () {
    button = TestUtils.renderIntoDocument(<ActionButton icon='foo'/>)
    assert(button.getDOMNode().className.includes('action-button'))
  })

})
