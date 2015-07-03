import NavigateConstants from '../constants/NavigateConstants'
import { ClientError } from '../lib/errors'

export default async function navigateAction (context, { location, state }) {
  // console.log('payload', location, state)
  context.dispatch(NavigateConstants.START, { location, state })

  if (!state) {
    const err = ClientError({
      title: `URL ${location.pathname} does not match any routes`,
      status: 404
    })
    context.dispatch(NavigateConstants.FAILURE, err)
    throw err
  }

  context.dispatch(NavigateConstants.SUCCESS, state)
}
