/**
 * Bike
 * @flow
 */
export default function createBike (sequelize, DataTypes) {
  const Bike = sequelize.define('Bike', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    // width: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    // height: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5000000,
        min: 0
      }
    },
    type: {
      type: DataTypes.ENUM([
        'image/png',
        'image/jpeg'
      ]),
      allowNull: false,
      validate: {
        isIn: [['image/png', 'image/jpeg']]
      }
    },
    BikeshedId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    classMethods: {
      associate (models: Object) {
        Bike.Bikeshed = Bike.belongsTo(models.Bikeshed)
        Bike.Ratings = Bike.hasMany(models.Rating)
      }
    }
  })

  return Bike
}
