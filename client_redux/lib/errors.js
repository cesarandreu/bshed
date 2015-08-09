import TypedError from 'error/typed'

export const ServerError = TypedError({
  type: 'server.5xx',
  message: '{title} server error, status={status}',
  status: null,
  title: null
})

export const ClientError = TypedError({
  type: 'client.4xx',
  message: '{title} client error, status={status}',
  status: null,
  title: null
})
