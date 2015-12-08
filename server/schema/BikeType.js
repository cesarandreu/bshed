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
    fields () {
      return {
        description: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Bike description'
        },

        height: {
          type: GraphQLInt,
          description: 'Full-sized image height'
        },

        name: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Bike name'
        },

        rating: {
          type: GraphQLInt,
          description: 'User rating on this bike',
          resolve (bike, args, { rootValue }) {
            // @TODO~
          }
        },

        ratio: {
          type: GraphQLFloat,
          description: 'Image aspect-ratio ( width / height )'
        },

        score: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'Total sum of ratings for this bike',
          resolve () {
            // @TODO~
          }
        },

        url: {
          type: GraphQLString,
          description: 'Full size URL',
          args: {
            size: {
              defaultValue: 'full',
              description: 'Image size options',
              type: types.ImageSizeType
            }
          },
          resolve ({ bikeshedId, outputLocation, outputName }, { size }, { rootValue }) {
            const { imageRoot } = rootValue
            return `${imageRoot}/${outputLocation}/${size}/${outputName}`
          }
        },

        width: {
          type: GraphQLInt,
          description: 'Full-sized image width'
        }
      }
    }
  })
}

