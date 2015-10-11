/**
 * GraphQL schema
 * @flow
 */
import invariant from 'invariant'
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

// Get the fields for a type
function getFields (info: Object): Array<string> {
  const fieldGraph = getFieldGraph(info.fieldASTs)
  return Object.keys(fieldGraph[info.fieldName])
}

// Get the fields for an edge node
function getEdgeNodeFields (info: Object): Array<string> {
  const fieldGraph = getFieldGraph(info.fieldASTs)
  return Object.keys(fieldGraph[info.fieldName].node)
}

// Get the fields for a connection
function getConnectionFields (info: Object): Array<string> {
  const fieldGraph = getFieldGraph(info.fieldASTs)
  return Object.keys(fieldGraph[info.fieldName].edges.node)
}

// Generate a field graph
// Leaf nodes are empty objects
// Use info.fieldASTs as a starting point
function getFieldGraph (fields = []): Object {
  return fields
    .filter(field => field.kind === 'Field')
    .reduce((result, field) => {
      result[field.name.value] = field.selectionSet
        ? getFieldGraph(field.selectionSet.selections)
        : {}
      return result
    }, {})
}

export default function loadSchema (models: Object) {
  const {
    Bikeshed,
    // User,
    r
  } = models

  const { nodeInterface, nodeField } = nodeDefinitions(
    // ID fetcher
    (globalId, info) => {
      const { type, id } = fromGlobalId(globalId)
      console.log('type', type)
      console.log('id', id)

      return r.table(type).get(id).pluck(getFields(info))
    },

    // Type resolver
    instance => {
      console.log('instance?', instance)
      return null
      // const modelName = instance && instance.Model && instance.Model.name
      // return modelName in types
      //   ? types[modelName]
      //   : null
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
            console.log('creator')
            return await r.table('users').get(bikeshed.userId).pluck(getFields(info))
          }
        }
      }
    },
    interfaces: [nodeInterface]
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
        bikesheds: {
          args: connectionArgs,
          type: BikeshedConnectionType,
          async resolve (user, args, info) {
            const connectionFields = getConnectionFields(info)
            const { after, before, first, last } = args

            // Get the sorted bikeshed list
            const sortedBikeshedsList = r.table('bikesheds')
              .orderBy({ index: r.desc('createdAt') })

            // Get the begin index
            const afterValue = after != null ? after : ''
            const begin = sortedBikeshedsList
              .offsetsOf(r.table('bikesheds').get(afterValue))
              .nth(0)
              .default(-1)
              .do(begin => r.expr([begin, -1]).max())
              .add(1)

            // Get the end index
            const countPlusOne = r.table('bikesheds').count().add(1)
            const beforeValue = before != null ? before : ''
            const end = sortedBikeshedsList
              .offsetsOf(r.table('bikesheds').get(beforeValue))
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
              return {
                edges: [],
                pageInfo: {
                  startCursor: null,
                  endCursor: null,
                  hasPreviousPage: false,
                  hasNextPage: false
                }
              }
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
                node: bikeshed.pluck(connectionFields),
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
    },
    interfaces: [nodeInterface]
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
          type: UserType,
          async resolve ({ userId }, args, info) {
            return await r.table('users').get(userId).pluck(getFields(info))
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
