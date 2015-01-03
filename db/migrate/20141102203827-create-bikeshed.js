'use strict';
module.exports = {
  up: function (migration, DataTypes, done) {
    migration.createTable('Bikesheds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: '',
      },
      body: {
        allowNull: false,
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'incomplete'
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
      },
      UserId: {
        allowNull: true,
        type: DataTypes.INTEGER
      }
    }).done(done);
  },
  down: function (migration, DataTypes, done) {
    migration.dropTable('Bikesheds').done(done);
  }
};
