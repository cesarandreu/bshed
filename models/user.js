module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
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
      }
    }
  })

  return User
}
