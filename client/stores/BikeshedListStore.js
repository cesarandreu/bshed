var createStore = require('fluxible/utils/createStore');

var BikeshedListStore = createStore({
  storeName: 'BikeshedListStore',
  handlers: {
    // 'UPDATE_LAYOUT': 'updateLayout',
    'FINISHED_NAVIGATION_REQUEST': 'finishedNavigationRequest'
  },
  initialize: function () {
    setProperties(this, {
      direction: 'DESC',
      sortBy: 'id',
      per: 12,
      page: 1,
      pages: 1,
      count: 0,
      list: []
    });
  },

  fetch: function (request, {params, pathname, query}={}) {
    return request.get('/api/bikesheds').query(query);
  },

  finishedNavigationRequest: function ({storeName, res}={}) {
    if (storeName === 'BikeshedListStore') {
      setProperties(this, res.body)
      this.emitChange();
    }
  },

  getState: function () {
    var state = {};
    setProperties(state, this);
    return state;
  },
  dehydrate: function () {
    return this.getState();
  },
  rehydrate: function (state) {
    setProperties(this, state);
  }
});

function setProperties (self, props) {
  self.direction = props.direction;
  self.sortBy = props.sortBy;
  self.per = props.per;
  self.pages = props.pages;
  self.page = props.page;
  self.count = props.count;
  self.list = props.list;
}


module.exports = BikeshedListStore;

          // sortBy: { type: 'string', required: true,
          //   enum: ['id', 'name', 'createdAt', 'updatedAt']
          // },
          // direction: { type: 'string', required: true, enum: ['ASC', 'DESC'] },
          // per: { type: 'number', required: true, minimum: 1, maximum: 96 },
          // pages: { type: 'number', required: true, minimum: 1 },
          // page: { type: 'number', required: true, minimum: 1 },
          // count: { type: 'number', required: true },
          // list: { type: 'array', required: true,
          //   items: { type: 'object',
          //     properties: {
          //       id: { type: 'number', required: true, minimum: 1 },
          //       name: { type: 'string', required: true, minLength: 1 },
          //       body: { type: 'string', required: true, minLength: 1 },
          //       updatedAt: { type: 'string', required: true },
          //       createdAt: { type: 'string', required: true },
          //       status: { type: 'string', required: true,
          //         enum: ['open', 'closed']
          //       }
          //     }
          //   }
          // }
