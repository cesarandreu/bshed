/**
 * GraphQL schema
 * @flow
 */
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql'
import {
  connectionArgs,
  connectionDefinitions,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions
} from 'graphql-relay'
import mime from 'mime'
import invariant from 'invariant'
import * as SchemaUtils from '@server/lib/schema-utils'

export default function loadSchema (models: Object) {
  const {
    Bikeshed,
    User,
    Vote,
    r
  } = models

  // ID fetcher
  async function idFetcher (globalId, info) {
    const { type, id } = fromGlobalId(globalId)
    const model = models[type]
    invariant(model, `Unknown type "${type}"`)

    const instance = await model.get(id)
    invariant(instance, `Unable to find type "${type}" with id "${id}"`)

    return {
      TYPE: model.TYPE,
      ...instance
    }
  }

  const { nodeInterface, nodeField } = nodeDefinitions(
    // ID fetcher
    idFetcher,

    // Type resolver
    instance => {
      switch (instance.TYPE) {
        case 'Bikeshed':
          return BikeshedType
        case 'User':
          return UserType
        // case 'Vote':
        //   return VoteType
      }
    }
  )

  // @TODO: bikes, voteCount
  const BikeshedType = new GraphQLObjectType({
    name: 'Bikeshed',
    description: 'A collection of bikes for users to rate',
    fields () {
      return {
        id: globalIdField('Bikeshed'),
        description: {
          type: GraphQLString,
          description: 'Bikeshed description'
        },
        creator: {
          type: UserType,
          description: 'User that created the bikeshed',
          async resolve (bikeshed, args, info) {
            return await User.get(bikeshed.userId)
          }
        },
        voteCount: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'Number of votes on the bikeshed',
          resolve ({ id }) {
            return Vote.bikeshedCount(id)
          }
        },
        hasVoted: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: 'If the user can vote on this bikeshed',
          resolve (bikeshed, args, { rootValue }) {
            return Vote.hasVoted(rootValue.userId, bikeshed.id)
          }
        },
        bikes: {
          type: new GraphQLList(BikeType),
          description: 'Images that users are rating',
          async resolve (bikeshed, args, info) {
            const { userId } = info.rootValue
            const fields = SchemaUtils.getFields(info)
            const [scores, ratings] = await Promise.all([
              fields.includes('score')
                ? Vote.bikeshedScores(bikeshed.id)
                : [],
              fields.includes('rating')
                ? Vote.bikeshedUserRatings(userId, bikeshed.id)
                : []
            ])

            return bikeshed.fileList.map((file, idx) => ({
              bikeshedId: bikeshed.id,
              userId: bikeshed.userId,
              rating: ratings[idx],
              score: scores[idx],
              ...file
            }))
          }
        }
      }
    },
    interfaces: [nodeInterface]
  })

  const BikeType = new GraphQLObjectType({
    name: 'Bike',
    description: 'An image belonging to a Bikeshed for users to rate',
    fields () {
      return {
        rating: {
          type: GraphQLInt,
          description: 'User rating on this bike'
        },
        score: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'Total sum of ratings for this bike',
          resolve ({ score }) {
            return score || 0
          }
        },
        fullUrl: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Full size URL',
          resolve ({ userId, bikeshedId, fieldname, mimetype }, args, info) {
            const { IMAGE_ROOT } = info.rootValue
            const extension = mime.extension(mimetype)
            return `${IMAGE_ROOT}/${userId}/${bikeshedId}/${fieldname}.full.${extension}`
          }
        },
        thumbnailUrl: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Thumbnail size URL',
          resolve ({ userId, bikeshedId, fieldname, mimetype }, args, info) {
            const { IMAGE_ROOT } = info.rootValue
            const extension = mime.extension(mimetype)
            return `${IMAGE_ROOT}/${userId}/${bikeshedId}/${fieldname}.thumbnail.${extension}`
          }
        }
      }
    }
  })

  const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A user in the application',
    fields () {
      return {
        id: globalIdField('User'),
        name: {
          type: GraphQLString,
          description: 'User name'
        },
        registeredAt: {
          type: GraphQLString,
          description: 'Datetime user registered at'
        },
        isRegistered: {
          type: GraphQLBoolean,
          resolve (user) {
            return Boolean(user.registeredAt)
          }
        }
      }
    },
    interfaces: [nodeInterface]
  })

  const ViewerType = new GraphQLObjectType({
    name: 'Viewer',
    description: 'Person that is querying',
    fields () {
      return {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          resolve ({ userId }) {
            return userId
          }
        },
        user: {
          type: UserType,
          resolve ({ userId }, args, info) {
            return User.get(userId)
          }
        },
        bikesheds: {
          args: connectionArgs,
          type: BikeshedConnectionType,
          async resolve (user, args, info) {
            const { after, before, first, last } = args

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
        }
      }
    }
  })

  // Connections
  const {
    connectionType: BikeshedConnectionType,
    edgeType: BikeshedEdgeType
  } = connectionDefinitions({
    name: 'Bikeshed',
    nodeType: BikeshedType
  })

  // Mutations
  const CreateBikeshedMutation = mutationWithClientMutationId({
    name: 'CreateBikeshed',
    inputFields: {
      description: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    outputFields: {
      bikeshedEdge: {
        type: BikeshedEdgeType,
        async resolve ({ bikeshedId }, args, info) {
          const bikeshed = await Bikeshed.get(bikeshedId)
          return {
            cursor: bikeshedId,
            node: bikeshed
          }
        }
      },
      viewer: {
        type: ViewerType,
        resolve (_, args, { rootValue }) {
          return rootValue
        }
      }
    },
    async mutateAndGetPayload ({ clientMutationId, ...inputFields }, { rootValue }) {
      const { userId, requestId, files, createImageJob } = rootValue
      const fileList = Object.values(files)

      const bikeshedId = await Bikeshed.create({
        ...inputFields,
        requestId,
        fileList,
        userId
      })

      createImageJob({
        bikeshedId,
        fileList,
        requestId,
        userId
      })

      return {
        bikeshedId
      }
    }
  })

  // Root types
  const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields () {
      return {
        createBikeshed: CreateBikeshedMutation
      }
    }
  })

  const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields () {
      return {
        viewer: {
          type: ViewerType,
          resolve (rootValue) {
            return rootValue
          }
        },
        node: nodeField
      }
    }
  })

  return new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
  })
}
