/**
 * UserType
 */
import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import {
  connectionArgs,
  globalIdField
} from 'graphql-relay'
import * as SchemaUtils from './utils'

export default function getUserType ({ types }) {
  types.UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A user in the application',
    fields () {
      return {
        bikesheds: {
          args: connectionArgs,
          type: types.BikeshedConnectionType,
          async resolve (user, args, { rootValue: { models } }) {
            const { after, before, first, last } = args
            const { Bikeshed, r } = models

            // Get the sorted bikeshed list
            const sortedBikeshedsList = r.table(Bikeshed.TABLE)
              .orderBy({ index: r.desc('createdAt') })

            // Get the begin index
            const afterValue = after != null ? after : ''
            const begin = sortedBikeshedsList
              .offsetsOf(r.table(Bikeshed.TABLE).get(afterValue))
              .nth(0)
              .default(-1)
              .do(begin => r.expr([begin, -1]).max())
              .add(1)

            // Get the end index
            const countPlusOne = r.table(Bikeshed.TABLE).count().add(1)
            const beforeValue = before != null ? before : ''
            const end = sortedBikeshedsList
              .offsetsOf(r.table(Bikeshed.TABLE).get(beforeValue))
              .nth(0)
              .default(countPlusOne)
              .do(end => r.expr([end, countPlusOne]).min())

            // Slice with cursors
            const slicedBikeshedsList = sortedBikeshedsList
              .slice(begin, end)

            // Slice with limits
            let bikesheds = slicedBikeshedsList
            if (first != null) {
              bikesheds = bikesheds.slice(0, first)
            }
            if (last != null) {
              bikesheds = bikesheds.slice(-last)
            }

            // Stop if we don't have any bikesheds
            const bikeshedCount = await bikesheds.count()
            if (bikeshedCount === 0) {
              return SchemaUtils.getEmptyConnection()
            }

            // Get the edges and cursors
            // We execute em in parallel for better performance
            const [
              firstPresliceCursor,
              lastPresliceCursor,
              edges
            ] = await Promise.all([
              slicedBikeshedsList.nth(0).getField('id'),
              slicedBikeshedsList.nth(-1).getField('id'),
              bikesheds.map(bikeshed => ({
                node: bikeshed,
                cursor: bikeshed('id')
              }))
            ])

            // Construct the connection
            const firstCursor = edges[0].cursor
            const lastCursor = edges[edges.length - 1].cursor
            return {
              edges: edges,
              pageInfo: {
                startCursor: firstCursor,
                endCursor: lastCursor,
                hasPreviousPage: firstCursor !== firstPresliceCursor,
                hasNextPage: lastCursor !== lastPresliceCursor
              }
            }
          }
        },

        id: globalIdField('User'),

        isRegistered: {
          type: GraphQLBoolean,
          resolve (user) {
            return Boolean(user.registeredAt)
          }
        },

        name: {
          type: GraphQLString,
          description: 'User name'
        },

        registeredAt: {
          type: GraphQLString,
          description: 'Datetime user registered at'
        }
      }
    },
    interfaces: [types.nodeInterface]
  })
}
