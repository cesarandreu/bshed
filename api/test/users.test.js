const {request, buildUserHeaders, factories} = require('./helper')
const expect = require('expect.js')

var user
var headers

describe('Request:Users', function () {
  describe('GET /api/users/current', function () {

    beforeEach(async function () {
      user = await factories.createUser()
      headers = buildUserHeaders(user)
    })

    it('returns current user', async function () {
      const res = await request
        .get('/api/users/current')
        .set(headers)
        .expect(200)

      expect(res.body)
        .to.eql(JSON.parse(JSON.stringify(user)))
    })

    it('returns 401 when not logged in', async function () {
      await request
        .get('/api/users/current')
        .expect(401)
    })

  })
})
