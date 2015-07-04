const { testdom, cleanup } = require('../../../../lib/test-helper')
const { afterEach, describe, it } = require('mocha')
const BaseButton = require('../BaseButton')
const React = require('react/addons')
const expect = require('expect.js')
const { TestUtils } = React.addons

testdom('<html><body></body></html>')
describe('Component:BaseButton', function () {
  afterEach(cleanup)

  it('sets correct className', function () {
    const button = TestUtils.renderIntoDocument(<BaseButton/>)
    expect(React.findDOMNode(button).className).to.contain('base-button')
  })
})
