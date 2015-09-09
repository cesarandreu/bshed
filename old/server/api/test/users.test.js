import { request, buildUserHeaders, factories } from './helper'
import { describe, it } from 'mocha'
import expect from 'expect.js'

describe('Request:Users', () => {
  describe('GET /api/users/current', () => {
    it('returns current user', async () => {
      const user = await factories.createUser()
      const headers = buildUserHeaders(user)

      const res = await request
        .get('/api/users/current')
        .set(headers)
        .expect(200)

      expect(res.body).to.eql(JSON.parse(JSON.stringify(user)))
    })

    it('creates a user for you', async () => {
      await request
        .get('/api/users/current')
        .expect(200)
    })
  })
})
