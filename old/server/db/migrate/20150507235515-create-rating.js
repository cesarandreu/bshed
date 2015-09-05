module.exports = {
  up: function (migration, DataTypes) {
    return migration.createTable('Ratings', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID
      },
      value: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      BikeId: {
        allowNull: false,
        type: DataTypes.UUID
      },
      VoteId: {
        allowNull: false,
        type: DataTypes.UUID
      }
    })
  },
  down: function (migration) {
    return migration.dropTable('Ratings')
  }
}
