const { describe, it } = require('mocha')
const { factories } = require('./helper')
const expect = require('expect.js')

const BIKESHED_SCHEMA_KEYS = [
  'id',
  'UserId',
  'createdAt',
  'updatedAt',
  'description'
]

describe('Model:Bikeshed', function () {
  it('should have expected schema', async function () {
    const bikeshed = await factories.createBikeshed()
    expect(JSON.parse(JSON.stringify(bikeshed)))
      .to.only.have.keys(BIKESHED_SCHEMA_KEYS)
  })
})
