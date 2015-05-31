const {request, buildUserHeaders, factories, fixtures} = require('./helper')
const expect = require('expect.js')

describe('Request:Bikesheds', function () {
  describe('GET /api/bikesheds', function () {
    it('returns a list of bikesheds', async function () {
      const res = await request
        .get('/api/bikesheds')
        .expect(200)

      expect(res.body)
        .to.be.an('array')

      res.body
        .forEach(checkBikeshedStructure)
    })
  })

  describe('POST /api/bikesheds', function () {
    it('lets you create bikeshed and returns 201', async function () {
      const user = await factories.createUser()
      const headers = buildUserHeaders(user)

      const res = await request
        .post('/api/bikesheds')
        .set(headers)
        .attach('puppy_01.jpg', `${fixtures}/puppy_01.jpg`)
        .attach('puppy_02.jpg', `${fixtures}/puppy_02.jpg`)
        .expect(201)

      checkBikeshedStructure(res.body)

      expect(res.body.Bikes)
        .to.have.length(2)
    })

    it('fails with < 2 file', async function () {
      const user = await factories.createUser()
      const headers = buildUserHeaders(user)

      await request
        .post('/api/bikesheds')
        .set(headers)
        .attach('puppy_01.jpg', `${fixtures}/puppy_01.jpg`)
        .expect(422)

      await request
        .post('/api/bikesheds')
        .set(headers)
        .expect(422)
    })
  })

  describe('GET /api/bikesheds/:bikeshed', function () {
    it('returns a bikeshed with bikes and votes', async function () {
      const {bikeshed} = await factories.createPopulatedBikeshed()

      const res = await request
        .get(`/api/bikesheds/${bikeshed.id}`)
        .expect(200)

      checkBikeshedStructure(res.body)

      expect(res.body.Bikes)
        .to.have.length(2)
    })
  })

  describe('POST /api/bikesheds/:bikeshed/votes', function () {
    it('allows you to vote', async function () {
      const {bikeshed, bikes} = await factories.createPopulatedBikeshed()
      const user = await factories.createUser()
      const headers = buildUserHeaders(user)

      const ratings = bikes.map((bike, idx) => {
        return {
          BikeId: bike.id,
          value: idx + 1
        }
      })

      const res = await request
        .post(`/api/bikesheds/${bikeshed.id}/votes`)
        .send({ratings})
        .set(headers)
        .expect(201)

      checkBikeshedStructure(res.body)
    })

    it('returns 409 when you already voted', async function () {
      const {bikeshed, bikes, votes} = await factories.createPopulatedBikeshed()
      const headers = buildUserHeaders({
        id: votes[0].UserId
      })

      const ratings = bikes.map((bike, idx) => {
        return ({
          BikeId: bike.id,
          value: idx + 1
        })
      })

      await request
        .post(`/api/bikesheds/${bikeshed.id}/votes`)
        .send({ratings})
        .set(headers)
        .expect(409)
    })
  })
})

function checkBikeshedStructure (bikeshed) {
  expect(bikeshed)
    .to.be.an('object')

  expect(bikeshed)
    .to.only.have.keys([
      'description',
      'updatedAt',
      'createdAt',
      'UserId',
      'Bikes',
      'votes',
      'User',
      'id'
    ])

  expect(bikeshed.User)
    .to.be.an('object')

  expect(bikeshed.User)
    .to.only.have.keys([
      'registered',
      'name',
      'id'
    ])

  expect(bikeshed.Bikes)
    .to.be.an('array')

  bikeshed.Bikes.forEach(bike => {
    expect(bike)
      .to.be.an('object')

    expect(bike)
      .to.only.have.keys([
        'rating',
        'score',
        'type',
        'name',
        'size',
        'id'
      ])
  })
}
