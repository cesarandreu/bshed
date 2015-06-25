const { testdom, cleanup } = require('../../../../lib/test-helper')
const { afterEach, describe, it } = require('mocha')
const ActionButton = require('../ActionButton')
const React = require('react/addons')
const expect = require('expect.js')
const { TestUtils } = React.addons

testdom('<html><body></body></html>')
describe('Component:ActionButton', function () {
  afterEach(cleanup)

  it('sets correct classNames', function () {
    const button = TestUtils.renderIntoDocument(<ActionButton icon='foo'/>)
    expect(React.findDOMNode(button).className).to.contain('action-button')

    const icon = TestUtils.findRenderedDOMComponentWithClass(button, 'icon')
    expect(React.findDOMNode(icon).className).to.contain('foo')
  })
})
