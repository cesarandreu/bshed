/**
 * Bikeshed model
 * Schema:
 *  id
 *  description
 *  createdAt
 *  userId
 */
export const INDEXES = ['userId', 'createdAt']
export const TABLE = 'bikesheds'
export const TYPE = 'Bikeshed'

export async function create (r, values = {}) {
  const { userId, description = '' } = values
  const { generated_keys: [id] } = await r.table(TABLE).insert({
    createdAt: r.now(),
    description,
    userId
  })
  return id
}
