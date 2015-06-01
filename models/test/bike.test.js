const {factories} = require('./helper')
const expect = require('expect.js')

const BIKE_SCHEMA_KEYS = [
  'id',
  'name',
  'size',
  'type',
  'width',
  'height',
  'createdAt',
  'updatedAt',
  'BikeshedId'
]

describe('Model:Bike', function () {

  it('should have expected schema', async function () {
    const bike = await factories.createBike()
    expect(JSON.parse(JSON.stringify(bike)))
      .to.only.have.keys(BIKE_SCHEMA_KEYS)
  })
})
