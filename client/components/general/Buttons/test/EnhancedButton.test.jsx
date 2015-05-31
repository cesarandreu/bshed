var {testdom, cleanup} = require('../../../utils/test-helper'),
  EnhancedButton = require('../EnhancedButton'),
  React = require('react/addons'),
  {expect} = require('chai'),
  {TestUtils} = React.addons,
  button

testdom('<html><body></body></html>')

describe('EnhancedButton', function () {
  afterEach(cleanup)

  it('works', function () {
    button = TestUtils.renderIntoDocument(<EnhancedButton/>)
    expect(true).to.equal(true)
  })

  it('is true', function () {
    expect(true).to.equal(true)
  })

  it('is false', function () {
    expect(false).to.equal(false)
  })

})
