const {factories} = require('./helper')
const expect = require('expect.js')

const VOTE_SCHEMA_KEYS = [
  'id',
  'UserId',
  'createdAt',
  'updatedAt',
  'BikeshedId'
]

describe('Model:Vote', function () {

  it('should have expected schema', async function () {
    const vote = await factories.createVote()
    expect(JSON.parse(JSON.stringify(vote)))
      .to.only.have.keys(VOTE_SCHEMA_KEYS)
  })
})
