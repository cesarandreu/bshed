/**
 * BikeType
 */
import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import {
  modelField,
  modelGlobalIdField,
  modelIsTypeOf
} from './utils'

export default function getBikeType ({ types }) {
  types.ImageSizeType = new GraphQLEnumType({
    name: 'ImageSize',
    description: 'Available image sizes',
    values: {
      FULL: {
        value: 'full',
        description: 'Full resolution'
      },
      THUMBNAIL: {
        value: 'thumbnail',
        description: 'Thumbnail resolution'
      }
    }
  })

  types.BikeType = new GraphQLObjectType({
    name: 'Bike',
    description: 'An image belonging to a Bikeshed for users to rate',
    interfaces: [types.nodeInterface],
    isTypeOf: modelIsTypeOf('Bike'),
    fields () {
      return {
        height: modelField({
          type: GraphQLInt,
          description: 'Full-sized image height'
        }),

        id: modelGlobalIdField('Bike'),

        key: modelField({
          type: new GraphQLNonNull(GraphQLInt),
          description: 'Key number in the Bikeshed list'
        }),

        name: modelField({
          type: new GraphQLNonNull(GraphQLString),
          description: 'Bike name'
        }),

        // rating: {
        //   type: GraphQLInt,
        //   description: 'User rating on this bike',
        //   resolve (bike, args, { rootValue }) {
        //     // @TODO~
        //   }
        // },

        ratio: modelField({
          type: GraphQLFloat,
          description: 'Image aspect-ratio ( width / height )'
        }),

        score: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'Total sum of ratings for this bike',
          resolve () {
            // @TODO~
          }
        },

        url: {
          type: GraphQLString,
          description: 'Image URL',
          args: {
            size: {
              defaultValue: 'full',
              description: 'Image size options',
              type: types.ImageSizeType
            }
          },
          resolve (bike, { size }, { rootValue }) {
            return bike.getUrl(size)
          }
        },

        width: modelField({
          type: GraphQLInt,
          description: 'Full-sized image width'
        })
      }
    }
  })
}

