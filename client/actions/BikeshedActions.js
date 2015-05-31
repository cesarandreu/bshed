const BikeshedApiUtils = require('../utils/BikeshedApiUtils')
const BikeshedStore = require('../stores/BikeshedStore')

exports.infoNavigateAction = async function infoNavigateAction (context, state) {
  const {bikeshedId} = state.params

  context.dispatch('BIKESHED_INFO_START', bikeshedId)
  const request = context.executeRequest(
    BikeshedApiUtils.fetchBikeshedInfo,
    {bikeshedId}
  )
  .then(request => {
    context.dispatch('BIKESHED_INFO_RECEIVED', request.parsedBody)
  }, request => {
    context.dispatch('BIKESHED_INFO_ERROR', request)
    context.router.transitionTo('bikeshed-list')
  })

  if (context.getStore(BikeshedStore).waitForInfo(bikeshedId))
    await request
}

exports.listNavigateAction = async function listNavigateAction (context, state) {
  context.dispatch('BIKESHED_LIST_START', state.query)
  const request = context.executeRequest(
    BikeshedApiUtils.fetchBikeshedList,
    state.query
  )
  .then(request => {
    context.dispatch('BIKESHED_LIST_RECEIVED', request.parsedBody)
  }, request => {
    context.dispatch('BIKESHED_LIST_ERROR', request)
    context.router.transitionTo('home')
  })

  // if (context.getStore(BikeshedStore).waitForList(state.query))
  await request
}
