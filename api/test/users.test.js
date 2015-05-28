const {request, buildUserHeaders, factories} = require('./helper')
const expect = require('expect.js')

describe('Request:Users', function () {
  describe('GET /api/users/current', function () {
    it('returns current user', async function () {
      const user = await factories.createUser()
      const headers = buildUserHeaders(user)

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