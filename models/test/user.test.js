const {factories} = require('./helper')
const expect = require('expect.js')

const USER_SCHEMA_KEYS = [
  'id',
  'name',
  'createdAt',
  'updatedAt',
  'registered'
]

describe('Model:User', function () {
  it('should have expected schema', async function () {
    const user = await factories.createUser()
    expect(JSON.parse(JSON.stringify(user)))
      .to.only.have.keys(USER_SCHEMA_KEYS)
  })
})
