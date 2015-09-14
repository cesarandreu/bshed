/**
 * User
 * @flow
 */
import { comparePassword } from '../lib/password'

export default function createUser (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        max: 255,
        notEmpty: true
      }
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      roles: false
    },
    hashedPassword: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      roles: false
    },
    registeredAt: {
      type: DataTypes.DATE,
      roles: false
    }
  }, {
    getterMethods: {
      /**
       * User's registration status
       */
      isRegistered (): boolean {
        return !!this.getDataValue('registeredAt')
      }
    },

    instanceMethods: {
      /**
       * Get password validity
       */
      checkPassword (password: string): Promise {
        return comparePassword(password, this.getDataValue('hashedPassword'))
      }
    },

    classMethods: {
      associate (models: Object) {
        User.Bikesheds = User.hasMany(models.Bikeshed)
        User.Votes = User.hasMany(models.Vote)
      }
    }
  })

  return User
}
