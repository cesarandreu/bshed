import NavigateConstants from '../constants/NavigateConstants'
import { ClientError } from '../lib/errors'

export default async function navigateAction (context, payload) {
  // const { location, branch, components, params } = payload
  const { location, branch, components } = payload
  context.dispatch(NavigateConstants.START, { ...payload })

  if (!components || !branch) {
    const err = ClientError({
      title: `URL ${location.pathname} does not match any routes`,
      status: 404
    })
    context.dispatch(NavigateConstants.FAILURE, err)
    throw err
  }

  context.dispatch(NavigateConstants.SUCCESS, { ...payload })
}
