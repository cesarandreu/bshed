import BikeshedBuilderConstants from '../constants/BikeshedBuilderConstants'

export function navigateAction (context) {
  context.dispatch(BikeshedBuilderConstants.RESET)
}

export function inputChange (context, payload) {
  context.dispatch(BikeshedBuilderConstants.INPUT_CHANGE, payload)
}
