module.exports = {
  up: function (migration, DataTypes) {
    return migration.createTable('Users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      hashedPassword: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    })
  },

  down: function (migration) {
    return migration.dropTable('Users')
  }
}
