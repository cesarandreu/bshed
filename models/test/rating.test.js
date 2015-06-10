const {factories} = require('./helper')
const expect = require('expect.js')

const RATING_SCHEMA_KEYS = [
  'id',
  'value',
  'BikeId',
  'VoteId',
  'createdAt',
  'updatedAt'
]

describe('Model:Rating', function () {
  it('should have expected schema', async function () {
    const rating = await factories.createRating()
    expect(JSON.parse(JSON.stringify(rating)))
      .to.only.have.keys(RATING_SCHEMA_KEYS)
  })
})
