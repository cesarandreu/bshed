module.exports = {
  up: function (migration, DataTypes) {
    return migration.createTable('Bikes', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      size: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM([
          'image/png',
          'image/jpeg'
        ])
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      BikeshedId: {
        allowNull: false,
        type: DataTypes.UUID
      }
    })
  },
  down: function (migration) {
    return migration.dropTable('Bikes')
  }
}
