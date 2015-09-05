module.exports = {
  up: function (migration, DataTypes) {
    return migration.createTable('Votes', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      UserId: {
        allowNull: false,
        type: DataTypes.UUID
      },
      BikeshedId: {
        allowNull: false,
        type: DataTypes.UUID
      }
    })
  },
  down: function (migration) {
    return migration.dropTable('Votes')
  }
}
