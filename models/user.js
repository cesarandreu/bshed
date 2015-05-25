const bcrypt = require('bcrypt')

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 255,
        notEmpty: true
      }
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      roles: false
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      roles: false
    }
  }, {
    classMethods: {
      associate (models) {
        User.hasMany(models.Bikeshed)
        User.hasMany(models.Vote)
      },

      hashPassword (password) {
        return new Promise((resolve, reject) => {
          bcrypt.hash(password, 8, (err, hash) => {
            err ? reject(err) : resolve(hash)
          })
        })
      },

      comparePassword (password, hash) {
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
