module.exports = {
  // GET /api/bikesheds
  index: {
    title: 'GET /api/bikesheds response',
    type: 'object',
    properties: {
      sortBy: { type: 'string', required: true,
        enum: ['id', 'name', 'createdAt', 'updatedAt']
      },
      direction: { type: 'string', required: true, enum: ['ASC', 'DESC'] },
      per: { type: 'number', required: true, minimum: 1, maximum: 96 },
      pages: { type: 'number', required: true, minimum: 1 },
      page: { type: 'number', required: true, minimum: 1 },
      count: { type: 'number', required: true },
      list: { type: 'array', required: true,
        items: { type: 'object',
          properties: {
            id: { type: 'number', required: true, minimum: 1 },
            name: { type: 'string', required: true, minLength: 1 },
            body: { type: 'string', required: true, minLength: 1 },
            size: { type: 'number', required: true, minimum: 0 },
            updatedAt: { type: 'string', required: true },
            createdAt: { type: 'string', required: true },
            status: { type: 'string', required: true,
              enum: ['open', 'closed']
            }
          }
        }
      }
    }
  },

  // POST /api/bikesheds
  create: {
    title: 'POST /api/bikesheds response',
    type: 'object',
    properties: {
      id: { type: 'number', required: true, minimum: 1 },
      name: { type: 'string', required: true, minLength: 1 },
      body: { type: 'string', required: true, minLength: 1 },
      updatedAt: { type: 'string', required: true },
      createdAt: { type: 'string', required: true },
      status: { type: 'string', required: true,
        enum: ['incomplete', 'open', 'closed']
      }
    }
  },

  // GET /api/bikesheds/:bikeshed
  show: {
    title: 'GET /api/bikesheds/:bikeshed response',
    type: 'object',
    properties: {
      id: { type: 'number', required: true },
      name: { type: 'string', required: true },
      body: { type: 'string', required: true },
      status: { type: 'string', required: true,
        enum: ['incomplete', 'open', 'closed']
      }
    }
  },

  // POST /api/bikesheds/:bikeshed
  add: {
    title: 'POST /api/bikesheds/:bikeshed response',
    type: 'object',
    properties: {
      id: { type: 'number', required: true },
      name: { type: 'string', required: true },
      body: { type: 'string', required: true },
      score: { type: 'number', required: true },
      imageName: { type: ['string', 'null'], required: true },
      imageType: { type: ['string', 'null'], required: true }
    }
  }
}
