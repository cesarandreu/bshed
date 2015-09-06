/**
 * User model
 * @flow
 */
import bcrypt from 'bcrypt'

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
      registered () {
        return !!this.getDataValue('registeredAt')
      }
    },

    instanceMethods: {
      /**
       * Check if password is valid or not
       * @param password Password to check
       * @returns Promise of password validity
       */
      checkPassword (password: string): Promise {
        return User.comparePassword(password, this.getDataValue('hashedPassword'))
      }
    },

    classMethods: {
      associate (models: Object) {
        User.hasMany(models.Bikeshed)
        User.hasMany(models.Vote)
      },

      /**
       * Get hashed password
       * @param password Password to hash
       * @returns Promise of hashed password
       */
      hashPassword (password: string): Promise {
        return new Promise((resolve, reject) => {
          bcrypt.hash(password, 8, (err, hash) => {
            err ? reject(err) : resolve(hash)
          })
        })
      },

      /**
       * Compare a password and hash
       * @param password Password to check
       * @param hash Hash to compare with
       * @returns Promise of password validity
       */
      comparePassword (password: string, hash: string): Promise {
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, hash, (err, res) => {
            err ? reject(err) : resolve(res)
          })
        })
      }
    }
  })

  return User
}
