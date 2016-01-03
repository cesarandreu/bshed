/**
 * UserType
 */
import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  modelField,
  modelGlobalIdField,
  modelIsTypeOf
} from './utils'

export default function getUserType ({ types }) {
  types.UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A user in the application',
    interfaces: [types.nodeInterface],
    isTypeOf: modelIsTypeOf('User'),
    fields () {
      return {
        id: modelGlobalIdField('User'),

        isRegistered: modelField({
          type: new GraphQLNonNull(GraphQLBoolean)
        }),

        name: modelField({
          type: GraphQLString,
          description: 'User name'
        })
      }
    }
  })
}
