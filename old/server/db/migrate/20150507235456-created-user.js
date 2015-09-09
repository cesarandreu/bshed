module.exports = {
  up: function (migration, DataTypes) {
    return migration.createTable('Users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING
      },
      email: {
        unique: true,
        allowNull: true,
        type: DataTypes.STRING
      },
      hashedPassword: {
        allowNull: true,
        type: DataTypes.STRING
      },
      registeredAt: {
        allowNull: true,
        type: DataTypes.DATE
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
