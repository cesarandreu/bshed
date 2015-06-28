import createImmutableStore from '../lib/createImmutableStore'
// import Immutable from 'immutable'

const ApplicationStore = createImmutableStore({
  storeName: 'ApplicationStore',
  handlers: {}
})

export default ApplicationStore
