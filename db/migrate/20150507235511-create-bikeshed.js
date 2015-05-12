module.exports = {
  up: function (migration, DataTypes) {
    return migration.createTable('Bikesheds', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM('building', 'success', 'error', 'deleted')
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
      }
    })
  },
  down: function (migration) {
    return migration.dropTable('Bikesheds')
  }
}
