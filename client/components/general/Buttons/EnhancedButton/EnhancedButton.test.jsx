const {testdom, cleanup} = require('../../../../lib/test-helper')
const EnhancedButton = require('../EnhancedButton')
const React = require('react/addons')
const expect = require('expect.js')
const {TestUtils} = React.addons

testdom('<html><body></body></html>')
describe('Component:EnhancedButton', function () {
  afterEach(cleanup)

  it('sets correct className', function () {
    const button = TestUtils.renderIntoDocument(<EnhancedButton/>)
    expect(React.findDOMNode(button).className).to.contain('enhanced-button')
  })
})
