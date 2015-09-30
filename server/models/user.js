/**
 * User model
 * Schema:
 *  id
 *  name
 *  email
 *  createdAt
 */
export const INDEXES = []
export const TABLE = 'users'
export const NAME = 'User'

export async function create (r, values = {}) {
  const { generated_keys: [id] } = await r.table(TABLE).insert({
    createdAt: r.now()
  })
  return id
}
