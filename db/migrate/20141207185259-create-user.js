'use strict';
module.exports = {
  up: function (migration, DataTypes, done) {
    migration.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      administrator: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: '',
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: ''
      },
      hashedPassword: {
        allowNull: true,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function (migration, DataTypes, done) {
    migration.dropTable('Users').done(done);
  }
};
